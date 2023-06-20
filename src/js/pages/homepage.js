import { playSound } from "../common/audio";
import { playMovie } from "../common/video";
import { sndMenuItemClick } from "../common/sounds";
import { movHomepageBackground } from "../common/movies";

const backgroundPlayer = jQuery("#homepage_background");

function initHomepage() {
  backgroundPlayer.attr("src", movHomepageBackground);
  backgroundPlayer[0].loop  = true;
  playMovie(backgroundPlayer[0]);
}

jQuery(".homepage_tab").click((event) => {
  playSound(sndMenuItemClick);
  jQuery(".homepage_currenttab").removeClass("homepage_currenttab");
  jQuery("#" + event.target.id).addClass("homepage_currenttab");
});

export { initHomepage };
