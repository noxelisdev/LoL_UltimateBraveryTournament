<script setup>
import Homepage from './Homepage.vue'
import ToolSelector from './ToolSelector.vue'
import ChampListGenerator from './ChampListGenerator.vue'
import SoloStuffGenerator from './SoloStuffGenerator.vue'
import StuffGenerator from "./StuffGenerator.vue";
</script>

<template>
  <div id="contentarea">
    <Homepage />
    <ToolSelector />
    <ChampListGenerator />
    <SoloStuffGenerator />
    <StuffGenerator />
  </div>
</template>

<style scoped lang="scss">
#contentarea {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
}
</style>
