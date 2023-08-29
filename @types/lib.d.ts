interface Ui3nNotificationProps {
  id?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  content: string;
  icon?: string;
  iconSize?: string | number;
  iconColor?: string;
  position?: 'left' | 'center' | 'right';
  duration?: number;
  teleport?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface NotificationsPlugin {
  $createNotice: (params: Ui3nNotificationProps) => void;
}

interface ListingEntryTypeExtended extends web3n.files.Stats {
  id: string | undefined;
  name: string;
  fullPath?: string;
  tags?: string[];
  type: string;
  ext?: string;
}

type EntityAction = 'rename' | 'add:favorites' | 'open-menu'
type SortField = 'name' | 'type' | 'createdAt' | 'changedAt'
