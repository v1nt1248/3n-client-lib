import { notifications } from './notifications/notifications';
import type { NotificationsPlugin } from './notifications/types';
import { vueBus } from './vue-bus/vue-bus';
import type { VueBusPlugin } from './vue-bus/types';
import dialogs from './dialogs/dialogs';
import type { DialogsPlugin, DialogOptions } from './dialogs/types';
import { storeNotifications } from './notifications/store-notifications';
import { storeVueBus } from './vue-bus/store-vue-bus';
import { storeDialogs } from './dialogs/store-dialog';
import { theme } from './theme/theme';
import { storeTheme } from './theme/store-theme';
import type { ThemePlugin, ThemePluginOptions, ThemeId } from './theme/types';

export {
  notifications,
  NotificationsPlugin,
  vueBus,
  VueBusPlugin,
  dialogs,
  DialogsPlugin,
  DialogOptions,
  theme,
  ThemePlugin,
  ThemePluginOptions,
  ThemeId,
  storeNotifications,
  storeVueBus,
  storeDialogs,
  storeTheme,
};
