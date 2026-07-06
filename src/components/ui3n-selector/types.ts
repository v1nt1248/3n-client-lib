/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode } from 'vue';
import type { PrepareComponentEmits, Nullable } from '@/types';

/**
 * Base selector option interface
 */
export interface Ui3nSelectorOptionBase {
  /**
   * Option ID
   */
  id: string;
  [key: string]: any;
}

/**
 * Function to display selector item
 */
export type Ui3nSelectorItemDisplayingFunction<T extends Ui3nSelectorOptionBase> = (v: T) => string;

/**
 * Selector value type
 */
export type Ui3nSelectorValue<T extends Ui3nSelectorOptionBase> = T | T[keyof T] | null;

/**
 * Selector component properties
 */
export interface Ui3nSelectorProps<T extends Ui3nSelectorOptionBase> {
  /**
   * Root element id
   */
  id?: string;
  /**
   * HTML name attribute for form submission
   */
  name?: string;
  /**
   * Current selector value
   */
  modelValue: Ui3nSelectorValue<T>;
  /**
   * Label text
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Items to display
   */
  items?: T[];
  /**
   * Property to use as value
   */
  itemValue?: keyof T;
  /**
   * Property or function to display item
   */
  itemDisplay?: keyof T | Ui3nSelectorItemDisplayingFunction<T>;
  /**
   * Whether to return the whole object or just the value
   * @default false
   */
  returnObject?: boolean;
  /**
   * Whether to show clear button
   * @default false
   */
  clearable?: boolean;
  /**
   * Whether to hide selected item
   * @default false
   */
  hideSelected?: boolean;
  /**
   * Text to show when no data
   */
  noDataText?: string;
  /**
   * Whether selector is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Selector component events map
 */
export interface Ui3nSelectorEventsMap<T extends Ui3nSelectorOptionBase> {
  /**
   * Emitted when model value updates
   */
  'update:modelValue': Ui3nSelectorValue<T>;
  /**
   * Emitted when list is opened
   */
  'list:open': undefined;
  /**
   * Emitted when list is closed
   */
  'list:close': undefined;
  /**
   * Emitted when component is focused
   */
  focus: undefined;
  /**
   * Emitted when component loses focus
   */
  blur: undefined;
}

/**
 * Selector component events type
 */
export type Ui3nSelectorEvents = keyof Ui3nSelectorEventsMap<any>;

// export interface Ui3nSelectorEmits<T extends Ui3nSelectorOptionBase> {
//   (event: 'update:modelValue', value: T | T[keyof T] | null): void;
//   (event: 'list:open'): void;
//   (event: 'list:close'): void;
//   (event: 'focus'): void;
//   (event: 'blur'): void;
// }

/**
 * Selector component emits
 */
export type Ui3nSelectorEmits<T extends Ui3nSelectorOptionBase> = PrepareComponentEmits<Ui3nSelectorEventsMap<T>>;

/**
 * Selector component slots
 */
export interface Ui3nSelectorSlots<T extends Ui3nSelectorOptionBase> {
  /**
   * No data text slot
   */
  noDataText?: () => VNode;
  /**
   * Item slot
   */
  item?: (props: { item: T; index: number; activeIndex: Nullable<number> }) => VNode;
  /**
   * Selection slot
   */
  selection?: (props: { value: Ui3nSelectorValue<T>; selectedItem: T | undefined }) => VNode;
}

export interface Ui3nSelectorExpose {
  clear: () => void;
}
