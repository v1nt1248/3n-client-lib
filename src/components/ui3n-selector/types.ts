/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode } from 'vue';
import type { PrepareComponentEmits, Nullable } from '../../types';

export interface Ui3nSelectorOptionBase {
  id: string;
  [key: string]: any;
}

export type Ui3nSelectorItemDisplayingFunction<T extends Ui3nSelectorOptionBase> = (v: T) => string;

export type Ui3nSelectorValue<T extends Ui3nSelectorOptionBase> = T | T[keyof T] | null;

export interface Ui3nSelectorProps<T extends Ui3nSelectorOptionBase> {
  modelValue: Ui3nSelectorValue<T>;
  label?: string;
  placeholder?: string;
  items?: T[];
  itemValue?: keyof T;
  itemDisplay?: keyof T | Ui3nSelectorItemDisplayingFunction<T>;
  customFilter?: (value: Ui3nSelectorValue<T>, query: string) => boolean;
  returnObject?: boolean;
  clearable?: boolean;
  withSearch?: boolean;
  hideSelected?: boolean;
  noDataText?: string;
  disabled?: boolean;
}

export interface Ui3nSelectorEventsMap<T extends Ui3nSelectorOptionBase> {
  'update:modelValue': Ui3nSelectorValue<T>;
  'list:open': undefined;
  'list:close': undefined;
  focus: undefined;
  blur: undefined;
}

export type Ui3nSelectorEvents = keyof Ui3nSelectorEventsMap<any>;

// export interface Ui3nSelectorEmits<T extends Ui3nSelectorOptionBase> {
//   (event: 'update:modelValue', value: T | T[keyof T] | null): void;
//   (event: 'list:open'): void;
//   (event: 'list:close'): void;
//   (event: 'focus'): void;
//   (event: 'blur'): void;
// }

export type Ui3nSelectorEmits<T extends Ui3nSelectorOptionBase> = PrepareComponentEmits<Ui3nSelectorEventsMap<T>>;

export interface Ui3nSelectorSlots<T extends Ui3nSelectorOptionBase> {
  noDataText?: () => VNode;
  item?: (props: { item: T; index: number; activeIndex: Nullable<number>; query?: string }) => VNode;
  selection?: (props: { value: Ui3nSelectorValue<T>; selectedItem: T | undefined }) => VNode;
}
