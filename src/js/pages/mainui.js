import { playSound } from "../common/audio";
import { sndStartupFinished } from "../common/sounds";
import { sndPlayButtonHover, sndPlayButtonClick } from "../common/sounds";
import { sndMenuItemClick } from "../common/sounds";
import { movLeagueLogoIntro, movLeagueLogoLoop, movLeagueLobbyButtonIntro } from "../common/movies";
import { movLeagueLobbyButtonRelease, movLeagueLobbyButtonHoverLoop } from "../common/movies";
import { initHomepage } from "./mainui/content/homepage";
import { initToolSelector } from "./mainui/content/toolselector";

const windowReduce = jQuery("#windowbutton_reduce");
const windowSettings = jQuery("#windowbutton_settings");
const windowClose = jQuery("#windowbutton_exit");
const leagueLogoPlayer = jQuery("#league_header_logo");
const leagueLobbyButton = jQuery("#league_header_lobbybutton");
const leagueLobbyButtonPlayer = jQuery("#league_header_lobbybuttonvideo");
const leagueLobbyButtonPlayerBorderProgressOverlay = jQuery("#league_header_lobbybuttonvideo_updateprogressborderoverlay");
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

  changeMenuArrowPosition();
  initHomepage();
  initToolSelector();
  enableLobbyButtonMouseReact();
}

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
