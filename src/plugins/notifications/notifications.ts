import { type App, type Plugin, createApp } from 'vue';
import { getRandomId } from '../../utils';
import Ui3nNotificationContainer from '../../components/ui3n-notification/ui3n-notification-container.vue';
import type { Ui3nNotificationProps } from '../../components/ui3n-notification/types';
import type { NotificationsPlugin } from './types';
import { NOTIFICATIONS_KEY } from '../../constants';

export const notifications: Plugin = {
  install: (app: App) => {
    if (typeof window === 'undefined') {
      return;
    }

    const containerDiv = document.createElement('div');
    document.body.appendChild(containerDiv);
    const containerApp = createApp(Ui3nNotificationContainer);

    containerApp._context.provides = app._context.provides;

    const containerInstance = containerApp.mount(containerDiv) as any;

    const $createNotice = (params: Ui3nNotificationProps) => {
      const id = params.id || getRandomId(6);
      const duration = params.duration !== undefined ? params.duration : 1500;

      containerInstance.add({
        ...params,
        id,
        duration,
      });
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
