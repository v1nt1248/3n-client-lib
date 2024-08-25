/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVNode, render } from 'vue';
import type { App, Component, Plugin, VNode } from 'vue';
import { isEmpty, values } from 'lodash';
import { getRandomId } from '@/utils/common.utils';
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';
import { DIALOGS_KEY, type DialogInstance, type DialogsPlugin } from './types';

export const dialogs: Plugin = {
  install: (app: App) => {
    let openDialogs: Record<string, { destroy: () => void }> = {};

    const $openDialog = <T extends Component, P extends Record<string, unknown>>(
      params: Ui3nDialogComponentProps<T, P>,
    ): DialogInstance | undefined => {
      // TODO In the current version you cannot open a dialog from another dialog
      if (!isEmpty(openDialogs)) {
        for (const d of values(openDialogs)) {
          d.destroy && d.destroy();
        }
        openDialogs = {};
      }

      const { component, componentProps = {}, dialogProps = {} } = params;
      if (!component) {
        throw Error('[Dialog plugin] The dialog component missing');
      }

      const { teleport } = dialogProps || {};

      const parentElement = !teleport || teleport === 'body' ? document.body : document.querySelector(teleport);

      if (parentElement) {
        const id = `dialog-${getRandomId(5)}`;
        let vNode: VNode | null = createVNode(Ui3nDialog, {
          component,
          componentProps,
          dialogProps: {
            ...dialogProps,
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

    app.config.globalProperties.$openDialog = $openDialog;
    app.provide<DialogsPlugin>(DIALOGS_KEY, { $openDialog });
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $openDialog: <T extends Component, P extends Record<string, unknown>>(
      params: Ui3nDialogComponentProps<T, P>,
    ) => DialogInstance | undefined;
  }
}
