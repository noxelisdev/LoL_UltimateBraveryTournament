import { playSound } from "../common/audio";
import { sndToolCommonReturnButtonClick, sndToolCommonReturnButtonHover } from "../common/sounds";
import { sndToolCommonExitButtonClick, sndToolCommonExitButtonHover } from "../common/sounds";
import { sndToolCommonStartToolButtonHover, sndToolCommonStartToolButtonClick } from "../common/sounds";
import { returnToHomepage } from "../app";

const returnButton = jQuery("#solostuffgenerator_header_returnbutton");
const exitButton = jQuery("#solostuffgenerator_exitbutton");
const startToolButtonContainer = jQuery("#solostuffgenerator_starttoolbuttoncontainer");
const champSelectorContainer = jQuery("#solostuffgenerator_champselectorcontainer");
const playerChamp = jQuery("#solostuffgenerator_player_champ");
let generationInProgress = false;

playerChamp.on("click", (event) => {
  champSelectorContainer.show();
  jQuery("#solostuffgenerator_champselector_search").focus();
});

returnButton.on("mouseenter", () => {
  playSound(sndToolCommonReturnButtonHover);
});

returnButton.on("click", () => {
  playSound(sndToolCommonReturnButtonClick);
  jQuery("#solostuffgenerator").fadeOut(500);
  jQuery("#toolselector").fadeIn(500);
  resetSoloStuffGenerator();
});

exitButton.on("mouseenter", () => {
  playSound(sndToolCommonExitButtonHover);
});

exitButton.on("click", () => {
  playSound(sndToolCommonExitButtonClick);
  returnToHomepage();
  resetSoloStuffGenerator();
});

function enableSoloChampSelectorClickEvent() {
  jQuery("#solostuffgenerator_champselector_content div").click((event) => {
    playerChamp.css("background-image", jQuery(event.target).css("background-image"));
    playerChamp.attr("data-tippy-content", jQuery(event.target).attr("data-tippy-content"));
    playerChamp[0]._tippy.setContent(jQuery(event.target).attr("data-tippy-content"));
    champSelectorContainer.hide();
    jQuery("#solostuffgenerator_champselector_search").val("").trigger("input");
    enableStartToolButton();
  });
}

jQuery("#solostuffgenerator_champselector_search").on("input", () => {
  if (jQuery("#solostuffgenerator_champselector_search").val() !== "") {
    jQuery("#solostuffgenerator_champselector_content div").each((index, item) => {
      if (jQuery(item).attr("data-tippy-content").toLowerCase().indexOf(jQuery("#solostuffgenerator_champselector_search").val().toLowerCase()) !== -1) {
        jQuery(item).show();
      } else {
        jQuery(item).hide();
      }
    })
  } else {
    jQuery("#solostuffgenerator_champselector_content div").each((index, item) => {
      jQuery(item).show();
    })
  }
});

function enableStartToolButton() {
  if (
    playerChamp.attr("data-tippy-content") !== "Indéterminé" &&
    jQuery("#solostuffgenerator_player_lane").attr("data-tippy-content") !== "Indéterminé" &&
    generationInProgress === false
  ) {
    if (startToolButtonContainer.hasClass("solostuffgenerator_starttoolbuttondisabled")) {
      startToolButtonContainer.removeClass("solostuffgenerator_starttoolbuttondisabled");
    }
  } else {
    if (!startToolButtonContainer.hasClass("solostuffgenerator_starttoolbuttondisabled")) {
      startToolButtonContainer.addClass("solostuffgenerator_starttoolbuttondisabled");
    }
  }
}

startToolButtonContainer.on("mouseenter", async () => {
  if (startToolButtonContainer.hasClass("solostuffgenerator_starttoolbuttondisabled") === false) {
    playSound(sndToolCommonStartToolButtonHover);
  }
});

