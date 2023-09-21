/* eslint-disable @typescript-eslint/no-explicit-any */
import 'pinia'
import type { CbFunction, Ui3nNotificationProps, VueEventBus } from './constants'
import type { Ui3nDialogComponentProps } from './components/ui3n-dialog.vue'
import type { DialogInstance } from './plugins/dialogs'

export * from './constants'
export * from './tools'
export * from './libs'
export * from './plugins'
export * from './directives'
export * from './components'

declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: VueEventBus;
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: {
      on: (type: string|symbol, handler: CbFunction) => void;
      off: (type: string|symbol, handler?: CbFunction) => void;
      emit:(type: string|symbol, arguments?: any) => void;
      once: (type: string|symbol, handler: CbFunction) => void;
      clear: () => void;
    }
    $i18n: {
      locale: string;
      changeLocale: (lang: string) => void;
      tr: (key: string, placeholders?: Record<string, string>) => string;
    }
  }
}
