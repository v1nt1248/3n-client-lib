/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey } from 'vue';
import type { DialogsPlugin } from '../plugins/dialogs/types';
import type { I18nPlugin } from '../plugins/i18n/types';
import type { NotificationsPlugin } from '../plugins/notifications/types';
import type { VueBusPlugin } from '../plugins/vue-bus/types';

export const DIALOGS_KEY = Symbol.for('ui3n-dialogs-plugin') as InjectionKey<DialogsPlugin>;
export const I18N_KEY = Symbol.for('ui3n-i18-plugin') as InjectionKey<I18nPlugin>;
export const NOTIFICATIONS_KEY = Symbol('ui3n-notifications-plugin') as InjectionKey<NotificationsPlugin>;
export const VUEBUS_KEY = Symbol('ui3n-vuebus-plugin') as InjectionKey<VueBusPlugin<any>>;
