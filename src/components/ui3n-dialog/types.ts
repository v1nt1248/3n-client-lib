import type { Component } from 'vue';
import type { ExtractComponentProps, Ui3nIconField } from '@/types';

export type Ui3nDialogEvent = 'open' | 'before-close' | 'close' | 'confirm' | 'cancel' | 'click-overlay';

export interface Ui3nDialogProps<V> {
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
  onClose?: (data?: V) => void;
  onConfirm?: (data: V) => void;
  onCancel?: (data: V) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonBackground?: string;
  cancelButtonBackground?: string;
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
}

export interface Ui3nDialogComponentProps<T extends Component, V> {
  component: T;
  componentProps?: ExtractComponentProps<T>;
  dialogProps?: Ui3nDialogProps<V>;
}

export interface Ui3nDialogComponentEmits<V> {
  (ev: 'open', value?: V): void;
  (ev: 'before-close', value?: V): void;
  (ev: 'close', value?: V): void;
  (ev: 'confirm', value?: V): void;
  (ev: 'cancel', value?: V): void;
  (ev: 'click-overlay', value?: V): void;
}
