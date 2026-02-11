import { i18n } from './i18n/i18n';
import { I18N_KEY, type I18nOptions, type I18nPlugin } from './i18n/types';
import { notifications } from './notifications/notifications';
import { NOTIFICATIONS_KEY, type NotificationsPlugin } from './notifications/types';
import { vueBus } from './vue-bus/vue-bus';
import { VUEBUS_KEY, type VueBusPlugin } from './vue-bus/types';
import dialogs from './dialogs/dialogs';
import { DIALOGS_KEY, type DialogsPlugin, type DialogOptions } from './dialogs/types';
import { storeI18n } from './i18n/store-i18n';
import { storeNotifications } from './notifications/store-notifications';
import { storeVueBus } from './vue-bus/store-vue-bus';
import { storeDialogs } from './dialogs/store-dialog';

export {
  i18n,
  I18nOptions,
  I18nPlugin,
  I18N_KEY,
  notifications,
  NotificationsPlugin,
  NOTIFICATIONS_KEY,
  vueBus,
  VueBusPlugin,
  VUEBUS_KEY,
  dialogs,
  DialogsPlugin,
  DialogOptions,
  DIALOGS_KEY,
  storeI18n,
  storeNotifications,
  storeVueBus,
  storeDialogs,
};
