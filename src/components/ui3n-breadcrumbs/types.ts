import { VNode } from 'vue';

/**
 * Breadcrumb component properties
 */
export interface Ui3nBreadcrumbProps {
  /**
   * Separator between breadcrumbs
   * @default '/'
   */
  separator?: string | undefined;
  /**
   * Whether the breadcrumb is active
   * @default false
   */
  isActive?: boolean;
  /**
   * Whether the breadcrumb is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Breadcrumb component emits
 */
export interface Ui3nBreadcrumbEmits {
  /**
   * Called when the breadcrumb is clicked
   */
  (ev: 'click', value: MouseEvent): void;
}

/**
 * Breadcrumb component slots
 */
export interface Ui3nBreadcrumbSlots {
  /**
   * Separator slot
   */
  separator: () => VNode;
  /**
   * Default slot
   */
  default: () => VNode;
}

/**
 * Breadcrumbs component properties
 */
export interface Ui3nBreadcrumbsProps {
  /**
   * Separator between breadcrumbs
   * @default '/'
   */
  separator?: string;
  /**
   * Whether the breadcrumbs are disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Breadcrumbs component slots
 */
export interface Ui3nBreadcrumbsSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}
