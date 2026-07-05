<script setup lang="ts">
  import { ref } from 'vue';
  import { Ui3nClickOutside } from '@/directives';
  import type { Ui3nVirtualElement } from './types';

  const vUi3nClickOutside = Ui3nClickOutside;

  const isContextMenuOpen = ref(false);
  const virtualTrigger = ref<Ui3nVirtualElement | null>(null);

  function handleRightClick(event: MouseEvent) {
    event.preventDefault();

    virtualTrigger.value = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: event.clientX,
          y: event.clientY,
          top: event.clientY,
          left: event.clientX,
          right: event.clientX,
          bottom: event.clientY,
        };
      },
    };

    isContextMenuOpen.value = true;
  }
</script>

<template>
  <div class="context-demo-wrapper">
    <div
      class="context-zone"
      @contextmenu="handleRightClick"
    >
      <span>Right-click anywhere inside this dashed area to trigger the Context Menu</span>

      <Ui3nMenu
        v-model="isContextMenuOpen"
        :trigger-element="virtualTrigger"
        position-strategy="fixed"
        :offset-y="4"
        :offset-x="0"
      >
        <template #menu>
          <div
            v-ui3n-click-outside="() => (isContextMenuOpen = false)"
            class="menu-content"
          >
            <div class="menu-item">⚡️ Quick Action</div>
            <div class="menu-item">📂 Move to Folder</div>
            <div class="menu-item destructive">🗑️ Delete Permanently</div>
          </div>
        </template>
      </Ui3nMenu>
    </div>
  </div>
</template>

<style scoped>
  .context-demo-wrapper {
    width: 100%;
  }

  .context-zone {
    width: 100%;
    height: 140px;
    border: 2px dashed var(--color-border-block-primary-default);
    border-radius: var(--spacing-xs, 6px);
    background-color: var(--color-bg-block-darkery-default);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px;
    font-size: 13px;
    color: var(--color-text-control-secondary-default);
    cursor: context-menu;
    user-select: none;
  }

  .menu-content {
    padding: 4px 0;
    min-width: 180px;
    background-color: var(--color-bg-control-secondary-default);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .menu-item {
    padding: 8px 16px;
    font-size: 13px;
    color: var(--color-text-control-primary-default);
    cursor: pointer;
    transition: background-color 0.15s ease;
    text-align: left;
  }

  .menu-item:hover {
    background-color: var(--color-bg-control-primary-hover);
  }

  .menu-item.destructive {
    color: var(--error-content-default);
  }

  .menu-item.destructive:hover {
    color: var(--color-text-control-secondary-hover);
    background-color: var(--error-content-hover);
  }
</style>
