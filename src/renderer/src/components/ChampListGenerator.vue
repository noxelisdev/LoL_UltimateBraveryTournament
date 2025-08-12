<script setup>
import tippy from 'tippy.js'
import { playSound } from '../common/audio'
import sndToolCommonReturnButtonHover from '../assets/snd/tools/common/returnbutton/returnbutton_hover.ogg'
import sndToolCommonReturnButtonClick from '../assets/snd/tools/common/returnbutton/returnbutton_click.ogg'
import sndToolCommonStartToolButtonClick from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_click.ogg'
import sndToolCommonStartToolButtonHover from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_hover.ogg'
import sndToolCommonExitButtonHover from '../assets/snd/pages/toolselector/exitbutton/exitbutton_hover.ogg'
import sndToolCommonExitButtonClick from '../assets/snd/pages/toolselector/exitbutton/exitbutton_click.ogg'

function returnButtonMouseEnter() {
  playSound(sndToolCommonReturnButtonHover)
}

function returnButtonClick() {
  playSound(sndToolCommonReturnButtonClick)
  document.getElementById('toolselector').style.display = 'block'
  document.getElementById('toolselector').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('champlistgenerator').animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById('champlistgenerator').style.display = 'none'
  }, 250)
}

function numberOfChampionsInputChange() {
  const selectedNumber = document.getElementById(
    'champlistgenerator_tooloptions_numberofchampions'
  ).value
  document.getElementById('champlistgenerator_tooloptions_numberofchampions_label').innerHTML =
    `Nombre de champions à générer : ${selectedNumber}`
  enableStartToolButton(selectedNumber)
}

function enableStartToolButton(selectedNumberOfChampions) {
  if (selectedNumberOfChampions > 0) {
    if (
      document
        .getElementById('champlistgenerator_starttoolbuttoncontainer')
        .classList.contains('champlistgenerator_starttoolbuttondisabled')
    ) {
      document
        .getElementById('champlistgenerator_starttoolbuttoncontainer')
        .classList.remove('champlistgenerator_starttoolbuttondisabled')
    }
  } else {
    if (
      document
        .getElementById('champlistgenerator_starttoolbuttoncontainer')
        .classList.contains('champlistgenerator_starttoolbuttondisabled') === false
    ) {
      document
        .getElementById('champlistgenerator_starttoolbuttoncontainer')
        .classList.add('champlistgenerator_starttoolbuttondisabled')
    }
  }
}

function exitButtonMouseEnter() {
  playSound(sndToolCommonExitButtonHover)
}

function exitButtonClick() {
  playSound(sndToolCommonExitButtonClick)
  document.getElementById('homepage').style.display = 'block'
  document.getElementById('homepage').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('homepage_background').play()
  document.getElementById('champlistgenerator').animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById('champlistgenerator').style.display = 'none'
  }, 250)
}

function startToolButtonMouseEnter() {
  if (
    document
      .getElementById('champlistgenerator_starttoolbuttoncontainer')
      .classList.contains('champlistgenerator_starttoolbuttondisabled') === false
  ) {
    playSound(sndToolCommonStartToolButtonHover)
  }
}

async function startToolButtonClick() {
  if (
    document
      .getElementById('champlistgenerator_starttoolbuttoncontainer')
      .classList.contains('champlistgenerator_starttoolbuttondisabled') === false
  ) {
    const champions = await window.league.getData('champions')
    let selectedChampions = []

    playSound(sndToolCommonStartToolButtonClick)
    document
      .getElementById('champlistgenerator_starttoolbuttoncontainer')
      .classList.add('champlistgenerator_starttoolbuttondisabled')

    if (document.getElementById('champlistgenerator_generatedchamplist').children.length > 0) {
      document.getElementById('champlistgenerator_generatedchamplist').innerHTML = ''
    }

    while (
      selectedChampions.length <
      document.getElementById('champlistgenerator_tooloptions_numberofchampions').value
    ) {
      const newSelectedChampion =
        Object.keys(champions)[Math.floor(Math.random() * Object.keys(champions).length)]

      if (selectedChampions.includes(newSelectedChampion) === false) {
        selectedChampions.push(newSelectedChampion)

        let selectedChampion = document.createElement('div')
        selectedChampion.id = `champlistgenerator_generatedchamp_${champions[newSelectedChampion].id.toLowerCase()}`
        selectedChampion.setAttribute('data-tippy-content', champions[newSelectedChampion].name)
        selectedChampion.style.backgroundImage = `url('https://lol.ddragon.noxelis.dev/img/champion/tiles/${champions[newSelectedChampion].id}_0.jpg')`
        document
          .getElementById('champlistgenerator_generatedchamplist')
          .appendChild(selectedChampion)
        tippy(selectedChampion, { theme: 'lol' })
      }
    }
  }
}
</script>

