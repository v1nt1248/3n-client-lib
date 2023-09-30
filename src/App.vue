<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { ref } from 'vue'
  import Ui3nButton from './components/ui3n-button.vue'
  import Ui3nList from './components/ui3n-list.vue'
  import Ui3nVirtualScroll from './components/ui3n-virtual-scroll.vue'

  const prepareList = () => {
    const res: any[] = []
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i)
      res.push({
        id: char,
        title: `${char}`,
        children: [
          { id: `${char}-01`, title: `01 ${char} item` },
          { id: `${char}-02`, title: `02 ${char} item` },
          { id: `${char}-03`, title: `03 ${char} item` },
        ],
      })
    }
    return res
  }

  const prepareVList = () => Array
    .from({ length: 5000 }, (_, i) => ({
      id: `${i}i`,
      title: `Item ${i}`,
    }))

  const list = ref(prepareList()) 
  const listV = ref(prepareVList())
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <ui3n-button>
      Done
    </ui3n-button>

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
              <div class="list-item">{{ children.title }}</div>
            </template>
          </ui3n-list>
        </template>
      </ui3n-list>
    </div>
    <br><br>
    <div class="app-block">
      <ui3n-virtual-scroll
        :items="listV"
        :min-child-height="24"
      >
        <template #item="{ item, index }">
          <div class="list__item">
            {{ item }} | {{ index }}
          </div>
        </template>
      </ui3n-virtual-scroll>
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
      width: 320px;
      height: 400px;
      margin-bottom: 20px;
      overflow-y: auto;
    }

    .list {
      &-title {
        font-size: 14px;
        font-weight: 600;
        background-color: #fff;
        z-index: 10;
        position: relative;
        width: 24px;
      }

      &-item {
        padding-left: 24px;
      }
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
      min-height: 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 8px;
      font-size: 14px;
      font-weight: 400;
      border-left: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
    }
  }
</style>
