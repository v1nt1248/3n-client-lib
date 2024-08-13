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
  draggebleRows?: boolean;
  draggebleColumns?: boolean;
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

export interface Ui3nTableEvents<T extends Ui3nTableBodyBaseItem> {
  (ev: 'change:sort', val: Ui3nTableSort<T>): void;
  (ev: 'select:row', val: T[]): void;
}
