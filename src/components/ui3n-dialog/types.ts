import type { VNode } from 'vue';
import type { Ui3nIconField } from '@/types';

/**
 * Dialog event base types
 */
export type Ui3nDialogEventBase = 'close' | 'confirm' | 'cancel' | 'click-overlay';

/**
 * Dialog event types
 */
export type Ui3nDialogEvent<E extends string = never> = Ui3nDialogEventBase | E;

/**
 * Dialog component properties
 */
export interface Ui3nDialogComponentProps<V> {
  /**
   * Dialog id
   */
  id?: string;
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Dialog icon
   */
  icon?: string | Ui3nIconField;
  /**
   * Dialog width
   */
  width?: string | number;
  /**
   * Whether dialog is draggable
   * @default false
   */
  draggable?: boolean;
  /**
   * Whether to hide close button
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * CSS classes for dialog
   */
  cssClass?: string[];
  /**
   * CSS styles for dialog
   */
  cssStyle?: Record<string, string>;
  /**
   * CSS classes for content
   */
  contentCssClass?: string[];
  /**
   * CSS styles for content
   */
  contentCssStyle?: Record<string, string>;
  /**
   * Whether to show confirm button
   * @default true
   */
  confirmButton?: boolean;
  /**
   * Whether to show cancel button
   * @default true
   */
  cancelButton?: boolean;
  /**
   * Confirm button text
   */
  confirmButtonText?: string;
  /**
   * Cancel button text
   */
  cancelButtonText?: string;
  /**
   * Confirm button color
   */
  confirmButtonColor?: string;
  /**
   * Cancel button color
   */
  cancelButtonColor?: string;
  /**
   * Confirm button background
   */
  confirmButtonBackground?: string;
  /**
   * Cancel button background
   */
  cancelButtonBackground?: string;
  /**
   * Whether to close on click overlay
   * @default true
   */
  closeOnClickOverlay?: boolean;
  /**
   * Whether to close on ESC key
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Dialog data
   */
  data?: V;
  /**
   * Whether dialog is valid
   * @default true
   */
  isValid?: boolean;
}

/**
 * Dialog component emits
 */
export interface Ui3nDialogComponentEmits<V, E extends string = never> {
  /**
   * Called when dialog action is performed
   */
  (event: 'action', value: { event: Ui3nDialogEvent<E>; data?: V }): void;
}

/**
 * Dialog component slots
 */
export interface Ui3nDialogComponentSlots {
  /**
   * Header slot
   */
  header?: () => VNode;
  /**
   * Body slot
   */
  body: () => VNode;
  /**
   * Actions slot
   */
  actions?: () => VNode;
  /**
   * Loading slot
   */
  loading?: () => VNode;
}
