/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Plugin, createApp } from 'vue'
import type { InjectionKey } from 'vue'
import { isEmpty, values } from 'lodash'
import { getRandomId } from '../tools/common.helpers'
import Ui3nDialog from '../components/ui3n-dialog.vue'
import type { Ui3nDialogComponentProps } from '../components/ui3n-dialog.vue'

export type DialogInstance = {
  id: string;
  close: () => void;
}

export interface DialogsPlugin {
  $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
}

export const DIALOGS_KEY = Symbol() as InjectionKey<DialogsPlugin>

export const dialogs: Plugin = {
  install: (app: App) => {
    let openDialogs: Record<string, DialogInstance> = {}

    const $openDialog = (params: Ui3nDialogComponentProps): DialogInstance | undefined => {
      if (!isEmpty(openDialogs)) {
        for (const d of values(openDialogs)) {
          d.close && d.close()
        }
        openDialogs = {}
      }

      const div = document.createElement('div')
      const { component, componentProps, dialogProps } = params
      if (!component) {
        console.error('The dialog component missing')
        return
      }

      const { teleport } = dialogProps || {}

      const parentElement = !teleport || teleport === 'body'
        ? document.body
        : document.querySelector(teleport)

      if (parentElement) {
        const id = getRandomId(5)
        const dialogComponentInstance = createApp(
          Ui3nDialog,
          {
            component,
            ...componentProps && { componentProps },
            ...dialogProps && { dialogProps },
          },
        )
        const dialogComponent = dialogComponentInstance.mount(div)
        parentElement.appendChild(dialogComponent.$el)

        const close = () => {
          parentElement.removeChild(dialogComponent.$el)
          dialogComponentInstance && dialogComponentInstance.unmount && dialogComponentInstance.unmount()
        }

        openDialogs[id] = { id, close }

        return {
          id,
          close,
        }
      }
    }

    app.config.globalProperties.$openDialog = $openDialog
    app.provide<DialogsPlugin>(DIALOGS_KEY, { $openDialog })
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
  }
}
