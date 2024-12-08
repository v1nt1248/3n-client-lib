/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

export function storeDialogs(context: any): {
  $openDialog: <T extends Component>(params: Ui3nDialogComponentProps<T>) => void;
  $closeDialog: (id: string) => void;
  $closeDialogs: () => void;
} {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $openDialog, $closeDialog, $closeDialogs } = globalProperties;
  return { $openDialog, $closeDialog, $closeDialogs };
}
