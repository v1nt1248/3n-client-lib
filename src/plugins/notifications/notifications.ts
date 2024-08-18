import { App, Plugin, createApp } from 'vue';
import { getRandomId } from '@/utils/common.utils';
import Ui3nNotification from '../../components/ui3n-notification/ui3n-notification.vue';
import type { Ui3nNotificationProps } from '../../components/ui3n-notification/types';
import { NOTIFICATIONS_KEY, type NotificationsPlugin } from './types';

export const notifications: Plugin = {
  install: (app: App) => {
    const $createNotice = (params: Ui3nNotificationProps) => {
      const div = document.createElement('div');
      const parentElement =
        !params.teleport || params.teleport === 'body' ? document.body : document.querySelector(params.teleport);
      const duration = params.duration ?? 1500;

      if (parentElement) {
        const componentInstance = createApp(Ui3nNotification, {
          id: getRandomId(6),
          content: params.content,
          ...(params.type && { type: params.type }),
          ...(params.position && { position: params.position }),
          ...(params.withIcon && { withIcon: params.withIcon }),
          ...(params.onOpen && { onOpen: params.onOpen }),
          duration,
          onClose: () => {
            parentElement.removeChild(component.$el);
            componentInstance && componentInstance.unmount && componentInstance.unmount();
          },
        });
        const component = componentInstance.mount(div);
        parentElement.appendChild(component.$el);

        if (duration) {
          setTimeout(() => {
            parentElement.removeChild(component.$el);
            componentInstance && componentInstance.unmount && componentInstance.unmount();
          }, duration);
        }
      }
    };

    app.config.globalProperties.$createNotice = $createNotice;
    app.provide<NotificationsPlugin>(NOTIFICATIONS_KEY, { $createNotice });
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $createNotice: (params: Ui3nNotificationProps) => void;
  }
}
