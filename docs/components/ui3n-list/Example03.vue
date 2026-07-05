<script setup lang="ts">
  import Ui3nList from '@/components/ui3n-list/ui3n-list.vue';

  interface User {
    id: number;
    name: string;
    email: string;
  }

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
</script>

<template>
  <Ui3nList
    title="System Users"
    :items="users"
    key-field="id"
  >
    <template #item="{ item, index }">
      <div class="custom-item">
        <span class="index">#{{ index + 1 }}</span>

        <div class="user-info">
          <span class="name">{{ item.name }}</span>
          <span class="email">{{ item.email }}</span>
        </div>
      </div>
    </template>
  </Ui3nList>
</template>

<style scoped>
  .custom-item {
    display: flex;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--color-border-block-primary-default);
  }

  .custom-item:last-child {
    border-bottom: none;
  }

  .index {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-control-secondary-default);
    background: var(--color-bg-block-darkery-default);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-control-primary-default);
  }

  .email {
    color: var(--color-text-control-secondary-default);
    font-size: 11px;
  }
</style>
