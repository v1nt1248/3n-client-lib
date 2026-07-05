<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nMobileMenuItemBase } from './types';

  const isOpen = ref(false);
  const activeItemId = ref<string | number>('home');

  const navigationItems = ref<Ui3nMobileMenuItemBase[]>([
    { id: 'home', name: 'Home', icon: 'round-home' },
    { id: 'profile', name: 'Profile', icon: 'round-person' },
    { id: 'settings', name: 'Settings', icon: 'outline-settings' },
    { id: 'about', name: 'About Info', icon: 'outline-info' },
  ]);

  function handleSelect(item: Ui3nMobileMenuItemBase) {
    activeItemId.value = item.id;
    console.log('Selected mobile item:', item);
    isOpen.value = false;
  }
</script>

<template>
  <div class="demo-inline-wrapper">
    <Ui3nMobileMenu v-model="isOpen">
      <template #header>
        <div class="menu-header">
          <h3>Application Navigation</h3>
        </div>
      </template>

      <template #menuBody>
        <div class="menu-body">
          <Ui3nMobileMenuItem
            v-for="navItem in navigationItems"
            :key="navItem.id"
            :item="navItem"
            :is-active="activeItemId === navItem.id"
            @select-item="handleSelect"
          />
        </div>
      </template>

      <template #footer>
        <div class="menu-footer">
          <p>Client Core v1.0.0</p>
        </div>
      </template>
    </Ui3nMobileMenu>
  </div>
</template>

<style scoped>
  .demo-inline-wrapper {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }

  .menu-header {
    padding: 24px 16px 16px 16px;
    border-bottom: 1px solid var(--color-border-block-primary-default);
  }

  .menu-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-block-primary-default);
  }

  .menu-body {
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .menu-footer {
    padding: 16px;
    border-top: 1px solid var(--color-border-block-primary-default);
    text-align: center;
  }

  .menu-footer p {
    margin: 0;
    color: var(--color-text-control-secondary-default);
    font-size: 11px;
  }
</style>
