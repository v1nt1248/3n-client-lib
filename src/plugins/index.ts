import { i18n, I18N_KEY } from './i18n'
import type { I18nOptions, I18nPlugin } from './i18n'
import { useIcons } from './icons'
import { notifications, NOTIFICATIONS_KEY } from './notifications'
import type { NotificationsPlugin } from './notifications'
import { vueBus, VUEBUS_KEY } from './vue-bus'
import type { VueBusPlugin } from './vue-bus'
import { dialogs, DIALOGS_KEY } from './dialogs'
import type { DialogsPlugin } from './dialogs'
import { storeI18n } from './store-i18n'
import { storeNotifications } from './store-notifications'
import { storeVueBus } from './store-vue-bus'
import { storeDialogs } from './store-dialogs'

export {
  i18n, I18nOptions, I18nPlugin, I18N_KEY,
  useIcons,
  notifications, NotificationsPlugin, NOTIFICATIONS_KEY,
  vueBus, VueBusPlugin, VUEBUS_KEY,
  dialogs, DialogsPlugin, DIALOGS_KEY,
  storeI18n,
  storeNotifications,
  storeVueBus,
  storeDialogs,
}
