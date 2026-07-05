<script setup lang="ts">
  import { ref } from 'vue';

  const isOpen = ref(false);
</script>

<template>
  <div class="controlled-demo">
    <Ui3nMenu v-model="isOpen">
      <Ui3nButton type="primary">
        {{ isOpen ? 'Menu is Open' : 'Open Controlled Menu' }}
      </Ui3nButton>

      <template #menu>
        <div class="menu-content">
          <div class="menu-item">Option A</div>
          <div class="menu-item">Option B</div>
          <div class="menu-item">Option C</div>
        </div>
      </template>
    </Ui3nMenu>

    <div class="status-preview">
      External state 'isOpen': <strong>{{ isOpen }}</strong>
    </div>
  </div>
</template>

<style scoped>
  .controlled-demo {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .status-preview {
    font-size: 12px;
    color: var(--color-text-table-secondary-default);
  }

  .menu-content {
    padding: 4px 0;
    min-width: 160px;
    background-color: var(--color-bg-control-secondary-default);
  }

  .menu-item {
    padding: 8px 16px;
    font-size: 13px;
    color: var(--color-text-control-primary-default);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .menu-item:hover {
    background-color: var(--color-bg-control-primary-hover);
  }
</style>
