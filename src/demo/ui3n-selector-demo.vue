<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nSelector from '../components/ui3n-selector/ui3n-selector.vue';
  import type { Ui3nSelectorEvents, Ui3nSelectorOptionBase } from '../components/ui3n-selector/types';

  interface ContactListItem extends Ui3nSelectorOptionBase {
    id: string;
    name?: string;
    mail: string;
    avatarMini: string | null;
    displayName: string;
  }

  const contactList: ContactListItem[] = [
    {
      id: '1',
      name: 'Me',
      mail: 'robot-100@3nweb.com',
      avatarMini: null,
      displayName: 'Me',
    },
    {
      id: 'fyUl9a',
      name: 'Sofie',
      mail: 'sofie@3nweb.com',
      avatarMini: null,
      displayName: 'Sofie',
    },
    {
      id: 'fLKqeb',
      name: 'John Doe',
      mail: 'john.doe@3nweb.com',
      avatarMini: null,
      displayName: 'John Doe',
    },
    {
      id: '8HSlsv',
      name: 'Angela',
      mail: 'angela@3nweb.com',
      avatarMini: null,
      displayName: 'Angela',
    },
    {
      id: 'cr7dhv',
      mail: 'sa.ph@3nweb.com',
      avatarMini: null,
      displayName: 'sa.ph@3nweb.com',
    },
    {
      id: 'Tl6s0x',
      name: 'Alex Monroe',
      mail: 'monroe.alex@3mweb.com',
      avatarMini: null,
      displayName: 'Alex Monroe',
    },
    {
      id: 'ZK3QdA',
      name: 'Jessie',
      mail: 'jessie@3nweb.com',
      avatarMini: null,
      displayName: 'Jessie',
    },
    {
      id: 'ubtphs',
      mail: 'tom.taylor@3nweb.com',
      avatarMini: null,
      displayName: 'tom.taylor@3nweb.com',
    },
    {
      id: 'yafalg',
      name: 'Eddy',
      mail: 'dub123@3nweb.com',
      avatarMini: null,
      displayName: 'Eddy',
    },
  ];

  const value1 = ref<string>('');

  function handleEvent(eventName: Ui3nSelectorEvents, value: ContactListItem['mail'] | null | void): void {
    console.log(`[Ui3nSelector] EVENT ${eventName} | VALUE: ${value}`);
  }
</script>

<template>
  <demo-layout title="Ui3nSelector">
    <div class="wrapper">
      <demo-layout-cell label="Default">
        <ui3n-selector
          v-model="value1"
          placeholder="Select user"
          :items="contactList"
          clearable
          item-display="displayName"
          item-value="mail"
          v-on="{
            'update:modelValue': (v: ContactListItem['mail'] | null) => handleEvent('update:modelValue', v),
            'list:open': () => handleEvent('list:open'),
            'list:close': () => handleEvent('list:close'),
            focus: () => handleEvent('focus'),
            blur: () => handleEvent('blur'),
          }"
        />
      </demo-layout-cell>

      <div class="res">{{ value1 }}</div>
    </div>
  </demo-layout>
</template>

<style lang="scss" scoped>
  .wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 500px auto;
    column-gap: 16px;
  }

  .res {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }
</style>
