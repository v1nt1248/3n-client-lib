import { computed, onMounted, type Ref, ref, watch, UnwrapRef } from 'vue';
import { get, isEmpty, size } from 'lodash';
import {
  Ui3nTableBodyBaseItem,
  Ui3nTableConfig,
  Ui3nTableEmits,
  Ui3nTableProps,
  Ui3nTableSort,
} from '@/components/ui3n-table/types';
import type { Ui3nCheckboxValue } from '@/components/ui3n-checkbox/types';

export function useTable<T extends Ui3nTableBodyBaseItem>(props: Ui3nTableProps<T>, emits: Ui3nTableEmits<T>) {
  const tableEl = ref<HTMLDivElement | null>(null);
  const currentConfig = ref<Pick<Ui3nTableConfig<T>, 'sortOrder' | 'fieldAsRowKey'>>({
    sortOrder: setInitialSortOrder(),
    fieldAsRowKey: setFieldAsRowKey(),
  });
  const selectedRows: Ref<Set<T> | Array<T[keyof T]>> = !!currentConfig.value?.fieldAsRowKey
    ? ref([])
    : (ref(new Set()) as Ref<Set<T>>);
  const hasGroupActionsRow = ref(false);

  const isRowKeyUsed = computed(() => !!currentConfig.value.fieldAsRowKey);
  const visibleColumns = computed(() => props.head.filter(h => !h.hidden));
  const selectedRowsArray = computed(() =>
    isRowKeyUsed.value
      ? props.body.content.filter(row =>
          (selectedRows.value as Array<T[keyof T]>).includes(row[currentConfig.value.fieldAsRowKey as keyof T]),
        )
      : Array.from(selectedRows.value as Set<T>),
  );
  const selectedRowsSize = computed(() =>
    isRowKeyUsed.value ? size(selectedRows.value) : (selectedRows.value as Set<T>).size,
  );
  const showGroupActionsRow = computed(() => props.config?.selectable === 'multiple' && hasGroupActionsRow.value);

  onMounted(() => {
    tableEl.value && setColumnWidth(tableEl.value);
  });

  function setColumnWidth(el: HTMLDivElement) {
    const { config = {}, head } = props;
    const { columnStyle } = config;
    const keys = head.map(h => h.key);
    const columnsWidthValue = keys.reduce((res, key, index) => {
      const width = get(columnStyle, [key, 'width'], '1fr');
      res = index === 0 ? `${width}` : `${res} ${width}`;
      return res;
    }, '');
    el && el.style.setProperty('--ui3n-table-columns-width', columnsWidthValue);
  }

  function setFieldAsRowKey() {
    const { config = {}, body } = props;
    const { fieldAsRowKey } = config;
    if (fieldAsRowKey && fieldAsRowKey in get(body, ['content', 0], {})) return fieldAsRowKey;

    if ('id' in get(body, ['content', 0], {})) return 'id';

    return undefined;
  }

  function setInitialSortOrder(): Ui3nTableSort<T> {
    const { config = {}, head } = props;
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

  function getRowKey(row: T, index: number) {
    return isRowKeyUsed.value ? (row[currentConfig.value.fieldAsRowKey as keyof T] as string | number) : index;
  }

  function isRowSelected(row: T): boolean {
    if (isRowKeyUsed.value) {
      return !!(selectedRows.value as Array<T[keyof T]>).find(
        keyValue => keyValue === row[currentConfig.value.fieldAsRowKey as keyof T],
      );
    }

    return (selectedRows.value as Set<T>).has(row);
  }

  function getRowStyle(row: T): Record<string, string> {
    if (isEmpty(props.body.rowsStyle) || !isRowKeyUsed.value) return {};

    const rowKey = row[currentConfig.value.fieldAsRowKey as keyof T] as string | number;
    return get(props, ['body', 'rowsStyle', rowKey], {});
  }

  function closeGroupActionsRow() {
    hasGroupActionsRow.value = false;
    toggleSelectedRows(false);
  }

  function selectInSingleMode(row: T) {
    if (isRowSelected(row)) {
      isRowKeyUsed.value && ((selectedRows.value as Array<T[keyof T]>) = []);
      !isRowKeyUsed.value && (selectedRows.value as Set<T>).clear();
    } else {
      if (isRowKeyUsed.value) {
        (selectedRows.value as Array<T[keyof T]>) = [row[currentConfig.value?.fieldAsRowKey as keyof T]];
      } else {
        (selectedRows.value as Set<T>).clear();
        (selectedRows.value as Set<T>).add(row);
      }
    }
  }

  function selectInMultipleMode(row: T) {
    if (isRowSelected(row)) {
      if (!isRowKeyUsed.value) {
        (selectedRows.value as Set<T>).delete(row);
      } else {
        const index = (selectedRows.value as Array<T[keyof T]>).findIndex(
          keyValue => keyValue === row[currentConfig.value.fieldAsRowKey as keyof T],
        );
        (selectedRows.value as Array<T[keyof T]>).splice(index, 1);
      }
    } else {
      isRowKeyUsed.value &&
        (selectedRows.value as Array<T[keyof T]>).push(row[currentConfig.value.fieldAsRowKey as keyof T]);
      !isRowKeyUsed.value && (selectedRows.value as Set<T>).add(row);
    }
  }

  function processSelection(row: T, withoutEvents?: boolean) {
    const { selectable } = props.config;

    if (selectable === 'single') {
      selectInSingleMode(row);
    } else {
      selectInMultipleMode(row);
    }

    !withoutEvents && emits('select:row', selectedRowsArray.value);
  }

  function toggleSelectedRows(val: Ui3nCheckboxValue) {
    if (props.config.selectable !== 'multiple') return;

    if (!!val) {
      for (const item of props.body.content) {
        if (!isRowSelected(item)) {
          processSelection(item, true);
        }
      }
    } else {
      isRowKeyUsed.value && ((selectedRows.value as Array<T[keyof T]>) = []);
      !isRowKeyUsed.value && (selectedRows.value as Set<T>).clear();
    }

    emits('select:row', selectedRowsArray.value);
  }

  function changeSortOrder(field: keyof T) {
    if (currentConfig.value.sortOrder?.field === field) {
      currentConfig.value.sortOrder.direction = currentConfig.value.sortOrder?.direction === 'asc' ? 'desc' : 'asc';
    } else {
      currentConfig.value.sortOrder!.field = field as UnwrapRef<keyof T>;
      currentConfig.value.sortOrder!.direction = 'desc';
    }

    currentConfig.value.sortOrder?.field && emits('change:sort', currentConfig.value.sortOrder as Ui3nTableSort<T>);
  }

  watch(
    () => selectedRowsSize.value,
    (val, oldVal) => {
      if (val && val > oldVal && props.config.selectable === 'multiple' && !showGroupActionsRow.value) {
        hasGroupActionsRow.value = true;
      }
    },
  );

  return {
    tableEl,
    currentConfig,
    visibleColumns,
    hasGroupActionsRow,
    showGroupActionsRow,
    selectedRows,
    selectedRowsArray,
    selectedRowsSize,
    closeGroupActionsRow,
    getRowKey,
    isRowSelected,
    getRowStyle,
    processSelection,
    toggleSelectedRows,
    changeSortOrder,
  };
}
