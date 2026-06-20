import type { VNode } from 'vue';

/**
 * ScrollbarVertical component properties
 */
export interface Ui3nScrollbarVerticalProps {
  thumbMinHeight?: number | string;
  thumbHeight?: number | string | 'auto';
  thumbRadius?: number | string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  trackWidth?: number;
  trackRadius?: number | string;
  trackColor?: string;
  autoUpdate?: boolean;
}

/**
 * ScrollbarVertical component emits
 */
export interface Ui3nScrollbarVerticalEmits {
  (ev: 'scroll', value: Event): void;
}

/**
 * ScrollbarVertical component slots
 */
export interface Ui3nScrollbarVerticalSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}

export interface Ui3nScrollbarVerticalExpose {
  scrollTo(options: ScrollToOptions): void;
  getContainer(): HTMLDivElement;
  updateMetrics(): void;
}
