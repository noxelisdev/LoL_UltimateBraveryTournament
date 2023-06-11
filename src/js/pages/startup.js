import tippy from "tippy.js";
import { initMainUi } from "./mainui";
import { enableChampSelectorClickEvent } from "./mainui/content/stuffgenerator";
import { enableSoloChampSelectorClickEvent } from "./mainui/content/solostuffgenerator";

const startupProgress = jQuery("#startup_progress");
const stuffGeneratorChampSelectorList = jQuery("#stuffgenerator_champselector_content");
const soloStuffGeneratorChampSelectorList = jQuery("#solostuffgenerator_champselector_content");
const startupInitializationStepsNumber = 6;
let appInitializationProgress = 0;
let appInitializationProgressChangeHandler = setInterval(() => {
  startupProgress.css("width", appInitializationProgress + "%");

  if (appInitializationProgress > 100) {
    appInitializationProgress = 100;
  }

  if (Math.round(appInitializationProgress) === 100) {
    clearInterval(appInitializationProgressChangeHandler);
    sortChampionHighlightSkins();
    sortChampionSelectorList();
    enableChampSelectorClickEvent();
    enableSoloChampSelectorClickEvent();
    tippy('[data-tippy-content]', { theme: 'lol', arrow: true });

    setTimeout(() => {
      initMainUi();
    }, 500);
  }
}, 200);

function sortChampionHighlightSkins() {
  const skinsList = jQuery('#championhighlight_skins');
  let sortedSkinsList = skinsList.children('div').get();
  sortedSkinsList.sort(function(a, b) {
    var compA = jQuery(a).attr('data-skinnumber').toUpperCase();
    var compB = jQuery(b).attr('data-skinnumber').toUpperCase();
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  })
  jQuery.each(sortedSkinsList, function(idx, itm) {
    skinsList.append(itm);
  });
}

function sortChampionSelectorList() {
  const champList = jQuery('#stuffgenerator_champselector_content');
  let sortedChampList = champList.children('div').get();
  sortedChampList.sort(function(a, b) {
    var compA = jQuery(a).attr('data-tippy-content').toUpperCase();
    var compB = jQuery(b).attr('data-tippy-content').toUpperCase();
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  })
  jQuery.each(sortedChampList, function(idx, itm) {
    champList.append(itm);
  });
}

function getLeagueCurrentVersion() {
  window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/manifest.json")
    .then((data) => {
      const appVersion = jQuery("#appversion");
      appVersion.text(appVersion.text().replace("LoL XX.XX.X", "LoL " + data.v));
      appInitializationProgress += (100 / startupInitializationStepsNumber);
    })
    .catch((error) => {
      alert(error.message);
    });
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

async function initChampionsData() {
  await window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/championFull.json")
    .then(async (data) => {
      window.leagueOfLegends.champions = data.data;
      const championsList = data.data;
      const championsListKeys = Object.keys(championsList);
      const championOfTheDayKey = championsListKeys[Math.floor(Math.random() * championsListKeys.length)];

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

        // Champion highlight
        if (currentChampionKey === championOfTheDayKey) {
          jQuery("#championhighlight_name").text(currentChampionValue.name);

          // Champion portrait
          await window.ddragonApi.getImageB64FromUrl({
            url: "https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/" + currentChampionValue.id + "_0.jpg",
            mime: "image/png"
          })
            .then((portrait) => {
              jQuery("#championhighlight_portrait").css("background-image", "url('" + portrait + "')");
            })
            .catch((error) => {
              alert(error.message);
            });

          // Champion skins
          for (const skinKey in currentChampionValue.skins) {
            const skinData = currentChampionValue.skins[skinKey];

            await window.ddragonApi.getImageB64FromUrl({
              url: "https://leaguestats.infinity54.fr/riot/lol/img/champion/centered/" + currentChampionValue.id + "_" + skinData.num + ".jpg",
              mime: "image/jpeg"
            })
              .then((splash) => {
                const skinDivId = 'championhighlight_skin_' + currentChampionValue.id + "_" + skinData.num;

                jQuery('<div>', {
                  id: skinDivId,
                  class: 'championhighlight_skin'
                }).appendTo('#championhighlight_skins')
                  .css("background-image", "url('" + splash + "')")
                  .height((jQuery("#championhighlight_skins").height() / currentChampionValue.skins.length) + "px")
                  .attr("data-tippy-content", (skinData.name !== "default") ? skinData.name : currentChampionValue.name)
                  .attr("data-tippy-placement", "left")
                  .attr("data-skinnumber", skinData.num);
              })
              .catch((error) => {
                alert(error.message);
              });
          }
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
}

function initRunesData() {
  window.ddragonApi.getJsonFromUrl("https://leaguestats.infinity54.fr/riot/lol/latest/data/fr_FR/runesReforged.json")
    .then((data) => {
      window.leagueOfLegends.runes = data;
      appInitializationProgress += (100 / startupInitializationStepsNumber);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function initItemsData() {
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
}

function initSummonersData() {
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
}

export { getAppVersion, getLeagueCurrentVersion, initChampionsData, initRunesData, initItemsData, initSummonersData }
