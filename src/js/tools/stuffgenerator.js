import { playSound } from "../common/audio";
import { sndToolCommonReturnButtonClick, sndToolCommonReturnButtonHover } from "../common/sounds";
import { sndToolCommonExitButtonClick, sndToolCommonExitButtonHover } from "../common/sounds";
import { sndToolCommonStartToolButtonHover, sndToolCommonStartToolButtonClick } from "../common/sounds";
import { returnToHomepage } from "../app";

const returnButton = jQuery("#stuffgenerator_header_returnbutton");
const exitButton = jQuery("#stuffgenerator_exitbutton");
const startToolButtonContainer = jQuery("#stuffgenerator_starttoolbuttoncontainer");
const champSelectorContainer = jQuery("#stuffgenerator_champselectorcontainer");
let currentChampSelection = null;
let generationInProgress = false;

jQuery(".stuffgenerator_player_champpict").on("click", (event) => {
  currentChampSelection = jQuery(event.target).attr('id');
  champSelectorContainer.show();
  jQuery("#stuffgenerator_champselector_search").focus();
});

returnButton.on("mouseenter", () => {
  playSound(sndToolCommonReturnButtonHover);
});

returnButton.on("click", () => {
  playSound(sndToolCommonReturnButtonClick);
  jQuery("#stuffgenerator").fadeOut(500);
  jQuery("#toolselector").fadeIn(500);
  resetStuffGenerator();
});

exitButton.on("mouseenter", () => {
  playSound(sndToolCommonExitButtonHover);
});

exitButton.on("click", () => {
  playSound(sndToolCommonExitButtonClick);
  returnToHomepage();
  resetStuffGenerator();
});

function enableChampSelectorClickEvent() {
  jQuery("#stuffgenerator_champselector_content div").click((event) => {
    const currentChampSelectionElement = jQuery("#" + currentChampSelection);
    currentChampSelectionElement.css("background-image", jQuery(event.target).css("background-image"));
    currentChampSelectionElement.attr("data-value", jQuery(event.target).attr("data-value"));
    currentChampSelectionElement.attr("data-tippy-content", jQuery(event.target).attr("data-tippy-content"));
    currentChampSelectionElement[0]._tippy.setContent(jQuery(event.target).attr("data-tippy-content"));
    currentChampSelection = null;
    champSelectorContainer.hide();
    jQuery("#stuffgenerator_champselector_search").val("").trigger("input");
    enableStartToolButton();
  });
}

jQuery("#stuffgenerator_champselector_search").on("input", () => {
  if (jQuery("#stuffgenerator_champselector_search").val() !== "") {
    jQuery("#stuffgenerator_champselector_content div").each((index, item) => {
      if (jQuery(item).attr("data-tippy-content").toLowerCase().indexOf(jQuery("#stuffgenerator_champselector_search").val().toLowerCase()) !== -1) {
        jQuery(item).show();
      } else {
        jQuery(item).hide();
      }
    })
  } else {
    jQuery("#stuffgenerator_champselector_content div").each((index, item) => {
      jQuery(item).show();
    })
  }
});

function enableStartToolButton() {
  if (
    jQuery("#stuffgenerator_player_top_champ").attr("data-tippy-content") !== "Indéterminé" &&
    jQuery("#stuffgenerator_player_jungle_champ").attr("data-tippy-content") !== "Indéterminé" &&
    jQuery("#stuffgenerator_player_middle_champ").attr("data-tippy-content") !== "Indéterminé" &&
    jQuery("#stuffgenerator_player_adc_champ").attr("data-tippy-content") !== "Indéterminé" &&
    jQuery("#stuffgenerator_player_support_champ").attr("data-tippy-content") !== "Indéterminé" &&
    generationInProgress === false
  ) {
    if (startToolButtonContainer.hasClass("stuffgenerator_starttoolbuttondisabled")) {
      startToolButtonContainer.removeClass("stuffgenerator_starttoolbuttondisabled");
    }
  } else {
    if (!startToolButtonContainer.hasClass("stuffgenerator_starttoolbuttondisabled")) {
      startToolButtonContainer.addClass("stuffgenerator_starttoolbuttondisabled");
    }
  }
}

