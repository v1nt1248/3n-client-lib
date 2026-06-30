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

<script setup lang="ts">
import { ref } from 'vue';

const selectedId = ref(1);

const menuItems = [
  { id: 1, name: 'Dashboard', icon: 'round-dashboard' },
  { id: 2, name: 'Analytics', icon: 'round-analytics' },
  { id: 3, name: 'Reports', icon: 'round-reports' },
  { id: 4, name: 'Settings', icon: 'round-settings' },
];

const onSelect = (item: { id: number; name: string; icon?: string }) => {
  selectedId.value = item.id;
  console.log('Selected:', item);
};
</script>

<style scoped>
.menu-container {
  width: 240px;
  padding: 8px;
}
</style>