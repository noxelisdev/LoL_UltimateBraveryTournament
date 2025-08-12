<script setup>
import tippy from 'tippy.js'
import { onMounted } from 'vue'
import { playSound } from '../common/audio'
import {
  generatePlayerRunes,
  generatePlayerItems,
  generatePlayerItem,
  generatePlayerSummoners,
  generatePlayerMainSpell
} from '../common/stuffGenerator'
import sndToolCommonReturnButtonHover from '../assets/snd/tools/common/returnbutton/returnbutton_hover.ogg'
import sndToolCommonReturnButtonClick from '../assets/snd/tools/common/returnbutton/returnbutton_click.ogg'
import sndToolCommonStartToolButtonClick from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_click.ogg'
import sndToolCommonStartToolButtonHover from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_hover.ogg'
import sndToolSelectorExitButtonHover from '../assets/snd/pages/toolselector/exitbutton/exitbutton_hover.ogg'
import sndToolSelectorExitButtonClick from '../assets/snd/pages/toolselector/exitbutton/exitbutton_click.ogg'

let generationInProgress = false

onMounted(() => {
  tippy('[data-tippy-content]', { theme: 'lol', arrow: true })
})

function returnButtonMouseEnter() {
  playSound(sndToolCommonReturnButtonHover)
}

function returnButtonClick() {
  playSound(sndToolCommonReturnButtonClick)
  document.getElementById('toolselector').style.display = 'block'
  document.getElementById('toolselector').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('solostuffgenerator').animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById('solostuffgenerator').style.display = 'none'
    resetSoloStuffGenerator()
  }, 250)
}

function exitButtonMouseEnter() {
  playSound(sndToolSelectorExitButtonHover)
}

function exitButtonClick() {
  playSound(sndToolSelectorExitButtonClick)
  document.getElementById('mainheader_menuitem_homepage').click()
}

function startToolButtonMouseEnter() {
  if (
    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.contains('solostuffgenerator_starttoolbuttondisabled') === false
  ) {
    playSound(sndToolCommonStartToolButtonHover)
  }
}

async function startToolButtonClick() {
  if (
    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.contains('solostuffgenerator_starttoolbuttondisabled') === false
  ) {
    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.add('solostuffgenerator_starttoolbuttondisabled')
    playSound(sndToolCommonStartToolButtonClick)
    resetSoloStuffGenerator(true)

    const runes = await generatePlayerRunes()
    for (let i = 0; i < runes.length; i++) {
      document.getElementById(`solostuffgenerator_player_rune${i + 1}`).style.backgroundImage =
        `url('https://lol.ddragon.noxelis.dev/img/${runes[i].icon}')`
      document
        .getElementById(`solostuffgenerator_player_rune${i + 1}`)
        .setAttribute('data-tippy-content', runes[i].name)
      document
        .getElementById(`solostuffgenerator_player_rune${i + 1}`)
        ._tippy.setContent(runes[i].name)
    }

    const items = await generatePlayerItems(
      document.getElementById('solostuffgenerator_player_champ').getAttribute('data-value'),
      document.getElementById('solostuffgenerator_player_lane').getAttribute('data-value')
    )
    for (let i = 0; i < items.length; i++) {
      document.getElementById(`solostuffgenerator_player_item${i + 1}`).style.backgroundImage =
        `url('https://lol.ddragon.noxelis.dev/latest/img/item/${items[i].data.image.full}')`
      document
        .getElementById(`solostuffgenerator_player_item${i + 1}`)
        .setAttribute('data-item-name', items[i].data.name)
      document
        .getElementById(`solostuffgenerator_player_item${i + 1}`)
        .setAttribute('data-tippy-content', items[i].data.name)
      document
        .getElementById(`solostuffgenerator_player_item${i + 1}`)
        .setAttribute('data-type', items[i].type)
      document
        .getElementById(`solostuffgenerator_player_item${i + 1}`)
        ._tippy.setContent(items[i].data.name)
    }

    const summoners = await generatePlayerSummoners(
      document.getElementById('solostuffgenerator_player_lane').getAttribute('data-value')
    )
    for (let i = 0; i < summoners.length; i++) {
      document.getElementById(`solostuffgenerator_player_summoner${i + 1}`).style.backgroundImage =
        `url('https://lol.ddragon.noxelis.dev/latest/img/spell/${summoners[i].image.full}')`
      document
        .getElementById(`solostuffgenerator_player_summoner${i + 1}`)
        .setAttribute('data-tippy-content', summoners[i].name)
      document
        .getElementById(`solostuffgenerator_player_summoner${i + 1}`)
        ._tippy.setContent(summoners[i].name)
    }

    const mainSpell = await generatePlayerMainSpell(
      document.getElementById('solostuffgenerator_player_champ').getAttribute('data-value')
    )
    document.getElementById('solostuffgenerator_player_mainspell').style.backgroundImage =
      `url('https://lol.ddragon.noxelis.dev/latest/img/spell/${mainSpell.image.full}')`
    document
      .getElementById('solostuffgenerator_player_mainspell')
      .setAttribute('data-tippy-content', mainSpell.name)
    document.getElementById('solostuffgenerator_player_mainspell')._tippy.setContent(mainSpell.name)
    document.getElementById('solostuffgenerator_player_mainspell_letter').innerHTML =
      mainSpell.spellKey

    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.remove('solostuffgenerator_starttoolbuttondisabled')
  }
}

