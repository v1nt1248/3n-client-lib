<template>
  <Ui3nList
    title="Users"
    :items="users"
    key-field="id"
  >
    <template #item="{ item, index }">
      <div class="custom-item">
        <span class="index">{{ index + 1 }}.</span>
        <span class="name">{{ item.name }}</span>
        <span class="email">{{ item.email }}</span>
      </div>
    </template>
  </Ui3nList>
</template>

<script setup lang="ts">
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];
</script>

<style scoped>
.custom-item {
  display: flex;
  gap: 8px;
  padding: 8px;
  align-items: center;
}

.index {
  color: #888;
  min-width: 24px;
}

.name {
  font-weight: 500;
}

.email {
  color: #666;
  font-size: 0.9em;
}
</style>