startToolButtonContainer.on("mouseenter", async () => {
  if (startToolButtonContainer.hasClass("stuffgenerator_starttoolbuttondisabled") === false) {
    playSound(sndToolCommonStartToolButtonHover);
  }
});

startToolButtonContainer.on("click", async () => {
  if (startToolButtonContainer.hasClass("stuffgenerator_starttoolbuttondisabled") === false) {
    const topPlayerSelectedChampId = jQuery("#stuffgenerator_player_top_champ").attr("data-value");
    const junglePlayerSelectedChampId = jQuery("#stuffgenerator_player_jungle_champ").attr("data-value");
    const middlePlayerSelectedChampId = jQuery("#stuffgenerator_player_middle_champ").attr("data-value");
    const adcPlayerSelectedChampId = jQuery("#stuffgenerator_player_adc_champ").attr("data-value");
    const supportPlayerSelectedChampId = jQuery("#stuffgenerator_player_support_champ").attr("data-value");

    generationInProgress = true;
    startToolButtonContainer.addClass("stuffgenerator_starttoolbuttondisabled");
    playSound(sndToolCommonStartToolButtonClick);

    await generatePlayerRunes("top");
    await generatePlayerStatsRunes("top");
    await generatePlayerItems("top", topPlayerSelectedChampId);
    await generateSummoners("top");
    await determineMainSpell("top", topPlayerSelectedChampId);

    await generatePlayerRunes("jungle");
    await generatePlayerStatsRunes("jungle");
    await generatePlayerItems("jungle", junglePlayerSelectedChampId);
    await generateSummoners("jungle");
    await determineMainSpell("jungle", junglePlayerSelectedChampId);

    await generatePlayerRunes("middle");
    await generatePlayerStatsRunes("middle");
    await generatePlayerItems("middle", middlePlayerSelectedChampId);
    await generateSummoners("middle");
    await determineMainSpell("middle", middlePlayerSelectedChampId);

    await generatePlayerRunes("adc");
    await generatePlayerStatsRunes("adc");
    await generatePlayerItems("adc", adcPlayerSelectedChampId);
    await generateSummoners("adc");
    await determineMainSpell("adc", adcPlayerSelectedChampId);

    await generatePlayerRunes("support");
    await generatePlayerStatsRunes("support");
    await generatePlayerItems("support", supportPlayerSelectedChampId);
    await generateSummoners("support");
    await determineMainSpell("support", supportPlayerSelectedChampId);

    generationInProgress = false;
    startToolButtonContainer.removeClass("stuffgenerator_starttoolbuttondisabled");
    jQuery("#stuffgenerator_starttoolbuttontext").text("NOUVEAUX STUFFS");
  }
});

