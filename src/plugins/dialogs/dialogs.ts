/*  eslint-disable @typescript-eslint/no-explicit-any */
import { markRaw, type App, type Component, reactive, type Reactive } from 'vue';
import { DIALOGS_KEY, type DialogsPlugin, type DialogOptions } from './types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
import { getRandomId } from '../../utils';
import type { ExtractComponentProps } from '@/types';

const dialogStack = reactive<DialogOptions<any>[]>([]);

export const dialogService = {
  $openDialog<V>(
    component: Component,
    props: ExtractComponentProps<Component>,
  ): Promise<{ event: Ui3nDialogEvent; data?: V }> {
    return new Promise(
      (resolve: (value: { event: Ui3nDialogEvent; data?: V }) => void) => {
        dialogStack.push({
          id: getRandomId(5),
          component: markRaw(component),
          props,
          resolve,
        });
      },
    );
  },

  $closeDialog<V>(id: string, value: { event: Ui3nDialogEvent; data?: V }): void {
    const index = dialogStack.findIndex(m => m.id === id);
    if (index !== -1) {
      dialogStack[index].resolve(value);
      dialogStack.splice(index, 1);
    }
  },

  $closeDialogs() {
    for (let i = dialogStack.length - 1; i >= 0; i--) {
      dialogStack.splice(i, 1);
    }
  },

  get dialogStack() {
    return dialogStack;
  },
};

export default {
  install(app: App) {
    app.config.globalProperties.$modal = dialogService;

    app.provide<DialogsPlugin>(DIALOGS_KEY, { ...dialogService });
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $openDialog: <V>(
      component: Component,
      props: ExtractComponentProps<Component>,
    ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
    $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
    $closeDialogs: () => void;
    dialogStack: Reactive<DialogOptions<any>[]>;
  }
}
