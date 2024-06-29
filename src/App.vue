<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineAsyncComponent, inject, ref} from 'vue';
import {DIALOGS_KEY} from './plugins/dialogs';
import type {DialogsPlugin} from './plugins/dialogs';
import Ui3nButton from './components/ui3n-button.vue';
import Ui3nList from './components/ui3n-list.vue';
import Ui3nCheckbox from './components/ui3n-checkbox.vue';
import Ui3nSwitch from './components/ui3n-switch.vue';
import Ui3nIcon from './components/ui3n-icon.vue';
import Ui3nTabs from './components/ui3n-tabs.vue';
import Ui3nChip from './components/ui3n-chip.vue';
import Ui3nBadge from './components/ui3n-badge.vue';
import Ui3nBreadcrumb from './components/ui3n-breadcrumb.vue';
import Ui3nBreadcrumbs from './components/ui3n-breadcrumbs.vue';
// import Ui3nVirtualScroll from './components/ui3n-virtual-scroll.vue';

const dialogs = inject<DialogsPlugin>(DIALOGS_KEY);

const prepareList = () => {
  const res: any[] = [];
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    res.push({
      id: char,
      title: `${char}`,
      children: [
        {id: `${char}-01`, title: `01 ${char} item`},
        {id: `${char}-02`, title: `02 ${char} item`},
        {id: `${char}-03`, title: `03 ${char} item`},
      ],
    });
  }
  return res;
}

const checkValue = ref([true, false, false]);
const switchValue = ref([true, false]);
const tabsValue = ref(0);

// const prepareVList = () => Array
//   .from({ length: 5000 }, (_, i) => ({
//     id: `${i}i`,
//     title: `Item ${i}`,
//   }));

const list = ref(prepareList());
// const listV = ref(prepareVList());

const text = ref(`Hello <b>Bro</b> !!!`);
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-row app-row--with-title">
      <div class="app-row__title">--- BREADCRUMBS ---</div>
      <ui3n-breadcrumbs>
      <ui3n-breadcrumb
        :is-active="true"
        @click="() => console.log('HOME')"
      >
        Home
      </ui3n-breadcrumb>
      <ui3n-breadcrumb
        :is-active="true"
        @click="() => console.log('PROJECTS')"
      >
        Projects
      </ui3n-breadcrumb>
      <ui3n-breadcrumb>
        Folder
      </ui3n-breadcrumb>
    </ui3n-breadcrumbs>
    </div>

    <div class="app-row app-row--with-title">
      <div class="app-row__title">--- BUTTONS ---</div>
      <ui3n-button>Primary</ui3n-button>
      <ui3n-button disabled>Disabled</ui3n-button>
      <ui3n-button size="small">Primary</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button type="secondary">Secondary</ui3n-button>
      <ui3n-button type="secondary" disabled>Secondary</ui3n-button>
      <ui3n-button type="secondary" size="small">Secondary</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button type="tertiary">Tertiary</ui3n-button>
      <ui3n-button type="tertiary" disabled>Tertiary</ui3n-button>
      <ui3n-button type="tertiary" size="small">Tertiary</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be">Custom</ui3n-button>
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be" disabled>Custom</ui3n-button>
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be" size="small">Custom</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button icon="logout">Primary</ui3n-button>
      <ui3n-button icon="logout" disabled>Primary</ui3n-button>
      <ui3n-button icon="logout" size="small">Primary</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button icon="home" icon-position="left">Primary</ui3n-button>
      <ui3n-button icon="home" icon-position="left" disabled>Primary</ui3n-button>
      <ui3n-button icon="home" icon-position="left" size="small">Primary</ui3n-button>
    </div>
    <div class="app-row">
      <ui3n-button type="icon" icon="check" />
      <ui3n-button type="icon" icon="check" disabled />
      <ui3n-button type="icon" icon="check" size="small" />
    </div>

    <div class="app-row app-row--with-title">
      <div class="app-row__title">--- CHECKBOX ---</div>
      <ui3n-checkbox size="20" v-model="checkValue[0]">
        Checked
      </ui3n-checkbox>
      <ui3n-checkbox size="20" disabled v-model="checkValue[0]">
        Checked (disabled)
      </ui3n-checkbox>
      <ui3n-checkbox size="20" v-model="checkValue[1]">
        Unchecked
      </ui3n-checkbox>
      <ui3n-checkbox size="20" v-model="checkValue[2]" indeterminate>
        Indeterminate
      </ui3n-checkbox>
    </div>

    <div class="app-row app-row--with-title">
      <div class="app-row__title">--- SWITCH ---</div>
      <ui3n-switch size="24" v-model="switchValue[0]" />
      <ui3n-switch size="24" disabled v-model="switchValue[0]" />
      <ui3n-switch size="24" v-model="switchValue[1]" />
      <ui3n-switch size="24" v-model="switchValue[1]">
        With label
      </ui3n-switch>
    </div>

    <!--

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

  &-row {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    &--with-title {
      padding-top: 32px;
    }
  }

  &-row__title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  &-block {
    position: relative;
    width: fit-content;
    max-height: 400px;
    margin-bottom: 16px;
    overflow-y: auto;

    &--with-title {
      padding-top: 32px;
    }
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
