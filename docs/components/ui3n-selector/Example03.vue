<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nSelectorOptionBase } from '@/components/ui3n-selector/types';

  interface UserOption extends Ui3nSelectorOptionBase {
    name: string;
    email: string;
  }

  const selected = ref<UserOption | null>(null);

  const items: UserOption[] = [
    { id: 'u-1', name: 'John Doe', email: 'john@example.com' },
    { id: 'u-2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: 'u-3', name: 'Bob Johnson', email: 'bob@example.com' },
  ];
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nSelector
      v-model="selected"
      :items="items"
      item-value="id"
      placeholder="Select a user"
      label="User"
      :return-object="true"
    >
      <template #item="{ item }: { item: UserOption }">
        <div class="custom-item">
          <div class="avatar">
            {{ item.name ? item.name.charAt(0) : '?' }}
          </div>

          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="email">{{ item.email }}</div>
          </div>
        </div>
      </template>

      <template #selection="{ selectedItem }: { selectedItem: UserOption | undefined }">
        <div
          v-if="selectedItem"
          class="selection"
        >
          <div class="avatar-small">
            {{ selectedItem.name ? selectedItem.name.charAt(0) : '?' }}
          </div>
          <span class="selection-name">{{ selectedItem.name }}</span>
        </div>
      </template>
    </Ui3nSelector>

    <p class="result-text">
      Selected: <strong>{{ selected?.name || 'None' }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 400px;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .custom-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--color-bg-control-accent-default);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }

  .avatar-small {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color-bg-control-accent-default);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-weight: 500;
    font-size: 13px;
    color: var(--color-text-block-primary-default);
  }

  .email {
    font-size: 11px;
    color: var(--color-text-control-secondary-default);
  }

  .selection {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .selection-name {
    font-size: 13px;
    color: var(--color-text-control-primary-default);
  }
</style>
