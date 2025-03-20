import { VNode } from 'vue';

export interface Ui3nMenuProps {
  modelValue?: boolean;
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
  (ev: 'update:modelValue', value: boolean): void;
}

export interface Ui3nMenuSlots {
  default: () => VNode;
  menu?: () => VNode;
}
