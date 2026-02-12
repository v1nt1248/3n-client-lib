<script lang="ts" setup>
import { defineAsyncComponent, inject } from 'vue';
import type { DialogsPlugin } from '@/plugins/dialogs/types';
import { DIALOGS_KEY } from '@/constants/plugins-keys';
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

defineProps<{
  text?: string;
  dialogProps?: Ui3nDialogComponentProps<unknown>;
}>();

const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)!;

async function openDialog() {
  const component = defineAsyncComponent(() => import('./test-dialog-2.vue'))
  const res = await dialogs.$openDialog(component, {
    text: 'The text into dialog 2',
    dialogProps: {
      // title: 'THE TEST DIALOG-2 TITLE',
      draggable: true,
      closeOnClickOverlay: true,
      confirmButton: true,
      cancelButton: true,
    },
  });
  console.log('DIALOG CLOSE RESULT => ', res);
}
</script>

<template>
  <ui3n-dialog v-bind="dialogProps">
    <template v-slot:body>
      <div class="test-dialog">
        {{ text }}

        <button class="btn" @click.stop.prevent="openDialog">
          Open dialog2
        </button>
      </div>
    </template>
  </ui3n-dialog>
</template>

<style lang="scss" scoped>
.test-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  font-size: var(--font-14);
  font-weight: 400;
  color: var(--color-text-block-primary-default);
  padding: 32px 16px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  background-color: var(--color-bg-button-primary-default);
  color: var(--color-text-button-primary-default);
}
</style>
