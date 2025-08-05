<script setup>
import ClientHeader from './ClientHeader.vue'
import ClientContent from './ClientContent.vue'
import ClientSidebar from './ClientSidebar.vue'
</script>

<template>
  <div id="mainui">
    <ClientHeader />
    <ClientContent />
    <ClientSidebar />
  </div>
</template>

<style scoped lang="scss">
#mainui {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}
</style>
