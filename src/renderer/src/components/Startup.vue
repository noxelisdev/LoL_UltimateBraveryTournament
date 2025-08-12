<script setup>
import tippy from 'tippy.js'
import { playSound } from '../common/audio'
import sndStartupFinished from '../assets/snd/ui/startup_loadingfinished.ogg'

window.api.noUpdateAvailable(() => {
  document.getElementById('startup_progresstext').innerHTML = 'CHARGEMENT...'
  appInitialization()
})

window.api.updateAvailable(() => {
  document.getElementById('startup_progresstext').innerHTML = 'TÉLÉCHARGEMENT DE LA MISE À JOUR...'
})

window.api.updateDownloading((event, args) => {
  document.getElementById('startup_progresstext').width = args.percent + '%'
})

window.api.updateDownloaded(() => {
  document.getElementById('startup_progresstext').innerHTML = 'PRÉPARATION DE LA MISE À JOUR...'
})

async function appInitialization() {
  let progress = 0.0
  let leagueData = await window.league.getData('all')

  // Récupération des données des champions
  const champions = await window.api.retrieveData(
    'https://lol.ddragon.noxelis.dev/latest/data/fr_FR/champion.json'
  )
  for (const key of Object.keys(champions.data)) {
    let championId = key

    const championData = await window.api.retrieveData(
      `https://lol.ddragon.noxelis.dev/latest/data/fr_FR/champion/${championId}.json`
    )
    leagueData.champions[championId] = championData.data[championId]
    progress += 24 / Object.keys(champions.data).length
    document.getElementById('startup_progress').style.width = `${progress}%`
  }

  // Récupération des données des runes
  leagueData.runes.main = await window.api.retrieveData(
    'https://lol.ddragon.noxelis.dev/latest/data/fr_FR/runesReforged.json'
  )
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`

  // Récupération des données des objets
  const itemsData = await window.api.retrieveData(
    'https://lol.ddragon.noxelis.dev/latest/data/fr_FR/item.json'
  )
  let supportItems = []
  let jungleItems = []
  let bootsItems = []
  let legendaryItems = []
  let items = {
    boots: [],
    jungle: [],
    legendary: [],
    support: []
  }

  for (const item in itemsData.data) {
    const itemData = itemsData.data[item]

    // Check if item is usable
    if (
      itemData.maps[11] &&
      itemData.gold.purchasable &&
      !itemData.requiredAlly &&
      itemData.tags.indexOf('Consumable') === -1 &&
      itemData.tags.indexOf('Trinket') === -1 &&
      !itemData.requiredChampion
    ) {
      // Boots items
      if (itemData.tags.indexOf('Boots') > -1 && itemData.depth) {
        bootsItems.push(itemData)
      }

      // Jungle items
      if (itemData.tags.indexOf('Jungle') > -1 && itemData.name.startsWith('Bébé')) {
        jungleItems.push(itemData)
      }

      // Support items
      if (itemData.tags.indexOf('GoldPer') > -1 && !itemData.specialRecipe) {
        supportItems.push(itemData)
      }

      // Legendary items
      if (
        itemData.tags.indexOf('Boots') === -1 &&
        itemData.tags.indexOf('Jungle') === -1 &&
        itemData.tags.indexOf('Lane') === -1 &&
        itemData.description.indexOf('Propriété passive mythique') === -1 &&
        !itemData.specialRecipe &&
        !itemData.info &&
        !itemData.into
      ) {
        legendaryItems.push(itemData)
      }
    }
  }
  items.boots = bootsItems
  items.jungle = jungleItems
  items.support = supportItems
  items.legendary = legendaryItems
  leagueData.items = items
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`

  // Récupération des données des sorts d'invocateur
  const summonersData = await window.api.retrieveData(
    'https://lol.ddragon.noxelis.dev/latest/data/fr_FR/summoner.json'
  )
  let summoners = []
  for (const summonerData in summonersData.data) {
    if (
      summonerData.includes('Cherry') === false &&
      summonerData.includes('Poro') === false &&
      summonerData.includes('Snowball') === false &&
      summonerData.includes('UltBook') === false
    ) {
      summoners.push(summonersData.data[summonerData])
    }
  }
  leagueData.summoners = summoners
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`
  window.league.storeData('all', leagueData)

  // Tirage au sort du champion mis en avant
  const champIds = Object.keys(leagueData.champions)
  const selectedId = Math.floor(Math.random() * champIds.length)
  const highlightedChampion = leagueData.champions[champIds[selectedId]]
  document.getElementById('championhighlight_name').innerHTML = highlightedChampion.name
  document.getElementById('championhighlight_portrait').style.backgroundImage =
    `url('https://lol.ddragon.noxelis.dev/img/champion/tiles/${highlightedChampion.id}_0.jpg')`

  for (const skinKey in highlightedChampion.skins) {
    const skinData = highlightedChampion.skins[skinKey]
    let skin = document.createElement('div')
    skin.style.backgroundImage = `url('https://lol.ddragon.noxelis.dev/img/champion/centered/${highlightedChampion.id}_${skinData.num}.jpg')`
    skin.style.height = `calc(100% / ${highlightedChampion.skins.length})`
    skin.setAttribute(
      'data-tippy-content',
      skinData.name !== 'default' ? skinData.name : highlightedChampion.name
    )
    skin.setAttribute('data-tippy-placement', 'left')
    skin.setAttribute('data-skinnumber', skinData.num)
    skin.id = `championhighlight_skin_${highlightedChampion.id}_${skinData.num}`
    skin.classList.add('championhighlight_skin')
    document.getElementById('championhighlight_skins').appendChild(skin)
    tippy(skin, { theme: 'lol' })
  }
  progress += 4
  document.getElementById('startup_progress').style.width = `${progress}%`
  document.getElementById('startup_progresstext').innerHTML = 'INITIALISATION...'

  // Initialisation de l'outil de génération de liste aléatoire de champions
  document
    .getElementById('champlistgenerator_tooloptions_numberofchampions')
    .setAttribute('max', champIds.length)

  // Initialisation du sélecteur de champions de l'outil de génération de stuff solo aléatoire
  for (const championId in leagueData.champions) {
    const champion = document.createElement('div')
    champion.style.backgroundImage = `url('https://lol.ddragon.noxelis.dev/img/champion/tiles/${leagueData.champions[championId].id}_0.jpg')`
    champion.setAttribute('data-value', leagueData.champions[championId].id)
    champion.setAttribute('data-tippy-content', leagueData.champions[championId].name)
    champion.addEventListener('click', (event) => {
      document.getElementById('solostuffgenerator_player_champ').style.backgroundImage =
        event.target.style.backgroundImage
      document
        .getElementById('solostuffgenerator_player_champ')
        .setAttribute('data-value', event.target.getAttribute('data-value'))
      document
        .getElementById('solostuffgenerator_player_champ')
        .setAttribute('data-tippy-content', event.target.getAttribute('data-tippy-content'))
      document
        .getElementById('solostuffgenerator_player_champ')
        ._tippy.setContent(event.target.getAttribute('data-tippy-content'))
      document.getElementById('solostuffgenerator_champselectorcontainer').style.display = 'none'
      document.getElementById('solostuffgenerator_champselector_search').value = ''
      document
        .getElementById('solostuffgenerator_champselector_search')
        .dispatchEvent(new Event('input'))
      document.getElementById('solostuffgenerator_player_champ').dispatchEvent(new Event('change'))
    })
    document.getElementById('solostuffgenerator_champselector_content').appendChild(champion)
    tippy(champion, { theme: 'lol' })
  }

  // Initialisation du sélecteur de champions de l'outil de génération de stuff d'équipe aléatoire
  for (const championId in leagueData.champions) {
    const champion = document.createElement('div')
    champion.style.backgroundImage = `url('https://lol.ddragon.noxelis.dev/img/champion/tiles/${leagueData.champions[championId].id}_0.jpg')`
    champion.setAttribute('data-value', leagueData.champions[championId].id)
    champion.setAttribute('data-tippy-content', leagueData.champions[championId].name)
    champion.classList.add('stuffgenerator_champselector_notclickablechampion')
    document.getElementById('stuffgenerator_champselector_content').appendChild(champion)
    tippy(champion, { theme: 'lol' })
  }

  // Démarrage de l'application
  document.getElementById('startup').animate([{ opacity: 1 }, { opacity: 0 }], 500)
  playSound(sndStartupFinished)

  setTimeout(() => {
    document.getElementById('startup').style.display = 'none'
  }, 500)
}
</script>

<template>
  <div id="startup">
    <div id="startup_ring"></div>
    <div id="startup_logo"></div>
    <div id="startup_progresstext">RECHERCHE D'UNE MISE À JOUR...</div>
    <div id="startup_progressbar">
      <div id="startup_progress"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes ringRotation {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

#startup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #010a13;
  background-image: url('../assets/img/ui/startup/startup_background.jpg');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 999;

  #startup_ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 505px;
    height: 505px;
    background-image: url('../assets/img/ui/startup/startup_ring.png');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: ringRotation 90s linear infinite;
    opacity: 50%;
  }

  #startup_logo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translate(-50%, -71%);
    background-image: url('../assets/img/ui/lol_icon.png');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  #startup_progresstext {
    position: absolute;
    top: 59%;
    left: 50%;
    width: 365px;
    height: 15px;
    transform: translate(calc(-50% - 1px), -3px);
    font-family: 'Beaufort for LoL';
    font-weight: 700;
    font-style: normal;
    font-size: 19px;
    text-align: center;
    line-height: 100%;
    color: #c8aa6e;
  }

  #startup_progressbar {
    position: absolute;
    top: 63%;
    left: 50%;
    width: 200px;
    height: 12px;
    transform: translate(-50%, -5.5px);
    border: 1px solid #c8aa6e;
    border-radius: 10px;
    overflow: hidden;

    #startup_progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, #005a82 0%, #6bc8d2 100%);
    }
  }
}
</style>
