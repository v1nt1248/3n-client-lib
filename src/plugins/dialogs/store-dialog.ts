/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
import type { DialogOptions } from './types';

export function storeDialogs(context: any): {
  $dialogs: {
    open: <V>(
      component: Component,
      props: ExtractComponentProps<Component>,
    ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
    close: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
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
