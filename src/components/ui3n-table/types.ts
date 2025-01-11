import { VNode } from 'vue';

export interface Ui3nTableBodyBaseItem {
  id?: string | number | symbol;
}

export type Ui3nTableSort<T extends Ui3nTableBodyBaseItem> = {
  field: keyof T;
  direction: 'asc' | 'desc';
};

export type Ui3nTableConfig<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  tableName?: string;
  sortOrder?: Ui3nTableSort<T>;
  selectable?: 'single' | 'multiple';
  // draggableRows?: boolean; // ToDo this will be done in the next version
  // draggableColumns?: boolean; // ToDo this will be done in the next version
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  fieldAsRowKey?: keyof T;
};

export type Ui3nTableHeadProps<T extends Ui3nTableBodyBaseItem> = {
  key: keyof T;
  text: string;
  sortable?: boolean;
  headCellStyle?: Record<string, string>;
  format?: (content: unknown) => string;
  hidden?: boolean;
  index?: number;
};

export type Ui3nTableBodyProps<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  content: T[];
  rowsStyle?: { [P in T[K] as string | number]: Record<string, string> };
};

export interface Ui3nTableProps<T extends Ui3nTableBodyBaseItem> {
  config: Ui3nTableConfig<T>;
  head: Ui3nTableHeadProps<T>[];
  body: Ui3nTableBodyProps<T>;
}

export interface Ui3nTableEmits<T extends Ui3nTableBodyBaseItem> {
  (ev: 'change:sort', val: Ui3nTableSort<T>): void;
  (ev: 'select:row', val: T[]): void;
}

export type Ui3nTableGroupActionsSlot = {
  'group-actions': () => VNode;
};

export type Ui3nTableHeaderCellSlot<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  [p in `header-cell-${K}`]: () => VNode;
};

export type Ui3nTableBodyRowEventHandlers<T extends Ui3nTableBodyBaseItem> = {
  select: (row: T, withoutEvents?: boolean) => void;
};

export type Ui3nTableBodyRowSlotScope<T extends Ui3nTableBodyBaseItem, K extends keyof T = keyof T> = {
  row: T;
  rowStyle?: Record<string, string>;
  rowIndex: number;
  isRowSelected?: boolean;
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  eventHandlers?: Ui3nTableBodyRowEventHandlers<T>;
};

export type Ui3nTableBodyRowSlot<T extends Ui3nTableBodyBaseItem> = {
  row: (scope: Ui3nTableBodyRowSlotScope<T>) => VNode;
};

export type Ui3nTableBodyRowCellSlotScope<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  row: T;
  rowIndex: number;
  isRowSelected?: boolean;
  columnStyle?: { [P in Omit<K, 'id'> as string | number]: Record<string, string> };
  cell: T[K];
};

export type Ui3nTableBodyRowCellSlot<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = {
  [p in `row-cell-${K}`]: (scope: Ui3nTableBodyRowCellSlotScope<T, K>) => VNode;
};

export type Ui3nTableSlots<T extends Ui3nTableBodyBaseItem, K extends string & keyof T> = Ui3nTableGroupActionsSlot &
  Ui3nTableHeaderCellSlot<T, K> &
  Ui3nTableBodyRowSlot<T> &
  Ui3nTableBodyRowCellSlot<T, K>;

export interface Ui3nTableSortIconProps {
  size?: string | number;
  color?: string;
  value: 'asc' | 'desc';
}
