import { VNode } from 'vue';

export interface Ui3nAutocompleteOptionBase {
  id: string;
  name?: string;
}

export type Ui3nAutocompleteValue<T extends Ui3nAutocompleteOptionBase> = {
  [Property in keyof T]: T[Property];
};

export interface Ui3nAutocompleteProps<T extends Ui3nAutocompleteOptionBase> {
  chips?: boolean;
  clearOnSelect?: boolean;
  customFilter?: (value: T, query: string) => boolean;
  disabled?: boolean;
  filterKeys?: string[];
  hideSelected?: boolean;
  items: T[];
  itemTitle?: keyof T;
  itemValue?: keyof T;
  modelValue: T[] | Array<T[keyof T]>;
  addNewValue?: boolean;
  newValueValidator?: (value: string) => boolean;
  multiple?: boolean;
  noDataText?: string;
  placeholder?: string;
  returnObject?: boolean;
}

export interface Ui3nAutocompleteEmits<T extends Ui3nAutocompleteOptionBase> {
  (event: 'update:modelValue', value: T[] | Array<T[keyof T]>): void;
  (event: 'update:search', value: string): void;
  (event: 'update:focused', value: boolean): void;
  (event: 'valid:new-value', value: boolean): void;
}

export interface Ui3nAutocompleteSlots<T extends Ui3nAutocompleteOptionBase> {
  item: (props: { item: T; index: number; query?: string }) => VNode;
  chip: (props: { item: T | T[keyof T]; index: number }) => VNode;
  noDataText: () => VNode;
  selection: (props: { value: T[] | Array<T[keyof T]> }) => VNode;
}
