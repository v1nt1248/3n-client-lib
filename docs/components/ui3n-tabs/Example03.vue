<template>
  <div class="tabs-container">
    <Ui3nTabs
      v-model="activeTab"
      active-color="#4caf50"
      inactive-color="#9e9e9e"
      indicator-color="#ff8800"
      :indicator-size="4"
    >
      <Ui3nButton
        type="tertiary"
        square
      >
        Home
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        Products
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        About
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        Contact
      </Ui3nButton>
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
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: 4px;
  }
</style>
