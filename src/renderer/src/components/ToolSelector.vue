<script setup>
import { onMounted } from 'vue'
import { playSound } from '../common/audio'
import { playMovie } from '../common/video'
import sndMenuItemClick from '../assets/snd/ui/menuitem_click.ogg'
import sndToolSelectorConfirmButtonClick from '../assets/snd/pages/toolselector/confirmbutton/confirmbutton_click.ogg'
import sndToolSelectorConfirmButtonHover from '../assets/snd/pages/toolselector/confirmbutton/confirmbutton_hover.ogg'
import sndToolSelectorExitButtonClick from '../assets/snd/pages/toolselector/exitbutton/exitbutton_click.ogg'
import sndToolSelectorExitButtonHover from '../assets/snd/pages/toolselector/exitbutton/exitbutton_hover.ogg'
import sndToolSelectorToolAreaClick from '../assets/snd/pages/toolselector/tool_click.ogg'
import movToolSelectorBackground from '../assets/mov/toolselector/toolselector_background.webm'
import movToolSelectorChampListGeneratorButtonActiveLoop from '../assets/mov/toolselector/buttons/champlistselector/champlistselector_loop.webm'
import movToolSelectorChampListGeneratorButtonActiveIntro from '../assets/mov/toolselector/buttons/champlistselector/champlistselector_intro.webm'
import movToolSelectorStuffGeneratorButtonActiveLoop from '../assets/mov/toolselector/buttons/stuffgenerator/stuffgenerator_loop.webm'
import movToolSelectorStuffGeneratorButtonActiveIntro from '../assets/mov/toolselector/buttons/stuffgenerator/stuffgenerator_intro.webm'
import movLeagueLobbyButtonIntro from '../assets/mov/lobby_button/lobby-button-intro.webm'

onMounted(() => {
  playMovie(document.getElementById('toolselector_background'), movToolSelectorBackground, true)
})

function tabClick() {
  playSound(sndMenuItemClick)
}

function champListGeneratorButtonMouseEnter() {
  playSound(sndMenuItemClick)
}

function champListGeneratorButtonClick() {
  playSound(sndToolSelectorToolAreaClick)

  document.getElementById('toolselector_solostuffgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_stuffgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_champlistgenerator_animatedicon').style.display = 'block'
  playMovie(
    document.getElementById('toolselector_champlistgenerator_animatedicon'),
    movToolSelectorChampListGeneratorButtonActiveIntro
  )
  document.getElementById('toolselector_champlistgenerator_animatedicon').addEventListener(
    'ended',
    () => {
      playMovie(
        document.getElementById('toolselector_champlistgenerator_animatedicon'),
        movToolSelectorChampListGeneratorButtonActiveLoop,
        true
      )
    },
    { once: true }
  )

  if (document.getElementsByClassName('toolselector_currentselectedtool').length > 0) {
    document
      .getElementsByClassName('toolselector_currentselectedtool')[0]
      .classList.remove('toolselector_currentselectedtool')
  }

  document
    .getElementById('toolselector_champlistgenerator')
    .classList.add('toolselector_currentselectedtool')
}

function soloStuffGeneratorButtonMouseEnter() {
  playSound(sndMenuItemClick)
}

function soloStuffGeneratorButtonClick() {
  playSound(sndToolSelectorToolAreaClick)
  document.getElementById('toolselector_champlistgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_stuffgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_solostuffgenerator_animatedicon').style.display = 'block'
  playMovie(
    document.getElementById('toolselector_solostuffgenerator_animatedicon'),
    movToolSelectorStuffGeneratorButtonActiveIntro
  )
  document.getElementById('toolselector_solostuffgenerator_animatedicon').addEventListener(
    'ended',
    () => {
      playMovie(
        document.getElementById('toolselector_solostuffgenerator_animatedicon'),
        movToolSelectorStuffGeneratorButtonActiveLoop,
        true
      )
    },
    { once: true }
  )

  if (document.getElementsByClassName('toolselector_currentselectedtool').length > 0) {
    document
      .getElementsByClassName('toolselector_currentselectedtool')[0]
      .classList.remove('toolselector_currentselectedtool')
  }

  document
    .getElementById('toolselector_solostuffgenerator')
    .classList.add('toolselector_currentselectedtool')
}

function stuffGeneratorButtonMouseEnter() {
  playSound(sndMenuItemClick)
}

