/*  eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nDialogEvent } from '../../components/ui3n-dialog/types';

export interface DialogOptions<V> {
  id: string;
  component: Component;
  props: ExtractComponentProps<Component>;
  resolve: (value: { event: Ui3nDialogEvent; data?: V }) => void;
}

export interface DialogsPlugin {
  $openDialog: <V>(
    component: Component,
    props: ExtractComponentProps<Component>
  ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
  $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
  $closeDialogs: () => void;
  dialogStack: Ref<DialogOptions<any>[]>;
}
