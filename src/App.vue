<script setup lang="ts">
import Demo from './demo/demo.vue';

/*
const prepareList = () => {
  const res: any[] = [];
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    res.push({
      id: char,
      title: `${char}`,
      children: [
        { id: `${char}-01`, title: `01 ${char} item` },
        { id: `${char}-02`, title: `02 ${char} item` },
        { id: `${char}-03`, title: `03 ${char} item` },
      ],
    });
  }
  return res;
};

const prepareVList = () => Array
  .from({ length: 5000 }, (_, i) => ({
    id: `${i}i`,
    title: `Item ${i}`,
  }));

const tabsValue = ref(0);
const list = ref(prepareList());
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

    <div class="app-block">
      <ui3n-list
        :sticky="false"
        :items="list"
      >
        <template #item="{ item }">
          <ui3n-list
            :items="item.children"
          >
            <template #title>
              <div class="list-title">
                {{ item.title }}
              </div>
            </template>

            <template #item="{ item: children }">
              <div class="list-item">
                {{ children.title }}
              </div>
            </template>
          </ui3n-list>
        </template>
      </ui3n-list>
    </div>
    -->
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: fixed;
  inset: 0;
  padding: 8px;
  font-family: Manrope, sans-serif;
  background: #eee;
  overflow: auto;
  //
  //.list {
  //  &-title {
  //    font-size: 14px;
  //    font-weight: 600;
  //    background-color: #fff;
  //    z-index: 10;
  //    position: relative;
  //    width: 24px;
  //  }
  //
  //  &-item {
  //    padding-left: 24px;
  //  }
  //}
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
