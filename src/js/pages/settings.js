import { playSound } from "../common/audio";
import { sndSettingsCloseButtonClick, sndSettingsCheckboxClick } from "../common/sounds";

jQuery("#settings_close").click(() => {
  window.appApi.saveSettings(JSON.stringify(window.appSettings));
  playSound(sndSettingsCloseButtonClick);
  jQuery("#settings").hide();
});

jQuery(".settings_menu_item").click((event) => {
  const clickedElement = jQuery(event.currentTarget);
  jQuery(".settings_menu_item").removeClass("settings_menu_active");
  clickedElement.addClass("settings_menu_active");
  jQuery("#settings_items div").hide();
  jQuery("#" + clickedElement.attr("data-itemcontainer")).show();
});

jQuery("#settings_audio_enablesound_input").change(function() {
  window.appSettings.soundEnabled = this.checked;
  playSound(sndSettingsCheckboxClick);
});
