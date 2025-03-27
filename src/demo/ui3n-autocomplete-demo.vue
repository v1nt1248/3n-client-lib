<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nAutocomplete from '../components/ui3n-autocomplete/ui3n-autocomplete.vue';
  import Ui3nHtml from '../directives/ui3n-html';
  import { markSearch } from '@/utils';
  import { Ui3nAutocompleteOptionBase } from '../components/ui3n-autocomplete/types';

  const vUi3nHtml = Ui3nHtml;

  interface ContactListItem extends Ui3nAutocompleteOptionBase {
    id: string;
    name?: string,
    mail: string;
    avatarMini: string | null;
    displayName: string;
  }

  const contactList: ContactListItem[] = [
    {
      'id': '1',
      'name': 'Me',
      'mail': 'robot-100@3nweb.com',
      'avatarMini': null,
      'displayName': 'Me',
    },
    {
      'id': 'fyUl9a',
      'name': 'Sofie',
      'mail': 'sofie@3nweb.com',
      'avatarMini': null,
      'displayName': 'Sofie',
    },
    {
      'id': 'fLKqeb',
      'name': 'John Doe',
      'mail': 'john.doe@3nweb.com',
      'avatarMini': null,
      'displayName': 'John Doe',
    },
    {
      'id': '8HSlsv',
      'name': 'Angela',
      'mail': 'angela@3nweb.com',
      'avatarMini': null,
      'displayName': 'Angela',
    },
    {
      'id': 'cr7dhv',
      'mail': 'sa.ph@3nweb.com',
      'avatarMini': null,
      'displayName': 'sa.ph@3nweb.com',
    },
    {
      'id': 'Tl6s0x',
      'name': 'Alex Monroe',
      'mail': 'monroe.alex@3mweb.com',
      'avatarMini': null,
      'displayName': 'Alex Monroe',
    },
    {
      'id': 'ZK3QdA',
      'name': 'Jessie',
      'mail': 'jessie@3nweb.com',
      'avatarMini': null,
      'displayName': 'Jessie',
    },
    {
      'id': 'ubtphs',
      'mail': 'tom.taylor@3nweb.com',
      'avatarMini': null,
      'displayName': 'tom.taylor@3nweb.com',
    },
    {
      'id': 'yafalg',
      'name': 'Eddy',
      'mail': 'dub123@3nweb.com',
      'avatarMini': null,
      'displayName': 'Eddy',
    },
  ];

  const value = ref([]);

  function filterContactList(value: ContactListItem, query: string): boolean {
    const { name = '', mail } = value;
    return name.toLowerCase().includes(query.toLowerCase()) || mail.toLowerCase().includes(query.toLowerCase());
  }

  function getDisplayItem(item: ContactListItem): string {
    return `${item.mail} (${item.name || '-'})`;
  }
</script>

<template>
  <demo-layout title="Ui3nAutocomplete">
    <div class="wrapper">
      <demo-layout-cell label="Default">
        <ui3n-autocomplete
          v-model="value"
          placeholder="Enter email address"
          :items="contactList"
          :custom-filter="filterContactList"
          clear-on-select
          hide-selected
          chips
          multiple
          item-title="displayName"
          item-value="mail"
          add-new-value
          :new-value-validator="(v) => v.includes('@')"
        >
          <template #item="{ item, query }">
            <div
              v-ui3n-html="markSearch(getDisplayItem(item), query || '')"
              style="position: relative; width: max-content"
            />
          </template>
        </ui3n-autocomplete>
      </demo-layout-cell>

      <div>{{ JSON.stringify(value, null, 2) }}</div>
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
</style>
