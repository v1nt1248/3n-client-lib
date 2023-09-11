<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { ref } from 'vue'
  import { useAppStore } from './store/app.store'
  import Ui3nList from './components/ui3n-list.vue'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useAppStore()

  const prepareList = () => {
    const res = []
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i)
      res.push({
        id: char,
        title: `${char} title`,
        children: [
          { id: `${char}-01`, title: `01 ${char} item` },
          { id: `${char}-02`, title: `02 ${char} item` },
          { id: `${char}-03`, title: `03 ${char} item` },
        ],
      })
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
        :sticky="false"
        :items="list"
      >
        <template #item="{ item }">
          <ui3n-list
            :title="item.title"
            :items="item.children"
          >
            <template #item="{ item: children }">
              <div>{{ children.title }}</div>
            </template>
          </ui3n-list>
        </template>
      </ui3n-list>
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
