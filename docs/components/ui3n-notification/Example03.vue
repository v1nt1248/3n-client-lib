<script setup lang="ts">
  import { getCurrentInstance } from 'vue';

  const app = getCurrentInstance();
  const createNotice = app?.appContext.config.globalProperties.$createNotice;

  const types = ['success', 'warning', 'info', 'error'] as const;

  const messages = {
    success: ['Operation completed successfully!', 'Configuration saved to server.', 'User permissions updated.'],
    warning: ['Please review your input fields.', 'Session expires in 5 minutes.', 'Disk space is running low.'],
    info: [
      'System background update in progress.',
      'New version 2.4.0 is available.',
      'Synchronizing database index.',
    ],
    error: [
      'An error occurred during network processing.',
      'Failed to establish database connection.',
      'Critical package loss detected.',
    ],
  };

  function showRandomFastToast() {
    if (!createNotice) {
      return;
    }

    const randomType = types[Math.floor(Math.random() * types.length)];
    const typeMessages = messages[randomType];
    const randomText = typeMessages[Math.floor(Math.random() * typeMessages.length)];

    createNotice({
      type: randomType,
      content: `[Fast] ${randomText}`,
      duration: 2500,
      position: 'right',
    });
  }

  function showRandomStickyToast() {
    if (!createNotice) return;

    const randomType = types[Math.floor(Math.random() * types.length)];
    const typeMessages = messages[randomType];
    const randomText = typeMessages[Math.floor(Math.random() * typeMessages.length)];

    createNotice({
      type: randomType,
      content: `[Sticky] ${randomText}`,
      duration: 0,
      position: 'right',
    });
  }
</script>

<template>
  <div class="buttons-grid">
    <Ui3nButton
      type="secondary"
      @click="showRandomFastToast"
    >
      ⚡️ Trigger Random Fast Toast (2.5s)
    </Ui3nButton>

    <Ui3nButton
      type="secondary"
      @click="showRandomStickyToast"
    >
      📌 Trigger Random Sticky (Manual Close)
    </Ui3nButton>
  </div>
</template>

<style scoped>
  .buttons-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
