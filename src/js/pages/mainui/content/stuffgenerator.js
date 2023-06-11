import { playSound } from "../../../common/audio";
import { sndToolCommonReturnButtonClick, sndToolCommonReturnButtonHover } from "../../../common/sounds";
import { sndToolCommonExitButtonClick, sndToolCommonExitButtonHover } from "../../../common/sounds";
import { sndToolCommonStartToolButtonHover, sndToolCommonStartToolButtonClick } from "../../../common/sounds";
import { returnToMainUi } from "../../mainui";

const returnButton = jQuery("#stuffgenerator_header_returnbutton");
const exitButton = jQuery("#stuffgenerator_exitbutton");
const startToolButtonContainer = jQuery("#stuffgenerator_starttoolbuttoncontainer");
const champSelectorContainer = jQuery("#stuffgenerator_champselectorcontainer");
let currentChampSelection = null;
let generationInProgress = false;

jQuery(".stuffgenerator_player_champpict").on("click", (event) => {
  currentChampSelection = jQuery(event.target).attr('id');
  champSelectorContainer.show();
});

returnButton.on("mouseenter", () => {
  playSound(sndToolCommonReturnButtonHover);
});

returnButton.on("click", () => {
  playSound(sndToolCommonReturnButtonClick);
  jQuery("#stuffgenerator").fadeOut(500);
  jQuery("#toolselector").fadeIn(500);
});

exitButton.on("mouseenter", () => {
  playSound(sndToolCommonExitButtonHover);
});

exitButton.on("click", () => {
  playSound(sndToolCommonExitButtonClick);
  returnToMainUi();
});

function enableChampSelectorClickEvent() {
  jQuery("#stuffgenerator_champselector_content div").click((event) => {
    const currentChampSelectionElement = jQuery("#" + currentChampSelection);
    currentChampSelectionElement.css("background-image", jQuery(event.target).css("background-image"));
    currentChampSelectionElement.attr("data-tippy-content", jQuery(event.target).attr("data-tippy-content"));
    currentChampSelectionElement.attr("data-value", jQuery(event.target).attr("data-value"));
    currentChampSelectionElement[0]._tippy.setContent(jQuery(event.target).attr("data-tippy-content"));
    currentChampSelection = null;
    champSelectorContainer.hide();
    enableStartToolButton();
  });
}

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
  const playerSelectedMainRuneNumber = Math.floor(Math.random() * window.leagueOfLegends.runes.length);
  const playerSelectedMainRune = window.leagueOfLegends.runes[playerSelectedMainRuneNumber];
  const playerSelectedMainRune1 = playerSelectedMainRune.slots[0].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[0].runes.length)];
  const playerSelectedMainRune2 = playerSelectedMainRune.slots[1].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[1].runes.length)];
  const playerSelectedMainRune3 = playerSelectedMainRune.slots[2].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[2].runes.length)];
  const playerSelectedMainRune4 = playerSelectedMainRune.slots[3].runes[Math.floor(Math.random() * playerSelectedMainRune.slots[3].runes.length)];

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedMainRune1.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune1");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedMainRune1.name);
      rune[0]._tippy.setContent(playerSelectedMainRune1.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedMainRune2.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune2");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedMainRune2.name);
      rune[0]._tippy.setContent(playerSelectedMainRune2.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedMainRune3.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune3");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedMainRune3.name);
      rune[0]._tippy.setContent(playerSelectedMainRune3.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedMainRune4.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune4");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedMainRune4.name);
      rune[0]._tippy.setContent(playerSelectedMainRune4.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  // Secondary runes
  let playerSelectedSecondaryRuneNumber = Math.floor(Math.random() * window.leagueOfLegends.runes.length);
  while (playerSelectedSecondaryRuneNumber === playerSelectedMainRuneNumber) {
    playerSelectedSecondaryRuneNumber = Math.floor(Math.random() * window.leagueOfLegends.runes.length);
  }
  const playerSelectedSecondaryRune = window.leagueOfLegends.runes[playerSelectedSecondaryRuneNumber];
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

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedSecondaryRune1.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune5");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedSecondaryRune1.name);
      rune[0]._tippy.setContent(playerSelectedSecondaryRune1.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedSecondaryRune2.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune6");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedSecondaryRune2.name);
      rune[0]._tippy.setContent(playerSelectedSecondaryRune2.name);
    })
    .catch((error) => {
      alert(error.message);
    });
}

async function generatePlayerStatsRunes(lane) {
  const playerSelectedStatsRune1 = window.leagueOfLegends.statRunes.slots[0].runes[Math.floor(Math.random() * window.leagueOfLegends.statRunes.slots[0].runes.length)];
  const playerSelectedStatsRune2 = window.leagueOfLegends.statRunes.slots[1].runes[Math.floor(Math.random() * window.leagueOfLegends.statRunes.slots[1].runes.length)];
  const playerSelectedStatsRune3 = window.leagueOfLegends.statRunes.slots[2].runes[Math.floor(Math.random() * window.leagueOfLegends.statRunes.slots[2].runes.length)];

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedStatsRune1.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune7");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedStatsRune1.name);
      rune[0]._tippy.setContent(playerSelectedStatsRune1.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedStatsRune2.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune8");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedStatsRune2.name);
      rune[0]._tippy.setContent(playerSelectedStatsRune2.name);
    })
    .catch((error) => {
      alert(error.message);
    });

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/img/" + playerSelectedStatsRune3.icon,
    mime: "image/png"
  })
    .then((image) => {
      const rune = jQuery("#stuffgenerator_player_" + lane + "_rune9");
      rune.css("background-image", "url('" + image + "')").attr("data-tippy-content", playerSelectedStatsRune3.name);
      rune[0]._tippy.setContent(playerSelectedStatsRune3.name);
    })
    .catch((error) => {
      alert(error.message);
    });
}

