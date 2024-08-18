import { VNode } from 'vue';

export interface Ui3nVirtualScrollProps<T> {
  items: T[];
  minChildHeight: number;
  renderAhead?: number;
}

export interface Ui3nVirtualScrollSlots<T> {
  item: ({ value, index }: { value: T; index: number }) => VNode;
}
