/* eslint-disable @typescript-eslint/no-explicit-any */
export type CbFunction = (...args: any[]) => void;

export interface VueEventBus {
  on: (type: string | symbol, handler: CbFunction) => void;
  off: (type: string | symbol, handler?: CbFunction) => void;
  emit: (type: string | symbol, arg?: any) => void;
  once: (type: string | symbol, handler: CbFunction) => void;
  clear: () => void;
}

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

export interface ListingEntryTypeExtended extends web3n.files.Stats {
  id: string | undefined;
  name: string;
  fullPath?: string;
  tags?: string[];
  type: string;
  ext?: string;
}

export type EntityAction = 'rename' | 'add:favorites' | 'open:menu';
export type SortField = 'name' | 'type' | 'createdAt' | 'changedAt';
