<script setup lang="ts">
import Demo from './demo/demo.vue';

/*
const prepareVList = () => Array
  .from({ length: 5000 }, (_, i) => ({
    id: `${i}i`,
    title: `Item ${i}`,
  }));
const listV = ref(prepareVList());
*/
</script>

<template>
  <div class="app">
    <demo />
  </div>
</template>

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
