<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { ref } from 'vue'
  import { useAppStore } from './store/app.store'
  import Ui3nList from './components/ui3n-list.vue'
  import Ui3nListAnchor from './components/ui3n-list-anchor.vue'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useAppStore()

  const prepareList = () => {
    const res = []
    for (let i = 0; i < 26; i++) {
      res.push(String.fromCharCode(65 + i))
    }
    return res
  }

  const list = ref(prepareList())
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-list
        sticky
        title="LIST TITLE"
        :items="list"
      />

      <!-- <ui3n-list>
        <div
          v-for="item in list"
          :key="item"
        >
          <ui3n-list-anchor
            :sticky="false"
            class="list__header"
          >
            {{ item }}
          </ui3n-list-anchor>

          <div class="list__item">
            {{ item }} item
          </div>
          <div class="list__item">
            {{ item }} item
          </div>
          <div class="list__item">
            {{ item }} item
          </div>
        </div>
      </ui3n-list> -->

      <!-- <ui3n-list virtual>
        <ui3n-list
          v-for="item in list"
          :key="item"
        >
          <template #title>
            <div class="list__header">
              {{ item }}
            </div>
          </template>

          <div class="list__item">
            {{ item }} item
          </div>
          <div class="list__item">
            {{ item }} item
          </div>
          <div class="list__item">
            {{ item }} item
          </div>
        </ui3n-list>
      </ui3n-list> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    position: fixed;
    inset: 0;
    padding: 8px;

    &-block {
      position: relative;
      width: 250px;
      height: 500px;
      margin-bottom: 20px;
      overflow-y: auto;
    }

    .list__header {
      width: 100%;
      height: 28px;
      display: flex;
      padding: 0 16px;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      background-color: #b0dafc;
      color: #4744e4;
    }

    .list__item {
      position: relative;
      height: 24px;
      display: flex;
      padding: 0 8px;
      font-size: 14px;
      font-weight: 400;
    }
  }
</style>
