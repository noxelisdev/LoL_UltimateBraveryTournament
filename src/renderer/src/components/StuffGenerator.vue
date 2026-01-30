<script setup>
import { playSound } from '../common/audio'
import sndToolCommonReturnButtonHover from '../assets/snd/tools/common/returnbutton/returnbutton_hover.ogg'
import sndToolCommonReturnButtonClick from '../assets/snd/tools/common/returnbutton/returnbutton_click.ogg'
import sndToolCommonExitButtonHover from '../assets/snd/pages/toolselector/exitbutton/exitbutton_hover.ogg'
import sndToolCommonExitButtonClick from '../assets/snd/pages/toolselector/exitbutton/exitbutton_click.ogg'
import sndToolCommonStartToolButtonHover from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_hover.ogg'
import sndToolCommonStartToolButtonClick from '../assets/snd/tools/common/actions/starttoolbutton/starttoolbutton_click.ogg'
import {
  generatePlayerItem,
  generatePlayerItems,
  generatePlayerMainSpell,
  generatePlayerRunes,
  generatePlayerSummoners
} from '../common/stuffGenerator'

let targetOfSelectedChamp = 'unknown'

function returnButtonMouseEnter() {
  playSound(sndToolCommonReturnButtonHover)
}

function returnButtonClick() {
  playSound(sndToolCommonReturnButtonClick)
  document.getElementById('toolselector').style.display = 'block'
  document.getElementById('toolselector').animate([{ opacity: 0 }, { opacity: 1 }], 250)
  document.getElementById('stuffgenerator').animate([{ opacity: 1 }, { opacity: 0 }], 250)

  setTimeout(() => {
    document.getElementById('stuffgenerator').style.display = 'none'
    resetStuffGenerator()
  }, 250)
}

function exitButtonMouseEnter() {
  playSound(sndToolCommonExitButtonHover)
}

function exitButtonClick() {
  playSound(sndToolCommonExitButtonClick)
  document.getElementById('mainheader_menuitem_homepage').click()

  setTimeout(() => {
    resetStuffGenerator()
  }, 250)
}

function startToolButtonMouseEnter() {
  if (
    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.contains('stuffgenerator_starttoolbuttondisabled') === false
  ) {
    playSound(sndToolCommonStartToolButtonHover)
  }
}

async function startToolButtonClick() {
  if (
    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.contains('stuffgenerator_starttoolbuttondisabled') === false
  ) {
    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.add('stuffgenerator_starttoolbuttondisabled')
    playSound(sndToolCommonStartToolButtonClick)
    resetStuffGenerator(true)

    const lanes = ['top', 'jungle', 'middle', 'adc', 'support']
    for (const lane of lanes) {
      const runes = await generatePlayerRunes()
      for (let i = 0; i < runes.length; i++) {
        document.getElementById(
          `stuffgenerator_player_${lane}_rune${i + 1}`
        ).style.backgroundImage = `url('https://ddragon.noxelis.dev/lol/img/${runes[i].icon}')`
        document
          .getElementById(`stuffgenerator_player_${lane}_rune${i + 1}`)
          .setAttribute('data-tippy-content', runes[i].name)
        document
          .getElementById(`stuffgenerator_player_${lane}_rune${i + 1}`)
          ._tippy.setContent(runes[i].name)
      }

      const items = await generatePlayerItems(
        document.getElementById(`stuffgenerator_player_${lane}_champ`).getAttribute('data-value'),
        lane
      )
      for (let i = 0; i < items.length; i++) {
        document.getElementById(
          `stuffgenerator_player_${lane}_item${i + 1}`
        ).style.backgroundImage =
          `url('https://ddragon.noxelis.dev/lol/latest/img/item/${items[i].data.image.full}')`
        document
          .getElementById(`stuffgenerator_player_${lane}_item${i + 1}`)
          .setAttribute('data-item-name', items[i].data.name)
        document
          .getElementById(`stuffgenerator_player_${lane}_item${i + 1}`)
          .setAttribute('data-tippy-content', items[i].data.name)
        document
          .getElementById(`stuffgenerator_player_${lane}_item${i + 1}`)
          .setAttribute('data-type', items[i].type)
        document
          .getElementById(`stuffgenerator_player_${lane}_item${i + 1}`)
          ._tippy.setContent(items[i].data.name)
      }

      const summoners = await generatePlayerSummoners(lane)
      for (let i = 0; i < summoners.length; i++) {
        document.getElementById(
          `stuffgenerator_player_${lane}_summoner${i + 1}`
        ).style.backgroundImage =
          `url('https://ddragon.noxelis.dev/lol/latest/img/spell/${summoners[i].image.full}')`
        document
          .getElementById(`stuffgenerator_player_${lane}_summoner${i + 1}`)
          .setAttribute('data-tippy-content', summoners[i].name)
        document
          .getElementById(`stuffgenerator_player_${lane}_summoner${i + 1}`)
          ._tippy.setContent(summoners[i].name)
      }

      const mainSpell = await generatePlayerMainSpell(
        document.getElementById(`stuffgenerator_player_${lane}_champ`).getAttribute('data-value')
      )
      document.getElementById(`stuffgenerator_player_${lane}_mainspell`).style.backgroundImage =
        `url('https://ddragon.noxelis.dev/lol/latest/img/spell/${mainSpell.image.full}')`
      document
        .getElementById(`stuffgenerator_player_${lane}_mainspell`)
        .setAttribute('data-tippy-content', mainSpell.name)
      document
        .getElementById(`stuffgenerator_player_${lane}_mainspell`)
        ._tippy.setContent(mainSpell.name)
      document.getElementById(`stuffgenerator_player_${lane}_mainspell_letter`).innerHTML =
        mainSpell.spellKey
    }

    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.remove('stuffgenerator_starttoolbuttondisabled')
  }
}

