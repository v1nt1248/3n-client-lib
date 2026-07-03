<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import Example02Dialog from './Example02.vue';

  const app = getCurrentInstance();
  const openDialog = app?.appContext.config.globalProperties.$dialog.$openDialog;

  async function handleOpen() {
    if (!openDialog) {
      console.error('Plugin method $openDialog not found!');
      return;
    }

    await openDialog(Example02Dialog, {
      message: 'Warning: This action cannot be undone!',
      dialogProps: {
        title: 'Delete Confirmation',
        confirmButtonText: 'Delete Everything',
        cancelButtonText: 'No, Keep It',
        confirmButtonColor: '#ffffff',
        confirmButtonBackground: 'var(--color-bg-button-error-default, #c62828)',
        cancelButtonColor: 'var(--color-text-button-secondary-default)',
        cancelButtonBackground: 'var(--color-bg-button-secondary-default)',
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
      Open Destructive Dialog
    </Ui3nButton>
  </ClientOnly>
</template>
