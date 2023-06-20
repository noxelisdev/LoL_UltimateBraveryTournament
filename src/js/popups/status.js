import { playSound } from "../common/audio";
import { sndStatusButtonOff, sndStatusButtonOn } from "../common/sounds";

const statusMessagesContainer = jQuery("#app_status_messages_container");

jQuery("#league_status_button").click(() => {
  playSound(sndStatusButtonOn);
  statusMessagesContainer.show();
});

statusMessagesContainer.click((event) => {
  playSound(sndStatusButtonOff);
  statusMessagesContainer.hide();
});
