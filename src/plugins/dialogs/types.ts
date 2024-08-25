import type { Component, InjectionKey, VNode } from 'vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

export type DialogInstance = {
  id: string;
  el: HTMLDivElement;
  vNode: VNode;
  destroy: () => void;
};

export interface DialogsPlugin {
  $openDialog: <T extends Component, P extends Record<string, unknown>>(
    params: Ui3nDialogComponentProps<T, P>,
  ) => DialogInstance | undefined;
}

export const DIALOGS_KEY = Symbol() as InjectionKey<DialogsPlugin>;
