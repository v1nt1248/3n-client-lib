import type { VNode } from 'vue';

export interface Ui3nScrollbarHorizontalProps {
  thumbMinWidth?: number | string;
  thumbWidth?: number | string | 'auto';
  thumbRadius?: number | string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  trackHeight?: number | string;
  trackRadius?: number | string;
  trackColor?: string;
}

export interface Ui3nScrollbarHorizontalEmits {
  (ev: 'scroll', value: Event): void;
}

export interface Ui3nScrollbarHorizontalSlots {
  default: () => VNode;
}

export interface Ui3nScrollbarHorizontalExpose {
  scrollTo(options: ScrollToOptions): void;
  getContainer(): HTMLDivElement;
}
