<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import Example01Dialog from './Example01.vue';

  const app = getCurrentInstance();
  const openDialog = app?.appContext.config.globalProperties.$dialog.$openDialog;

  async function handleOpen() {
    if (!openDialog) {
      console.error('Plugin method $openDialog not found!');
      return;
    }

    const res = await openDialog(Example01Dialog, {
      text: 'This is a simple dialog text passed programmatically!',
      dialogProps: {
        title: 'Simple Dialog Showcase',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        closeOnClickOverlay: true,
        closeOnEsc: true,
      },
    });

    console.log('Dialog promise resolved with:', res);
  }
</script>

<template>
  <ClientOnly>
    <div class="demo-container">
      <Ui3nButton
        type="primary"
        @click="handleOpen"
      >
        Open Simple Dialog
      </Ui3nButton>
    </div>
  </ClientOnly>
</template>
