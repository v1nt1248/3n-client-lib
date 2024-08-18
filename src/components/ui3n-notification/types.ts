export interface Ui3nNotificationProps {
  id?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  content: string;
  position?: 'left' | 'center' | 'right';
  duration?: number;
  withIcon?: boolean;
  teleport?: string;
  onOpen?: () => void;
  onClose?: () => void;
}
