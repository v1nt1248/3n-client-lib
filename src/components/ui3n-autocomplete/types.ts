import { VNode } from 'vue';

/**
 * Base autocomplete option interface
 */
export interface Ui3nAutocompleteOptionBase {
  /**
   * Option ID
   */
  id: string;
  /**
   * Option name
   */
  name?: string;
}

/**
 * Autocomplete value type
 */
export type Ui3nAutocompleteValue<T extends Ui3nAutocompleteOptionBase> = {
  [Property in keyof T]: T[Property];
};

/**
 * Autocomplete component properties
 */
export interface Ui3nAutocompleteProps<T extends Ui3nAutocompleteOptionBase> {
  /**
   * Whether to show chips
   * @default false
   */
  chips?: boolean;
  /**
   * Whether to clear input on select
   * @default false
   */
  clearOnSelect?: boolean;
  /**
   * Custom filter function
   */
  customFilter?: (value: T, query: string) => boolean;
  /**
   * Whether autocomplete is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Filter keys
   */
  filterKeys?: string[];
  /**
   * Whether to hide selected items
   * @default false
   */
  hideSelected?: boolean;
  /**
   * Items to display
   */
  items: T[];
  /**
   * Property to use as title
   */
  itemTitle?: keyof T;
  /**
   * Property to use as value
   */
  itemValue?: keyof T;
  /**
   * Current autocomplete value
   */
  modelValue: T[] | Array<T[keyof T]>;
  /**
   * Whether to allow adding new values
   * @default false
   */
  addNewValue?: boolean;
  /**
   * New value validator function
   */
  newValueValidator?: (value: string) => boolean;
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Text to show when no data
   */
  noDataText?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether to return the whole object or just the value
   * @default false
   */
  returnObject?: boolean;
}

/**
 * Autocomplete component emits
 */
export interface Ui3nAutocompleteEmits<T extends Ui3nAutocompleteOptionBase> {
  /**
   * Emitted when model value updates
   */
  (event: 'update:modelValue', value: T[] | Array<T[keyof T]>): void;
  /**
   * Emitted when search value updates
   */
  (event: 'update:search', value: string): void;
  /**
   * Emitted when focused state updates
   */
  (event: 'update:focused', value: boolean): void;
  /**
   * Emitted when new value validation status updates
   */
  (event: 'valid:new-value', value: boolean): void;
}

/**
 * Autocomplete component slots
 */
export interface Ui3nAutocompleteSlots<T extends Ui3nAutocompleteOptionBase> {
  /**
   * Item slot
   */
  item: (props: { item: T; index: number; query?: string }) => VNode;
  /**
   * Chip slot
   */
  chip: (props: { item: T | T[keyof T]; index: number }) => VNode;
  /**
   * No data text slot
   */
  noDataText: () => VNode;
  /**
   * Selection slot
   */
  selection: (props: { value: T[] | Array<T[keyof T]> }) => VNode;
}