startToolButtonContainer.on("click", async () => {
  if (startToolButtonContainer.hasClass("solostuffgenerator_starttoolbuttondisabled") === false) {
    const playerSelectedChampId = playerChamp.attr("data-tippy-content");
    const playerSelectedChampLane = jQuery("#solostuffgenerator_player_lane").attr("data-tippy-content").toLowerCase();

    generationInProgress = true;
    startToolButtonContainer.addClass("solostuffgenerator_starttoolbuttondisabled");
    playSound(sndToolCommonStartToolButtonClick);

    await generatePlayerRunes();
    await generatePlayerStatsRunes();
    await generatePlayerItems(playerSelectedChampLane, playerSelectedChampId);
    await generateSummoners(playerSelectedChampLane);
    await determineMainSpell(playerSelectedChampLane, playerSelectedChampId);

    generationInProgress = false;
    startToolButtonContainer.removeClass("solostuffgenerator_starttoolbuttondisabled");
    jQuery("#solostuffgenerator_starttoolbuttontext").text("NOUVEAU STUFF");
  }
});

async function generatePlayerRunes() {
  // Main runes
  const playerSelectedMainRune = window.leagueData.runes.main[Object.keys(window.leagueData.runes.main)[Math.floor(Math.random() * Object.keys(window.leagueData.runes.main).length)]];
  const playerSelectedMainRune1 = playerSelectedMainRune.slots[0].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[0].runes.length)];
  const playerSelectedMainRune2 = playerSelectedMainRune.slots[1].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[1].runes.length)];
  const playerSelectedMainRune3 = playerSelectedMainRune.slots[2].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[2].runes.length)];
  const playerSelectedMainRune4 = playerSelectedMainRune.slots[3].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[3].runes.length)];

  const rune1 = jQuery("#solostuffgenerator_player_rune1");
  rune1.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedMainRune1.icon}')`).attr("data-tippy-content", playerSelectedMainRune1.name);
  rune1[0]._tippy.setContent(playerSelectedMainRune1.name);

  const rune2 = jQuery("#solostuffgenerator_player_rune2");
  rune2.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedMainRune2.icon}')`).attr("data-tippy-content", playerSelectedMainRune2.name);
  rune2[0]._tippy.setContent(playerSelectedMainRune2.name);

  const rune3 = jQuery("#solostuffgenerator_player_rune3");
  rune3.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedMainRune3.icon}')`).attr("data-tippy-content", playerSelectedMainRune3.name);
  rune3[0]._tippy.setContent(playerSelectedMainRune3.name);

  const rune4 = jQuery("#solostuffgenerator_player_rune4");
  rune4.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedMainRune4.icon}')`).attr("data-tippy-content", playerSelectedMainRune4.name);
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

  const rune5 = jQuery("#solostuffgenerator_player_rune5");
  rune5.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedSecondaryRune1.icon}')`).attr("data-tippy-content", playerSelectedSecondaryRune1.name);
  rune5[0]._tippy.setContent(playerSelectedSecondaryRune1.name);

  const rune6 = jQuery("#solostuffgenerator_player_rune6");
  rune6.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedSecondaryRune2.icon}')`).attr("data-tippy-content", playerSelectedSecondaryRune2.name);
  rune6[0]._tippy.setContent(playerSelectedSecondaryRune2.name);
}