async function generatePlayerRunes(lane) {
  // Main runes
  const playerSelectedMainRune = window.leagueData.runes.main[Object.keys(window.leagueData.runes.main)[Math.floor(Math.random() * Object.keys(window.leagueData.runes.main).length)]];
  const playerSelectedMainRune1 = playerSelectedMainRune.slots[0].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[0].runes.length)];
  const playerSelectedMainRune2 = playerSelectedMainRune.slots[1].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[1].runes.length)];
  const playerSelectedMainRune3 = playerSelectedMainRune.slots[2].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[2].runes.length)];
  const playerSelectedMainRune4 = playerSelectedMainRune.slots[3].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[3].runes.length)];

  const rune1 = jQuery("#stuffgenerator_player_" + lane + "_rune1");
  rune1.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedMainRune1.icon}')`).attr("data-tippy-content", playerSelectedMainRune1.name);
  rune1[0]._tippy.setContent(playerSelectedMainRune1.name);

  const rune2 = jQuery("#stuffgenerator_player_" + lane + "_rune2");
  rune2.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedMainRune2.icon}')`).attr("data-tippy-content", playerSelectedMainRune2.name);
  rune2[0]._tippy.setContent(playerSelectedMainRune2.name);

  const rune3 = jQuery("#stuffgenerator_player_" + lane + "_rune3");
  rune3.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedMainRune3.icon}')`).attr("data-tippy-content", playerSelectedMainRune3.name);
  rune3[0]._tippy.setContent(playerSelectedMainRune3.name);

  const rune4 = jQuery("#stuffgenerator_player_" + lane + "_rune4");
  rune4.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedMainRune4.icon}')`).attr("data-tippy-content", playerSelectedMainRune4.name);
  rune4[0]._tippy.setContent(playerSelectedMainRune4.name);

  // Secondary runes
  let playerSelectedSecondaryRune = window.leagueData.runes.main[Object.keys(window.leagueData.runes.main)[Math.floor(Math.random() * Object.keys(window.leagueData.runes.main).length)]];
  while (playerSelectedSecondaryRune === playerSelectedMainRune) {
    playerSelectedSecondaryRune = window.leagueData.runes.main[Object.keys(window.leagueData.runes.main)[Math.floor(Math.random() * Object.keys(window.leagueData.runes.main).length)]];
  }

  let playerSelectedSecondaryRuneFirstSlotNumber = Math.floor(Math.random() * playerSelectedSecondaryRune.slots.length);
  while (playerSelectedSecondaryRuneFirstSlotNumber === 0) {
    playerSelectedSecondaryRuneFirstSlotNumber = Math.floor(Math.random() * playerSelectedSecondaryRune.slots.length);
  }

  let playerSelectedSecondaryRuneSecondSlotNumber = Math.floor(Math.random() * playerSelectedSecondaryRune.slots.length);
  while (playerSelectedSecondaryRuneSecondSlotNumber === playerSelectedSecondaryRuneFirstSlotNumber || playerSelectedSecondaryRuneSecondSlotNumber === 0) {
    playerSelectedSecondaryRuneSecondSlotNumber = Math.floor(Math.random() * playerSelectedSecondaryRune.slots.length);
  }

  const playerSelectedSecondaryRune1 = playerSelectedSecondaryRune.slots[playerSelectedSecondaryRuneFirstSlotNumber].runes[Math.floor(Math.random() * playerSelectedSecondaryRune.slots[playerSelectedSecondaryRuneFirstSlotNumber].runes.length)];
  const playerSelectedSecondaryRune2 = playerSelectedSecondaryRune.slots[playerSelectedSecondaryRuneSecondSlotNumber].runes[Math.floor(Math.random() * playerSelectedSecondaryRune.slots[playerSelectedSecondaryRuneSecondSlotNumber].runes.length)];

  const rune5 = jQuery("#stuffgenerator_player_" + lane + "_rune5");
  rune5.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedSecondaryRune1.icon}')`).attr("data-tippy-content", playerSelectedSecondaryRune1.name);
  rune5[0]._tippy.setContent(playerSelectedSecondaryRune1.name);

  const rune6 = jQuery("#stuffgenerator_player_" + lane + "_rune6");
  rune6.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedSecondaryRune2.icon}')`).attr("data-tippy-content", playerSelectedSecondaryRune2.name);
  rune6[0]._tippy.setContent(playerSelectedSecondaryRune2.name);
}

