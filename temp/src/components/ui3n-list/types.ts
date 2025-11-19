import { VNode } from 'vue';

export interface Ui3nListProps<T> {
  title?: string;
  sticky?: boolean;
  items: T[];
  disabled?: boolean;
}

export interface Ui3nListEmits<T> {
  (ev: 'select', value: { value: T; index: number }): void;
}

export interface Ui3nListSlots<T> {
  title?: () => VNode;
  item?: ({ item, index }: { item: T; index: number }) => VNode;
}
