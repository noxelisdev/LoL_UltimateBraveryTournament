import tippy from "tippy.js";
import { playSound } from "./common/audio";
import { sndStartupFinished } from "./common/sounds";
import { championsIds } from "./data/champions";
import { initChampListGenerator } from "./tools/champlistgenerator";
import { enableSoloChampSelectorClickEvent } from "./tools/solostuffgenerator";
import { enableChampSelectorClickEvent } from "./tools/stuffgenerator";

const startupProgress = jQuery("#startup_progress");
const soloStuffGeneratorChampSelectorList = jQuery("#solostuffgenerator_champselector_content");
const stuffGeneratorChampSelectorList = jQuery("#stuffgenerator_champselector_content");
const startupInitializationStepsNumber = 7;
let appInitializationProgress = 0;
let appInitializationProgressChangeHandler;

let leagueDataReady = false;
let leagueImagesReady = false;

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
    initLeagueData();
    initLeagueImages();

    const waitForLeagueDataAndImagesToBeReady = setInterval(() => {
        if (leagueDataReady && leagueImagesReady) {
            clearTimeout(waitForLeagueDataAndImagesToBeReady);
            defineHighlightedChampion();
            populateSoloStuffGeneratorChampSelector();
            populateStuffGeneratorChampSelector();
        }
    }, 200);
}

function getAppVersion() {
    window.appApi.getAppVersion()
        .then((data) => {
            const appVersion = jQuery("#appversion");
            appVersion.text(appVersion.text().replace("Version X.X.X", "Version " + data));
            appInitializationProgress += (100 / startupInitializationStepsNumber);
        })
        .catch((error) => {
            alert(error.message);
        });
}

function getLeagueVersion() {
    const manifestFile = import('../../riot/manifest.json', {
        assert: {
            type: 'json'
        }
    });

    manifestFile.then(data => {
        const appVersion = jQuery("#appversion");
        appVersion.text(appVersion.text().replace("LoL XX.XX", "LoL " + data.v.substring(0, data.v.length - 2)));
        appInitializationProgress += (100 / startupInitializationStepsNumber);
    });
}

async function initLeagueData() {
    // Champions data
    for (const championId in championsIds) {
        await import(/* webpackMode: "eager" */ `../../riot/data/champion/${championsIds[championId]}.json`, {
            assert: {
                type: 'json'
            }
        }).then(data => {
            switch (championsIds[championId]) {
                case "FiddleSticks":
                    window.leagueData.champions[championsIds[championId]] = data.data["Fiddlesticks"];
                    window.leagueData.champions[championsIds[championId]].id = "FiddleSticks";
                    window.leagueData.champions[championsIds[championId]].name = "FiddleSticks";
                    break;
                default:
                    window.leagueData.champions[data.data[championsIds[championId]].name] = data.data[championsIds[championId]];
                    break;
            }
        });
    }

    window.leagueData.champions = Object.keys(window.leagueData.champions).sort().reduce(
        (obj, key) => {
            obj[key] = window.leagueData.champions[key];
            return obj;
        },
        {}
    );

    // Runes data
    await import(/* webpackMode: "eager" */ `../../riot/data/runesReforged.json`, {
        assert: {
            type: 'json'
        }
    }).then(data => {
        for (const runeTree in data.default) {
            window.leagueData.runes.main[data.default[runeTree].name] = data.default[runeTree];
        }
    });

    // Items data
    await import(/* webpackMode: "eager" */ `../../riot/data/item.json`, {
        assert: {
            type: 'json'
        }
    }).then(data => {
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
    });

    // Summoners data
    await import(/* webpackMode: "eager" */ `../../riot/data/summoner.json`, {
        assert: {
            type: 'json'
        }
    }).then(data => {
        let usableSummoners = [];

        for (const summonerId in data.data) {
            const summonerData = data.data[summonerId];

            if (summonerData.modes.indexOf("CLASSIC") !== -1) {
                usableSummoners.push(summonerData);
            }
        }

        window.leagueData.summoners = usableSummoners;
    });

    appInitializationProgress += (100 / startupInitializationStepsNumber);
    leagueDataReady = true;
}

