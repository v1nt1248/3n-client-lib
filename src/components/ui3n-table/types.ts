export type Ui3nTableSort<T extends object> = {
  field: keyof T;
  direction: 'asc' | 'desc';
};

export type Ui3nTableConfig<T extends object> = {
  tableName?: string;
  defaultSortOrder?: Ui3nTableSort<T>;
  selectable?: boolean;
  draggebleRows?: boolean;
  draggebleColumns?: boolean;
  columnStyle?: Record<keyof T, Record<string, string>>;
  fieldAsRowKey?: keyof T;
};

export type Ui3nTableHeadProps<T extends object> = {
  key: keyof T;
  text: string;
  sortable?: boolean;
  headCellStyle?: Record<string, string>;
  format?: (content: unknown) => string;
  hidden?: boolean;
  index?: number;
};

export type Ui3nTableBodyProps<T extends object> = {
  content: T;
  rowStyle?: Record<string, string>;
};

export interface Ui3nTableProps<T extends object> {
  config: Ui3nTableConfig<T>;
  head: Ui3nTableHeadProps<T>[];
  body: Ui3nTableBodyProps<T>[];
}

export interface Ui3nTableEvents<T extends object> {
  (ev: 'change:sort', val: Ui3nTableSort<T>): void;
}
