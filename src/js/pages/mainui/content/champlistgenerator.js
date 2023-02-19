import tippy from "tippy.js";
import { playSound } from "../../../common/audio";
import { sndToolCommonReturnButtonClick, sndToolCommonReturnButtonHover } from "../../../common/sounds";
import { sndToolCommonExitButtonClick, sndToolCommonExitButtonHover } from "../../../common/sounds";
import { sndToolCommonStartToolButtonHover, sndToolCommonStartToolButtonClick } from "../../../common/sounds";
import { returnToMainUi } from "../../mainui";

const toolOptions_ChampionsNumber = jQuery("#champlistgenerator_tooloptions_numberofchampions");
const returnButton = jQuery("#champlistgenerator_header_returnbutton");
const exitButton = jQuery("#champlistgenerator_exitbutton");
const startToolButtonContainer = jQuery("#champlistgenerator_starttoolbuttoncontainer");

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
  returnToMainUi();
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
    const championsList = window.leagueOfLegends.champions;
    const championsListKeys = Object.keys(championsList);
    let selectedChampions = [];

    playSound(sndToolCommonStartToolButtonClick);
    startToolButtonContainer.addClass("champlistgenerator_starttoolbuttondisabled");
    jQuery("#champlistgenerator_generatedchamplist").empty();
    jQuery("#champlistgenerator_starttoolbuttontext").text("NOUVELLE LISTE");

    while (selectedChampions.length < toolOptions_ChampionsNumber.val()) {
      const newSelectedChampion = Math.floor(Math.random() * championsListKeys.length);

      if (selectedChampions.includes(newSelectedChampion) === false) {
        const selectedChampion = championsList[championsListKeys[newSelectedChampion]];

        if (selectedChampion.id === "Fiddlesticks") {
          selectedChampion.id = "FiddleSticks";
        }

        await window.ddragonApi.getImageB64FromUrl({
          url: "https://leaguestats.infinity54.fr/riot/lol/img/champion/tiles/" + selectedChampion.id + "_0.jpg",
          mime: "image/png"
        })
          .then((image) => {
            selectedChampions.push(newSelectedChampion);

            jQuery("<div>", {
              id: "champlistgenerator_generatedchamp_" + selectedChampion.id.toLowerCase()
            })
              .css("background-image", "url('" + image + "')")
              .appendTo("#champlistgenerator_generatedchamplist")
              .attr("data-tippy-content", selectedChampion.name);
            tippy("#champlistgenerator_generatedchamp_" + selectedChampion.id.toLowerCase(), { theme: 'lol', arrow: true });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }

    startToolButtonContainer.removeClass("champlistgenerator_starttoolbuttondisabled");
  }
})