function importAllImages(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

function initLeagueImages() {
    window.leagueImages.champions.centered = importAllImages(require.context('../../riot/img/champion/centered', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.champions.tiles = importAllImages(require.context('../../riot/img/champion/tiles', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.runes.main = importAllImages(require.context('../../riot/img/perk-images/Styles', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.runes.stats = importAllImages(require.context('../../riot/img/perk-images/StatMods', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.items = importAllImages(require.context('../../riot/img/item', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.summoners = importAllImages(require.context('../../riot/img/summoner', false, /\.(png|jpe?g|svg)$/));
    window.leagueImages.spells = importAllImages(require.context('../../riot/img/spell', false, /\.(png|jpe?g|svg)$/));
    appInitializationProgress += (100 / startupInitializationStepsNumber);
    leagueImagesReady = true;
}

function defineHighlightedChampion() {
    const highlightedChampion = Object.keys(window.leagueData.champions)[Math.floor(Math.random() * Object.keys(window.leagueData.champions).length)];

    jQuery("#championhighlight_name").text(window.leagueData.champions[highlightedChampion].name);
    jQuery("#championhighlight_portrait").css("background-image", `url('${window.leagueImages.champions.tiles[window.leagueData.champions[highlightedChampion].id + "_0.jpg"]}')`);

    for (const skinKey in window.leagueData.champions[highlightedChampion].skins) {
        const skinData = window.leagueData.champions[highlightedChampion].skins[skinKey];

        jQuery('<div>', {
            id: 'championhighlight_skin_' + highlightedChampion + "_" + skinData.num,
            class: 'championhighlight_skin'
        }).appendTo('#championhighlight_skins')
            .css("background-image", `url('${window.leagueImages.champions.centered[window.leagueData.champions[highlightedChampion].id + "_" + skinData.num + ".jpg"]}')`)
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
            .css("background-image", `url('${window.leagueImages.champions.tiles[window.leagueData.champions[championName].id + "_0.jpg"]}')`)
            .attr("data-value", window.leagueData.champions[championName].id)
            .attr("data-tippy-content", window.leagueData.champions[championName].name);
        soloStuffGeneratorChampSelectorList.append(soloStuffChampDiv);
    }

    appInitializationProgress += (100 / startupInitializationStepsNumber);
}

function populateStuffGeneratorChampSelector() {
    for (const championName in window.leagueData.champions) {
        const stuffChampDiv = jQuery("<div>")
            .css("background-image", `url('${window.leagueImages.champions.tiles[window.leagueData.champions[championName].id + "_0.jpg"]}')`)
            .attr("data-value", window.leagueData.champions[championName].id)
            .attr("data-tippy-content", window.leagueData.champions[championName].name);
        stuffGeneratorChampSelectorList.append(stuffChampDiv);
    }

    appInitializationProgress += (100 / startupInitializationStepsNumber);
}

/*async function initChampionsData() {
  await window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/championFull.json")
    .then(async (data) => {
      window.leagueOfLegends.champions = data.data;
      const championsList = data.data;
      const championsListKeys = Object.keys(championsList);

      // Champ list generator range input configuration
      const toolOptions_ChampionsNumber = jQuery("#champlistgenerator_tooloptions_numberofchampions");
      toolOptions_ChampionsNumber.attr("max", Object.keys(data.data).length);
      toolOptions_ChampionsNumber.attr("value", 20);
      toolOptions_ChampionsNumber.trigger("input");

      for (let i = 0; i < championsListKeys.length; i++) {
        const currentChampionKey = championsListKeys[i];
        const currentChampionValue = championsList[currentChampionKey];

        // Fiddlesticks id fix
        if (currentChampionValue.id === "Fiddlesticks") {
          currentChampionValue.id = "FiddleSticks";
        }

        // Champion selector lists
        await window.ddragonApi.getImageB64FromUrl({
          url: "https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/" + currentChampionValue.id + "_0.jpg",
          mime: "image/png"
        })
          .then((image) => {
            const stuffChampDiv = jQuery("<div>")
              .css("background-image", "url('" + image + "')")
              .attr("data-value", currentChampionValue.id)
              .attr("data-tippy-content", currentChampionValue.name);
            stuffGeneratorChampSelectorList.append(stuffChampDiv);

            const soloStuffChampDiv = jQuery("<div>")
              .css("background-image", "url('" + image + "')")
              .attr("data-value", currentChampionValue.id)
              .attr("data-tippy-content", currentChampionValue.name);
            soloStuffGeneratorChampSelectorList.append(soloStuffChampDiv);

            appInitializationProgress += (100 / startupInitializationStepsNumber) / championsListKeys.length;
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}*/

/*function initRunesData() {
  window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/runesReforged.json")
    .then((data) => {
      window.leagueOfLegends.runes = data;
      appInitializationProgress += (100 / startupInitializationStepsNumber);
    })
    .catch((error) => {
      alert(error.message);
    });
}*/

/*function initItemsData() {
  window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/item.json")
    .then((data) => {
      let usableItems = [];
      let supportItems = [];
      let jungleItems = [];
      let bootsItems = [];
      let mythicItems = [];
      let legendaryItems = [];

      // Usable items
      for (const item in data.data) {
        const itemData = data.data[item];

        if (
          itemData.maps[11] && itemData.gold.purchasable && !itemData.requiredAlly && itemData.tags.indexOf("Consumable") === -1
          && itemData.tags.indexOf("Trinket") === -1 && !itemData.requiredChampion
        ) {
          usableItems.push(itemData);
        }
      }

      // Sorting items
      for (const item in usableItems) {
        const itemData = usableItems[item];

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

      window.leagueOfLegends.items.boots = bootsItems;
      window.leagueOfLegends.items.jungle = jungleItems;
      window.leagueOfLegends.items.support = supportItems;
      window.leagueOfLegends.items.mythic = mythicItems;
      window.leagueOfLegends.items.legendary = legendaryItems;
      appInitializationProgress += (100 / startupInitializationStepsNumber);
    })
    .catch((error) => {
      alert(error.message);
    });
}*/

/*function initSummonersData() {
  window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/summoner.json")
    .then((data) => {
      let usableSummoners = [];

      for (const summonerId in data.data) {
        const summonerData = data.data[summonerId];

        if (summonerData.modes.indexOf("CLASSIC") !== -1) {
          usableSummoners.push(summonerData);
        }
      }

      window.leagueOfLegends.summoners = usableSummoners;
      appInitializationProgress += (100 / startupInitializationStepsNumber);
    })
    .catch((error) => {
      alert(error.message);
    });
}*/

export { getAppVersion, getLeagueVersion, enableAppInitialization }
