import { i18n } from './i18n/i18n';
import type { I18nOptions, I18nPlugin } from './i18n/types';
import { notifications } from './notifications/notifications';
import type { NotificationsPlugin } from './notifications/types';
import { vueBus } from './vue-bus/vue-bus';
import type { VueBusPlugin } from './vue-bus/types';
import dialogs from './dialogs/dialogs';
import type { DialogsPlugin, DialogOptions } from './dialogs/types';
import { storeI18n } from './i18n/store-i18n';
import { storeNotifications } from './notifications/store-notifications';
import { storeVueBus } from './vue-bus/store-vue-bus';
import { storeDialogs } from './dialogs/store-dialog';

export {
  i18n,
  I18nOptions,
  I18nPlugin,
  notifications,
  NotificationsPlugin,
  vueBus,
  VueBusPlugin,
  dialogs,
  DialogsPlugin,
  DialogOptions,
  storeI18n,
  storeNotifications,
  storeVueBus,
  storeDialogs,
};
