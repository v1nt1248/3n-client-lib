<script setup lang="ts">
  import { getCurrentInstance } from 'vue';

  const app = getCurrentInstance();
  const $createNotice = app?.appContext.config.globalProperties.$createNotice;

  function triggerToast() {
    if (!$createNotice) {
      console.error('Plugin method $createNotice not found!');
      return;
    }

    $createNotice({
      type: 'info',
      content: 'This is a basic alert message triggered programmatically via $createNotice.',
      position: 'center',
    });
  }
</script>

<template>
  <div class="demo-box">
    <Ui3nButton
      type="primary"
      @click="triggerToast"
    >
      Show Global Info Notification
    </Ui3nButton>
  </div>
</template>
