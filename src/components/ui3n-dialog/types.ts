import type { Component } from 'vue';

export type Ui3nDialogEvent = 'open' | 'before-close' | 'close' | 'confirm' | 'cancel' | 'click-overlay';

export interface Ui3nDialogProps {
  teleport?: string;
  title?: string;
  width?: string | number;
  cssClass?: string[];
  cssStyle?: Record<string, string>;
  contentCssClass?: string[];
  contentCssStyle?: Record<string, string>;
  confirmButton?: boolean;
  cancelButton?: boolean;
  onClose?: () => void;
  onConfirm?: (data: any) => void;
  onCancel?: (data: any) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonBackground?: string;
  cancelButtonBackground?: string;
  closeOnClickOverlay?: boolean;
}

export interface Ui3nDialogComponentProps {
  component: Component;
  componentProps?: Record<string, any>;
  dialogProps?: Ui3nDialogProps;
}

export interface Ui3nDialogComponentEmits {
  (ev: 'open', value?: any): void;
  (ev: 'before-close', value?: any): void;
  (ev: 'close', value?: any): void;
  (ev: 'confirm', value?: any): void;
  (ev: 'cancel', value?: any): void;
  (ev: 'click-overlay', value?: any): void;
}
