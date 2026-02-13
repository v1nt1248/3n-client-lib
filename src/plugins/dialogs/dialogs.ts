/*  eslint-disable @typescript-eslint/no-explicit-any */
import { markRaw, type App, type Component, ref, type Ref } from 'vue';
import type { ExtractComponentProps } from '@/types';
import type { DialogsPlugin, DialogOptions } from './types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
import { getRandomId } from '../../utils';
import { DIALOGS_KEY } from '@/constants';

export default {
  install(app: App) {
    const dialogStack = ref<DialogOptions<any>[]>([]);

    function $openDialog<V>(
    component: Component,
    props: ExtractComponentProps<Component>,
  ): Promise<{ event: Ui3nDialogEvent; data?: V }> {
    return new Promise(
      (resolve: (value: { event: Ui3nDialogEvent; data?: V }) => void) => {
        dialogStack.value.push({
          id: getRandomId(5),
          component: markRaw(component),
          props,
          resolve,
        });
      },
    );
  }

  function $closeDialog<V>(id: string, value: { event: Ui3nDialogEvent; data?: V }): void {
    const index = dialogStack.value.findIndex(m => m.id === id);
    if (index !== -1) {
      dialogStack.value[index].resolve(value);
      dialogStack.value.splice(index, 1);
    }
  }

  function $closeDialogs() {
    dialogStack.value = [];
  }

    app.config.globalProperties.$dialog = {
      dialogStack,
      $openDialog,
      $closeDialog,
      $closeDialogs,
    };

    app.provide<DialogsPlugin>(DIALOGS_KEY, {
      dialogStack,
      $openDialog,
      $closeDialog,
      $closeDialogs,
    });
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    dialogStack: Ref<DialogOptions<any>[]>;
    $openDialog: <V>(
      component: Component,
      props: ExtractComponentProps<Component>,
    ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
    $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
    $closeDialogs: () => void;
  }
}
