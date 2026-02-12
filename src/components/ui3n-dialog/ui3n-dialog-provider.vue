<script lang="ts" setup generic="V extends any">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { type Component, inject } from 'vue';
  import { DIALOGS_KEY, type DialogsPlugin } from '@/plugins';
  import type { ExtractComponentProps } from '@/types';
  import type { Ui3nDialogComponentProps, Ui3nDialogEvent } from './types';

  const { dialogStack, $closeDialog } = inject<DialogsPlugin>(DIALOGS_KEY)!

  function clickOverlay(id: string, modalProps: ExtractComponentProps<Component>) {
    if (
      (modalProps as Ui3nDialogComponentProps<any>).closeOnClickOverlay ||
      ((modalProps as any).dialogProps as Ui3nDialogComponentProps<any>)?.closeOnClickOverlay
  ) {
      $closeDialog(id, { event: 'click-overlay' });
    }
  }

  function onAction(id: string, value: { event: Ui3nDialogEvent; data?:  V }) {
    $closeDialog(id, value);
  }
</script>

<template>
  <teleport to="body">
    <div
      v-for="dialog in dialogStack"
      :id="`dialog-wrapper-${dialog.id}`"
      :key="dialog.id"
      :class="$style['dialog-provider-overlay']"
      @click.self.prevent="clickOverlay(dialog.id, dialog.props)"
    >
      <component
        :is="dialog.component"
        v-bind="dialog.props"
        @action="onAction(dialog.id, $event)"
      />
    </div>
  </teleport>
</template>

<style lang="scss" module>
  .dialog-provider-overlay {
    position: fixed;
    z-index: 1000;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--shadow-close);
  }
</style>
