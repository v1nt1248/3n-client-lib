import type { InjectionKey, VNode } from 'vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

export type DialogInstance = {
  id: string;
  el: HTMLDivElement;
  vNode: VNode;
  destroy: () => void;
};

export interface DialogsPlugin {
  $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
}

export const DIALOGS_KEY = Symbol() as InjectionKey<DialogsPlugin>;