async function generatePlayerStatsRunes() {
  const playerSelectedStatsRune1 = window.leagueData.runes.stats[0].runes[Math.floor(Math.random() * window.leagueData.runes.stats[0].runes.length)];
  const playerSelectedStatsRune2 = window.leagueData.runes.stats[1].runes[Math.floor(Math.random() * window.leagueData.runes.stats[1].runes.length)];
  const playerSelectedStatsRune3 = window.leagueData.runes.stats[2].runes[Math.floor(Math.random() * window.leagueData.runes.stats[2].runes.length)];

  const rune7 = jQuery("#solostuffgenerator_player_rune7");
  rune7.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedStatsRune1.icon}')`).attr("data-tippy-content", playerSelectedStatsRune1.name);
  rune7[0]._tippy.setContent(playerSelectedStatsRune1.name);

  const rune8 = jQuery("#solostuffgenerator_player_rune8");
  rune8.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedStatsRune2.icon}')`).attr("data-tippy-content", playerSelectedStatsRune2.name);
  rune8[0]._tippy.setContent(playerSelectedStatsRune2.name);

  const rune9 = jQuery("#solostuffgenerator_player_rune9");
  rune9.css("background-image", `url('https://ddragon.infinity54.fr/lol/img/${playerSelectedStatsRune3.icon}')`).attr("data-tippy-content", playerSelectedStatsRune3.name);
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
    const item = jQuery("#solostuffgenerator_player_item" + (i + 1));

    item.css("background-image", `url('https://ddragon.infinity54.fr/lol/latest/img/item/${selectedItemData.image.full}')`);
    item.attr("data-tippy-content", selectedItemData.name);
    item.attr("data-type", selectedItemsTypes[i]);
    item[0]._tippy.setContent(selectedItemData.name);
  }
}

// Manual item replacement
jQuery(".solostuffgenerator_player_item").click(async (event) => {
  const clickedItem = jQuery(event.target);
  const clickedItemName = clickedItem.attr("data-tippy-content");
  const clickedItemType = clickedItem.attr("data-type");

  if (clickedItemName !== "" && clickedItemType !== "") {
    let replacementItem = { name: clickedItemName };

    // Jungle item
    if (clickedItemType === "jungle") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueData.items.jungle[Math.floor(Math.random() * window.leagueData.items.jungle.length)];
      }
    }

    // Support item
    if (clickedItemType === "support") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueData.items.support[Math.floor(Math.random() * window.leagueData.items.support.length)];
      }
    }

    // Boots
    if (clickedItemType === "boots") {
      while (replacementItem.name === clickedItemName) {
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

      while (selectedLegendaryItems.indexOf(replacementItem.name) !== -1) {
        replacementItem = window.leagueData.items.legendary[Math.floor(Math.random() * window.leagueData.items.legendary.length)];
      }
    }

    clickedItem.css("background-image", `url('https://ddragon.infinity54.fr/lol/latest/img/item/${replacementItem.image.full}')`).attr("data-tippy-content", replacementItem.name).attr("data-type", clickedItemType);
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
    const summoner = jQuery("#solostuffgenerator_player_summoner" + (i + 1));

    summoner.css("background-image", `url('https://ddragon.infinity54.fr/lol/latest/img/spell/${selectedSummonerData.image.full}')`).attr("data-tippy-content", selectedSummonerData.name);
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

  const spell = jQuery("#solostuffgenerator_player_mainspell");
  spell.css("background-image", `url('https://ddragon.infinity54.fr/lol/latest/img/spell/${selectedChampSpell.image.full}')`).attr("data-tippy-content", selectedChampSpell.name);
  spell[0]._tippy.setContent(selectedChampSpell.name);

  jQuery("#solostuffgenerator_player_mainspell_letter").text(selectedChampSpellLetter);
}

jQuery("#solostuffgenerator_playerlanecontainer .form_select").click((event) => {
  const formSelect = jQuery(event.target);
  const formSelectOptions = jQuery(event.target.parentNode.children[2]);

  if (formSelect.hasClass("active")) {
    formSelect.removeClass("active");
    formSelectOptions.hide();
  } else {
    formSelect.addClass("active");
    formSelectOptions.slideDown(175);
  }
});

