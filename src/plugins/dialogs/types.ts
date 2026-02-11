/*  eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, InjectionKey, Reactive } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';

export interface DialogOptions<V> {
  id: string;
  component: Component;
  props: ExtractComponentProps<Component>;
  resolve: (value: { event: Ui3nDialogEvent; data?: V | null | Event | undefined }) => void;
}

export interface DialogsPlugin {
  $openDialog: <V>(
    component: Component,
    props: ExtractComponentProps<Component>,
  ) => Promise<{ event: Ui3nDialogEvent; data?: V | null | Event | undefined }>;
  $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V | null | Event | undefined }) => void;
  $closeDialogs: () => void;
  dialogStack: Reactive<DialogOptions<any>[]>;
}

export const DIALOGS_KEY = Symbol() as InjectionKey<DialogsPlugin>;
