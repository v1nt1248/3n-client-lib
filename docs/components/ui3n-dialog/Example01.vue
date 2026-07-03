<script setup lang="ts">
  import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
  import type { Ui3nDialogEvent, Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

  defineProps<{
    text?: string;
    dialogProps?: Ui3nDialogComponentProps<any>;
  }>();

  const emits = defineEmits<{
    (event: 'action', value: { event: Ui3nDialogEvent; data?: any }): void;
  }>();
</script>

<template>
  <ui3n-dialog
    v-bind="dialogProps"
    @action="emits('action', $event)"
  >
    <template #body>
      <div class="dialog-body">
        {{ text }}
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
