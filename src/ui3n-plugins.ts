/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import 'pinia';
import { i18n } from '@/plugins';
import { storeI18n } from '@/plugins';
import { I18N_KEY, type I18nOptions, type I18nPlugin } from '@/plugins';
import type { Ui3nNotificationProps } from './components/ui3n-notification/types';
import { notifications } from '@/plugins';
import { storeNotifications } from '@/plugins';
import { NOTIFICATIONS_KEY, type NotificationsPlugin } from '@/plugins';
import { dialogs } from '@/plugins';
import { storeDialogs } from '@/plugins';
import { DIALOGS_KEY, type DialogInstance, type DialogsPlugin } from './plugins/dialogs/types';
import type { Ui3nDialogComponentProps } from '@/components';
import { vueBus } from '@/plugins';
import { storeVueBus } from '@/plugins';
import { VUEBUS_KEY, type CbFunction, type VueEventBus, type VueBusPlugin } from './plugins/vue-bus/types';

declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: <T extends Component, V>(params: Ui3nDialogComponentProps<T, V>) => DialogInstance | undefined;
    $closeDialog: (id: string) => void;
    $closeDialogs: () => void;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: VueEventBus<any>;
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: VueEventBus<any>;
    $i18n: {
      locale: string;
      changeLocale: (lang: string) => void;
      tr: (key: string, placeholders?: Record<string, string>) => string;
    };
    $dialogs: {
      open: <T extends Component, V>(params: Ui3nDialogComponentProps<T, V>) => DialogInstance | undefined;
      close: (id: string) => void;
      closeAll: () => void;
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
