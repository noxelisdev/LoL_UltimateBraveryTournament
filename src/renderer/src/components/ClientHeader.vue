<script setup>
import { onMounted } from 'vue'
import { playSound } from '../common/audio'
import { playMovie } from '../common/video'
import sndPlayButtonHover from '../assets/snd/ui/lobby_button/lobbybutton_hover.ogg'
import sndPlayButtonClick from '../assets/snd/ui/lobby_button/lobbybutton_click.ogg'
import sndMenuItemClick from '../assets/snd/ui/menuitem_click.ogg'
import movLeagueLogoLoop from '../assets/mov/league_logo/league-logo-loop-idle.webm'
import movLeagueLobbyButtonIntro from '../assets/mov/lobby_button/lobby-button-intro.webm'
import movLeagueLobbyButtonHoverLoop from '../assets/mov/lobby_button/lobby-button-hover-loop.webm'
import movLeagueLobbyButtonRelease from '../assets/mov/lobby_button/lobby-button-release.webm'

onMounted(() => {
  playMovie(document.getElementById('league_header_logo'), movLeagueLogoLoop, true)
  playMovie(document.getElementById('league_header_lobbybuttonvideo'), movLeagueLobbyButtonIntro)
  playMovie(
    document.getElementById('league_header_lobbybuttonvideo_updateprogressborderoverlay'),
    movLeagueLobbyButtonHoverLoop,
    true
  )

  document.getElementById(
    'league_header_lobbybuttonvideo_updateprogressborderoverlay'
  ).style.display = 'none'
  document.getElementById('mainheader_currentpagearrow').style.display = 'block'
  document.getElementById('mainheader_currentpagearrow').style.left =
    `${document.getElementsByClassName('mainheader_menuitem_currentpage')[0].getAttribute('data-arrow-x')}px`
})

function lobbyButtonMouseOver() {
  playSound(sndPlayButtonHover)
  document.getElementById(
    'league_header_lobbybuttonvideo_updateprogressborderoverlay'
  ).style.display = 'block'
  document
    .getElementById('league_header_lobbybuttonvideo_updateprogressborderoverlay')
    .animate([{ opacity: 0 }, { opacity: 1 }], 250)
}

function lobbyButtonMouseLeave() {
  document
    .getElementById('league_header_lobbybuttonvideo_updateprogressborderoverlay')
    .animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById(
      'league_header_lobbybuttonvideo_updateprogressborderoverlay'
    ).style.display = 'none'
  }, 250)
}

function lobbyButtonClick() {
  playMovie(document.getElementById('league_header_lobbybuttonvideo'), movLeagueLobbyButtonRelease)
  playSound(sndPlayButtonClick)
  document.getElementById('league_header_lobbybutton').style.pointerEvents = 'none'
  document.getElementById('mainheader_currentpagearrow').style.display = 'none'
  document
    .getElementsByClassName('mainheader_menuitem_currentpage')[0]
    .classList.remove('mainheader_menuitem_currentpage')

  document.getElementById('toolselector').style.display = 'block'
  document.getElementById('toolselector_champlistgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_solostuffgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_stuffgenerator_animatedicon').style.display = 'none'

  if (document.getElementsByClassName('toolselector_currentselectedtool').length > 0) {
    document
      .getElementsByClassName('toolselector_currentselectedtool')[0]
      .classList.remove('toolselector_currentselectedtool')
  }

  document.getElementById('toolselector').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('homepage').animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById('homepage').style.display = 'none'
  }, 250)
}

function displayHomePage() {
  playSound(sndMenuItemClick)

  if (document.getElementById('toolselector').checkVisibility()) {
    document.getElementById('toolselector').animate([{ opacity: 1 }, { opacity: 0 }], 250)

    setTimeout(() => {
      document.getElementById('toolselector').style.display = 'none'
    }, 250)
  }

  if (document.getElementById('champlistgenerator').checkVisibility()) {
    document.getElementById('champlistgenerator').animate([{ opacity: 1 }, { opacity: 0 }], 250)

    setTimeout(() => {
      document.getElementById('champlistgenerator').style.display = 'none'
    }, 250)
  }

  //todo: stuffGenerator fade out
  //todo: soloStuffGenerator fade out

  document.getElementById('homepage').style.display = 'block'
  document.getElementById('homepage').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('mainheader_currentpagearrow').style.display = 'block'
  document.getElementById('league_header_lobbybutton').style.pointerEvents = 'auto'
  document
    .getElementById('mainheader_menuitem_homepage')
    .classList.add('mainheader_menuitem_currentpage')
  playMovie(document.getElementById('league_header_lobbybuttonvideo'), movLeagueLobbyButtonIntro)
}
</script>

