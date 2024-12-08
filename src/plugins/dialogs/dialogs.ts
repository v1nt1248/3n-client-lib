/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVNode, render } from 'vue';
import type { App, Component, Plugin, VNode } from 'vue';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import { getRandomId } from '@/utils';
import Ui3nDialog from '../../components/ui3n-dialog/ui3n-dialog.vue';
import type { Ui3nDialogComponentProps, Ui3nDialogProps } from '@/components/ui3n-dialog/types';
import { DIALOGS_KEY, type DialogInstance, type DialogsPlugin } from './types';
import { ExtractComponentProps } from '@/components/types';

export const dialogs: Plugin = {
  install: (app: App) => {
    let openDialogs: Record<string, { destroy: () => void }> = {};

    const $openDialog = <T extends Component>(params: Ui3nDialogComponentProps<T>): DialogInstance | undefined => {
      const {
        component,
        componentProps = {} as ExtractComponentProps<T>,
        dialogProps = {} as Ui3nDialogProps,
      } = params;

      if (!component) {
        throw Error('[Dialog plugin] The dialog component missing');
      }

      const { teleport } = dialogProps || ({} as Ui3nDialogProps);

      const parentElement = !teleport || teleport === 'body' ? document.body : document.querySelector(teleport);

      if (parentElement) {
        const randomString = getRandomId(5);
        const id = `dialog-wrapper-${randomString}`;
        let vNode: VNode | null = createVNode(Ui3nDialog, {
          component,
          componentProps,
          dialogProps: {
            ...dialogProps,
            id: `dialog-${randomString}`,
            onClose: dialogProps.onClose
              ? () => {
                  dialogProps.onClose!();
                  destroy();
                }
              : () => destroy(),
          },
        });
        vNode.appContext = app._context;
        let el: HTMLDivElement | null = document.createElement('div');
        el.id = id;
        render(vNode, el);

        const destroy = () => {
          if (el) {
            const closedDialogId = el.id;
            render(null, el);
            document.body.removeChild(el);
            closedDialogId && delete openDialogs[closedDialogId];
          }
          el = null;
          vNode = null;
        };

        document.body.appendChild(el);
        openDialogs[id] = { destroy };

        return { id, el, vNode, destroy };
      }
    };

    const $closeDialog = (id: string) => {
      const dialog = openDialogs[id];

      if (!dialog) {
        throw Error(`There is no the dialog with the ID "${id}"`);
      }

      dialog.destroy && dialog.destroy();
    };

    const $closeDialogs = () => {
      if (!isEmpty(openDialogs)) {
        for (const d of values(openDialogs)) {
          d.destroy && d.destroy();
        }
        openDialogs = {};
      }
    };

    app.config.globalProperties.$openDialog = $openDialog;
    app.config.globalProperties.$closeDialog = $closeDialog;
    app.config.globalProperties.$closeDialogs = $closeDialogs;
    app.provide<DialogsPlugin>(DIALOGS_KEY, { $openDialog, $closeDialog, $closeDialogs });
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $openDialog: <T extends Component>(params: Ui3nDialogComponentProps<T>) => DialogInstance | undefined;
    $closeDialog: (id: string) => void;
    $closeDialogs: () => void;
  }
}
