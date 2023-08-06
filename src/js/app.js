import { enableAppInitialization } from "./startup";
import { playSound } from "./common/audio";
import { playMovie } from "./common/video";
import { sndPlayButtonHover, sndPlayButtonClick } from "./common/sounds";
import { sndMenuItemClick } from "./common/sounds";
import { movLeagueLogoLoop, movLeagueLobbyButtonIntro, movLeagueLobbyButtonHoverLoop } from "./common/movies";
import { movLeagueLobbyButtonRelease } from "./common/movies";
import { initHomepage } from "./pages/homepage";
import { initToolSelector } from "./pages/toolselector";
import { resetChampListGenerator } from "./tools/champlistgenerator";
import { resetSoloStuffGenerator } from "./tools/solostuffgenerator";
import { resetStuffGenerator } from "./tools/stuffgenerator";

const startupText = jQuery("#startup_progresstext");
const startupProgress = jQuery("#startup_progress");
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
const soloStuffGenerator = jQuery("#solostuffgenerator");

window.appSettings = {
  soundEnabled: true
}

window.leagueData = {
  champions: {},
  runes: {
    main: {},
    stats: [
      {
        runes: [
          {
            key: "AdaptiveForce",
            name: "Force adaptative",
            icon: "perk-images/StatMods/StatModsAdaptiveForceIcon.png"
          },
          {
            key: "AttackSpeed",
            name: "Vitesse d'attaque",
            icon: "perk-images/StatMods/StatModsAttackSpeedIcon.png"
          },
          {
            key: "CDRScaling",
            name: "Accélération de compétences",
            icon: "perk-images/StatMods/StatModsCDRScalingIcon.png"
          }
        ]
      },
      {
        runes: [
          {
            key: "AdaptiveForce",
            name: "Force adaptative",
            icon: "perk-images/StatMods/StatModsAdaptiveForceIcon.png"
          },
          {
            key: "Armor",
            name: "Armure",
            icon: "perk-images/StatMods/StatModsArmorIcon.png"
          },
          {
            key: "MagicRes",
            name: "Résistance magique",
            icon: "perk-images/StatMods/StatModsMagicResIcon.png"
          }
        ]
      },
      {
        runes: [
          {
            key: "HealthScaling",
            name: "Points de vie",
            icon: "perk-images/StatMods/StatModsHealthScalingIcon.png"
          },
          {
            key: "Armor",
            name: "Armure",
            icon: "perk-images/StatMods/StatModsArmorIcon.png"
          },
          {
            key: "MagicRes",
            name: "Résistance magique",
            icon: "perk-images/StatMods/StatModsMagicResIcon.png"
          }
        ]
      }
    ]
  },
  items: {},
  summoners: {}
}

window.appApi.appMainFormIsReady((event) => {
  // Timeout pour permettre à la fenêtre de charger avant de démarrer le chargement de l'app
  setTimeout(() => {
    window.appApi.readyForUpdate();
  }, 1000);
});

window.appApi.noSettingsFile((event) => {
  window.appApi.saveSettings(JSON.stringify(window.appSettings));
});

window.appApi.updateSettings((event, args) => {
  window.appSettings = JSON.parse(args);

  if (!window.appSettings.soundEnabled) {
    jQuery("#settings_audio_enablesound_input").removeAttr("checked");
  }
});

window.updaterAPI.noUpdateAvailable((event) => {
  startupText.text("CHARGEMENT...");
  enableAppInitialization();
  initAppUi();
});

window.updaterAPI.updateAvailable((event, args) => {
  startupText.text("TÉLÉCHARGEMENT DE LA MISE À JOUR...");
});

window.updaterAPI.updateDownloading((event, args) => {
  startupProgress.css("width", args.percent + "%");
});

window.updaterAPI.updateDownloaded((event) => {
  startupText.text("PRÉPARATION DE LA MISE À JOUR...");
});

function initAppUi() {
  leagueLogoPlayer.attr("src", movLeagueLogoLoop);
  leagueLogoPlayer[0].loop = true;
  playMovie(leagueLogoPlayer[0]);

  leagueLobbyButtonPlayer.attr("src", movLeagueLobbyButtonIntro);
  playMovie(leagueLobbyButtonPlayer[0]);

  leagueLobbyButtonPlayerBorderProgressOverlay.attr("src", movLeagueLobbyButtonHoverLoop);
  leagueLobbyButtonPlayerBorderProgressOverlay[0].loop = true;
  playMovie(leagueLobbyButtonPlayerBorderProgressOverlay[0]);
  leagueLobbyButtonPlayerBorderProgressOverlay.hide();

  changeMenuArrowPosition();
  enableLobbyButtonMouseReact();
  initHomepage();
  initToolSelector();
}

jQuery(".mainheader_menuitem").click((event) => {
  playSound(sndMenuItemClick);
  returnToHomepage();

  jQuery(".mainheader_menuitem_currentpage").removeClass("mainheader_menuitem_currentpage");
  jQuery("#" + event.target.id).addClass("mainheader_menuitem_currentpage");
  changeMenuArrowPosition();
});

function enableLobbyButtonMouseReact() {
  leagueLobbyButton.mouseover(() => {
    playSound(sndPlayButtonHover);
    leagueLobbyButtonPlayerBorderProgressOverlay.fadeIn(250);
    leagueLobbyButtonPlayerBorderProgressOverlay[0].play();
    playMovie(leagueLobbyButtonPlayerBorderProgressOverlay[0]);
  });

  leagueLobbyButton.mouseleave(() => {
    leagueLobbyButtonPlayerBorderProgressOverlay.fadeOut(250);
  });

  leagueLobbyButton.click(() => {
    leagueLobbyButtonPlayer.attr("src", movLeagueLobbyButtonRelease);
    leagueLobbyButtonPlayer[0].loop = false;
    playMovie(leagueLobbyButtonPlayer[0]);
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

function returnToHomepage() {
  if (toolSelectorPage.is(":visible")) {
    toolSelectorPage.fadeOut(500);
  }

  if (champListGenerator.is(":visible")) {
    champListGenerator.fadeOut(500);
    resetChampListGenerator();
  }

  if (stuffGenerator.is(":visible")) {
    stuffGenerator.fadeOut(500);
    resetSoloStuffGenerator();
  }

  if (soloStuffGenerator.is(":visible")) {
    soloStuffGenerator.fadeOut(500);
    resetStuffGenerator();
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

export { initAppUi, addCurrentMenuItem, returnToHomepage };
