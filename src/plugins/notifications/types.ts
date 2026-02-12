import type { Ui3nNotificationProps } from '@/components/ui3n-notification/types';

export interface NotificationsPlugin {
  $createNotice: (params: Ui3nNotificationProps) => void;
}
