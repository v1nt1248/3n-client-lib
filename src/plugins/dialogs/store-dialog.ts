/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
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
  const { $openDialog, $closeDialog, $closeDialogs, dialogStack } = globalProperties;

  return {
    $dialogs: {
      open: $openDialog,
      close: $closeDialog,
      closeAll: $closeDialogs,
      dialogStack,
    },
  };
}
