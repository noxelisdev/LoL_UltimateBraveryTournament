import { playSound } from "../../../common/audio";
import { movHomepageBackground } from "../../../common/movies";
import { sndMenuItemClick } from "../../../common/sounds";
const backgroundPlayer = jQuery("#homepage_background");

function initHomepage() {
  backgroundPlayer.attr("src", movHomepageBackground);
  backgroundPlayer[0].loop  = true;
  backgroundPlayer[0].play();
}

jQuery(".homepage_tab").click((event) => {
  playSound(sndMenuItemClick);
  jQuery(".homepage_currenttab").removeClass("homepage_currenttab");
  jQuery("#" + event.target.id).addClass("homepage_currenttab");
});

export { initHomepage };
