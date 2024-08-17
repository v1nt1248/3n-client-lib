import { VNode } from 'vue';

export interface Ui3nMenuProps {
  positionStrategy?: 'absolute' | 'fixed';
  offsetX?: number;
  offsetY?: number;
  closeOnClick?: boolean;
  closeOnClickOutside?: boolean;
  disabled?: boolean;
}

export interface Ui3nMenuEmits {
  (ev: 'open'): void;
  (ev: 'opened'): void;
  (ev: 'close'): void;
  (ev: 'closed'): void;
  (ev: 'click-outside'): void;
}

export interface Ui3nMenuSlots {
  default: () => VNode;
  menu?: () => VNode;
}
