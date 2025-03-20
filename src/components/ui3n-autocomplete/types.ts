import { VNode } from 'vue';

export type Ui3nAutocompleteOptions<T extends { id: string; name?: string }> = {
  [Property in keyof T]: T[Property];
};

export interface Ui3nAutocompleteProps<T extends { id: string; name?: string }> {
  chips?: boolean;
  clearOnSelect?: boolean;
  customFilter?: (value: T, query: string) => boolean;
  disabled?: boolean;
  filterKeys?: string[];
  filterMode?: 'every' | 'some';
  hideSelected?: boolean;
  items: T[];
  itemTitle?: keyof T;
  itemValue?: keyof T;
  modelValue: T[] | Array<T[keyof T]>;
  multiple?: boolean;
  noDataText?: string;
  placeholder?: string;
  returnObject?: boolean;
}

export interface Ui3nAutocompleteEmits<T extends { id: string; name?: string }> {
  (event: 'update:modelValue', value: T | T[]): void;
  (event: 'update:search', value: string): void;
  (event: 'update:focused', value: boolean): void;
}

export interface Ui3nAutocompleteSlots<T extends { id: string; name?: string }> {
  item: (props: { item: T; index: number }) => VNode;
  chip: (props: { item: T; index: number }) => VNode;
  selection: (props: { value: T[] | Array<T[keyof T]> }) => VNode;
}
