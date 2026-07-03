<script setup lang="ts">
  import { ref } from 'vue';

  interface RemoteUser {
    id: string;
    name: string;
  }

  const serverDatabase: RemoteUser[] = [
    { id: 'usr-1', name: 'Alexander Ivanov' },
    { id: 'usr-2', name: 'Dmitry Petrov' },
    { id: 'usr-3', name: 'Elena Sidorova' },
    { id: 'usr-4', name: 'Maria Kuznetsova' },
    { id: 'usr-5', name: 'Sergey Smirnov' },
  ];

  const items = ref<RemoteUser[]>([]);
  const value = ref<string[]>([]);
  const isLoading = ref(false);
  let timeoutId: any = null;

  function onSearchUpdate(query: string) {
    if (timeoutId) clearTimeout(timeoutId);

    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      items.value = [];
      return;
    }

    isLoading.value = true;

    timeoutId = setTimeout(() => {
      items.value = serverDatabase.filter(user => user.name.toLowerCase().includes(trimmedQuery));
      isLoading.value = false;
    }, 500);
  }
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      :placeholder="isLoading ? 'Searching on server...' : 'Type to search users (e.g. Maria)'"
      :no-data-text="isLoading ? 'Searching...' : 'No users found matching query'"
      multiple
      chips
      clear-on-select
      @update:search="onSearchUpdate"
    />

    <div class="value-display">Selected User IDs: {{ value.length > 0 ? value : 'none' }}</div>

    <div class="hint">Data is loaded dynamically from mock API on every keystroke with 500ms delay.</div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 500px;
  }

  .value-display {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: oklch(0.65 0.17 140);
  }

  .hint {
    margin-top: 4px;
    font-size: 11px;
    color: var(--color-text-block-accent-default);
    font-style: italic;
  }
</style>
