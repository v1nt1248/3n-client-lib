<script setup lang="ts">
import Demo from './demo/demo.vue';
</script>

<template>
  <div class="app">
    <demo />
  </div>
</template>

<style>
/* for the demo page */
#ui-3n-lib {
  position: fixed;
  inset: 0;
  background-color: var(--white-0);
}
</style>

<style lang="scss" scoped>
.app {
  position: fixed;
  inset: 0;
  padding: 8px;
  font-family: Manrope, sans-serif;
  background: var(--grey-15);
  overflow: auto;
}
</style>
