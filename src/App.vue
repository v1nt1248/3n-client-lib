<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { defineAsyncComponent, inject, ref } from 'vue'
  import { DIALOGS_KEY } from './plugins/dialogs'
  import type { DialogsPlugin } from './plugins/dialogs'
  import Ui3nButton from './components/ui3n-button.vue'
  import Ui3nList from './components/ui3n-list.vue'
  import Ui3nCheckbox from './components/ui3n-checkbox.vue'
  import Ui3nIcon from './components/ui3n-icon.vue'
  import Ui3nTabs from './components/ui3n-tabs.vue'
  import Ui3nChip from './components/ui3n-chip.vue'
  import Ui3nBadge from './components/ui3n-badge.vue'
  // import Ui3nVirtualScroll from './components/ui3n-virtual-scroll.vue'

  const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)

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

  const checkValue = ref(false)
  const tabsValue = ref(0)

  // const prepareVList = () => Array
  //   .from({ length: 5000 }, (_, i) => ({
  //     id: `${i}i`,
  //     title: `Item ${i}`,
  //   }))

  const list = ref(prepareList()) 
  // const listV = ref(prepareVList())

  const text = ref(`Hello <b>Bro</b> !!!`)

  const open = () => {
    const dC = defineAsyncComponent(() => import('./stories/data/Dialog.vue'))

    dialogs?.$openDialog({
        component: dC,
        componentProps: {
          dialogText: 'You try delete this entity.',
          additionalDialogText: 'Are you sure?'
        },
        dialogProps: {
          title: 'Delete entity',
          onConfirm: () => {
            console.info('You have clicked Confirm')
          },
          onCancel: () => {
            console.info('You have clicked Cancel')
          },
        },
      })
  }
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <ui3n-checkbox
      v-model="checkValue"
      size="20"
      indeterminate
    >
      Some text
    </ui3n-checkbox>
    <p>{{ checkValue }}</p>
    <br>

    <ui3n-chip
      closeable
      max-width="150"
    >
      simpleuser@test.com

      <template #left="{ size, color }">
        <ui3n-icon
          icon="person"
          :width="size"
          :height="size"
          :color="color"
        />
      </template>
    </ui3n-chip>
    <br>
    <ui3n-badge
      value="5"
    >
      <div class="info">
        SOME TEXT
      </div>
    </ui3n-badge>
    <br>

    <ui3n-button>CLICK</ui3n-button>
    <br>
    <br>

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

    <ui3n-button
      @click="open"
    >
      Open
    </ui3n-button>

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

    .info {
      position: relative;
      width: 120px;
      height: 30px;
      font-size: 14px;
      line-height: 1;
      color: green;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid green;
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

    .tabs {
      &__item {
        display: flex;
        width: 100px;
        justify-content: center;
        align-items: center;
        min-height: 32px;
      }
    }
  }
</style>
