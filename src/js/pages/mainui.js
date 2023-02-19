import { playSound } from "../common/audio";
import { sndStartupFinished, sndPatcherFinished } from "../common/sounds";
import { sndPlayButtonHover, sndPlayButtonClick } from "../common/sounds";
import { sndMenuItemClick } from "../common/sounds";
import { movLeagueLogoIntro, movLeagueLogoLoop } from "../common/movies";
import { movLeagueLobbyButtonRelease, movLeagueLobbyButtonIntro, movLeagueLobbyButtonProgressBorderLoop } from "../common/movies";
import { movLeagueLobbyButtonProgressMainLoop } from "../common/movies";
import { movLeagueLobbyButtonHoverLoop } from "../common/movies";
import { initHomepage } from "./mainui/content/homepage";
import { initToolSelector } from "./mainui/content/toolselector";

const windowReduce = jQuery("#windowbutton_reduce");
const windowSettings = jQuery("#windowbutton_settings");
const windowClose = jQuery("#windowbutton_exit");
const leagueLogoPlayer = jQuery("#league_header_logo");
const leagueLobbyButton = jQuery("#league_header_lobbybutton");
const leagueLobbyButtonPlayer = jQuery("#league_header_lobbybuttonvideo");
const leagueLobbyButtonPlayerProgressOverlay = jQuery("#league_header_lobbybuttonvideo_updateprogressoverlay");
const leagueLobbyButtonPlayerBorderProgressOverlay = jQuery("#league_header_lobbybuttonvideo_updateprogressborderoverlay");
const leagueLobbyButtonText = jQuery("#league_header_lobbybuttontext");
const toolSelectorPage = jQuery("#toolselector");
const champListGenerator = jQuery("#champlistgenerator");
const stuffGenerator = jQuery("#stuffgenerator");

function initMainUi() {
  jQuery("#titlebar").remove();
  jQuery("#startup").fadeOut(500);
  playSound(sndStartupFinished);

  leagueLogoPlayer.attr("src", movLeagueLogoIntro);
  leagueLogoPlayer[0].play();

  leagueLobbyButtonPlayer.attr("src", movLeagueLobbyButtonIntro);
  leagueLobbyButtonPlayer[0].play();

  leagueLobbyButtonPlayerProgressOverlay.attr("src", movLeagueLobbyButtonProgressMainLoop);
  leagueLobbyButtonPlayerProgressOverlay[0].loop  = true;
  leagueLobbyButtonPlayerProgressOverlay[0].play();

  leagueLobbyButtonPlayerBorderProgressOverlay.attr("src", movLeagueLobbyButtonProgressBorderLoop);
  leagueLobbyButtonPlayerBorderProgressOverlay[0].loop  = true;
  leagueLobbyButtonPlayerBorderProgressOverlay[0].play();

  changeMenuArrowPosition();
  initHomepage();
  initToolSelector();

  window.appApi.readyForUpdate();
}

window.updaterAPI.noUpdateAvailable((event) => {
  playSound(sndPatcherFinished);
  leagueLobbyButtonPlayerProgressOverlay.fadeOut(500);
  leagueLobbyButtonPlayerBorderProgressOverlay.fadeOut(500);
  leagueLobbyButtonText.text("OUTILS");
  leagueLobbyButtonText.css("font-size", "14px");

  setTimeout(() => {
    leagueLobbyButtonPlayerBorderProgressOverlay.css("top", "0px");
    leagueLobbyButtonPlayerBorderProgressOverlay.css("left", "0px");
    leagueLobbyButtonPlayerBorderProgressOverlay.css("width", "146px");
    leagueLobbyButtonPlayerBorderProgressOverlay.attr("src", movLeagueLobbyButtonHoverLoop);
    leagueLobbyButtonPlayerBorderProgressOverlay[0].loop = true;
    leagueLobbyButtonPlayerBorderProgressOverlay[0].play();
    enableLobbyButtonMouseReact();
  }, 500);
});

