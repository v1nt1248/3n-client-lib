/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import type { ExtractComponentProps } from '../../types';
import type { Ui3nDialogEvent } from '../../components/ui3n-dialog/types';
import type { DialogOptions } from './types';

export function storeDialogs(context: any): {
  $dialogs: {
    open: <V, E extends string = never>(
      component: Component,
      props: ExtractComponentProps<Component>,
    ) => Promise<{ event: Ui3nDialogEvent<E>; data?: V }>;
    close: <V, E extends string = never>(id: string, value: { event: Ui3nDialogEvent<E>; data?: V }) => void;
    closeAll: () => void;
    dialogStack: Ref<DialogOptions<any>[]>;
  };
} {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $dialog } = globalProperties;

  return {
    $dialogs: {
      open: $dialog.$openDialog,
      close: $dialog.$closeDialog,
      closeAll: $dialog.$closeDialogs,
      dialogStack: $dialog.dialogStack,
    },
  };
}
