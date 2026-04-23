/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Ref } from 'vue';
import 'pinia';
import type { ExtractComponentProps } from '@/types';
import type { Ui3nNotificationProps } from '@/components/ui3n-notification/types';
import type { Ui3nDialogEvent } from '@/components/ui3n-dialog/types';
import {
  notifications,
  storeNotifications,
  type NotificationsPlugin,
  dialogs,
  storeDialogs,
  type DialogOptions,
  type DialogsPlugin,
  vueBus,
  storeVueBus,
  type VueBusPlugin,
} from '@/plugins';
import type { CbFunction, VueEventBus } from './plugins/vue-bus/types';
import { NOTIFICATIONS_KEY, DIALOGS_KEY, VUEBUS_KEY } from '@/constants';
declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: <V>(
      component: Component,
      props: ExtractComponentProps<Component>,
    ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
    $closeDialog: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
    $closeDialogs: () => void;
    dialogStack: Ref<DialogOptions<any>[]>;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: VueEventBus<any>;
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: VueEventBus<any>;
    $dialogs: {
      open: <V>(
        component: Component,
        props: ExtractComponentProps<Component>,
      ) => Promise<{ event: Ui3nDialogEvent; data?: V }>;
      close: <V>(id: string, value: { event: Ui3nDialogEvent; data?: V }) => void;
      closeAll: () => void;
      dialogStack: Ref<DialogOptions<any>[]>;
    };
  }
}

export {
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