<template>
  <div id="mainheader">
    <div id="mainheader_content">
      <div id="league_header_logo_container">
        <video id="league_header_logo"></video>
        <div
          id="league_header_lobbybutton"
          @mouseover="lobbyButtonMouseOver"
          @mouseleave="lobbyButtonMouseLeave"
          @click="lobbyButtonClick"
        >
          <video id="league_header_lobbybuttonvideo"></video>
          <video id="league_header_lobbybuttonvideo_updateprogressborderoverlay"></video>
          <div id="league_header_lobbybuttontext">OUTILS</div>
        </div>
      </div>

      <div id="league_status_button_container">
        <div id="league_status_button" class="warning"></div>
      </div>

      <div id="mainheader_currentpagearrow"></div>
      <div
        id="mainheader_menuitem_homepage"
        data-arrow-x="281"
        class="mainheader_menuitem mainheader_menuitem_currentpage"
        @click="displayHomePage()"
      >
        ACCUEIL
      </div>
    </div>

    <div id="mainheader_sidebarcontent">
      <div id="championhighlight_portrait"></div>
      <div id="championhighlight_name">Inconnu</div>
      <div id="championhighlight_title">Champion du jour</div>
    </div>

    <div id="mainheader_windowbuttons">
      <div id="windowbutton_reduce"></div>
      <div id="windowbutton_settings"></div>
      <div id="windowbutton_exit"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#mainheader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 79px;
  border-top: 2px solid #785a28;
  border-bottom: 1px solid #424444;
  z-index: 100;
  app-region: drag;

  #mainheader_content {
    width: calc(100% - 224px);
    height: 100%;
    display: flex;

    #league_header_logo_container {
      margin-right: 16px;
      width: 186px;
      height: 76px;
      app-region: no-drag;

      #league_header_logo {
        position: absolute;
        top: 10px;
        left: 16px;
        width: 64px;
        height: 54px;
      }

      #league_header_lobbybutton {
        position: absolute;
        top: 9px;
        left: 49px;
        width: 146px;
        height: 58px;

        #league_header_lobbybuttonvideo {
          position: absolute;
          top: 0;
          left: 0;
          width: 146px;
          height: 58px;
          z-index: 1;
        }

        #league_header_lobbybuttonvideo_updateprogressborderoverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 147px;
          height: 58px;
          z-index: 4;
          object-fit: fill;
        }

        #league_header_lobbybuttontext {
          position: absolute;
          top: 14px;
          left: 24px;
          width: 111px;
          height: 29px;
          line-height: 29px;
          font-family: 'Beaufort for LoL';
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          color: #e6dcc9;
          z-index: 5;
        }
      }
    }

    #league_header_lobbybutton:hover {
      cursor: pointer;
    }

    #league_status_button_container {
      display: inline-flex;
      margin-right: 16px;
      width: 30.5px;
      height: 76px;
      app-region: no-drag;

      #league_status_button {
        width: 30.5px;
        height: 30.5px;
        margin-top: 24px;
      }

      #league_status_button.danger {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-red.png');
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      #league_status_button.danger:hover {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-red-hover.png');
      }

      #league_status_button.danger:active {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-red-active.png');
      }

      #league_status_button.warning {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-yellow.png');
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      #league_status_button.warning:hover {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-yellow-hover.png');
      }

      #league_status_button.warning:active {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-yellow-active.png');
      }

      #league_status_button.info {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-blue.png');
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      #league_status_button.info:hover {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-blue-hover.png');
      }

      #league_status_button.info:active {
        background-image: url('../assets/img/popups/status/status_button/button-ticker-blue-active.png');
      }
    }

    #mainheader_currentpagearrow {
      position: fixed;
      top: 2px;
      width: 28px;
      height: 15px;
      background-image: url('../assets/img/ui/nav-pointer.png');
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .mainheader_menuitem {
      display: inline-flex;
      width: auto;
      height: 76px;
      padding-left: 15px;
      padding-right: 15px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(195, 181, 139, 0) 100%);
      line-height: 79px;
      font-family: 'Beaufort for LoL';
      font-weight: 700;
      font-size: 15px;
      text-align: center;
      color: #c3b58b;
      app-region: no-drag;
      transition: all 0.5s;
    }

    .mainheader_menuitem:hover {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(195, 181, 139, 0.25) 100%);
      color: #f0e6d2;
      cursor: pointer;
    }

    .mainheader_menuitem_currentpage {
      display: inline-flex;
      width: auto;
      height: 76px;
      padding-left: 15px;
      padding-right: 15px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(195, 181, 139, 0.25) 100%);
      line-height: 79px;
      font-family: 'Beaufort for LoL';
      font-weight: 700;
      font-size: 15px;
      text-align: center;
      color: #f0e6d2;
      app-region: no-drag;
    }

    .mainheader_menuitem_currentpage:hover {
      cursor: default;
    }
  }

  #mainheader_sidebarcontent {
    position: fixed;
    top: 0;
    left: calc(100vw - 224px);
    width: 224px;
    height: 79px;

    #championhighlight_portrait {
      position: absolute;
      top: 22px;
      left: 15px;
      width: 48px;
      height: 48px;
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border: 2px solid #c3b58b;
      border-radius: 50px;
    }

    #championhighlight_name {
      position: absolute;
      top: 28px;
      left: 79px;
      font-family: 'Beaufort for LoL';
      font-weight: 700;
      font-size: 14px;
      color: #f0e6d2;
    }

    #championhighlight_title {
      position: absolute;
      top: 47px;
      left: 79px;
      font-family: 'Spiegel';
      font-size: 12px;
      color: #c3b58b;
    }
  }

  #mainheader_windowbuttons {
    position: fixed;
    top: 2px;
    right: 0;
    width: 104px;
    height: 25px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    app-region: no-drag;
    z-index: 99999;

    #windowbutton_reduce,
    #windowbutton_settings,
    #windowbutton_exit {
      width: 18px;
      height: 18px;
      background-size: 18px 18px;
      background-position: center center;
      background-repeat: no-repeat;
      opacity: 0.75;
    }

    #windowbutton_reduce:hover,
    #windowbutton_settings:hover,
    #windowbutton_exit:hover {
      opacity: 1;
    }

    #windowbutton_reduce:active,
    #windowbutton_settings:active,
    #windowbutton_exit:active {
      opacity: 0.33;
    }

    #windowbutton_reduce {
      background-image: url('../assets/img/ui/window_controls/control-hide.png');
    }

    #windowbutton_settings {
      background-image: url('../assets/img/ui/window_controls/control-settings.png');
    }

    #windowbutton_exit {
      background-image: url('../assets/img/ui/window_controls/control-close.png');
    }
  }
}
</style>