function stuffGeneratorButtonClick() {
  playSound(sndToolSelectorToolAreaClick)
  document.getElementById('toolselector_champlistgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_solostuffgenerator_animatedicon').style.display = 'none'
  document.getElementById('toolselector_stuffgenerator_animatedicon').style.display = 'block'
  playMovie(
    document.getElementById('toolselector_stuffgenerator_animatedicon'),
    movToolSelectorStuffGeneratorButtonActiveIntro
  )
  document.getElementById('toolselector_stuffgenerator_animatedicon').addEventListener(
    'ended',
    () => {
      playMovie(
        document.getElementById('toolselector_stuffgenerator_animatedicon'),
        movToolSelectorStuffGeneratorButtonActiveLoop,
        true
      )
    },
    { once: true }
  )

  if (document.getElementsByClassName('toolselector_currentselectedtool').length > 0) {
    document
      .getElementsByClassName('toolselector_currentselectedtool')[0]
      .classList.remove('toolselector_currentselectedtool')
  }

  document
    .getElementById('toolselector_stuffgenerator')
    .classList.add('toolselector_currentselectedtool')
}

function exitButtonMouseEnter() {
  playSound(sndToolSelectorExitButtonHover)
}

function exitButtonClick() {
  playSound(sndToolSelectorExitButtonClick)
  document.getElementById('mainheader_menuitem_homepage').click()
}

function confirmButtonMouseEnter() {
  playSound(sndToolSelectorConfirmButtonHover)
}

function confirmButtonClick() {
  playSound(sndToolSelectorConfirmButtonClick)

  if (document.getElementsByClassName('toolselector_currentselectedtool').length > 0) {
    document.getElementById('toolselector').animate([{ opacity: 1 }, { opacity: 0 }], 250)
    document.getElementById('league_header_lobbybutton').style.pointerEvents = 'auto'
    playMovie(document.getElementById('league_header_lobbybuttonvideo'), movLeagueLobbyButtonIntro)

    setTimeout(() => {
      document.getElementById('toolselector').style.display = 'none'
    }, 250)

    switch (document.getElementsByClassName('toolselector_currentselectedtool')[0].id) {
      case 'toolselector_champlistgenerator':
        document.getElementById('champlistgenerator').animate([{ opacity: 0 }, { opacity: 1 }], 250)
        document.getElementById('champlistgenerator').style.display = 'block'

        document
          .getElementById('champlistgenerator_tooloptions_numberofchampions').value = 30
        document
          .getElementById('champlistgenerator_tooloptions_numberofchampions')
          .dispatchEvent(new Event('input'))

        if (document.getElementById('champlistgenerator_generatedchamplist').children.length > 0) {
          document.getElementById('champlistgenerator_generatedchamplist').innerHTML = ''
        }
        break
      case 'toolselector_solostuffgenerator':
        document.getElementById('solostuffgenerator').animate([{ opacity: 0 }, { opacity: 1 }], 250)
        document.getElementById('solostuffgenerator').style.display = 'block'
        break
      case 'toolselector_stuffgenerator':
        document.getElementById('stuffgenerator').animate([{ opacity: 0 }, { opacity: 1 }], 250)
        document.getElementById('stuffgenerator').style.display = 'block'
        break
    }
  }
}
</script>

