import { VNode } from 'vue';

export type Ui3nTooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface Ui3nTooltipProps {
  modelValue?: boolean;
  content?: string;
  color?: string;
  textColor?: string;
  placement?: Ui3nTooltipPlacement;
  positionStrategy?: 'absolute' | 'fixed';
  offsetX?: string | number;
  offsetY?: string | number;
  trigger?: 'click' | 'hover' | 'manual';
  disabled?: boolean;
}

export interface Ui3nTooltipEmits {
  (ev: 'open'): void;
  (ev: 'opened'): void;
  (ev: 'close'): void;
  (ev: 'closed'): void;
  (ev: 'update:modelValue', value: boolean): void;
}

export interface Ui3nTooltipSlots {
  default: () => VNode;
  content?: () => VNode;
}
