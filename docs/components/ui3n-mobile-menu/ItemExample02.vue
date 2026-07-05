<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nMobileMenuItemBase } from './types';

  const selectedId = ref<string | number>(1);

  const menuItems = ref<Ui3nMobileMenuItemBase[]>([
    { id: 1, name: 'Dashboard Console', icon: 'grid-view-line' },
    { id: 2, name: 'System Analytics', icon: 'binary-tree' },
    { id: 3, name: 'Financial Reports', icon: 'book-open-blank-variant' },
    { id: 4, name: 'Security Settings', icon: 'round-add-moderator' },
  ]);

  function onSelect(item: Ui3nMobileMenuItemBase) {
    selectedId.value = item.id;
  }
</script>

<template>
  <div class="menu-container">
    <Ui3nMobileMenuItem
      v-for="item in menuItems"
      :key="item.id"
      :item="item"
      :is-active="selectedId === item.id"
      @select-item="onSelect"
    />
  </div>
</template>

<style scoped>
  .menu-container {
    width: 260px;
    padding: 8px;
    background-color: var(--color-bg-block-primary-hover);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