async function generatePlayerItems(lane, selectedChampId) {
  let numberOfLegendaryCount = 4;
  let selectedItems = [];
  let selectedItemsTypes = [];

  // Jungle item
  if (lane === "jungle") {
    selectedItems.push(window.leagueOfLegends.items.jungle[Math.floor(Math.random() * window.leagueOfLegends.items.jungle.length)]);
    selectedItemsTypes.push("jungle");
  }

  // Support item
  if (lane === "support") {
    numberOfLegendaryCount--;
    selectedItems.push(window.leagueOfLegends.items.support[Math.floor(Math.random() * window.leagueOfLegends.items.support.length)]);
    selectedItemsTypes.push("support");
  }

  // Boots
  if (selectedChampId !== "Cassiopeia") {
    selectedItems.push(window.leagueOfLegends.items.boots[Math.floor(Math.random() * window.leagueOfLegends.items.boots.length)]);
    selectedItemsTypes.push("boots");
  } else {
    numberOfLegendaryCount++;
  }

  // Mythic
  selectedItems.push(window.leagueOfLegends.items.mythic[Math.floor(Math.random() * window.leagueOfLegends.items.mythic.length)]);
  selectedItemsTypes.push("mythic");

  // Legendary items
  let legendarySelectedItems = [];

  while (legendarySelectedItems.length < numberOfLegendaryCount) {
    const selectedLegendaryItem = window.leagueOfLegends.items.legendary[Math.floor(Math.random() * window.leagueOfLegends.items.legendary.length)];

    if (legendarySelectedItems.indexOf(selectedLegendaryItem.name) === -1) {
      legendarySelectedItems.push(selectedLegendaryItem.name);
      selectedItems.push(selectedLegendaryItem);
      selectedItemsTypes.push("legendary");
    }
  }

  for (let i = 0; i < selectedItems.length; i++) {
    const selectedItemData = selectedItems[i];

    await window.ddragonApi.getImageB64FromUrl({
      url: "https://leaguestats.infinity54.fr/riot/lol/latest/img/item/" + selectedItemData.image.full,
      mime: "image/png"
    })
      .then((image) => {
        const item = jQuery("#stuffgenerator_player_" + lane + "_item" + (i + 1));
        item.css("background-image", "url('" + image + "')").attr("data-tippy-content", selectedItemData.name).attr("data-type", selectedItemsTypes[i]);
        item[0]._tippy.setContent(selectedItemData.name);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

// Manual item replacement
jQuery(".stuffgenerator_player_item").click(async (event) => {
  const clickedItem = jQuery(event.target);
  const clickedItemName = clickedItem.attr("data-tippy-content");
  const clickedItemType = clickedItem.attr("data-type");

  if (clickedItemName !== "" && clickedItemType !== "") {
    let replacementItem = { name: clickedItemName };

    // Jungle item
    if (clickedItemType === "jungle") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueOfLegends.items.jungle[Math.floor(Math.random() * window.leagueOfLegends.items.jungle.length)];
      }
    }

    // Support item
    if (clickedItemType === "support") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueOfLegends.items.support[Math.floor(Math.random() * window.leagueOfLegends.items.support.length)];
      }
    }

    // Boots
    if (clickedItemType === "boots") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueOfLegends.items.boots[Math.floor(Math.random() * window.leagueOfLegends.items.boots.length)];
      }
    }

    // Mythic item
    if (clickedItemType === "mythic") {
      while (replacementItem.name === clickedItemName) {
        replacementItem = window.leagueOfLegends.items.mythic[Math.floor(Math.random() * window.leagueOfLegends.items.mythic.length)];
      }
    }

    // Legendary item
    if (clickedItemType === "legendary") {
      const clickedItemParent = clickedItem.parent();
      const legendaryItemsElements = clickedItemParent.children();
      let selectedLegendaryItems = [];

      for (let i = 0; i < legendaryItemsElements.length; i++) {
        const element = jQuery(legendaryItemsElements[i]);

        if (element.hasClass("stuffgenerator_player_item") && element.attr("data-type") === "legendary") {
          selectedLegendaryItems.push(jQuery(legendaryItemsElements[i]).attr("data-tippy-content"));
        }
      }

      while (selectedLegendaryItems.indexOf(replacementItem.name) !== -1) {
        replacementItem = window.leagueOfLegends.items.legendary[Math.floor(Math.random() * window.leagueOfLegends.items.legendary.length)];
      }
    }

    await window.ddragonApi.getImageB64FromUrl({
      url: "https://leaguestats.infinity54.fr/riot/lol/latest/img/item/" + replacementItem.image.full,
      mime: "image/png"
    })
      .then((image) => {
        clickedItem.css("background-image", "url('" + image + "')").attr("data-tippy-content", replacementItem.name).attr("data-type", clickedItemType);
        clickedItem[0]._tippy.setContent(replacementItem.name);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
})

async function generateSummoners(lane) {
  let selectedSummoners = [];
  let selectedSummonersNames = [];

  // Jungle Smite
  if (lane === "jungle") {
    for (const summonerId in window.leagueOfLegends.summoners) {
      const summonerData = window.leagueOfLegends.summoners[summonerId];

      if (summonerData.name === "Châtiment") {
        selectedSummoners.push(summonerData);
        selectedSummonersNames.push(summonerData.name);
      }
    }
  }

  while (selectedSummoners.length < 2) {
    const summonerData = window.leagueOfLegends.summoners[Math.floor(Math.random() * window.leagueOfLegends.summoners.length)];

    if (summonerData.name !== "Châtiment" && selectedSummonersNames.indexOf(summonerData.name) === -1) {
      selectedSummoners.push(summonerData);
      selectedSummonersNames.push(summonerData.name);
    }
  }

  for (let i = 0; i < selectedSummoners.length; i++) {
    const selectedSummonerData = selectedSummoners[i];

    await window.ddragonApi.getImageB64FromUrl({
      url: "https://leaguestats.infinity54.fr/riot/lol/extras/summonerspells/" + selectedSummonerData.image.full,
      mime: "image/png"
    })
      .then((image) => {
        const summoner = jQuery("#stuffgenerator_player_" + lane + "_summoner" + (i + 1));
        summoner.css("background-image", "url('" + image + "')").attr("data-tippy-content", selectedSummonerData.name);
        summoner[0]._tippy.setContent(selectedSummonerData.name);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

async function determineMainSpell(lane, selectedChampId) {
  const championData = window.leagueOfLegends.champions[selectedChampId];
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

  await window.ddragonApi.getImageB64FromUrl({
    url: "https://leaguestats.infinity54.fr/riot/lol/latest/img/spell/" + selectedChampSpell.image.full,
    mime: "image/png"
  })
    .then((image) => {
      const spell = jQuery("#stuffgenerator_player_" + lane + "_mainspell");
      spell.css("background-image", "url('" + image + "')").attr("data-tippy-content", selectedChampSpell.name);
      spell[0]._tippy.setContent(selectedChampSpell.name);

      jQuery("#stuffgenerator_player_" + lane + "_mainspell_letter").text(selectedChampSpellLetter);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export { enableChampSelectorClickEvent }
