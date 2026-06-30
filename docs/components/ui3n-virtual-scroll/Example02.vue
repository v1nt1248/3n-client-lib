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
  id: number;
  name: string;
  email: string;
}

const users: User[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));
</script>

<style scoped>
.virtual-scroll-container {
  height: 400px;
  width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2196f3;
  color: white;
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
  color: #666;
}

.id {
  color: #888;
  font-size: 12px;
}
</style>