import { VNode } from 'vue';

export interface Ui3nBreadcrumbProps {
  separator?: string | undefined;
  isActive?: boolean;
  disabled?: boolean;
}

export interface Ui3nBreadcrumbEmits {
  (ev: 'click', value: Event): void;
}

export interface Ui3nBreadcrumbSlots {
  separator: () => VNode;
  default: () => VNode;
}

export interface Ui3nBreadcrumbsProps {
  separator?: string;
  disabled?: boolean;
}
