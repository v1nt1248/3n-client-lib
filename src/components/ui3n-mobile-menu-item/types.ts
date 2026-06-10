export interface Ui3nMobileMenuItemBase {
  id: string | number;
  name: string;
  icon?: string;
}

/**
 * Menu Item component properties
 */
export interface Ui3nMobileMenuItemProps<T extends Ui3nMobileMenuItemBase> {
  item: T;
  isActive?: boolean;
}

/**
 * Menu Item component emits
 */
export interface Ui3nMobileMenuItemEmits<T extends Ui3nMobileMenuItemBase> {
  /**
   * Emitted when an item is selected on the menu
   */
  (event: 'selectItem', item: T): void;
}
