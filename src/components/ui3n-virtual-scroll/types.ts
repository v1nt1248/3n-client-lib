import { VNode } from 'vue';

/**
 * Virtual scroll component properties
 */
export interface Ui3nVirtualScrollProps<T> {
  /**
   * List of items to render
   */
  items: T[];
  /**
   * Minimum height of child element
   */
  minChildHeight: number;
  /**
   * Number of items to render ahead
   */
  renderAhead?: number;
}

/**
 * Virtual scroll component slots
 */
export interface Ui3nVirtualScrollSlots<T> {
  /**
   * Item slot
   */
  item: ({ value, index }: { value: T; index: number }) => VNode;
}
