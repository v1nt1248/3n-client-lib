<script setup lang="ts">
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
</script>

<template>
  <ui3n-dialog
    title="Dialog with Icon"
    icon="outline-info"
    confirm-button-text="Got it"
    :cancel-button="false"
  >
    <template #body>
      <div class="dialog-body">
        <p>This dialog has an icon in the title bar.</p>
        <p>You can use any icon name or pass an icon object with custom size and color.</p>
      </div>
    </template>
  </ui3n-dialog>
</template>

<style scoped>
  .dialog-body {
    padding: 24px 16px;
    font-size: 14px;
    color: var(--color-text-block-primary-default);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>