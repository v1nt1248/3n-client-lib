<template>
  <div>
    <Ui3nButton @click="isOpen = !isOpen">
      {{ isOpen ? 'Close Menu' : 'Open Menu' }}
    </Ui3nButton>
    <Ui3nMenu v-model="isOpen">
      <template #menu>
        <div class="menu-content">
          <div class="menu-item">Option A</div>
          <div class="menu-item">Option B</div>
          <div class="menu-item">Option C</div>
        </div>
      </template>
    </Ui3nMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped>
.menu-content {
  padding: 8px 0;
  min-width: 150px;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>