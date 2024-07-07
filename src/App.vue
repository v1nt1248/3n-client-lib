<script setup lang="ts">
import Demo from './demo/demo.vue';

/*
const prepareVList = () => Array
  .from({ length: 5000 }, (_, i) => ({
    id: `${i}i`,
    title: `Item ${i}`,
  }));

const tabsValue = ref(0);
const listV = ref(prepareVList());
const text = ref(`Hello <b>Bro</b> !!!`);
*/
</script>

<template>
  <div class="app">
    <demo />

    <!--
    <ui3n-tabs
      v-model="tabsValue"
      item-direction="vertical"
      indicator-position="reverse"
    >
      <div class="tabs__item">Option 1</div>
      <div class="tabs__item">Option 2</div>
      <div class="tabs__item">Option 3</div>
      <ui3n-button class="tabs__item">Option 4</ui3n-button>
    </ui3n-tabs>
    <br>
    <p>{{ tabsValue }}</p>

    <p v-ui3n-html.sanitize="text" />
    -->
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
  //
  //.tabs {
  //  &__item {
  //    display: flex;
  //    width: 100px;
  //    justify-content: center;
  //    align-items: center;
  //    min-height: 32px;
  //  }
  //}
}
</style>
