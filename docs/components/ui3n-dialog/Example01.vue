<script setup lang="ts">
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
</script>

<template>
  <ui3n-dialog
    title="Simple Dialog"
    confirm-button-text="OK"
    cancel-button-text="Cancel"
  >
    <template #body>
      <div class="dialog-body">
        <p>This is a simple dialog with a title, body content and default action buttons.</p>
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