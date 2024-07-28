import { get, isEmpty } from 'lodash';
import type { Ui3nTableProps, Ui3nTableSort } from '@/components/ui3n-table/types';

export function setColumnWidth<T extends object>(el: HTMLDivElement, tableData: Ui3nTableProps<T>)  {
  const { config = {}, head } = tableData;
  const { columnStyle } = config;
  console.log('columnStyle', columnStyle);
  const keys = head.map(h => h.key);
  keys.forEach((key) => {
    const width = get(columnStyle, [key, 'width'], 'auto');
    el && el.style.setProperty(`--ui3n-table-col-${String(key)}-width`, width);
  });
}

export function getInitialSortOrder<T extends object>(tableData: Ui3nTableProps<T>): Ui3nTableSort<T> {
  const { config = {}, head } = tableData;
  const { defaultSortOrder } = config;
  if (!isEmpty(defaultSortOrder)) {
    return defaultSortOrder;
  }

  for (const h of head) {
    const { key, sortable } = h
    if (sortable) {
      return {
        field: key,
        direction: 'desc',
      };
    }
  }

  return {} as Ui3nTableSort<T>;
}
