import type { Ref, VNode } from 'vue';

export interface Ui3nMenuProps {
  modelValue?: boolean;
  triggerElement?: HTMLElement;
  positionStrategy?: 'absolute' | 'fixed';
  positionAutoupdate?: boolean;
  allowFlip?: boolean;
  offsetX?: number;
  offsetY?: number;
  contentBorderRadius?: number | number[];
  zIndex?: number;
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

export interface Ui3nMenuExpose {
  isPositioned: Readonly<Ref<boolean>>;
  update: () => void;
}
