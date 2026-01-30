<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // Récupération de la version installée
  const version = await window.api.getAppVersion()
  document.getElementById('app_version').innerHTML = document
    .getElementById('app_version')
    .innerHTML.replace('X.X.X', `${version}`)

  // Récupération du numéro de la dernière version de LoL
  const manifest = await window.api.retrieveData(
    'https://ddragon.noxelis.dev/lol/latest/manifest.json'
  )
  document.getElementById('app_version').innerHTML = document
    .getElementById('app_version')
    .innerHTML.replace('XX.XX', `${manifest.v.substring(0, manifest.v.length - 2)}`)
})
</script>

<template>
  <div id="sidebararea">
    <div id="championhighlight_skins"></div>
    <div id="app_version">Version X.X.X - LoL XX.XX</div>
  </div>
</template>

<style scoped lang="scss">
#sidebararea {
  position: fixed;
  top: 0;
  left: calc(100vw - 224px);
  width: 224px;
  height: 100vh;
  background-color: #010a13;

  #championhighlight_skins {
    position: absolute;
    top: 79px;
    left: 0;
    width: 224px;
    height: calc(100vh - 79px - 34px);
    overflow: hidden;

    :deep(.championhighlight_skin) {
      position: relative;
      width: 224px;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      z-index: 1;
    }

    :deep(.championhighlight_skin):active {
      position: absolute;
      top: 0;
      left: 0;
      width: 224px;
      height: calc(100vh - 79px - 34px) !important;
      z-index: 10;
    }
  }

  #app_version {
    position: absolute;
    top: 686px;
    left: 0;
    width: 100%;
    height: 34px;
    border-top: 1px solid #1e282d;
    background-color: #010a13;
    font-family: 'Beaufort for LoL';
    font-size: 13px;
    text-align: center;
    line-height: 34px;
    color: #3c3c41;
  }
}
</style>
