import { i18n } from './i18n'
import type { I18nOptions, I18nPlugin } from './i18n'
import { useIcons } from './icons'
import { notifications } from './notifications'
import type { NotificationsPlugin } from './notifications'
import { vueBus } from './vue-bus'
import type { VueBusPlugin } from './vue-bus'
import { dialogs } from './dialogs'
import type { DialogsPlugin } from './dialogs'
import { storeI18n } from './store-i18n'
import { storeVueBus } from './store-vue-bus'

export {
  i18n, I18nOptions, I18nPlugin,
  useIcons,
  notifications, NotificationsPlugin,
  vueBus, VueBusPlugin,
  dialogs, DialogsPlugin,
  storeI18n,
  storeVueBus,
}
