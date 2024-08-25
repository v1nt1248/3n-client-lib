/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

export function storeDialogs(context: any): {
  $openDialog: <T extends Component, P extends Record<string, unknown>>(params: Ui3nDialogComponentProps<T, P>) => void;
} {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $openDialog } = globalProperties;
  return { $openDialog };
}
