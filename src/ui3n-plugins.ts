/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Reactive } from 'vue';
import 'pinia';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nNotificationProps } from '@/components/ui3n-notification/types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
import {
  i18n,
  storeI18n,
  I18N_KEY,
  type I18nOptions,
  type I18nPlugin,
  notifications,
  storeNotifications,
  NOTIFICATIONS_KEY,
  type NotificationsPlugin,
  dialogs,
  storeDialogs,
  DIALOGS_KEY,
  type DialogOptions,
  type DialogsPlugin,
  vueBus,
  storeVueBus,
  VUEBUS_KEY,
  type VueBusPlugin,
} from '@/plugins';
import type { CbFunction, VueEventBus } from './plugins/vue-bus/types';

declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: <V>(
      component: Component,
      props: ExtractComponentProps<Component>
    ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
    $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
    $closeDialogs: () => void;
    dialogStack: Reactive<DialogOptions<any>[]>;
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
      open: <V>(
        component: Component,
        props: ExtractComponentProps<Component>,
      ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
      close: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
      closeAll: () => void;
      dialogStack: Reactive<DialogOptions<any>[]>;
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
  DialogOptions,
  vueBus,
  storeVueBus,
  VUEBUS_KEY,
  CbFunction,
  VueBusPlugin,
  VueEventBus,
};
