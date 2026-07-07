<template>
  <div class="tabs-container">
    <Ui3nTabs
      v-model="activeTab"
      item-direction="vertical"
    >
      <Ui3nButton
        type="tertiary"
        square
      >
        Dashboard
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        Profile
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        Settings
      </Ui3nButton>

      <Ui3nButton
        type="tertiary"
        square
      >
        Notifications
      </Ui3nButton>
    </Ui3nTabs>

    <div class="content">
      <p v-if="activeTab === 0">Dashboard content goes here</p>
      <p v-else-if="activeTab === 1">Profile settings and information</p>
      <p v-else-if="activeTab === 2">Application settings</p>
      <p v-else-if="activeTab === 3">Notification preferences</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const activeTab = ref(0);
</script>

<style scoped>
  .tabs-container {
    display: flex;
    gap: 24px;
    width: 500px;
  }

  .content {
    flex: 1;
    padding: 16px;
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: 4px;
  }
</style>
