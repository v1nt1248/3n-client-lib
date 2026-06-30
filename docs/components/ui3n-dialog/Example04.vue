<script setup lang="ts">
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
</script>

<template>
  <ui3n-dialog
    title="Draggable Dialog"
    draggable
    confirm-button-text="Close"
    :cancel-button="false"
    width="400"
  >
    <template #body>
      <div class="dialog-body">
        <p>This dialog can be dragged by clicking and holding anywhere on it.</p>
        <p>Try dragging it around!</p>
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