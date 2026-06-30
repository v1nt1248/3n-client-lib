<script setup lang="ts">
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
</script>

<template>
  <ui3n-dialog
    title="Custom Buttons"
    confirm-button-text="Save"
    cancel-button-text="Discard"
    confirm-button-color="#ffffff"
    confirm-button-background="#2e7d32"
    cancel-button-color="#ffffff"
    cancel-button-background="#c62828"
  >
    <template #body>
      <div class="dialog-body">
        <p>Dialog with customized button text and colors.</p>
      </div>
    </template>
  </ui3n-dialog>
</template>

<style scoped>
  .dialog-body {
    padding: 24px 16px;
    font-size: 14px;
    color: var(--color-text-block-primary-default);
  }
</style>