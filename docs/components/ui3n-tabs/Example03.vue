<template>
  <div class="tabs-container">
    <Ui3nTabs
      v-model="activeTab"
      active-color="#4caf50"
      inactive-color="#9e9e9e"
      indicator-color="#2196f3"
      :indicator-size="4"
    >
      <Ui3nButton>Home</Ui3nButton>
      <Ui3nButton>Products</Ui3nButton>
      <Ui3nButton>About</Ui3nButton>
      <Ui3nButton>Contact</Ui3nButton>
    </Ui3nTabs>
    <div class="content">
      <p>Active tab index: {{ activeTab }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);
</script>

<style scoped>
.tabs-container {
  width: 400px;
}

.content {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>