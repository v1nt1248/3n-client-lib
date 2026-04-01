import { VNode } from 'vue';

/**
 * Chip component properties
 */
export interface Ui3nChipProps {
  /**
   * Chip height
   */
  height?: number | string;
  /**
   * Chip maximum width
   */
  maxWidth?: number | string;
  /**
   * Chip plain style
   * @default false
   */
  plain?: boolean;
  /**
   * Chip round shape
   * @default false
   */
  round?: boolean;
  /**
   * Chip closeable
   * @default false
   */
  closeable?: boolean;
  /**
   * Chip color
   */
  color?: string;
  /**
   * Text size
   */
  textSize?: number | string;
  /**
   * Text color
   */
  textColor?: string;
  /**
   * Chip disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * Chip component emits
 */
export interface Ui3nChipEmits {
  /**
   * Called when chip is closed
   */
  (ev: 'close'): void;
}

/**
 * Chip component slots
 */
export interface Ui3nChipSlots {
  /**
   * Left slot
   */
  left: (props: { size: number; color: string }) => VNode;
  /**
   * Default slot
   */
  default: () => VNode;
}
