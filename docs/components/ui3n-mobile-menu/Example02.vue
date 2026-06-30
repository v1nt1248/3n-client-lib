<template>
  <Ui3nMobileMenu
    v-model="isOpen"
    width="300px"
    :with-blur="true"
  >
    <template #header>
      <div class="menu-header">
        <h3>Wide Menu</h3>
      </div>
    </template>
    <template #menuBody>
      <div class="menu-body">
        <div class="menu-item">Dashboard</div>
        <div class="menu-item">Analytics</div>
        <div class="menu-item">Reports</div>
        <div class="menu-item">Users</div>
        <div class="menu-item">Settings</div>
      </div>
    </template>
    <template #footer>
      <div class="menu-footer">
        <Ui3nButton>Logout</Ui3nButton>
      </div>
    </template>
  </Ui3nMobileMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped>
.menu-header {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-header h3 {
  margin: 0;
}

.menu-body {
  padding: 8px 0;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-footer {
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>