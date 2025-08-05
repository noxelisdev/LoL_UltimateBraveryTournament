<script setup>
import Homepage from './Homepage.vue'
</script>

<template>
  <div id="contentarea">
    <Homepage />
    <!--{% include "pages/toolselector.html.twig" %}-->
    <!--{% include "tools/champlistgenerator.html.twig" %}-->
    <!--{% include "tools/solostuffgenerator.html.twig" %}-->
    <!--{% include "tools/stuffgenerator.html.twig" %}-->
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