function resetStuffGenerator(stuffOnly = false) {
  if (!stuffOnly) {
    // Champions
    Array.from(document.getElementsByClassName('stuffgenerator_player_champpict')).forEach(
      (element) => {
        element.removeAttribute('style')
        element.setAttribute('data-tippy-content', 'Indéterminé')
        element._tippy.setContent('Indéterminé')
      }
    )
  }

  // Runes
  Array.from(document.getElementsByClassName('stuffgenerator_player_rune')).forEach((element) => {
    element.removeAttribute('style')
    element.setAttribute('data-tippy-content', 'Indéterminé')
    element._tippy.setContent('Indéterminé')
  })

  // Items
  Array.from(document.getElementsByClassName('stuffgenerator_player_item')).forEach((element) => {
    element.removeAttribute('style')
    element.removeAttribute('data-item-name')
    element.setAttribute('data-tippy-content', 'Indéterminé')
    element._tippy.setContent('Indéterminé')
  })

  // Summoners
  Array.from(document.getElementsByClassName('stuffgenerator_player_summoner')).forEach(
    (element) => {
      element.removeAttribute('style')
      element.setAttribute('data-tippy-content', 'Indéterminé')
      element._tippy.setContent('Indéterminé')
    }
  )

  // Main spells
  Array.from(document.getElementsByClassName('stuffgenerator_player_spell')).forEach((element) => {
    element.removeAttribute('style')
    element._tippy.setContent('Indéterminé')
    element.setAttribute('data-tippy-content', 'Indéterminé')
  })
  Array.from(document.getElementsByClassName('stuffgenerator_player_spellletter')).forEach(
    (element) => {
      element.innerHTML = '?'
    }
  )

  if (
    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.contains('stuffgenerator_starttoolbuttondisabled') === false
  ) {
    document
      .getElementById('stuffgenerator_starttoolbuttoncontainer')
      .classList.add('stuffgenerator_starttoolbuttondisabled')
  }
}

