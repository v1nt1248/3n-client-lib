import { get, isEmpty } from 'lodash';
import type { Ui3nTableBodyBaseItem, Ui3nTableProps, Ui3nTableSort } from '@/components/ui3n-table/types';

export function setColumnWidth<T extends Ui3nTableBodyBaseItem>(el: HTMLDivElement, tableData: Ui3nTableProps<T>) {
  const { config = {}, head } = tableData;
  const { columnStyle } = config;
  const keys = head.map(h => h.key);
  keys.forEach(key => {
    const width = get(columnStyle, [key, 'width'], 'auto');
    el && el.style.setProperty(`--ui3n-table-col-${String(key)}-width`, width);
  });
}

export function setInitialSortOrder<T extends Ui3nTableBodyBaseItem>(tableData: Ui3nTableProps<T>): Ui3nTableSort<T> {
  const { config = {}, head } = tableData;
  const { sortOrder } = config;
  if (!isEmpty(sortOrder)) {
    return sortOrder;
  }

  for (const h of head) {
    const { key, sortable } = h;
    if (sortable) {
      return {
        field: key,
        direction: 'desc',
      };
    }
  }

  return {} as Ui3nTableSort<T>;
}
