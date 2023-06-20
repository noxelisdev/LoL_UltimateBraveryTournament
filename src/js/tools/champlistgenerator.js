import tippy from "tippy.js";
import { playSound } from "../common/audio";
import { sndToolCommonReturnButtonClick, sndToolCommonReturnButtonHover } from "../common/sounds";
import { sndToolCommonExitButtonClick, sndToolCommonExitButtonHover } from "../common/sounds";
import { sndToolCommonStartToolButtonHover, sndToolCommonStartToolButtonClick } from "../common/sounds";
import { returnToHomepage } from "../app";

const toolOptions_ChampionsNumber = jQuery("#champlistgenerator_tooloptions_numberofchampions");
const returnButton = jQuery("#champlistgenerator_header_returnbutton");
const exitButton = jQuery("#champlistgenerator_exitbutton");
const startToolButtonContainer = jQuery("#champlistgenerator_starttoolbuttoncontainer");

function initChampListGenerator() {
  toolOptions_ChampionsNumber.attr("max", Object.keys(window.leagueData.champions).length);
  toolOptions_ChampionsNumber.attr("value", 20);
  toolOptions_ChampionsNumber.trigger("input");
}

toolOptions_ChampionsNumber.on("input", () => {
  const selectedNumber = toolOptions_ChampionsNumber.val();
  jQuery("#champlistgenerator_tooloptions_numberofchampions_label").text("Nombre de champions à générer : " + selectedNumber);
  enableStartToolButton(selectedNumber);
});

returnButton.on("mouseenter", () => {
  playSound(sndToolCommonReturnButtonHover);
});

returnButton.on("click", () => {
  playSound(sndToolCommonReturnButtonClick);
  jQuery("#champlistgenerator").fadeOut(500);
  jQuery("#toolselector").fadeIn(500);
});

exitButton.on("mouseenter", () => {
  playSound(sndToolCommonExitButtonHover);
});

exitButton.on("click", () => {
  playSound(sndToolCommonExitButtonClick);
  returnToHomepage();
});

function enableStartToolButton(selectedNumberOfChampions) {
  if (selectedNumberOfChampions > 0) {
    if (startToolButtonContainer.hasClass("champlistgenerator_starttoolbuttondisabled")) {
      startToolButtonContainer.removeClass("champlistgenerator_starttoolbuttondisabled");
    }
  } else {
    if (startToolButtonContainer.hasClass("champlistgenerator_starttoolbuttondisabled") === false) {
      startToolButtonContainer.addClass("champlistgenerator_starttoolbuttondisabled");
    }
  }
}

startToolButtonContainer.on("mouseenter", () => {
  if (startToolButtonContainer.hasClass("champlistgenerator_starttoolbuttondisabled") === false) {
    playSound(sndToolCommonStartToolButtonHover);
  }
})

startToolButtonContainer.on("click", async () => {
  if (startToolButtonContainer.hasClass("champlistgenerator_starttoolbuttondisabled") === false) {
    let selectedChampions = [];

    playSound(sndToolCommonStartToolButtonClick);
    startToolButtonContainer.addClass("champlistgenerator_starttoolbuttondisabled");
    jQuery("#champlistgenerator_generatedchamplist").empty();
    jQuery("#champlistgenerator_starttoolbuttontext").text("NOUVELLE LISTE");

    while (selectedChampions.length < toolOptions_ChampionsNumber.val()) {
      const newSelectedChampion = Object.keys(window.leagueData.champions)[Math.floor(Math.random() * Object.keys(window.leagueData.champions).length)];

      if (selectedChampions.includes(newSelectedChampion) === false) {
        selectedChampions.push(newSelectedChampion);

        jQuery("<div>", {
          id: "champlistgenerator_generatedchamp_" + window.leagueData.champions[newSelectedChampion].id.toLowerCase()
        })
            .css("background-image", `url('${window.leagueImages.champions.tiles[window.leagueData.champions[newSelectedChampion].id + "_0.jpg"]}')`)
            .appendTo("#champlistgenerator_generatedchamplist")
            .attr("data-tippy-content", newSelectedChampion);

        tippy("#champlistgenerator_generatedchamp_" + window.leagueData.champions[newSelectedChampion].id.toLowerCase(), { theme: 'lol', arrow: true });
      }
    }

    startToolButtonContainer.removeClass("champlistgenerator_starttoolbuttondisabled");
  }
})

export { initChampListGenerator }
