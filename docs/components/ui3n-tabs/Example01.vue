<template>
  <div class="tabs-container">
    <Ui3nTabs v-model="activeTab">
      <Ui3nButton>Tab 1</Ui3nButton>
      <Ui3nButton>Tab 2</Ui3nButton>
      <Ui3nButton>Tab 3</Ui3nButton>
    </Ui3nTabs>
    <div class="content">
      <p>Active tab: {{ activeTab }}</p>
      <p v-if="activeTab === 0">
        Content for Tab 1
      </p>
      <p v-else-if="activeTab === 1">
        Content for Tab 2
      </p>
      <p v-else-if="activeTab === 2">
        Content for Tab 3
      </p>
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