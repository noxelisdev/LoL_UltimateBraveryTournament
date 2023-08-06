import tippy from "tippy.js";
import { playSound } from "./common/audio";
import { sndStartupFinished } from "./common/sounds";
import { initChampListGenerator } from "./tools/champlistgenerator";
import { enableSoloChampSelectorClickEvent } from "./tools/solostuffgenerator";
import { enableChampSelectorClickEvent } from "./tools/stuffgenerator";

const startupProgress = jQuery("#startup_progress");
const appVersion = jQuery("#appversion");
const soloStuffGeneratorChampSelectorList = jQuery("#solostuffgenerator_champselector_content");
const stuffGeneratorChampSelectorList = jQuery("#stuffgenerator_champselector_content");
const startupInitializationStepsNumber = 9;
let appInitializationProgress = 0;
let appInitializationProgressChangeHandler;
let championsIds;
let leagueChampionsDataReady = false;
let leagueRunesDataReady = false;
let leagueItemsDataReady = false;
let leagueSummonersSpellsDataReady = false;

function enableAppInitialization() {
    appInitializationProgressChangeHandler = setInterval(() => {
        if (appInitializationProgress > 100) {
            appInitializationProgress = 100;
        }

        startupProgress.css("width", appInitializationProgress + "%");

        if (Math.round(appInitializationProgress) === 100) {
            clearInterval(appInitializationProgressChangeHandler);
            tippy('[data-tippy-content]', { theme: 'lol', arrow: true });
            initChampListGenerator();
            enableSoloChampSelectorClickEvent();
            enableChampSelectorClickEvent();

            setTimeout(() => {
                jQuery("#titlebar").remove();
                jQuery("#startup").fadeOut(500);
                playSound(sndStartupFinished);
            }, 500);
        }
    }, 200);

    // Starting app initialization
    getAppVersion();
    getLeagueVersion();
    prepareLeagueDataRetrieving();

    const waitForLeagueDataToBeReady = setInterval(() => {
        if (leagueChampionsDataReady && leagueRunesDataReady && leagueItemsDataReady && leagueSummonersSpellsDataReady) {
            clearTimeout(waitForLeagueDataToBeReady);
            defineHighlightedChampion();
            populateSoloStuffGeneratorChampSelector();
            populateStuffGeneratorChampSelector();
        }
    }, 200);
}

function getAppVersion() {
    window.appApi.getAppVersion()
        .then((data) => {
            appVersion.text(appVersion.text().replace("Version X.X.X", "Version " + data));
            appInitializationProgress += (100 / startupInitializationStepsNumber);
        })
        .catch((error) => {
            alert(error.message);
        });
}

function getLeagueVersion() {
    jQuery.ajax({
        url: "https://leaguestats.infinity54.fr/riot/lol/latest/manifest.json",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            appVersion.text(appVersion.text().replace("LoL XX.XX", "LoL " + data.v.substring(0, data.v.length - 2)));
            appInitializationProgress += (100 / startupInitializationStepsNumber);
        },
        error: function(qXHR, textStatus, errorThrown) {
            alert(errowThrown);
        }
    });
}

async function prepareLeagueDataRetrieving() {
    // Champions IDs retrieving
    jQuery.ajax({
        url: "https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/champion.json",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            championsIds = Object.keys(data.data);
            retrieveLeagueChampionsData();
            retrieveLeagueRunesData();
            retrieveLeagueItemsData();
            retrieveLeagueSummonersSpellsData();
        },
        error: function (qXHR, textStatus, errorThrown) {
            alert(errowThrown);
        }
    });
}

async function retrieveLeagueChampionsData() {
    championsIds.forEach((championId) => {
        jQuery.ajax({
            url: `https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/champion/${championId}.json`,
            type: "GET",
            async: false,
            crossDomain: true,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                switch (championId) {
                    case "FiddleSticks":
                    case "Fiddlesticks":
                        window.leagueData.champions["FiddleSticks"] = data.data["Fiddlesticks"];
                        window.leagueData.champions["FiddleSticks"].id = "FiddleSticks";
                        window.leagueData.champions["FiddleSticks"].name = "FiddleSticks";
                        break;
                    default:
                        window.leagueData.champions[data.data[championId].name] = data.data[championId];
                        break;
                }
            },
            error: function (qXHR, textStatus, errorThrown) {
                alert(errowThrown);
            }
        });
    });

    window.leagueData.champions = Object.keys(window.leagueData.champions).sort().reduce(
      (obj, key) => {
          obj[key] = window.leagueData.champions[key];
          return obj;
      },
      {}
    );

    appInitializationProgress += (100 / startupInitializationStepsNumber);
    leagueChampionsDataReady = true;
}

function retrieveLeagueRunesData() {
    jQuery.ajax({
        url: "https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/runesReforged.json",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            window.leagueData.runes.main = data;
            appInitializationProgress += (100 / startupInitializationStepsNumber);
            leagueRunesDataReady = true;
        },
        error: function (qXHR, textStatus, errorThrown) {
            alert(errowThrown);
        }
    });
}

