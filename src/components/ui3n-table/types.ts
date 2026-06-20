import { VNode, type Ref, type ComputedRef } from 'vue';

/**
 * Base table item interface
 */
export interface Ui3nTableBodyBaseItem {
  /**
   * Item ID
   */
  id?: string | number | symbol;
}

/**
 * Table sort type
 */
export type Ui3nTableSort<T extends Ui3nTableBodyBaseItem> = {
  /**
   * Sort field
   */
  field: keyof T;
  /**
   * Sort direction
   */
  direction: 'asc' | 'desc';
};

/**
 * Table configuration type
 */
export type Ui3nTableConfig<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  /**
   * Table name
   */
  tableName?: string;
  /**
   * Sort order
   */
  sortOrder?: Ui3nTableSort<T>;
  /**
   * Selection mode
   */
  selectable?: 'single' | 'multiple';
  // draggableRows?: boolean; // ToDo this will be done in the next version
  // draggableColumns?: boolean; // ToDo this will be done in the next version
  /**
   * Column styles
   */
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  /**
   * Field to use as row key
   */
  fieldAsRowKey?: keyof T;
  /**
   * Whether to show no data message
   * @default true
   */
  showNoDataMessage?: boolean;
  /**
   * Minimum height for unused place
   */
  minHeightUnusedPlace?: number | string;
};

/**
 * Table header properties type
 */
export type Ui3nTableHeadProps<T extends Ui3nTableBodyBaseItem> = {
  /**
   * Header key
   */
  key: keyof T;
  /**
   * Header text
   */
  text: string;
  /**
   * Whether header is sortable
   * @default false
   */
  sortable?: boolean;
  /**
   * Header cell style
   */
  headCellStyle?: Record<string, string>;
  /**
   * Format function
   */
  format?: (content: unknown) => string;
  /**
   * Whether header is hidden
   * @default false
   */
  hidden?: boolean;
  /**
   * Header index
   */
  index?: number;
};

/**
 * Table body properties type
 */
export type Ui3nTableBodyProps<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  /**
   * Body content
   */
  content: T[];
  /**
   * Row styles
   */
  rowsStyle?: { [P in T[K] as string | number]: Record<string, string> };
};

/**
 * Table component properties
 */
export interface Ui3nTableProps<T extends Ui3nTableBodyBaseItem> {
  /**
   * Table configuration
   */
  config: Ui3nTableConfig<T>;
  /**
   * Table header
   */
  head: Ui3nTableHeadProps<T>[];
  /**
   * Table body
   */
  body: Ui3nTableBodyProps<T>;
}

/**
 * Table component events
 */
export interface Ui3nTableEmits<T extends Ui3nTableBodyBaseItem> {
  /**
   * Emitted when sort changes
   */
  (ev: 'change:sort', val: Ui3nTableSort<T>): void;
  /**
   * Emitted when row is selected
   */
  (ev: 'select:row', val: T[]): void;
}

/**
 * Table other slots
 */
export type Ui3nTableOtherSlots = {
  /**
   * No data slot
   */
  'no-data': () => VNode;
  /**
   * Unused place slot
   */
  'unused-place': () => VNode;
};

/**
 * Table group actions slot
 */
export type Ui3nTableGroupActionsSlot<T extends Ui3nTableBodyBaseItem> = {
  /**
   * Group actions slot
   */
  'group-actions': ({ selectedRows }: { selectedRows: T[] }) => VNode;
};

/**
 * Table header cell slot
 */
export type Ui3nTableHeaderCellSlot<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  /**
   * Header cell slot
   */
  [p in `header-cell-${K}`]: () => VNode;
};

/**
 * Table body row slot scope
 */
export type Ui3nTableBodyRowSlotScope<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  /**
   * Row data
   */
  row: T;
  /**
   * Row style
   */
  rowStyle?: Record<string, string>;
  /**
   * Row index
   */
  rowIndex: number;
  /**
   * Whether row is selected
   */
  isRowSelected?: boolean;
  /**
   * Column styles
   */
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  /**
   * Events
   */
  events?: {
    /**
     * Select function
     */
    select: (row: T, withoutEvents?: boolean) => void;
  };
};

/**
 * Table body row slot
 */
export type Ui3nTableBodyRowSlot<T extends Ui3nTableBodyBaseItem> = {
  /**
   * Row slot
   */
  row: (scope: Ui3nTableBodyRowSlotScope<T>) => VNode;
};

/**
 * Table body row cell slot scope
 */
export type Ui3nTableBodyRowCellSlotScope<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  /**
   * Row data
   */
  row: T;
  /**
   * Row index
   */
  rowIndex: number;
  /**
   * Whether row is selected
   */
  isRowSelected?: boolean;
  /**
   * Column styles
   */
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  /**
   * Cell data
   */
  cell: T[K];
};

/**
 * Table body row cell slot
 */
export type Ui3nTableBodyRowCellSlot<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  /**
   * Row cell slot
   */
  [p in `row-cell-${K}`]: (scope: Ui3nTableBodyRowCellSlotScope<T, K>) => VNode;
};

/**
 * Table slots
 */
export type Ui3nTableSlots<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = Ui3nTableOtherSlots &
  Ui3nTableGroupActionsSlot<T> &
  Ui3nTableHeaderCellSlot<T, K> &
  Ui3nTableBodyRowSlot<T> &
  Ui3nTableBodyRowCellSlot<T, K>;

/**
 * Table sort icon properties
 */
export interface Ui3nTableSortIconProps {
  /**
   * Icon size
   */
  size?: string | number;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Icon value
   */
  value: 'asc' | 'desc';
}

/**
 * Table expose
 */
export type Ui3nTableExpose<T extends Ui3nTableBodyBaseItem> = {
  /**
   * Selected rows
   */
  selectedRows: Ref<Set<T> | Array<T[keyof T]>>;
  /**
   * Selected rows array
   */
  selectedRowsArray: ComputedRef<T[]>;
  /**
   * Whether has group actions row
   */
  hasGroupActionsRow: Ref<boolean>;
  /**
   * Get row style
   */
  getRowStyle: (row: T) => Record<string, string>;
  /**
   * Close group actions row
   */
  closeGroupActionsRow: () => void;
  /**
   * Clear all selected rows
   */
  clear: () => void;
};