jQuery("#solostuffgenerator_playerlanecontainer .form_select_option").click((event) => {
  const selectedOption = jQuery(event.target);
  const selectedOptionDisplay = jQuery(event.target.parentNode.parentNode.children[1].children[0]);
  const formSelect = jQuery(event.target.parentNode.parentNode.children[1]);
  const formSelectOptions = jQuery(event.target.parentNode.parentNode.children[2]);
  const laneDisplay = jQuery("#solostuffgenerator_player_lane");

  selectedOptionDisplay.html(selectedOption.html());
  selectedOptionDisplay.attr("data-value", selectedOption.data("value"));
  formSelectOptions.hide();
  formSelectOptions.find('div.form_select_option').removeClass("selected");
  formSelect.removeClass("active");
  selectedOption.addClass("selected");
  selectedOptionDisplay.trigger("change");

  laneDisplay.attr("data-tippy-content", selectedOption.html());
  laneDisplay[0]._tippy.setContent(selectedOption.html());

  laneDisplay.removeClass("top");
  laneDisplay.removeClass("jungle");
  laneDisplay.removeClass("middle");
  laneDisplay.removeClass("adc");
  laneDisplay.removeClass("support");
  laneDisplay.addClass(selectedOption.data("value"));

  enableStartToolButton();
});

function resetSoloStuffGenerator() {
  setTimeout(() => {
    // Champion
    playerChamp.removeAttr("style");
    playerChamp[0]._tippy.setContent("Indéterminé");
    playerChamp.attr("data-tippy-content", "Indéterminé");

    // Lane
    jQuery("#solostuffgenerator_player_lane").removeClass("top");
    jQuery("#solostuffgenerator_player_lane").removeClass("jungle");
    jQuery("#solostuffgenerator_player_lane").removeClass("middle");
    jQuery("#solostuffgenerator_player_lane").removeClass("adc");
    jQuery("#solostuffgenerator_player_lane").removeClass("support");
    jQuery("#solostuffgenerator_player_lane")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_lane").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_playerlane").attr("data-value", "unknown");
    jQuery("#solostuffgenerator_playerlane").html("Inconnu");
    jQuery("#form_select_optionsContainer .form_select_option").removeClass("selected");

    // Runes
    jQuery("#solostuffgenerator_player_rune1").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune2").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune3").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune4").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune5").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune6").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune7").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune8").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune9").removeAttr("style");
    jQuery("#solostuffgenerator_player_rune1")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune2")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune3")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune4")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune5")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune6")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune7")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune8")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune9")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_rune1").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune2").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune3").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune4").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune5").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune6").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune7").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune8").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_rune9").attr("data-tippy-content", "Indéterminé");

    // Items
    jQuery("#solostuffgenerator_player_item1").removeAttr("style");
    jQuery("#solostuffgenerator_player_item2").removeAttr("style");
    jQuery("#solostuffgenerator_player_item3").removeAttr("style");
    jQuery("#solostuffgenerator_player_item4").removeAttr("style");
    jQuery("#solostuffgenerator_player_item5").removeAttr("style");
    jQuery("#solostuffgenerator_player_item6").removeAttr("style");
    jQuery("#solostuffgenerator_player_item7").removeAttr("style");
    jQuery("#solostuffgenerator_player_item1")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item2")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item3")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item4")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item5")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item6")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item7")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_item1").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item2").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item3").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item4").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item5").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item6").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_item7").attr("data-tippy-content", "Indéterminé");

    // Summoners
    jQuery("#solostuffgenerator_player_summoner1").removeAttr("style");
    jQuery("#solostuffgenerator_player_summoner2").removeAttr("style");
    jQuery("#solostuffgenerator_player_summoner1")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_summoner2")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_summoner1").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_summoner2").attr("data-tippy-content", "Indéterminé");

    // Main spell
    jQuery("#solostuffgenerator_player_mainspell").removeAttr("style");
    jQuery("#solostuffgenerator_player_mainspell")[0]._tippy.setContent("Indéterminé");
    jQuery("#solostuffgenerator_player_mainspell").attr("data-tippy-content", "Indéterminé");
    jQuery("#solostuffgenerator_player_mainspell_letter").html("?");

    // Global
    jQuery("#solostuffgenerator_starttoolbuttontext").html("GÉNÉRER LE STUFF");
    jQuery("#solostuffgenerator_starttoolbuttoncontainer").addClass("solostuffgenerator_starttoolbuttondisabled");
    enableStartToolButton();
  }, 500);
}

export { enableSoloChampSelectorClickEvent, resetSoloStuffGenerator }
