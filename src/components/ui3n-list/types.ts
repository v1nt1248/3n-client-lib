import type { VNode } from 'vue';

/**
 * List component properties
 */
export interface Ui3nListProps<T> {
  /**
   * List title
   */
  title?: string;
  /**
   * Whether to stick to top
   * @default false
   */
  sticky?: boolean;
  /**
   * List items
   */
  items: T[];
  /**
   * Key field for items
   */
  keyField?: keyof T;
  /**
   * Whether list is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * List component emits
 */
export interface Ui3nListEmits<T> {
  /**
   * Emitted when item is selected
   */
  (ev: 'select', value: { value: T; index: number }): void;
}

/**
 * List component slots
 */
export interface Ui3nListSlots<T> {
  /**
   * Title slot
   */
  title?: () => VNode;
  /**
   * Item slot
   */
  item?: ({ item, index }: { item: T; index: number }) => VNode;
}
