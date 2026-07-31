import { VNode } from 'vue';

/**
 * Virtual scroll component properties
 */
export interface Ui3nVirtualScrollProps<T> {
  /**
   * List of items to render
   */
  items: T[];
  /**
   * Minimum height of child element
   */
  minChildHeight: number;
  /**
   * Number of items to render ahead
   */
  renderAhead?: number;
  /**
   * When true, if the user is near the bottom of the list,
   * keep the viewport stuck to the bottom after items update
   * (typical chat behavior). Default: false.
   */
  stickToBottom?: boolean;
  /**
   * Distance from the bottom (px) treated as "near bottom" for stickToBottom.
   * Default: 32.
   */
  stickToBottomThreshold?: number;
  /**
   * Distance from an edge (px) at which 'reached-top' / 'reached-bottom' fire.
   * Default: 64.
   */
  reachEdgeThreshold?: number;
}

/**
 * Virtual scroll component emits
 */
export interface Ui3nVirtualScrollEmits {
  (ev: 'scroll', value: Event): void;
  /**
   * The list has been scrolled close to its top - the moment to load
   * a previous page of items. Fires once per approach: it will not repeat
   * until the list leaves the edge or 'items' change.
   */
  (ev: 'reached-top'): void;
  /**
   * Same as 'reached-top', for the bottom edge.
   */
  (ev: 'reached-bottom'): void;
}

/**
 * Virtual scroll component slots
 */
export interface Ui3nVirtualScrollSlots<T> {
  /**
   * Item slot
   */
  item: ({ value, index }: { value: T; index: number }) => VNode;
}

export interface Ui3nVirtualScrollExpose {
  scrollToBottom(): void;
  scrollToItem(id: string, align?: 'start' | 'end' | 'center'): void;
  getScrollTop(): number;
  isStuckToBottom(): boolean;
}