<template>
  <div id="toolselector">
    <video id="toolselector_background"></video>
    <div id="toolselector_content">
      <div id="toolselector_tabs">
        <div
          id="toolselector_tab_patchnotes"
          class="toolselector_tab toolselector_currenttab"
          @click="tabClick"
        >
          OUTILS
        </div>
      </div>

      <div
        id="toolselector_champlistgenerator"
        class="toolselector_toolarea"
        @mouseenter="champListGeneratorButtonMouseEnter"
        @click="champListGeneratorButtonClick"
      >
        <div id="toolselector_champlistgenerator_iconcontainer" class="toolselector_iconcontainer">
          <div
            id="toolselector_champlistgenerator_staticicon"
            class="toolselector_staticmodeicon"
          ></div>
          <video
            id="toolselector_champlistgenerator_animatedicon"
            class="toolselector_animatedmodeicon"
          ></video>
        </div>

        <div id="toolselector_champlistgenerator_toolname" class="toolselector_toolname">
          GÉNÉRATEUR DE CHAMPIONS
        </div>
        <div id="toolselector_champlistgenerator_separator" class="toolselector_separator"></div>
        <div id="toolselector_champlistgenerator_summary" class="toolselector_summary">
          Outil permettant de générer une liste aléatoire de plusieurs champions.
        </div>
      </div>

      <div
        id="toolselector_solostuffgenerator"
        class="toolselector_toolarea"
        @mouseenter="soloStuffGeneratorButtonMouseEnter"
        @click="soloStuffGeneratorButtonClick"
      >
        <div id="toolselector_solostuffgenerator_iconcontainer" class="toolselector_iconcontainer">
          <div
            id="toolselector_solostuffgenerator_staticicon"
            class="toolselector_staticmodeicon"
          ></div>
          <video
            id="toolselector_solostuffgenerator_animatedicon"
            class="toolselector_animatedmodeicon"
          ></video>
        </div>

        <div id="toolselector_solostuffgenerator_toolname" class="toolselector_toolname">
          GÉNÉRATEUR DE STUFF (SOLO)
        </div>
        <div id="toolselector_solostuffgenerator_separator" class="toolselector_separator"></div>
        <div id="toolselector_solostuffgenerator_summary" class="toolselector_summary">
          Outil permettant de générer une liste aléatoire de runes et d'objets pour un champion
          d'une équipe, en fonction de son poste, et de choisir le pouvoir principal de chacun
          d'entre eux.
        </div>
      </div>

      <div
        id="toolselector_stuffgenerator"
        class="toolselector_toolarea"
        @mouseenter="stuffGeneratorButtonMouseEnter"
        @click="stuffGeneratorButtonClick"
      >
        <div id="toolselector_stuffgenerator_iconcontainer" class="toolselector_iconcontainer">
          <div
            id="toolselector_stuffgenerator_staticicon"
            class="toolselector_staticmodeicon"
          ></div>
          <video
            id="toolselector_stuffgenerator_animatedicon"
            class="toolselector_animatedmodeicon"
          ></video>
        </div>

        <div id="toolselector_stuffgenerator_toolname" class="toolselector_toolname">
          GÉNÉRATEUR DE STUFF (ÉQUIPE)
        </div>
        <div id="toolselector_stuffgenerator_separator" class="toolselector_separator"></div>
        <div id="toolselector_stuffgenerator_summary" class="toolselector_summary">
          Outil permettant de générer une liste aléatoire de runes et d'objets pour chaque champion
          d'une équipe, en fonction de son poste, et de choisir le pouvoir principal de chacun
          d'entre eux.
        </div>
      </div>

      <div id="toolselector_actionscontainer">
        <div
          id="toolselector_exitbutton"
          @mouseenter="exitButtonMouseEnter"
          @click="exitButtonClick"
        ></div>
        <div
          id="toolselector_confirmbuttoncontainer"
          @mouseenter="confirmButtonMouseEnter"
          @click="confirmButtonClick"
        >
          <div id="toolselector_confirmbutton"></div>
          <div id="toolselector_confirmbuttontext">CONTINUER</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#toolselector {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
  overflow: hidden;
  display: none;

  #toolselector_background {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: 100vh;
    z-index: 1;
    object-fit: cover;
  }

  #toolselector_content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: calc(100vh - 79px);
    margin-top: 79px;
    text-align: center;
    z-index: 2;

    #toolselector_tabs {
      margin-top: 9px;
      margin-left: 50px;
      margin-right: 50px;
      display: flex;

      .toolselector_tab {
        width: auto;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 13px;
        color: #c3b58b;
      }

      .toolselector_tab:not(:last-child) {
        margin-right: 35px;
      }

      .toolselector_tab:hover {
        color: #f0e6d2;
        cursor: pointer;
      }

      .toolselector_currenttab {
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 13px;
        color: #f0e6d2;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(
          90deg,
          rgba(198, 183, 141, 0) 0%,
          rgba(198, 183, 141, 1) 50%,
          rgba(195, 181, 139, 0) 100%
        );
        border-image-slice: 1;
      }
    }

    .toolselector_toolarea {
      display: inline-block;
      width: 240px;
      height: calc(100vh - 79px - 156px);
      margin-top: 93px;
      margin-left: 0;
      margin-right: 0;

      // Commun à tous les boutons
      .toolselector_iconcontainer,
      .toolselector_staticmodeicon,
      .toolselector_animatedmodeicon {
        position: absolute;
        width: 94px;
        height: 94px;
      }

      .toolselector_iconcontainer,
      .toolselector_staticmodeicon {
        background-size: 94px 94px;
        background-repeat: no-repeat;
      }

      .toolselector_iconcontainer {
        background-position: 45px center;
        background-size: 94px 94px;
        background-repeat: no-repeat;
      }

      .toolselector_staticmodeicon {
        background-position: center center;
        background-size: 94px 94px;
        background-repeat: no-repeat;
      }

      .toolselector_iconcontainer {
        margin-top: -32px;
        margin-left: 30px;
      }

      .toolselector_staticmodeicon {
        left: 45px;
      }

      .toolselector_animatedmodeicon {
        left: 45px;
        display: none;
      }

      .toolselector_toolname,
      .toolselector_separator,
      .toolselector_summary {
        position: absolute;
        width: 240px;
      }

      .toolselector_toolname {
        top: 211px;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 25px;
        color: #cdbe91;
        text-align: center;
        line-height: 29px;
        transition: color 0.5s;
      }

      .toolselector_separator {
        top: 302px;
        border-bottom: 1px solid #5e6766;
      }

      .toolselector_summary {
        top: 318px;
        font-family: 'Spiegel';
        font-size: 13px;
        color: #9c9788;
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
        transition: color 0.5s;
      }

      // Spécifique à chaque bouton
      #toolselector_champlistgenerator_iconcontainer {
        background-image: url('../assets/img/pages/toolselector/buttons/champlistgenerator/tutorial-disabled.png');
      }

      #toolselector_champlistgenerator_staticicon {
        background-image: url('../assets/img/pages/toolselector/buttons/champlistgenerator/tutorial-default.png');
      }

      #toolselector_champlistgenerator_staticicon:hover {
        background-image: url('../assets/img/pages/toolselector/buttons/champlistgenerator/tutorial-hover.png');
      }

      #toolselector_solostuffgenerator_iconcontainer {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-disabled.png');
      }

      #toolselector_solostuffgenerator_staticicon {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-default.png');
      }

      #toolselector_solostuffgenerator_staticicon:hover {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-hover.png');
      }

      #toolselector_stuffgenerator_iconcontainer {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-disabled.png');
      }

      #toolselector_stuffgenerator_staticicon {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-default.png');
      }

      #toolselector_stuffgenerator_staticicon:hover {
        background-image: url('../assets/img/pages/toolselector/buttons/stuffgenerator/battletraining-hover.png');
      }
    }

    .toolselector_toolarea:hover {
      .toolselector_toolname {
        color: #f1e8d6;
      }

      .toolselector_summary {
        color: #e9ddcd;
      }
    }

    .toolselector_currentselectedtool,
    .toolselector_currentselectedtool:hover {
      .toolselector_toolname {
        color: #f1e8d6;
      }

      .toolselector_separator {
        background: radial-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
      }

      .toolselector_summary {
        color: #e9ddcd;
      }
    }

    #toolselector_actionscontainer {
      position: absolute;
      left: calc(50% - 103px);
      bottom: 11px;
      width: 206px;
      height: 42px;
      background-color: #010a13;
      border: 1px solid #463714;
      border-radius: 20px 0 0 20px;

      #toolselector_exitbutton {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 32px;
        height: 32px;
        background-image: url('../assets/img/pages/toolselector/buttons/actions/exit/close_button.png');
        background-repeat: no-repeat;
        background-size: 32px 32px;
      }

      #toolselector_exitbutton:hover {
        background-image: url('../assets/img/pages/toolselector/buttons/actions/exit/close_button_over.png');
      }

      #toolselector_exitbutton:active {
        background-image: url('../assets/img/pages/toolselector/buttons/actions/exit/close_button_down.png');
      }

      #toolselector_confirmbuttoncontainer {
        position: absolute;
        top: 3px;
        left: 34px;
        width: 166px;
        height: 32px;

        #toolselector_confirmbutton {
          position: absolute;
          top: 1px;
          left: 1px;
          width: 166px;
          height: 32px;
          background-image: url('../assets/img/pages/toolselector/buttons/actions/confirm/play-button-default.png');
          background-repeat: no-repeat;
          background-size: 166px 32px;
        }

        #toolselector_confirmbuttontext {
          position: absolute;
          top: 3px;
          left: 10px;
          width: 142px;
          height: 28px;
          font-family: 'Beaufort for LoL';
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          color: #a3c7c7;
          line-height: 29px;
        }
      }

      #toolselector_confirmbuttoncontainer:hover {
        #toolselector_confirmbutton {
          background-image: url('../assets/img/pages/toolselector/buttons/actions/confirm/play-button-hover.png');
        }

        #toolselector_confirmbuttontext {
          color: #f0e6d2;
        }
      }

      #toolselector_confirmbuttoncontainer:active {
        #toolselector_confirmbutton {
          background-image: url('../assets/img/pages/toolselector/buttons/actions/confirm/play-button-pressed.png');
        }

        #toolselector_confirmbuttontext {
          color: #035478;
        }
      }
    }
  }
}
</style>
