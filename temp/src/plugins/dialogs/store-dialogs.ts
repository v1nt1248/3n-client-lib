/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';
import type { DialogInstance } from '@/plugins/dialogs/types';

export function storeDialogs(context: any): {
  $dialogs: {
    open: <T extends Component>(params: Ui3nDialogComponentProps<T>) => DialogInstance | undefined;
    close: (id: string) => void;
    closeAll: () => void;
  };
} {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $openDialog, $closeDialog, $closeDialogs } = globalProperties;
  const methods: {
    open: <T extends Component>(params: Ui3nDialogComponentProps<T>) => DialogInstance | undefined;
    close: (id: string) => void;
    closeAll: () => void;
  } = {
    open: $openDialog,
    close: $closeDialog,
    closeAll: $closeDialogs,
  };

  return { $dialogs: methods };
}