window.updaterAPI.updateAvailable((event, args) => {
  leagueLobbyButtonText.text("TÉLÉCHARGEMENT");
  leagueLobbyButtonText.css("font-size", "11.5px");
});

window.updaterAPI.updateDownloading((event, args) => {
  jQuery("#league_header_lobbybuttonvideo_updateprogressoverlay").css("width", (122 * (args.percent / 100)) + "px");
});

window.updaterAPI.updateDownloaded((event) => {
  leagueLobbyButtonText.text("INSTALLATION");
  leagueLobbyButtonText.css("font-size", "14px");
});

document.getElementById("league_header_logo").addEventListener('ended', () => {
  leagueLogoPlayer.attr("src", movLeagueLogoLoop);
  leagueLogoPlayer[0].loop = true;
  leagueLogoPlayer[0].play();
}, false);

jQuery(".mainheader_menuitem").click((event) => {
  playSound(sndMenuItemClick);
  returnToMainUi();

  jQuery(".mainheader_menuitem_currentpage").removeClass("mainheader_menuitem_currentpage");
  jQuery("#" + event.target.id).addClass("mainheader_menuitem_currentpage");
  changeMenuArrowPosition();
});

function enableLobbyButtonMouseReact() {
  leagueLobbyButton.mouseover(() => {
    playSound(sndPlayButtonHover);
    leagueLobbyButtonPlayerBorderProgressOverlay.fadeIn(500);
  });

  leagueLobbyButton.mouseleave(() => {
    leagueLobbyButtonPlayerBorderProgressOverlay.fadeOut(500);
  });

  leagueLobbyButton.click(() => {
    leagueLobbyButtonPlayer.attr("src", movLeagueLobbyButtonRelease);
    leagueLobbyButtonPlayer[0].loop = false;
    leagueLobbyButtonPlayer[0].play();
    playSound(sndPlayButtonClick);
    disableLobbyButtonMouseReact();
    removeCurrentMenuItem();
    leagueLobbyButtonPlayerBorderProgressOverlay.fadeOut(500);
    jQuery("#homepage").fadeOut(500);
    jQuery("#toolselector").fadeIn(500);
  });
}

function disableLobbyButtonMouseReact() {
  leagueLobbyButton.off("click").off("mouseover").off("mouseleave");
}

function changeMenuArrowPosition() {
  const headerMenuCurrentPageArrow = jQuery("#mainheader_currentpagearrow");
  const currentPageItem = jQuery(".mainheader_menuitem_currentpage");
  const arrowPosition = currentPageItem.offset().left + (currentPageItem.width() / 2);
  headerMenuCurrentPageArrow.css("left", Math.round(arrowPosition) + "px");
}

function removeCurrentMenuItem() {
  const headerMenuCurrentPageArrow = jQuery("#mainheader_currentpagearrow");
  const currentPageItem = jQuery(".mainheader_menuitem_currentpage");
  currentPageItem.removeClass("mainheader_menuitem_currentpage");
  headerMenuCurrentPageArrow.hide();
}

function addCurrentMenuItem() {
  jQuery("#mainheader_menuitem_homepage").click();
}

function returnToMainUi() {
  if (toolSelectorPage.is(":visible")) {
    toolSelectorPage.fadeOut(500);
  }

  if (champListGenerator.is(":visible")) {
    champListGenerator.fadeOut(500);
  }

  if (stuffGenerator.is(":visible")) {
    stuffGenerator.fadeOut(500);
  }

  jQuery("#homepage").fadeIn(500);
  jQuery("#mainheader_currentpagearrow").show();
  enableLobbyButtonMouseReact();

  leagueLobbyButtonPlayer.attr("src", movLeagueLobbyButtonIntro);
  leagueLobbyButtonPlayer[0].play();
}

windowReduce.click(() => {
  window.windowAPI.windowReduce();
});

windowSettings.click(() => {
  jQuery("#settings").show();
});

windowClose.click(() => {
  window.windowAPI.windowClose();
});

export { initMainUi, addCurrentMenuItem, returnToMainUi };