<template>
  <div id="champlistgenerator">
    <video id="champlistgenerator_background"></video>
    <div id="champlistgenerator_content">
      <div id="champlistgenerator_header">
        <div
          id="champlistgenerator_header_returnbutton"
          @mouseenter="returnButtonMouseEnter"
          @click="returnButtonClick"
        ></div>
        <div id="champlistgenerator_header_separator"></div>
        <div id="champlistgenerator_header_toolicon"></div>
        <div id="champlistgenerator_header_toolname">CHAMPIONS ALÉATOIRES</div>
      </div>

      <div id="champlistgenerator_tooloptions">
        <p>
          <input
            id="champlistgenerator_tooloptions_numberofchampions"
            type="range"
            min="0"
            step="1"
            @input="numberOfChampionsInputChange"
          />
        </p>
        <p>
          <label
            id="champlistgenerator_tooloptions_numberofchampions_label"
            for="champlistgenerator_tooloptions_numberofchampions"
          >
            Nombre de champions à générer : 0
          </label>
        </p>
      </div>

      <div id="champlistgenerator_generatedchamplist"></div>

      <div id="champlistgenerator_actionscontainer">
        <div
          id="champlistgenerator_exitbutton"
          @mouseenter="exitButtonMouseEnter"
          @click="exitButtonClick"
        ></div>
        <div id="champlistgenerator_leftdecoration"></div>
        <div id="champlistgenerator_rightdecoration"></div>
        <div
          id="champlistgenerator_starttoolbuttoncontainer"
          @mouseenter="startToolButtonMouseEnter"
          @click="startToolButtonClick"
        >
          <div id="champlistgenerator_starttoolbutton"></div>
          <div id="champlistgenerator_starttoolbuttontext">GÉNÉRER LA LISTE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#champlistgenerator {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
  overflow: hidden;
  display: none;

  #champlistgenerator_background {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: 100vh;
    background-image: url('../assets/img/tools/champlistgenerator/champlistgenerator_background.png');
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    z-index: 1;
  }

  #champlistgenerator_content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: calc(100vh - 79px);
    margin-top: 79px;
    text-align: center;
    z-index: 2;

    #champlistgenerator_header {
      position: absolute;
      top: 15px;
      left: 25px;
      width: fit-content;
      height: 28px;

      #champlistgenerator_header_returnbutton {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow.png');
        background-size: 28px 28px;
        background-repeat: no-repeat;
      }

      #champlistgenerator_header_returnbutton:hover {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-over.png');
      }

      #champlistgenerator_header_returnbutton:active {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-down.png');
      }

      #champlistgenerator_header_separator {
        display: inline-block;
        width: 1px;
        height: 28px;
        background-color: #434b50;
        margin-left: 13px;
      }

      #champlistgenerator_header_toolicon {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/champlistgenerator/tutorial-active.png');
        background-size: 22px 22px;
        background-position: center center;
        background-repeat: no-repeat;
        margin-left: 14px;
      }

      #champlistgenerator_header_toolname {
        position: absolute;
        display: inline-block;
        width: 220px;
        height: 28px;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 14px;
        color: #f0e6d2;
        line-height: 28px;
        margin-left: 14px;
        text-align: left;
      }
    }

    #champlistgenerator_tooloptions {
      position: absolute;
      top: 3px;
      right: 35px;
      text-align: center;

      p {
        margin: 0;
      }

      #champlistgenerator_tooloptions_numberofchampions {
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: 500px;
      }

      #champlistgenerator_tooloptions_numberofchampions::-webkit-slider-runnable-track {
        background: #1e2328;
        height: 0.5rem;
      }

      #champlistgenerator_tooloptions_numberofchampions::-webkit-slider-thumb {
        width: 1rem;
        height: 1rem;
        margin-top: -0.25rem;
        appearance: none;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          180deg,
          rgba(5, 147, 167, 1) 0%,
          rgba(5, 147, 167, 1) 100%
        );
        background: linear-gradient(180deg, rgba(30, 35, 40, 1) 0%, rgba(30, 35, 40, 1) 100%);
        transition: all 0.5s;
      }

      #champlistgenerator_tooloptions_numberofchampions::-webkit-slider-thumb:hover {
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          180deg,
          rgba(151, 234, 229, 1) 0%,
          rgba(31, 158, 189, 1) 100%
        );
        background: linear-gradient(180deg, rgba(30, 42, 49, 1) 0%, rgba(17, 60, 80, 1) 100%);
      }

      #champlistgenerator_tooloptions_numberofchampions::-webkit-slider-thumb:active {
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          180deg,
          rgba(13, 63, 75, 1) 0%,
          rgba(2, 85, 119, 1) 100%
        );
        background-color: #1e2328;
      }

      #champlistgenerator_tooloptions_numberofchampions_label {
        width: 300px;
        font-family: 'Spiegel';
        font-size: 12px;
        color: #c3b58b;
      }
    }

    #champlistgenerator_generatedchamplist {
      position: absolute;
      top: 65px;
      left: 25px;
      width: 1005px;
      height: 500px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      overflow-y: auto;

      :deep(div) {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        background-repeat: no-repeat;
        background-size: 100px 100px;
      }
    }

    #champlistgenerator_actionscontainer {
      position: absolute;
      left: calc(50% - 158px);
      bottom: 11px;
      width: 316px;
      height: 48px;

      #champlistgenerator_exitbutton,
      #champlistgenerator_exitbutton_disabled {
        position: absolute;
        top: 5px;
        left: 18px;
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-size: 32px 32px;
        z-index: 10;
      }

      #champlistgenerator_exitbutton {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #champlistgenerator_exitbutton_disabled {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #champlistgenerator_exitbutton:hover {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_over.png');
      }

      #champlistgenerator_exitbutton:active {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_down.png');
      }

      #champlistgenerator_leftdecoration,
      #champlistgenerator_rightdecoration {
        position: absolute;
        width: 122px;
        height: 28px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 122px 28px;
        z-index: 1;
      }

      #champlistgenerator_leftdecoration {
        top: -3px;
        left: -44px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
      }

      #champlistgenerator_rightdecoration {
        top: -3px;
        right: -46px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
        transform: scaleX(-1);
      }

      #champlistgenerator_starttoolbuttoncontainer {
        position: absolute;
        top: -3px;
        left: 65px;
        width: 188px;
        height: 47px;
        z-index: 9;

        #champlistgenerator_starttoolbutton {
          position: absolute;
          top: 0;
          left: 0;
          width: 188px;
          height: 47px;
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match.png');
          background-repeat: no-repeat;
          background-size: 188px 47px;
        }

        #champlistgenerator_starttoolbuttontext {
          position: absolute;
          top: 2px;
          left: 18px;
          width: 152px;
          height: 46px;
          font-family: 'Beaufort for LoL';
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          color: #a3c7c7;
          line-height: 42px;
        }
      }

      #champlistgenerator_starttoolbuttoncontainer:hover {
        #champlistgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-over.png');
        }

        #champlistgenerator_starttoolbuttontext {
          color: #f0e6d2;
        }
      }

      #champlistgenerator_starttoolbuttoncontainer:active {
        #champlistgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-down.png');
        }

        #champlistgenerator_starttoolbuttontext {
          color: #035478;
        }
      }

      #champlistgenerator_starttoolbuttoncontainer.champlistgenerator_starttoolbuttondisabled,
      #champlistgenerator_starttoolbuttoncontainer.champlistgenerator_starttoolbuttondisabled:hover {
        #champlistgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-disabled.png');
        }

        #champlistgenerator_starttoolbuttontext {
          color: #5d6060;
        }
      }
    }
  }
}
</style>