function retrieveLeagueItemsData() {
    jQuery.ajax({
        url: "https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/item.json",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            let supportItems = [];
            let jungleItems = [];
            let bootsItems = [];
            let mythicItems = [];
            let legendaryItems = [];

            for (const item in data.data) {
                const itemData = data.data[item];

                // Check if item is usable
                if (
                  itemData.maps[11] && itemData.gold.purchasable && !itemData.requiredAlly && itemData.tags.indexOf("Consumable") === -1
                  && itemData.tags.indexOf("Trinket") === -1 && !itemData.requiredChampion
                ) {
                    // Boots items
                    if (
                      itemData.tags.indexOf("Boots") > -1 && itemData.depth
                    ) {
                        bootsItems.push(itemData);
                    }

                    // Jungle items
                    if (
                      itemData.tags.indexOf("Jungle") > -1 && itemData.name.startsWith("Bébé")
                    ) {
                        jungleItems.push(itemData);
                    }

                    // Support items
                    if (
                      itemData.tags.indexOf("GoldPer") > -1 && !itemData.specialRecipe
                    ) {
                        supportItems.push(itemData);
                    }

                    // Mythic items
                    if (
                      itemData.tags.indexOf("Boots") === -1 && itemData.tags.indexOf("Jungle") === -1 &&
                      itemData.description.indexOf("Propriété passive mythique") > -1 && !itemData.requiredAlly
                    ) {
                        mythicItems.push(itemData);
                    }

                    // Legendary items
                    if (
                      itemData.tags.indexOf("Boots") === -1 && itemData.tags.indexOf("Jungle") === -1
                      && itemData.tags.indexOf("Lane") === -1
                      && itemData.description.indexOf("Propriété passive mythique") === -1 && !itemData.specialRecipe
                      && !itemData.info && !itemData.into
                    ) {
                        legendaryItems.push(itemData);
                    }
                }
            }

            window.leagueData.items.boots = bootsItems;
            window.leagueData.items.jungle = jungleItems;
            window.leagueData.items.support = supportItems;
            window.leagueData.items.mythic = mythicItems;
            window.leagueData.items.legendary = legendaryItems;
            appInitializationProgress += (100 / startupInitializationStepsNumber);
            leagueItemsDataReady = true;
        },
        error: function (qXHR, textStatus, errorThrown) {
            alert(errowThrown);
        }
    });
}

function retrieveLeagueSummonersSpellsData() {
    jQuery.ajax({
        url: "https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/summoner.json",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            let usableSummoners = [];

            for (const summonerId in data.data) {
                const summonerData = data.data[summonerId];

                if (summonerData.modes.indexOf("CLASSIC") !== -1) {
                    usableSummoners.push(summonerData);
                }
            }

            window.leagueData.summoners = usableSummoners;
            appInitializationProgress += (100 / startupInitializationStepsNumber);
            leagueSummonersSpellsDataReady = true;
        },
        error: function (qXHR, textStatus, errorThrown) {
            alert(errowThrown);
        }
    });
}

function defineHighlightedChampion() {
    const highlightedChampion = Object.keys(window.leagueData.champions)[Math.floor(Math.random() * Object.keys(window.leagueData.champions).length)];

    jQuery("#championhighlight_name").text(window.leagueData.champions[highlightedChampion].name);
    jQuery("#championhighlight_portrait").css("background-image", `url('https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/${window.leagueData.champions[highlightedChampion].id}_0.jpg')`);

    for (const skinKey in window.leagueData.champions[highlightedChampion].skins) {
        const skinData = window.leagueData.champions[highlightedChampion].skins[skinKey];

        jQuery('<div>', {
            id: 'championhighlight_skin_' + highlightedChampion + "_" + skinData.num,
            class: 'championhighlight_skin'
        }).appendTo('#championhighlight_skins')
            .css("background-image", `url('https://leaguestats.infinity54.fr/riot/lol/img/champion/centered/${window.leagueData.champions[highlightedChampion].id}_${skinData.num}.jpg')`)
            .height((jQuery("#championhighlight_skins").height() / window.leagueData.champions[highlightedChampion].skins.length) + "px")
            .attr("data-tippy-content", (skinData.name !== "default") ? skinData.name : window.leagueData.champions[highlightedChampion].name)
            .attr("data-tippy-placement", "left")
            .attr("data-skinnumber", skinData.num);
    }

    appInitializationProgress += (100 / startupInitializationStepsNumber);
}

function populateSoloStuffGeneratorChampSelector() {
    for (const championName in window.leagueData.champions) {
        const soloStuffChampDiv = jQuery("<div>")
            .css("background-image", `url('https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/${window.leagueData.champions[championName].id}_0.jpg')`)
            .attr("data-value", window.leagueData.champions[championName].id)
            .attr("data-tippy-content", window.leagueData.champions[championName].name);
        soloStuffGeneratorChampSelectorList.append(soloStuffChampDiv);
    }

    appInitializationProgress += (100 / startupInitializationStepsNumber);
}

function populateStuffGeneratorChampSelector() {
    for (const championName in window.leagueData.champions) {
        const stuffChampDiv = jQuery("<div>")
            .css("background-image", `url('https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/${window.leagueData.champions[championName].id}_0.jpg')`)
            .attr("data-value", window.leagueData.champions[championName].id)
            .attr("data-tippy-content", window.leagueData.champions[championName].name);
        stuffGeneratorChampSelectorList.append(stuffChampDiv);
    }

    appInitializationProgress += (100 / startupInitializationStepsNumber);
}

export { getAppVersion, getLeagueVersion, enableAppInitialization }