async function generatePlayerStatsRunes(lane) {
  const playerSelectedStatsRune1 = window.leagueData.runes.stats[0].runes[Math.floor(Math.random() * window.leagueData.runes.stats[0].runes.length)];
  const playerSelectedStatsRune2 = window.leagueData.runes.stats[1].runes[Math.floor(Math.random() * window.leagueData.runes.stats[1].runes.length)];
  const playerSelectedStatsRune3 = window.leagueData.runes.stats[2].runes[Math.floor(Math.random() * window.leagueData.runes.stats[2].runes.length)];

  const rune7 = jQuery("#stuffgenerator_player_" + lane + "_rune7");
  rune7.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedStatsRune1.icon}')`).attr("data-tippy-content", playerSelectedStatsRune1.name);
  rune7[0]._tippy.setContent(playerSelectedStatsRune1.name);

  const rune8 = jQuery("#stuffgenerator_player_" + lane + "_rune8");
  rune8.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedStatsRune2.icon}')`).attr("data-tippy-content", playerSelectedStatsRune2.name);
  rune8[0]._tippy.setContent(playerSelectedStatsRune2.name);

  const rune9 = jQuery("#stuffgenerator_player_" + lane + "_rune9");
  rune9.css("background-image", `url('https://lol.ddragon.infinity54.fr/img/${playerSelectedStatsRune3.icon}')`).attr("data-tippy-content", playerSelectedStatsRune3.name);
  rune9[0]._tippy.setContent(playerSelectedStatsRune3.name);
}

async function generatePlayerItems(lane, selectedChampId) {
  let numberOfLegendaryCount = 5;
  let selectedItems = [];
  let selectedItemsTypes = [];

  // Jungle item
  if (lane === "jungle") {
    selectedItems.push(window.leagueData.items.jungle[Math.floor(Math.random() * window.leagueData.items.jungle.length)]);
    selectedItemsTypes.push("jungle");
  }

  // Support item
  if (lane === "support") {
    numberOfLegendaryCount--;
    selectedItems.push(window.leagueData.items.support[Math.floor(Math.random() * window.leagueData.items.support.length)]);
    selectedItemsTypes.push("support");
  }

  // Boots
  if (selectedChampId !== "Cassiopeia") {
    selectedItems.push(window.leagueData.items.boots[Math.floor(Math.random() * window.leagueData.items.boots.length)]);
    selectedItemsTypes.push("boots");
  } else {
    numberOfLegendaryCount++;
  }

  // Legendary items
  let legendarySelectedItems = [];

  while (legendarySelectedItems.length < numberOfLegendaryCount) {
    const selectedLegendaryItem = window.leagueData.items.legendary[Math.floor(Math.random() * window.leagueData.items.legendary.length)];

    if (legendarySelectedItems.indexOf(selectedLegendaryItem.name) === -1) {
      legendarySelectedItems.push(selectedLegendaryItem.name);
      selectedItems.push(selectedLegendaryItem);
      selectedItemsTypes.push("legendary");
    }
  }

  for (let i = 0; i < selectedItems.length; i++) {
    const selectedItemData = selectedItems[i];
    const item = jQuery("#stuffgenerator_player_" + lane + "_item" + (i + 1));

    item.css("background-image", `url('https://lol.ddragon.infinity54.fr/latest/img/item/${selectedItemData.image.full}')`);
    item.attr("data-tippy-content", selectedItemData.name);
    item.attr("data-type", selectedItemsTypes[i]);
    item[0]._tippy.setContent(selectedItemData.name);
  }
}

