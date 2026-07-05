<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nMobileMenuItemBase } from './types';

  const isOpen = ref(false);
  const activeItemId = ref<string | number>('dashboard');

  interface AdminNavItem extends Ui3nMobileMenuItemBase {
    badgeCount?: number;
  }

  const adminItems = ref<AdminNavItem[]>([
    { id: 1, name: 'Dashboard Console', icon: 'grid-view-line' },
    { id: 2, name: 'System Analytics', icon: 'binary-tree' },
    { id: 3, name: 'Financial Reports', icon: 'book-open-blank-variant' },
    { id: 4, name: 'Security Settings', icon: 'round-add-moderator' },
  ]);

  function handleSelect(item: AdminNavItem) {
    activeItemId.value = item.id;
    isOpen.value = false;
  }
</script>

<template>
  <div class="demo-inline-wrapper">
    <Ui3nMobileMenu
      v-model="isOpen"
      width="320px"
      :with-blur="true"
    >
      <template #header>
        <div class="menu-header">
          <h3>Admin Panel Console</h3>
        </div>
      </template>

      <template #menuBody>
        <div class="menu-body">
          <Ui3nMobileMenuItem
            v-for="item in adminItems"
            :key="item.id"
            :item="item"
            :is-active="activeItemId === item.id"
            @select-item="handleSelect"
          />
        </div>
      </template>

      <template #footer>
        <div class="menu-footer">
          <Ui3nButton
            type="primary"
            style="width: 100%"
          >
            Exit Console
          </Ui3nButton>
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
  }
</style>
