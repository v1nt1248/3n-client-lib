import type { Component } from 'vue';
import type { ExtractComponentProps, Ui3nIconField } from '@/types';

export type Ui3nDialogEvent = 'open' | 'before-close' | 'close' | 'confirm' | 'cancel' | 'click-overlay';

export interface Ui3nDialogProps<ConfirmData = unknown, CancelData = unknown, CloseData = unknown> {
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
  onClose?: (data?: CloseData) => void;
  onConfirm?: (data: ConfirmData) => void;
  onCancel?: (data: CancelData) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonBackground?: string;
  cancelButtonBackground?: string;
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
}

export interface Ui3nDialogComponentProps<
  T extends Component, ConfirmData = unknown, CancelData = unknown, CloseData = unknown
> {
  component: T;
  componentProps?: ExtractComponentProps<T>;
  dialogProps?: Ui3nDialogProps<ConfirmData, CancelData, CloseData>;
}

export interface Ui3nDialogComponentEmits {
  (ev: 'open', value?: unknown): void;
  (ev: 'before-close', value?: unknown): void;
  (ev: 'close', value?: unknown): void;
  (ev: 'confirm', value?: unknown): void;
  (ev: 'cancel', value?: unknown): void;
  (ev: 'click-overlay', value?: unknown): void;
}
