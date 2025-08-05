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
    'https://lol.ddragon.infinity54.fr/latest/data/fr_FR/champion.json'
  )
  for (const key of Object.keys(champions.data)) {
    let championId = key

    if (championId === 'Fiddlesticks') {
      championId = 'FiddleSticks'
    }

    const championData = await window.api.retrieveData(
      `https://lol.ddragon.infinity54.fr/latest/data/fr_FR/champion/${championId}.json`
    )
    leagueData.champions[championId] = championData.data[championId]
    progress += 24 / Object.keys(champions.data).length
    document.getElementById('startup_progress').style.width = `${progress}%`
  }

  // Récupération des données des runes
  leagueData.runes.main = await window.api.retrieveData(
    'https://lol.ddragon.infinity54.fr/latest/data/fr_FR/runesReforged.json'
  )
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`

  // Récupération des données des objets
  leagueData.items = await window.api.retrieveData(
    'https://lol.ddragon.infinity54.fr/latest/data/fr_FR/item.json'
  )
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`

  // Récupération des données des sorts d'invocateur
  leagueData.summoners = await window.api.retrieveData(
    'https://lol.ddragon.infinity54.fr/latest/data/fr_FR/summoner.json'
  )
  progress += 24
  document.getElementById('startup_progress').style.width = `${progress}%`
  window.league.storeData('all', leagueData)

  // Tirage au sort du champion mis en avant
  const champIds = Object.keys(leagueData.champions)
  const selectedId = Math.floor(Math.random() * champIds.length)
  const highlightedChampion = leagueData.champions[champIds[selectedId]]
  document.getElementById('championhighlight_name').innerHTML = highlightedChampion.name
  document.getElementById('championhighlight_portrait').style.backgroundImage =
    `url('https://lol.ddragon.infinity54.fr/img/champion/tiles/${highlightedChampion.id}_0.jpg')`

  for (const skinKey in highlightedChampion.skins) {
    const skinData = highlightedChampion.skins[skinKey]
    let skin = document.createElement('div')
    skin.style.backgroundImage = `url('https://lol.ddragon.infinity54.fr/img/champion/centered/${highlightedChampion.id}_${skinData.num}.jpg')`
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

  // Démarrage de l'application
  document.getElementById('startup').animate([{ opacity: 1 }, { opacity: 0 }], 500)
  playSound(sndStartupFinished)
  //initChampListGenerator()
  //enableSoloChampSelectorClickEvent()
  //enableChampSelectorClickEvent()

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
