/*  eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nDialogEvent } from '../../components/ui3n-dialog/types';

export interface DialogOptions<V, E extends string = never> {
  id: string;
  component: Component;
  props: ExtractComponentProps<Component>;
  resolve: (value: { event: Ui3nDialogEvent<E>; data?: V }) => void;
}

export interface DialogsPlugin {
  $openDialog: <V, E extends string = never>(
    component: Component,
    props: ExtractComponentProps<Component>,
  ) => Promise<{ event: Ui3nDialogEvent<E>; data?: V }>;
  $closeDialog: <V, E extends string = never>(id: string, value: { event: Ui3nDialogEvent<E>; data?: V }) => void;
  $closeDialogs: () => void;
  dialogStack: Ref<DialogOptions<any, ''>[]>;
}
