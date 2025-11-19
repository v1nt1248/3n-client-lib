import type { InjectionKey } from 'vue';
import type { Ui3nNotificationProps } from '@/components/ui3n-notification/types';

export interface NotificationsPlugin {
  $createNotice: (params: Ui3nNotificationProps) => void;
}

export const NOTIFICATIONS_KEY = Symbol() as InjectionKey<NotificationsPlugin>;
