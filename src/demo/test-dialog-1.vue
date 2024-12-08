<script lang="ts" setup>
import { defineAsyncComponent, inject } from 'vue';
import { DIALOGS_KEY, type DialogsPlugin } from '@/plugins/dialogs/types';

defineProps<{
  text?: string;
}>();

const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)!;

function openDialog() {
  const component = defineAsyncComponent(() => import('./test-dialog-2.vue'))
  dialogs.$openDialog<typeof component>({
    component,
    componentProps: {
      text: 'The text into dialog 2',
    },
    dialogProps: {
      title: 'THE TEST DIALOG-2 TITLE',
      draggable: true,
      closeOnClickOverlay: false,
    },
  });
}
</script>

<template>
  <div class="test-dialog">
    {{ text }}

    <button class="btn" @click.stop.prevent="openDialog">
      Open dialog2
    </button>
  </div>
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
  color: rgba(0, 0, 0, 0.87);
  padding: 32px 16px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
}
</style>
