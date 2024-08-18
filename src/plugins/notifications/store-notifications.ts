/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ui3nNotificationProps } from '@/components/ui3n-notification/types';

export function storeNotifications(context: any): { $createNotice: (params: Ui3nNotificationProps) => void } {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $createNotice } = globalProperties;
  return { $createNotice };
}
