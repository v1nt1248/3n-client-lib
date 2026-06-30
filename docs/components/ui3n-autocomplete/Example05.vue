<script setup lang="ts">
import { ref } from 'vue';

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const items: User[] = [
  { id: '1', name: 'John Doe', role: 'Developer', avatar: '👨‍💻' },
  { id: '2', name: 'Jane Smith', role: 'Designer', avatar: '👩‍🎨' },
  { id: '3', name: 'Bob Wilson', role: 'Manager', avatar: '👨‍💼' },
  { id: '4', name: 'Alice Brown', role: 'QA Engineer', avatar: '👩‍🔬' },
];

const value = ref([]);
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Select a team member"
      item-title="name"
      item-value="id"
    >
      <template #item="{ item }">
        <div class="custom-item">
          <span class="avatar">{{ item.avatar }}</span>
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-role">{{ item.role }}</span>
          </div>
        </div>
      </template>
    </ui3n-autocomplete>
    <div class="value-display">Selected: {{ value }}</div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 350px;
  }
  .custom-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }
  .avatar {
    font-size: 20px;
  }
  .item-info {
    display: flex;
    flex-direction: column;
  }
  .item-name {
    font-weight: 500;
    font-size: 13px;
  }
  .item-role {
    font-size: 11px;
    color: var(--color-text-block-secondary-default);
  }
  .value-display {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
  }
</style>