// Manual item replacement
jQuery(".stuffgenerator_player_item").click(async (event) => {
  const clickedItem = jQuery(event.target);
  const clickedItemName = clickedItem.attr("data-tippy-content");
  const clickedItemType = clickedItem.attr("data-type");

  if (clickedItemName !== "" && clickedItemType !== "") {
    let replacementItem;

    // Jungle item
    if (clickedItemType === "jungle") {
      while (replacementItem === undefined || replacementItem.name === clickedItemName) {
        replacementItem = window.leagueData.items.jungle[Math.floor(Math.random() * window.leagueData.items.jungle.length)];
      }
    }

    // Support item
    if (clickedItemType === "support") {
      while (replacementItem === undefined || replacementItem.name === clickedItemName) {
        replacementItem = window.leagueData.items.support[Math.floor(Math.random() * window.leagueData.items.support.length)];
      }
    }

    // Boots
    if (clickedItemType === "boots") {
      while (replacementItem === undefined || replacementItem.name === clickedItemName) {
        replacementItem = window.leagueData.items.boots[Math.floor(Math.random() * window.leagueData.items.boots.length)];
      }
    }

    // Legendary item
    if (clickedItemType === "legendary") {
      const clickedItemParent = clickedItem.parent();
      const legendaryItemsElements = clickedItemParent.children();
      let selectedLegendaryItems = [];

      for (let i = 0; i < legendaryItemsElements.length; i++) {
        const element = jQuery(legendaryItemsElements[i]);

        if (element.hasClass("solostuffgenerator_player_item") && element.attr("data-type") === "legendary") {
          selectedLegendaryItems.push(jQuery(legendaryItemsElements[i]).attr("data-tippy-content"));
        }
      }

      while (replacementItem === undefined || selectedLegendaryItems.indexOf(replacementItem.name) !== -1) {
        replacementItem = window.leagueData.items.legendary[Math.floor(Math.random() * window.leagueData.items.legendary.length)];
      }
    }

    console.log(clickedItem, replacementItem);
    clickedItem.css("background-image", `url('https://lol.ddragon.infinity54.fr/latest/img/item/${replacementItem.image.full}')`).attr("data-tippy-content", replacementItem.name).attr("data-type", clickedItemType);
    clickedItem[0]._tippy.setContent(replacementItem.name);
  }
})

async function generateSummoners(lane) {
  let selectedSummoners = [];
  let selectedSummonersNames = [];

  // Jungle Smite
  if (lane === "jungle") {
    for (const summonerId in window.leagueData.summoners) {
      const summonerData = window.leagueData.summoners[summonerId];

      if (summonerData.name === "Châtiment") {
        selectedSummoners.push(summonerData);
        selectedSummonersNames.push(summonerData.name);
      }
    }
  }

  while (selectedSummoners.length < 2) {
    const summonerData = window.leagueData.summoners[Math.floor(Math.random() * window.leagueData.summoners.length)];

    if (summonerData.name !== "Châtiment" && selectedSummonersNames.indexOf(summonerData.name) === -1) {
      selectedSummoners.push(summonerData);
      selectedSummonersNames.push(summonerData.name);
    }
  }

  for (let i = 0; i < selectedSummoners.length; i++) {
    const selectedSummonerData = selectedSummoners[i];
    const summoner = jQuery("#stuffgenerator_player_" + lane + "_summoner" + (i + 1));

    summoner.css("background-image", `url('https://lol.ddragon.infinity54.fr/latest/img/spell/${selectedSummonerData.image.full}')`).attr("data-tippy-content", selectedSummonerData.name);
    summoner[0]._tippy.setContent(selectedSummonerData.name);
  }
}

async function determineMainSpell(lane, selectedChampId) {
  const championData = window.leagueData.champions[selectedChampId];
  const selectedChampSpellNumber = Math.floor(Math.random() * 3); // R excluded from possible spells
  let selectedChampSpellLetter;
  const selectedChampSpell = championData.spells[selectedChampSpellNumber];

  switch (selectedChampSpellNumber) {
    default:
      selectedChampSpellLetter = "A";
      break;
    case 1:
      selectedChampSpellLetter = "Z";
      break;
    case 2:
      selectedChampSpellLetter = "E";
      break;
    case 3:
      selectedChampSpellLetter = "R";
      break;
  }

  const spell = jQuery("#stuffgenerator_player_" + lane + "_mainspell");
  spell.css("background-image", `url('https://lol.ddragon.infinity54.fr/latest/img/spell/${selectedChampSpell.image.full}')`).attr("data-tippy-content", selectedChampSpell.name);
  spell[0]._tippy.setContent(selectedChampSpell.name);

  jQuery("#stuffgenerator_player_" + lane + "_mainspell_letter").text(selectedChampSpellLetter);
}