function enableStartToolButton() {
  if (
    document
      .getElementById('stuffgenerator_player_top_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé' &&
    document
      .getElementById('stuffgenerator_player_jungle_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé' &&
    document
      .getElementById('stuffgenerator_player_middle_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé' &&
    document
      .getElementById('stuffgenerator_player_adc_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé' &&
    document
      .getElementById('stuffgenerator_player_support_champ')
      .getAttribute('data-tippy-content') !== 'Indéterminé'
  ) {
    if (
      document
        .getElementById('stuffgenerator_starttoolbuttoncontainer')
        .classList.contains('stuffgenerator_starttoolbuttondisabled')
    ) {
      document
        .getElementById('stuffgenerator_starttoolbuttoncontainer')
        .classList.remove('stuffgenerator_starttoolbuttondisabled')
    }
  } else {
    if (
      !document
        .getElementById('stuffgenerator_starttoolbuttoncontainer')
        .classList.contains('stuffgenerator_starttoolbuttondisabled')
    ) {
      document
        .getElementById('stuffgenerator_starttoolbuttoncontainer')
        .classList.add('stuffgenerator_starttoolbuttondisabled')
    }
  }
}

function champSelectorSearchInput() {
  if (document.getElementById('stuffgenerator_champselector_search').value !== '') {
    document.querySelectorAll('#stuffgenerator_champselector_content div').forEach((item) => {
      if (
        item
          .getAttribute('data-tippy-content')
          .toLowerCase()
          .indexOf(
            document.getElementById('stuffgenerator_champselector_search').value.toLowerCase()
          ) !== -1
      ) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  } else {
    document.querySelectorAll('#stuffgenerator_champselector_content div').forEach((item) => {
      item.style.display = 'block'
    })
  }
}

function playerChampClick(event) {
  Array.from(
    document.getElementsByClassName('stuffgenerator_champselector_notclickablechampion')
  ).forEach((champion) => {
    champion.addEventListener('click', championSelectorClick)
    champion.classList.remove('stuffgenerator_champselector_notclickablechampion')
  })
  targetOfSelectedChamp = event.target.id
    .replace('_champ', '')
    .replace('stuffgenerator_player_', '')
  document.getElementById('stuffgenerator_champselectorcontainer').style.display = 'block'
  document.getElementById('stuffgenerator_champselector_search').focus()
}

function championSelectorClick(event) {
  document.getElementById(
    `stuffgenerator_player_${targetOfSelectedChamp}_champ`
  ).style.backgroundImage = event.target.style.backgroundImage
  document
    .getElementById(`stuffgenerator_player_${targetOfSelectedChamp}_champ`)
    .setAttribute('data-value', event.target.getAttribute('data-value'))
  document
    .getElementById(`stuffgenerator_player_${targetOfSelectedChamp}_champ`)
    .setAttribute('data-tippy-content', event.target.getAttribute('data-tippy-content'))
  document
    .getElementById(`stuffgenerator_player_${targetOfSelectedChamp}_champ`)
    ._tippy.setContent(event.target.getAttribute('data-tippy-content'))
  document
    .getElementById(`stuffgenerator_player_${targetOfSelectedChamp}_champ`)
    .dispatchEvent(new Event('change'))
  document.getElementById('stuffgenerator_champselectorcontainer').style.display = 'none'
  document.getElementById('stuffgenerator_champselector_search').value = ''
  document.getElementById('stuffgenerator_champselector_search').dispatchEvent(new Event('input'))
  targetOfSelectedChamp = 'unknown'
}

async function replaceItem(event) {
  if (event.target.getAttribute('data-tippy-content') !== 'Indéterminé') {
    let lane = event.target.id.replace('_item', '').replace('stuffgenerator_player_', '')
    lane = lane.substring(0, lane.length - 1)
    let currentItems = []
    for (let i = 1; i <= 7; i++) {
      if (
        document
          .getElementById(`stuffgenerator_player_${lane}_item${i}`)
          .hasAttribute('data-item-name')
      ) {
        currentItems.push(
          document
            .getElementById(`stuffgenerator_player_${lane}_item${i}`)
            .getAttribute('data-item-name')
        )
      }
    }

    let newItem = await generatePlayerItem(event.target.getAttribute('data-type'))
    while (currentItems.includes(newItem.name)) {
      newItem = await generatePlayerItem(event.target.getAttribute('data-type'))
    }
    event.target.style.backgroundImage = `url('https://ddragon.noxelis.dev/lol/latest/img/item/${newItem.image.full}')`
    event.target.setAttribute('data-item-name', newItem.name)
    event.target.setAttribute('data-tippy-content', newItem.name)
    event.target._tippy.setContent(newItem.name)
  }
}
</script>

<template>
  <div id="stuffgenerator">
    <video id="stuffgenerator_background"></video>
    <div id="stuffgenerator_content">
      <div id="stuffgenerator_header">
        <div
          id="stuffgenerator_header_returnbutton"
          @mouseenter="returnButtonMouseEnter"
          @click="returnButtonClick"
        ></div>
        <div id="stuffgenerator_header_separator"></div>
        <div id="stuffgenerator_header_toolicon"></div>
        <div id="stuffgenerator_header_toolname">STUFF ALÉATOIRE (ÉQUIPE)</div>
      </div>

      <table id="stuffgenerator_table">
        <tr id="stuffgenerator_colnames">
          <td></td>
          <td>
            <div
              id="stuffgenerator_colname_runes1"
              data-tippy-content="Runes de la branche principale"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_colname_runes2"
              data-tippy-content="Runes de la branche secondaire"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_colname_runes3"
              data-tippy-content="Runes pour les statistiques"
            ></div>
          </td>
          <td>
            <div id="stuffgenerator_colname_stuff" data-tippy-content="Stuff"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_colname_summoners"
              data-tippy-content="Sorts d'invocateurs"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_colname_spell"
              data-tippy-content="Pouvoir principal du champion"
            ></div>
          </td>
        </tr>

        <tr id="stuffgenerator_player_top" class="stuffgenerator_playerarea">
          <td>
            <div
              id="stuffgenerator_player_top_champ"
              class="stuffgenerator_player_champpict"
              data-tippy-content="Indéterminé"
              @click="playerChampClick"
              @change="enableStartToolButton"
            ></div>
            <div class="stuffgenerator_player_laneicon" data-tippy-content="Top"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_rune1"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune2"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune3"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune4"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_rune5"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune6"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_rune7"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune8"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_rune9"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_item1"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item2"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item3"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item4"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item5"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item6"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_top_item7"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_summoner1"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_summoner2"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_top_mainspell"
              class="stuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_top_mainspell_letter"
              class="stuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>

        <tr id="stuffgenerator_player_jungle" class="stuffgenerator_playerarea">
          <td>
            <div
              id="stuffgenerator_player_jungle_champ"
              class="stuffgenerator_player_champpict"
              data-tippy-content="Indéterminé"
              @click="playerChampClick"
              @change="enableStartToolButton"
            ></div>
            <div class="stuffgenerator_player_laneicon" data-tippy-content="Jungle"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_rune1"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune2"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune3"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune4"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_rune5"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune6"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_rune7"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune8"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_rune9"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_item1"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item2"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item3"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item4"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item5"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item6"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_jungle_item7"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_summoner1"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_summoner2"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_jungle_mainspell"
              class="stuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_jungle_mainspell_letter"
              class="stuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>

        <tr id="stuffgenerator_player_middle" class="stuffgenerator_playerarea">
          <td>
            <div
              id="stuffgenerator_player_middle_champ"
              class="stuffgenerator_player_champpict"
              data-tippy-content="Indéterminé"
              @click="playerChampClick"
              @change="enableStartToolButton"
            ></div>
            <div class="stuffgenerator_player_laneicon" data-tippy-content="Mid"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_rune1"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune2"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune3"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune4"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_rune5"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune6"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_rune7"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune8"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_rune9"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_item1"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item2"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item3"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item4"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item5"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item6"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_middle_item7"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_summoner1"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_summoner2"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_middle_mainspell"
              class="stuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_middle_mainspell_letter"
              class="stuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>

        <tr id="stuffgenerator_player_adc" class="stuffgenerator_playerarea">
          <td>
            <div
              id="stuffgenerator_player_adc_champ"
              class="stuffgenerator_player_champpict"
              data-tippy-content="Indéterminé"
              @click="playerChampClick"
              @change="enableStartToolButton"
            ></div>
            <div class="stuffgenerator_player_laneicon" data-tippy-content="ADC"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_rune1"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune2"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune3"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune4"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_rune5"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune6"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_rune7"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune8"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_rune9"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_item1"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item2"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item3"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item4"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item5"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item6"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_adc_item7"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_summoner1"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_summoner2"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_adc_mainspell"
              class="stuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_adc_mainspell_letter"
              class="stuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>

        <tr id="stuffgenerator_player_support" class="stuffgenerator_playerarea">
          <td>
            <div
              id="stuffgenerator_player_support_champ"
              class="stuffgenerator_player_champpict"
              data-tippy-content="Indéterminé"
              @click="playerChampClick"
              @change="enableStartToolButton"
            ></div>
            <div class="stuffgenerator_player_laneicon" data-tippy-content="Support"></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_rune1"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune2"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune3"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune4"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_rune5"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune6"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_rune7"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune8"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_rune9"
              class="stuffgenerator_player_rune"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_item1"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item2"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item3"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item4"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item5"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item6"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
            <div
              id="stuffgenerator_player_support_item7"
              class="stuffgenerator_player_item"
              data-tippy-content="Indéterminé"
              @click="replaceItem"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_summoner1"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_summoner2"
              class="stuffgenerator_player_summoner"
              data-tippy-content="Indéterminé"
            ></div>
          </td>
          <td>
            <div
              id="stuffgenerator_player_support_mainspell"
              class="stuffgenerator_player_spell"
              data-tippy-content="Indéterminé"
            ></div>
            <div
              id="stuffgenerator_player_support_mainspell_letter"
              class="stuffgenerator_player_spellletter"
            >
              ?
            </div>
          </td>
        </tr>
      </table>

      <div id="stuffgenerator_champselectorcontainer">
        <div id="stuffgenerator_champselector">
          <div id="stuffgenerator_champselector_header">CHOIX DU CHAMPION</div>
          <div id="stuffgenerator_champselector_separator"></div>
          <input
            id="stuffgenerator_champselector_search"
            type="text"
            placeholder="Nom du champion à rechercher"
            @input="champSelectorSearchInput"
          />
          <div id="stuffgenerator_champselector_content"></div>
        </div>
      </div>

      <div id="stuffgenerator_actionscontainer">
        <div
          id="stuffgenerator_exitbutton"
          @mouseenter="exitButtonMouseEnter"
          @click="exitButtonClick"
        ></div>
        <div id="stuffgenerator_leftdecoration"></div>
        <div id="stuffgenerator_rightdecoration"></div>
        <div
          id="stuffgenerator_starttoolbuttoncontainer"
          class="stuffgenerator_starttoolbuttondisabled"
          @mouseenter="startToolButtonMouseEnter"
          @click="startToolButtonClick"
        >
          <div id="stuffgenerator_starttoolbutton"></div>
          <div id="stuffgenerator_starttoolbuttontext">GÉNÉRER LES STUFFS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#stuffgenerator {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
  overflow: hidden;
  display: none;

  #stuffgenerator_background {
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

  #stuffgenerator_content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: calc(100vh - 79px);
    margin-top: 79px;
    text-align: center;
    z-index: 2;

    #stuffgenerator_header {
      position: absolute;
      top: 15px;
      left: 25px;
      width: fit-content;
      height: 28px;

      #stuffgenerator_header_returnbutton {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow.png');
        background-size: 28px 28px;
        background-repeat: no-repeat;
      }

      #stuffgenerator_header_returnbutton:hover {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-over.png');
      }

      #stuffgenerator_header_returnbutton:active {
        background-image: url('../assets/img/tools/common/header/returnbutton/button-framedarrow-down.png');
      }

      #stuffgenerator_header_separator {
        display: inline-block;
        width: 1px;
        height: 28px;
        background-color: #434b50;
        margin-left: 13px;
      }

      #stuffgenerator_header_toolicon {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('../assets/img/tools/stuffgenerator/battletraining-active.png');
        background-size: 22px 22px;
        background-position: center center;
        background-repeat: no-repeat;
        margin-left: 14px;
      }

      #stuffgenerator_header_toolname {
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

    #stuffgenerator_table {
      width: 1000px;
      height: 520px;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;

      #stuffgenerator_colnames {
        td {
          height: 20px;

          #stuffgenerator_colname_runes1,
          #stuffgenerator_colname_runes2,
          #stuffgenerator_colname_runes3,
          #stuffgenerator_colname_stuff,
          #stuffgenerator_colname_summoners,
          #stuffgenerator_colname_spell {
            display: inline-block;
            width: 100%;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            background-position: center center;
          }

          #stuffgenerator_colname_runes1,
          #stuffgenerator_colname_runes2,
          #stuffgenerator_colname_runes3 {
            background-image: url('../assets/img/tools/stuffgenerator/colnames/RunesIcon.png');
          }

          #stuffgenerator_colname_stuff {
            background-image: url('../assets/img/tools/stuffgenerator/colnames/gold.png');
          }

          #stuffgenerator_colname_spell {
            background-image: url('../assets/img/tools/stuffgenerator/colnames/champion.png');
          }

          #stuffgenerator_colname_summoners {
            background-image: url('../assets/img/tools/stuffgenerator/colnames/spells.png');
          }
        }
      }

      .stuffgenerator_player_champpict {
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

      .stuffgenerator_player_laneicon {
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
      }

      .stuffgenerator_player_rune,
      .stuffgenerator_player_item,
      .stuffgenerator_player_summoner,
      .stuffgenerator_player_spell {
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

      .stuffgenerator_player_spellletter {
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

      #stuffgenerator_player_top {
        .stuffgenerator_player_laneicon {
          background-image: url('../assets/img/tools/stuffgenerator/lanes/top.png');
        }
      }

      #stuffgenerator_player_jungle {
        .stuffgenerator_player_laneicon {
          background-image: url('../assets/img/tools/stuffgenerator/lanes/jungle.png');
        }
      }

      #stuffgenerator_player_middle {
        .stuffgenerator_player_laneicon {
          background-image: url('../assets/img/tools/stuffgenerator/lanes/mid.png');
        }
      }

      #stuffgenerator_player_adc {
        .stuffgenerator_player_laneicon {
          background-image: url('../assets/img/tools/stuffgenerator/lanes/bottom.png');
        }
      }

      #stuffgenerator_player_support {
        .stuffgenerator_player_laneicon {
          background-image: url('../assets/img/tools/stuffgenerator/lanes/support.png');
        }
      }

      #stuffgenerator_player_top,
      #stuffgenerator_player_jungle,
      #stuffgenerator_player_middle,
      #stuffgenerator_player_adc,
      #stuffgenerator_player_support {
        td {
          .stuffgenerator_player_spell {
            margin-top: 2px;
            margin-right: -15px;
          }
        }
      }
    }

    #stuffgenerator_champselectorcontainer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 1000;

      #stuffgenerator_champselector {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 744px;
        height: 544px;
        background-color: #010a13;
        border: 2px solid #463714;
        transform: translate(-50%, -50%);
        overflow: hidden;

        #stuffgenerator_champselector_header {
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

        #stuffgenerator_champselector_separator {
          position: absolute;
          top: 77px;
          left: 18px;
          width: 708px;
          height: 1px;
          background-color: #1e2328;
        }

        #stuffgenerator_champselector_search {
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

        #stuffgenerator_champselector_content {
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

    #stuffgenerator_actionscontainer {
      position: absolute;
      left: calc(50% - 158px);
      bottom: 11px;
      width: 316px;
      height: 48px;

      #stuffgenerator_exitbutton,
      #stuffgenerator_exitbutton_disabled {
        position: absolute;
        top: 5px;
        left: 18px;
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-size: 32px 32px;
        z-index: 10;
      }

      #stuffgenerator_exitbutton {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #stuffgenerator_exitbutton_disabled {
        background-image: url('../assets/img/tools/common/actions/exit/close_button.png');
      }

      #stuffgenerator_exitbutton:hover {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_over.png');
      }

      #stuffgenerator_exitbutton:active {
        background-image: url('../assets/img/tools/common/actions/exit/close_button_down.png');
      }

      #stuffgenerator_leftdecoration,
      #stuffgenerator_rightdecoration {
        position: absolute;
        width: 122px;
        height: 28px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 122px 28px;
        z-index: 1;
      }

      #stuffgenerator_leftdecoration {
        top: -3px;
        left: -44px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
      }

      #stuffgenerator_rightdecoration {
        top: -3px;
        right: -46px;
        background-image: url('../assets/img/tools/common/actions/postgame-button-decoration.png');
        transform: scaleX(-1);
      }

      #stuffgenerator_starttoolbuttoncontainer {
        position: absolute;
        top: -3px;
        left: 65px;
        width: 188px;
        height: 47px;
        z-index: 9;

        #stuffgenerator_starttoolbutton {
          position: absolute;
          top: 0;
          left: 0;
          width: 188px;
          height: 47px;
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match.png');
          background-repeat: no-repeat;
          background-size: 188px 47px;
        }

        #stuffgenerator_starttoolbuttontext {
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

      #stuffgenerator_starttoolbuttoncontainer:hover {
        #stuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-over.png');
        }

        #stuffgenerator_starttoolbuttontext {
          color: #f0e6d2;
        }
      }

      #stuffgenerator_starttoolbuttoncontainer:active {
        #stuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-down.png');
        }

        #stuffgenerator_starttoolbuttontext {
          color: #035478;
        }
      }

      #stuffgenerator_starttoolbuttoncontainer.stuffgenerator_starttoolbuttondisabled,
      #stuffgenerator_starttoolbuttoncontainer.stuffgenerator_starttoolbuttondisabled:hover {
        #stuffgenerator_starttoolbutton {
          background-image: url('../assets/img/tools/common/actions/starttool/button-find-match-disabled.png');
        }

        #stuffgenerator_starttoolbuttontext {
          color: #5d6060;
        }
      }
    }
  }
}
</style>
