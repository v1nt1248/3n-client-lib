<template>
  <div class="menu-container">
    <Ui3nMobileMenuItem
      :item="{ id: 1, name: 'Home' }"
      @select-item="onSelect"
    />
    <Ui3nMobileMenuItem
      :item="{ id: 2, name: 'Profile' }"
      @select-item="onSelect"
    />
    <Ui3nMobileMenuItem
      :item="{ id: 3, name: 'Settings' }"
      @select-item="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
const onSelect = (item: { id: number; name: string }) => {
  console.log('Selected:', item);
};
</script>

<style scoped>
.menu-container {
  width: 240px;
  padding: 8px;
}
</style>