function playerChampClick() {
  document.getElementById('solostuffgenerator_champselectorcontainer').style.display = 'block'
  document.getElementById('solostuffgenerator_champselector_search').focus()
}

function enableStartToolButton() {
  if (
    document
      .getElementById('solostuffgenerator_player_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé' &&
    document.getElementById('solostuffgenerator_player_lane').getAttribute('data-tippy-content') !==
      'Indéterminé' &&
    generationInProgress === false
  ) {
    if (
      document
        .getElementById('solostuffgenerator_starttoolbuttoncontainer')
        .classList.contains('solostuffgenerator_starttoolbuttondisabled')
    ) {
      document
        .getElementById('solostuffgenerator_starttoolbuttoncontainer')
        .classList.remove('solostuffgenerator_starttoolbuttondisabled')
    }
  } else {
    if (
      !document
        .getElementById('solostuffgenerator_starttoolbuttoncontainer')
        .classList.contains('solostuffgenerator_starttoolbuttondisabled')
    ) {
      document
        .getElementById('solostuffgenerator_starttoolbuttoncontainer')
        .classList.add('solostuffgenerator_starttoolbuttondisabled')
    }
  }
}

function resetSoloStuffGenerator(stuffOnly = false) {
  if (!stuffOnly) {
    // Champion
    document.getElementById('solostuffgenerator_player_champ').removeAttribute('style')
    document.getElementById('solostuffgenerator_player_champ')._tippy.setContent('Indéterminé')
    document
      .getElementById('solostuffgenerator_player_champ')
      .setAttribute('data-tippy-content', 'Indéterminé')

    // Lane
    document.getElementById('solostuffgenerator_player_lane').classList.remove('top')
    document.getElementById('solostuffgenerator_player_lane').classList.remove('jungle')
    document.getElementById('solostuffgenerator_player_lane').classList.remove('middle')
    document.getElementById('solostuffgenerator_player_lane').classList.remove('adc')
    document.getElementById('solostuffgenerator_player_lane').classList.remove('support')
    document.getElementById('solostuffgenerator_player_lane').classList.add('unknown')
    document.getElementById('solostuffgenerator_player_lane')._tippy.setContent('Indéterminé')
    document
      .getElementById('solostuffgenerator_player_lane')
      .setAttribute('data-tippy-content', 'Indéterminé')
    document.getElementById('solostuffgenerator_playerlane').setAttribute('data-value', 'unknown')
    document.getElementById('solostuffgenerator_playerlane').innerHTML = 'Inconnu'
    document
      .querySelectorAll('.form_select_optionsContainer .form_select_option')
      .forEach((option) => {
        option.classList.remove('selected')
      })
  }

  // Runes
  document.getElementById('solostuffgenerator_player_rune1').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune2').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune3').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune4').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune5').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune6').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune7').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune8').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune9').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_rune1')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune2')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune3')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune4')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune5')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune6')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune7')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune8')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_rune9')._tippy.setContent('Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune1')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune2')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune3')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune4')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune5')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune6')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune7')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune8')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_rune9')
    .setAttribute('data-tippy-content', 'Indéterminé')

  // Items
  document.getElementById('solostuffgenerator_player_item1').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item2').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item3').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item4').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item5').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item6').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item7').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_item1').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item2').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item3').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item4').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item5').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item6').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item7').removeAttribute('data-item-name')
  document.getElementById('solostuffgenerator_player_item1')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item2')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item3')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item4')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item5')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item6')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_item7')._tippy.setContent('Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item1')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item2')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item3')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item4')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item5')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item6')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_item7')
    .setAttribute('data-tippy-content', 'Indéterminé')

  // Summoners
  document.getElementById('solostuffgenerator_player_summoner1').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_summoner2').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_summoner1')._tippy.setContent('Indéterminé')
  document.getElementById('solostuffgenerator_player_summoner2')._tippy.setContent('Indéterminé')
  document
    .getElementById('solostuffgenerator_player_summoner1')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document
    .getElementById('solostuffgenerator_player_summoner2')
    .setAttribute('data-tippy-content', 'Indéterminé')

  // Main spell
  document.getElementById('solostuffgenerator_player_mainspell').removeAttribute('style')
  document.getElementById('solostuffgenerator_player_mainspell')._tippy.setContent('Indéterminé')
  document
    .getElementById('solostuffgenerator_player_mainspell')
    .setAttribute('data-tippy-content', 'Indéterminé')
  document.getElementById('solostuffgenerator_player_mainspell_letter').innerHTML = '?'

  // Global
  document.getElementById('solostuffgenerator_starttoolbuttontext').innerHTML = 'GÉNÉRER LE STUFF'
  document
    .getElementById('solostuffgenerator_starttoolbuttoncontainer')
    .classList.add('solostuffgenerator_starttoolbuttondisabled')

  if (
    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.contains('solostuffgenerator_starttoolbuttondisabled') === false
  ) {
    document
      .getElementById('solostuffgenerator_starttoolbuttoncontainer')
      .classList.add('solostuffgenerator_starttoolbuttondisabled')
  }
}

