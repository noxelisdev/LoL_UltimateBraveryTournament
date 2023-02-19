import { getAppVersion, getLeagueCurrentVersion, initChampionsData, initRunesData, initItemsData, initSummonersData } from "./pages/startup";

window.leagueOfLegends = {
  champions: null,
  runes: null,
  statRunes: {
    slots: [
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
  items: {
    boots: null,
    jungle: null,
    support: null,
    mythic: null,
    legendary: null
  },
  summoners: null
}

window.appSettings = {
  soundEnabled: true
}

window.appApi.appMainFormIsReady((event) => {
  // Timeout pour permettre à la fenêtre de charger avant de démarrer le chargement de l'app
  setTimeout(() => {
    getAppVersion();
    getLeagueCurrentVersion();
    initChampionsData();
    initRunesData();
    initItemsData();
    initSummonersData();
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
