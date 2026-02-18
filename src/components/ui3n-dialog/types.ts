import type { VNode } from 'vue';
import type { Ui3nIconField } from '@/types';

export type Ui3nDialogEvent = 'close' | 'confirm' | 'cancel' | 'click-overlay';

export interface Ui3nDialogComponentProps<V> {
  id?: string;
  title?: string;
  icon?: string | Ui3nIconField;
  width?: string | number;
  draggable?: boolean;
  cssClass?: string[];
  cssStyle?: Record<string, string>;
  contentCssClass?: string[];
  contentCssStyle?: Record<string, string>;
  confirmButton?: boolean;
  cancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonBackground?: string;
  cancelButtonBackground?: string;
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
  data?: V;
  isValid?: boolean;
}

export interface Ui3nDialogComponentEmits<V> {
  (event: 'action', value: { event: Ui3nDialogEvent; data?: V }): void;
}

export interface Ui3nDialogComponentSlots {
  header?: () => VNode;
  body: () => VNode;
  actions?: () => VNode;
  loading?: () => VNode;
}
