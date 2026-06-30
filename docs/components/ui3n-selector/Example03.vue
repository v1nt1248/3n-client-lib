<template>
  <Ui3nSelector
    v-model="selected"
    :items="items"
    item-value="id"
    placeholder="Select a user"
    label="User"
    :return-object="true"
  >
    <template #item="{ item }">
      <div class="custom-item">
        <div class="avatar">
          {{ item.name.charAt(0) }}
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="email">{{ item.email }}</div>
        </div>
      </div>
    </template>
    <template #selection="{ selectedItem }">
      <div
        v-if="selectedItem"
        class="selection"
      >
        <div class="avatar-small">
          {{ selectedItem.name.charAt(0) }}
        </div>
        <span>{{ selectedItem.name }}</span>
      </div>
    </template>
  </Ui3nSelector>
  <p>Selected: {{ selected?.name || 'None' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(null);

const items = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];
</script>

<style scoped>
.custom-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #2196f3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #2196f3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.info {
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

.selection {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>