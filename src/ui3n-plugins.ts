/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import 'pinia';
import { i18n } from './plugins/i18n/i18n';
import { storeI18n } from './plugins/i18n/store-i18n';
import { I18N_KEY, type I18nOptions, type I18nPlugin } from './plugins/i18n/types';
import type { Ui3nNotificationProps } from './components/ui3n-notification/types';
import { notifications } from './plugins/notifications/notifications';
import { storeNotifications } from './plugins/notifications/store-notifications';
import { NOTIFICATIONS_KEY, type NotificationsPlugin } from './plugins/notifications/types';
import { dialogs } from './plugins/dialogs/dialogs';
import { storeDialogs } from './plugins/dialogs/store-dialogs';
import { DIALOGS_KEY, type DialogInstance, type DialogsPlugin } from './plugins/dialogs/types';
import type { Ui3nDialogComponentProps } from './components/ui3n-dialog/types';
import { vueBus } from './plugins/vue-bus/vue-bus';
import { storeVueBus } from './plugins/vue-bus/store-vue-bus';
import { VUEBUS_KEY, type CbFunction, type VueEventBus, type VueBusPlugin } from './plugins/vue-bus/types';

declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: <T extends Component, P extends Record<string, unknown>>(
      params: Ui3nDialogComponentProps<T, P>,
    ) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: VueEventBus;
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $openDialog: <T extends Component, P extends Record<string, unknown>>(
      params: Ui3nDialogComponentProps<T, P>,
    ) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: {
      on: (type: string | symbol, handler: CbFunction) => void;
      off: (type: string | symbol, handler?: CbFunction) => void;
      emit: (type: string | symbol, arguments?: any) => void;
      once: (type: string | symbol, handler: CbFunction) => void;
      clear: () => void;
    };
    $i18n: {
      locale: string;
      changeLocale: (lang: string) => void;
      tr: (key: string, placeholders?: Record<string, string>) => string;
    };
  }
}

export {
  i18n,
  storeI18n,
  I18N_KEY,
  I18nOptions,
  I18nPlugin,
  notifications,
  storeNotifications,
  NOTIFICATIONS_KEY,
  NotificationsPlugin,
  dialogs,
  storeDialogs,
  DIALOGS_KEY,
  DialogsPlugin,
  DialogInstance,
  vueBus,
  storeVueBus,
  VUEBUS_KEY,
  CbFunction,
  VueBusPlugin,
  VueEventBus,
};