function champSelectorSearchInput() {
  if (document.getElementById('solostuffgenerator_champselector_search').value !== '') {
    document.querySelectorAll('#solostuffgenerator_champselector_content div').forEach((item) => {
      if (
        item
          .getAttribute('data-tippy-content')
          .toLowerCase()
          .indexOf(
            document.getElementById('solostuffgenerator_champselector_search').value.toLowerCase()
          ) !== -1
      ) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  } else {
    document.querySelectorAll('#solostuffgenerator_champselector_content div').forEach((item) => {
      item.style.display = 'block'
    })
  }
}

function laneSelectClick(event) {
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active')
    event.target.parentElement.querySelector('.form_select_optionsContainer').style.height = '0'
    event.target.parentElement.querySelector('.form_select_optionsContainer').style.borderWidth =
      '0'
  } else {
    event.target.classList.add('active')
    event.target.parentElement.querySelector('.form_select_optionsContainer').style.height = '150px'
    event.target.parentElement.querySelector('.form_select_optionsContainer').style.borderWidth =
      '1px'
  }
}

function laneOptionClick(event) {
  event.target.parentElement.parentElement
    .querySelector('.form_select')
    .dispatchEvent(new Event('click'))
  document.getElementById('solostuffgenerator_playerlane').innerHTML = event.target.innerHTML
  document
    .getElementById('solostuffgenerator_player_lane')
    .setAttribute('data-value', event.target.getAttribute('data-value'))
  document
    .getElementById('solostuffgenerator_player_lane')
    .classList.remove('unknown', 'top', 'middle', 'jungle', 'support', 'adc')
  document
    .getElementById('solostuffgenerator_player_lane')
    ._tippy.setContent(event.target.innerHTML)
  document
    .getElementById('solostuffgenerator_player_lane')
    .classList.add(event.target.getAttribute('data-value'))
  document
    .getElementById('solostuffgenerator_player_lane')
    .setAttribute('data-tippy-content', event.target.getAttribute('data-tippy-content'))
  event.target.parentElement.querySelectorAll('.form_select_option').forEach((item) => {
    item.classList.remove('selected')
  })
  event.target.classList.add('selected')
  enableStartToolButton()
}

async function replaceItem(event) {
  if (event.target.getAttribute('data-tippy-content') !== 'Indéterminé') {
    let currentItems = []
    for (let i = 1; i <= 7; i++) {
      if (
        document.getElementById(`solostuffgenerator_player_item${i}`).hasAttribute('data-item-name')
      ) {
        currentItems.push(
          document
            .getElementById(`solostuffgenerator_player_item${i}`)
            .getAttribute('data-item-name')
        )
      }
    }

    let newItem = await generatePlayerItem(event.target.getAttribute('data-type'))
    while (currentItems.includes(newItem.name)) {
      newItem = await generatePlayerItem(event.target.getAttribute('data-type'))
    }
    event.target.style.backgroundImage = `url('https://lol.ddragon.noxelis.dev/latest/img/item/${newItem.image.full}')`
    event.target.setAttribute('data-item-name', newItem.name)
    event.target.setAttribute('data-tippy-content', newItem.name)
    event.target._tippy.setContent(newItem.name)
  }
}
</script>

<template>
  <div id="solostuffgenerator">
    <video id="solostuffgenerator_background"></video>
    <div id="solostuffgenerator_content">
      <div id="solostuffgenerator_header">
        <div
          id="solostuffgenerator_header_returnbutton"
          @mouseenter="returnButtonMouseEnter"
          @click="returnButtonClick"
        ></div>
        <div id="solostuffgenerator_header_separator"></div>
        <div id="solostuffgenerator_header_toolicon"></div>
        <div id="solostuffgenerator_header_toolname">STUFF ALÉATOIRE (SOLO)</div>
      </div>

      <div id="solostuffgenerator_player">
        <div id="solostuffgenerator_playerdisplay">
          <div
            id="solostuffgenerator_player_champ"
            data-tippy-content="Indéterminé"
            @click="playerChampClick"
            @change="enableStartToolButton"
          ></div>
          <div
            id="solostuffgenerator_player_lane"
            class="unknown"
            data-tippy-content="Indéterminé"
          ></div>
        </div>

        <div id="solostuffgenerator_playerlaneselector">
          <div id="solostuffgenerator_playerlanecontainer" class="form_select_group">
            <label>Sélection du rôle</label>

            <div class="form_select" @click="laneSelectClick">
              <span
                id="solostuffgenerator_playerlane"
                class="form_select_selectedOption"
                data-value="unknown"
                >Inconnu</span
              >
            </div>

            <div class="form_select_optionsContainer">
              <div class="form_select_option" data-value="top" @click="laneOptionClick">Top</div>
              <div class="form_select_option" data-value="jungle" @click="laneOptionClick">
                Jungle
              </div>
              <div class="form_select_option" data-value="middle" @click="laneOptionClick">Mid</div>
              <div class="form_select_option" data-value="adc" @click="laneOptionClick">ADC</div>
              <div class="form_select_option" data-value="support" @click="laneOptionClick">
                Support
              </div>
            </div>
          </div>
        </div>
      </div>

      <table id="solostuffgenerator_table">
        <tr>
          <td>
            <div
              id="solostuffgenerator_colname_runes1"
              data-tippy-content="Runes de la branche principale"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_colname_runes2"
              data-tippy-content="Runes de la branche secondaire"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_colname_runes3"
              data-tippy-content="Runes pour les statistiques"
            ></div>
          </td>
          <td>
            <div id="solostuffgenerator_colname_stuff" data-tippy-content="Stuff"></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_colname_summoners"
              data-tippy-content="Sorts d'invocateurs"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_colname_spell"
              data-tippy-content="Pouvoir principal du champion"
            ></div>
          </td>
        </tr>

        <tr>
          <td>
            <div
              id="solostuffgenerator_player_rune1"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune2"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune3"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune4"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_player_rune5"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune6"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_player_rune7"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune8"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_rune9"
              class="solostuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_player_item1"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item2"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item3"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item4"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item5"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item6"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="solostuffgenerator_player_item7"
              class="solostuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_player_summoner1"
              class="solostuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_summoner2"
              class="solostuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="solostuffgenerator_player_mainspell"
              class="solostuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="solostuffgenerator_player_mainspell_letter"
              class="solostuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>
      </table>

      <div id="solostuffgenerator_champselectorcontainer">
        <div id="solostuffgenerator_champselector">
          <div id="solostuffgenerator_champselector_header">CHOIX DU CHAMPION</div>
          <div id="solostuffgenerator_champselector_separator"></div>
          <input
            id="solostuffgenerator_champselector_search"
            type="text"
            placeholder="Nom du champion à rechercher"
            @input="champSelectorSearchInput"
          />
          <div id="solostuffgenerator_champselector_content"></div>
        </div>
      </div>

      <div id="solostuffgenerator_actionscontainer">
        <div
          id="solostuffgenerator_exitbutton"
          @mouseenter="exitButtonMouseEnter"
          @click="exitButtonClick"
        ></div>
        <div id="solostuffgenerator_leftdecoration"></div>
        <div id="solostuffgenerator_rightdecoration"></div>
        <div
          id="solostuffgenerator_starttoolbuttoncontainer"
          class="solostuffgenerator_starttoolbuttondisabled"
          @mouseenter="startToolButtonMouseEnter"
          @click="startToolButtonClick"
        >
          <div id="solostuffgenerator_starttoolbutton"></div>
          <div id="solostuffgenerator_starttoolbuttontext">GÉNÉRER LE STUFF</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#solostuffgenerator {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
  overflow: hidden;
  display: none;

  #solostuffgenerator_background {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: 100vh;
    background-image: url('../assets/img/tools/stuffgenerator/stuffgenerator_background.jpg');
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    z-index: 1;
  }

  #solostuffgenerator_content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: calc(100vh - 79px);
    margin-top: 79px;
    text-align: center;
    z-index: 2;

    #solostuffgenerator_header {
      position: absolute;
      top: 15px;
      left: 25px;
      width: fit-content;
      height: 28px;

      #solostuffgenerator_header_returnbutton {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow.png');
        background-size: 28px 28px;
        background-repeat: no-repeat;
      }

      #solostuffgenerator_header_returnbutton:hover {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-over.png');
      }

      #solostuffgenerator_header_returnbutton:active {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-down.png');
      }

      #solostuffgenerator_header_separator {
        display: inline-block;
        width: 1px;
        height: 28px;
        background-color: #434b50;
        margin-left: 13px;
      }

      #solostuffgenerator_header_toolicon {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/stuffgenerator/battletraining-active.png');
        background-size: 22px 22px;
        background-position: center center;
        background-repeat: no-repeat;
        margin-left: 14px;
      }

      #solostuffgenerator_header_toolname {
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

    #solostuffgenerator_player {
      width: 375px;
      display: flex;
      margin-top: 194px;
      margin-left: auto;
      margin-right: auto;

      #solostuffgenerator_playerdisplay {
        width: 150px;
        height: 80px;
        margin-right: 15px;

        #solostuffgenerator_player_champ {
          display: inline-block;
          width: 80px;
          height: 80px;
          margin-left: 50px;
          margin-right: -50px;
          background-image: url('../assets/img/tools/stuffgenerator/no_champ.png');
          background-size: 80px 80px;
          background-position: center center;
          background-repeat: no-repeat;
          border: 2px solid #c3b58b;
          border-radius: 50px;
        }

        #solostuffgenerator_player_lane {
          position: relative;
          top: 5px;
          left: -63px;
          display: inline-block;
          width: 50px;
          height: 50px;
          background-color: #010a13;
          background-size: 38px 38px;
          background-position: center center;
          background-repeat: no-repeat;
          border: 1px solid #c3b58b;
          border-radius: 50px;

          &.unknown {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/unknown.png');
          }

          &.top {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/top.png');
          }

          &.jungle {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/jungle.png');
          }

          &.middle {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/mid.png');
          }

          &.adc {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/bottom.png');
          }

          &.support {
            background-image: url('../assets/img/tools/stuffgenerator/lanes/support.png');
          }
        }
      }

      #solostuffgenerator_playerlaneselector {
        width: 200px;
        text-align: left;

        .form_select_optionsContainer {
          width: 186px;
        }
      }
    }

    #solostuffgenerator_table {
      width: 850px;
      height: 75px;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;

      #solostuffgenerator_colname_runes1,
      #solostuffgenerator_colname_runes2,
      #solostuffgenerator_colname_runes3,
      #solostuffgenerator_colname_stuff,
      #solostuffgenerator_colname_summoners,
      #solostuffgenerator_colname_spell {
        display: inline-block;
        width: 100%;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: center center;
      }

      #solostuffgenerator_colname_runes1,
      #solostuffgenerator_colname_runes2,
      #solostuffgenerator_colname_runes3 {
        background-image: url('../assets/img/tools/stuffgenerator/colnames/RunesIcon.png');
      }

      #solostuffgenerator_colname_stuff {
        background-image: url('../assets/img/tools/stuffgenerator/colnames/gold.png');
      }

      #solostuffgenerator_colname_spell {
        background-image: url('../assets/img/tools/stuffgenerator/colnames/champion.png');
      }

      #solostuffgenerator_colname_summoners {
        background-image: url('../assets/img/tools/stuffgenerator/colnames/spells.png');
      }

      .solostuffgenerator_player_rune,
      .solostuffgenerator_player_item,
      .solostuffgenerator_player_summoner,
      .solostuffgenerator_player_spell {
        display: inline-block;
        width: 35px;
        height: 35px;
        background-color: #070a10;
        background-position: center center;
        background-size: 35px 35px;
        background-repeat: no-repeat;
        border: 1px solid #c3b58b;
        margin: 0;
      }

      .solostuffgenerator_player_spell {
        margin-top: 2px;
        margin-right: -15px;
      }

      .solostuffgenerator_player_spellletter {
        position: relative;
        top: 5px;
        left: 0;
        display: inline-block;
        width: 25px;
        height: 25px;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 15px;
        text-align: center;
        color: #c3b58b;
        background-color: #010a13;
        border: 1px solid #c3b58b;
        border-radius: 50px;
      }
    }

    #solostuffgenerator_champselectorcontainer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 1000;

      #solostuffgenerator_champselector {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 744px;
        height: 544px;
        background-color: #010a13;
        border: 2px solid #463714;
        transform: translate(-50%, -50%);
        overflow: hidden;

        #solostuffgenerator_champselector_header {
          position: absolute;
          top: 20px;
          left: 21px;
          width: 708px;
          height: 20px;
          font-family: 'Beaufort for LoL';
          font-weight: 700;
          font-size: 17px;
          color: #f0e6d2;
          line-height: 42px;
          text-align: left;
        }

        #solostuffgenerator_champselector_separator {
          position: absolute;
          top: 77px;
          left: 18px;
          width: 708px;
          height: 1px;
          background-color: #1e2328;
        }

        #solostuffgenerator_champselector_search {
          position: absolute;
          top: 72px;
          left: 8px;
          width: 725px;
          padding: 7px 6px;
          border: 1px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(180deg, #785a28, #785a28);
          margin-top: 7px;
          background: linear-gradient(180deg, #000306 0%, #000306 100%);
          color: #acaaa6;
          font-size: 12px;
          font-family: 'Spiegel', serif;
          font-weight: 600;
          font-style: normal;
          outline: none;
        }

        #solostuffgenerator_champselector_content {
          position: absolute;
          top: 328px;
          left: 370px;
          width: 725px;
          height: 425px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-content: start;
          overflow-x: hidden;
          overflow-y: auto;
          transform: translate(-50%, -50%);
          z-index: 999;

          :deep(div) {
            flex: 0 0 80px;
            width: 80px;
            height: 80px;
            border: 1px solid #3c3c41;
            background-repeat: no-repeat;
            background-size: 80px 80px;
          }
        }
      }
    }

    #solostuffgenerator_actionscontainer {
      position: absolute;
      left: calc(50% - 158px);
      bottom: 11px;
      width: 316px;
      height: 48px;

      #solostuffgenerator_exitbutton,
      #solostuffgenerator_exitbutton_disabled {
        position: absolute;
        top: 5px;
        left: 18px;
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-size: 32px 32px;
        z-index: 10;
      }

      #solostuffgenerator_exitbutton {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #solostuffgenerator_exitbutton_disabled {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #solostuffgenerator_exitbutton:hover {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_over.png');
      }

      #solostuffgenerator_exitbutton:active {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_down.png');
      }

      #solostuffgenerator_leftdecoration,
      #solostuffgenerator_rightdecoration {
        position: absolute;
        width: 122px;
        height: 28px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 122px 28px;
        z-index: 1;
      }

      #solostuffgenerator_leftdecoration {
        top: -3px;
        left: -44px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
      }

      #solostuffgenerator_rightdecoration {
        top: -3px;
        right: -46px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
        transform: scaleX(-1);
      }

      #solostuffgenerator_starttoolbuttoncontainer {
        position: absolute;
        top: -3px;
        left: 65px;
        width: 188px;
        height: 47px;
        z-index: 9;

        #solostuffgenerator_starttoolbutton {
          position: absolute;
          top: 0;
          left: 0;
          width: 188px;
          height: 47px;
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match.png');
          background-repeat: no-repeat;
          background-size: 188px 47px;
        }

        #solostuffgenerator_starttoolbuttontext {
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

      #solostuffgenerator_starttoolbuttoncontainer:hover {
        #solostuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-over.png');
        }

        #solostuffgenerator_starttoolbuttontext {
          color: #f0e6d2;
        }
      }

      #solostuffgenerator_starttoolbuttoncontainer:active {
        #solostuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-down.png');
        }

        #solostuffgenerator_starttoolbuttontext {
          color: #035478;
        }
      }

      #solostuffgenerator_starttoolbuttoncontainer.solostuffgenerator_starttoolbuttondisabled,
      #solostuffgenerator_starttoolbuttoncontainer.solostuffgenerator_starttoolbuttondisabled:hover {
        #solostuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-disabled.png');
        }

        #solostuffgenerator_starttoolbuttontext {
          color: #5d6060;
        }
      }
    }
  }
}
</style>