function resetStuffGenerator() {
  setTimeout(() => {
    // Champions
    jQuery("#stuffgenerator_player_top_champ").removeAttr("style");
    jQuery("#stuffgenerator_player_top_champ")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_champ").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_champ").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_champ")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_champ").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_champ").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_champ")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_champ").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_champ").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_champ")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_champ").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_champ").removeAttr("style");
    jQuery("#stuffgenerator_player_support_champ")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_champ").attr("data-tippy-content", "Indéterminé");

    // Runes
    jQuery("#stuffgenerator_player_top_rune1").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune2").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune3").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune4").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune5").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune6").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune7").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune8").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune9").removeAttr("style");
    jQuery("#stuffgenerator_player_top_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_rune9").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune1").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune2").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune3").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune4").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune5").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune6").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune7").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune8").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune9").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_rune9").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune1").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune2").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune3").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune4").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune5").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune6").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune7").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune8").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune9").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_rune9").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune1").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune2").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune3").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune4").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune5").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune6").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune7").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune8").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune9").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_rune9").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune1").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune2").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune3").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune4").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune5").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune6").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune7").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune8").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune9").removeAttr("style");
    jQuery("#stuffgenerator_player_support_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_rune9").attr("data-tippy-content", "Indéterminé");

    // Items
    jQuery("#stuffgenerator_player_top_item1").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item2").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item3").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item4").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item5").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item6").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item7").removeAttr("style");
    jQuery("#stuffgenerator_player_top_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_item7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item1").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item2").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item3").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item4").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item5").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item6").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item7").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_item7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item1").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item2").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item3").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item4").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item5").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item6").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item7").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_item7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item1").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item2").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item3").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item4").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item5").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item6").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item7").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_item7").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item1").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item2").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item3").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item4").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item5").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item6").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item7").removeAttr("style");
    jQuery("#stuffgenerator_player_support_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_item7").attr("data-tippy-content", "Indéterminé");

    // Summoners
    jQuery("#stuffgenerator_player_top_summoner1").removeAttr("style");
    jQuery("#stuffgenerator_player_top_summoner2").removeAttr("style");
    jQuery("#stuffgenerator_player_top_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_summoner2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_summoner1").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_summoner2").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_summoner2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_summoner1").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_summoner2").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_summoner2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_summoner1").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_summoner2").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_summoner2").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_summoner1").removeAttr("style");
    jQuery("#stuffgenerator_player_support_summoner2").removeAttr("style");
    jQuery("#stuffgenerator_player_support_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_summoner2").attr("data-tippy-content", "Indéterminé");

    // Main spell
    jQuery("#stuffgenerator_player_top_mainspell").removeAttr("style");
    jQuery("#stuffgenerator_player_top_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_top_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_top_mainspell_letter").html("?");
    jQuery("#stuffgenerator_player_jungle_mainspell").removeAttr("style");
    jQuery("#stuffgenerator_player_jungle_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_jungle_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_jungle_mainspell_letter").html("?");
    jQuery("#stuffgenerator_player_middle_mainspell").removeAttr("style");
    jQuery("#stuffgenerator_player_middle_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_middle_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_middle_mainspell_letter").html("?");
    jQuery("#stuffgenerator_player_adc_mainspell").removeAttr("style");
    jQuery("#stuffgenerator_player_adc_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_adc_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_adc_mainspell_letter").html("?");
    jQuery("#stuffgenerator_player_support_mainspell").removeAttr("style");
    jQuery("#stuffgenerator_player_support_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#stuffgenerator_player_support_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#stuffgenerator_player_support_mainspell_letter").html("?");

    // Global
    jQuery("#stuffgenerator_starttoolbuttontext").html("GÉNÉRER LES STUFFS");
    jQuery("#stuffgenerator_starttoolbuttoncontainer").addClass("stuffgenerator_starttoolbuttondisabled");
    enableStartToolButton();
  }, 500);
}

export { enableChampSelectorClickEvent, resetStuffGenerator }
