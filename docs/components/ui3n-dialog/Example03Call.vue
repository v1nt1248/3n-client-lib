<script setup lang="ts">
  import { getCurrentInstance, defineAsyncComponent } from 'vue';
  import Example03Dialog from './Example03.vue';

  const app = getCurrentInstance();
  const openDialog = app?.appContext.config.globalProperties.$dialog.$openDialog;

  async function handleOpen() {
    if (!openDialog) {
      console.error('Plugin method $openDialog not found!');
      return;
    }

    await openDialog(Example03Dialog, {
      dialogProps: {
        confirmButton: false,
        cancelButton: false,
        width: 450,
      },
    });
  }
</script>

<template>
  <ClientOnly>
    <Ui3nButton
      type="primary"
      @click="handleOpen"
    >
      Open Custom Slots Dialog
    </Ui3nButton>
  </ClientOnly>
</template>
