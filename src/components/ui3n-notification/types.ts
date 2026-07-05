export interface Ui3nNotificationProps {
  /**
   * Notification ID
   */
  id?: string;
  /**
   * Notification type
   */
  type?: 'success' | 'warning' | 'info' | 'error';
  /**
   * Notification content
   */
  content: string;
  /**
   * Notification position
   */
  position?: 'left' | 'center' | 'right';
  /**
   * Notification duration in milliseconds
   */
  duration?: number;
  /**
   * Whether to display icon
   * @default false
   */
  withIcon?: boolean;
  /**
   * Called when notification opens
   */
  onOpen?: () => void;
  /**
   * Called when notification closes
   */
  onClose?: () => void;
}
