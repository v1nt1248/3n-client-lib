<template>
  <div class="virtual-scroll-container">
    <Ui3nVirtualScroll
      :items="users"
      :min-child-height="60"
      :render-ahead="5"
    >
      <template #item="{ value, index }">
        <div class="user-item">
          <div class="avatar">
            {{ value.name.charAt(0) }}
          </div>
          <div class="user-info">
            <div class="name">{{ value.name }}</div>
            <div class="email">{{ value.email }}</div>
          </div>
          <div class="id">#{{ value.id }}</div>
        </div>
      </template>
    </Ui3nVirtualScroll>
  </div>
</template>

<script setup lang="ts">
  interface User {
    id: string;
    name: string;
    email: string;
  }

  const users: User[] = Array.from({ length: 5000 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
</script>

<style scoped>
  .virtual-scroll-container {
    height: 400px;
    width: 400px;
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: 4px;
  }

  .user-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    height: 60px;
    border-bottom: 1px solid var(--color-border-block-primary-default);
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-bg-control-accent-default);
    color: var(--color-text-block-secondary-default);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .name {
    font-weight: 500;
  }

  .email {
    font-size: 12px;
    color: var(--color-text-block-primary-default);
  }

  .id {
    color: var(--color-text-block-primary-default);
    font-size: 12px;
  }
</style>
