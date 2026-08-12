import { computed, type Ref, ref, watch, UnwrapRef, onBeforeUnmount } from 'vue';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import cloneDeep from 'lodash/cloneDeep';
import {
  Ui3nTableBodyBaseItem,
  Ui3nTableConfig,
  Ui3nTableEmits,
  Ui3nTableProps,
  Ui3nTableSort,
} from '@/components/ui3n-table/types';
import type { Ui3nCheckboxValue } from '@/components/ui3n-checkbox/types';

const ABSOLUTE_CSS_SIZE_RE = /^-?\d+(\.\d+)?(px|rem|em|ch|ex|cm|mm|in|pt|pc)$/i;

export function isAbsoluteCssSize(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }

  return ABSOLUTE_CSS_SIZE_RE.test(value.trim());
}

export function useTable<T extends Ui3nTableBodyBaseItem>(
  props: Ui3nTableProps<T>,
  emits: Ui3nTableEmits<T>,
  scrollbarContainerRef?: Ref<HTMLDivElement | null>,
) {
  const tableEl = ref<HTMLDivElement | null>(null);
  const currentConfig = ref<Pick<Ui3nTableConfig<T>, 'sortOrder' | 'fieldAsRowKey'>>({
    sortOrder: setInitialSortOrder(),
    fieldAsRowKey: setFieldAsRowKey(),
  });
  const selectedRows: Ref<Set<T> | Array<T[keyof T]>> = currentConfig.value?.fieldAsRowKey
    ? ref([])
    : (ref(new Set()) as Ref<Set<T>>);
  const hasGroupActionsRow = ref(false);
  const scrollportWidth = ref<number | null>(null);

  let resizeObserver: ResizeObserver | null = null;

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

  function getInvalidStickyColumnWidths(): Array<{ key: string; width: string }> {
    const { columnStyle } = props.config ?? {};
    const invalid: Array<{ key: string; width: string }> = [];

    for (const h of visibleColumns.value) {
      const width = get(columnStyle, [h.key, 'width'], '') as string;
      if (!isAbsoluteCssSize(width)) {
        invalid.push({ key: String(h.key), width: width || '(missing)' });
      }
    }

    return invalid;
  }

  const stickyColumnsRequested = computed(() => {
    const n = Number(props.config?.stickyColumns);
    if (!Number.isFinite(n) || n < 1) {
      return 0;
    }

    return Math.floor(n);
  });

  const stickyColumnsCount = computed(() => {
    if (!stickyColumnsRequested.value) {
      return 0;
    }

    const max = Math.max(0, visibleColumns.value.length - 1);
    if (!max) {
      return 0;
    }

    if (getInvalidStickyColumnWidths().length) {
      return 0;
    }

    return Math.min(stickyColumnsRequested.value, max);
  });

  const stickyColumnsActive = computed(() => stickyColumnsCount.value > 0);

  const stickyColumnLefts = computed(() => {
    const count = stickyColumnsCount.value;
    if (!count) {
      return [] as string[];
    }

    const { columnStyle } = props.config ?? {};
    const widths = visibleColumns.value.slice(0, count).map(h => {
      return (get(columnStyle, [h.key, 'width'], '0px') as string).trim();
    });

    const lefts: string[] = [];
    for (let i = 0; i < count; i++) {
      if (i === 0) {
        lefts.push('0px');
        continue;
      }

      if (i === 1) {
        lefts.push(widths[0]);
        continue;
      }

      lefts.push(`calc(${widths.slice(0, i).join(' + ')})`);
    }

    return lefts;
  });

  const tableColumnWidth = computed(() => {
    if (!tableEl.value) {
      return '100%';
    }

    const { config = {}, head } = props;
    const { columnStyle } = config;
    const keys = head.filter(h => !h.hidden).map(h => h.key);
    const useAbsolute = stickyColumnsActive.value;

    return keys.reduce((res, key, index) => {
      const width = useAbsolute
        ? (get(columnStyle, [key, 'width']) as string)
        : (get(columnStyle, [key, 'width'], '1fr') as string);
      res = index === 0 ? `${width}` : `${res} ${width}`;
      return res;
    }, '');
  });

  const unusedPlaceCssStyle = computed(() => {
    if (!props.config?.minHeightUnusedPlace || isNaN(Number(props.config?.minHeightUnusedPlace))) {
      return {};
    }

    return {
      minHeight: `${Number(props.config?.minHeightUnusedPlace || 0)}px`,
    };
  });

  function setFieldAsRowKey() {
    const { config = {}, body } = props;
    const { fieldAsRowKey } = config;
    if (fieldAsRowKey && fieldAsRowKey in get(body, ['content', 0], {})) {
      return fieldAsRowKey;
    }

    if ('id' in get(body, ['content', 0], {})) {
      return 'id';
    }

    return undefined;
  }

  function setInitialSortOrder(): Ui3nTableSort<T> {
    const { config = {}, head } = props;
    const { sortOrder } = config;
    if (!isEmpty(sortOrder)) {
      return cloneDeep(sortOrder);
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
    if (isEmpty(props.body.rowsStyle) || !isRowKeyUsed.value) {
      return {};
    }

    const rowKey = row[currentConfig.value.fieldAsRowKey as keyof T] as string | number;
    // @ts-expect-error
    return get(props, ['body', 'rowsStyle', rowKey], {} as Record<string, string>);
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
        if (index !== -1) {
          (selectedRows.value as Array<T[keyof T]>).splice(index, 1);
        }
      }
    } else {
      if (isRowKeyUsed.value) {
        (selectedRows.value as Array<T[keyof T]>).push(row[currentConfig.value.fieldAsRowKey as keyof T]);
      } else {
        (selectedRows.value as Set<T>).add(row);
      }
    }
  }

  function processSelection(row: T, withoutEvents?: boolean) {
    const { selectable } = props.config;

    if (selectable === 'single') {
      selectInSingleMode(row);
    } else {
      selectInMultipleMode(row);
    }

    if (!withoutEvents) {
      emits('select:row', selectedRowsArray.value);
    }
  }

  function toggleSelectedRows(val: Ui3nCheckboxValue) {
    if (props.config.selectable !== 'multiple') {
      return;
    }

    if (val) {
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
      currentConfig.value.sortOrder.direction =
        currentConfig.value.sortOrder?.direction === 'asc' ? 'desc' : 'asc';
    } else {
      currentConfig.value.sortOrder = {
        field: field as UnwrapRef<keyof T>,
        direction: 'desc',
      };
    }

    if (currentConfig.value.sortOrder?.field) {
      emits('change:sort', currentConfig.value.sortOrder as Ui3nTableSort<T>);
    }
  }

  function clear() {
    if (isRowKeyUsed.value) {
      (selectedRows.value as Array<T[keyof T]>) = [];
    } else {
      (selectedRows.value as Set<T>).clear();
    }

    hasGroupActionsRow.value = false;
    emits('select:row', []);
  }

  function disconnectScrollportObserver() {
    resizeObserver?.disconnect();
    resizeObserver = null;
  }

  function syncScrollportObserver() {
    disconnectScrollportObserver();

    const el = scrollbarContainerRef?.value ?? tableEl.value;
    if (!el || !stickyColumnsActive.value) {
      scrollportWidth.value = null;
      return;
    }

    const updateWidth = () => {
      scrollportWidth.value = el.clientWidth;
    };

    updateWidth();
    resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
  }

  watch(
    () => props.config?.tableName,
    newTableName => {
      if (!newTableName) {
        clear();
      }
    },
  );

  watch(
    () => selectedRowsSize.value,
    (val, oldVal) => {
      if (val && val > oldVal && props.config.selectable === 'multiple' && !showGroupActionsRow.value) {
        hasGroupActionsRow.value = true;
      }
    },
  );

  watch(
    () => ({
      requested: stickyColumnsRequested.value,
      tableName: props.config?.tableName,
      visibleCount: visibleColumns.value.length,
      columnKeys: visibleColumns.value.map(h => String(h.key)).join('\0'),
      widths: visibleColumns.value
        .map(h => `${String(h.key)}=${get(props.config?.columnStyle, [h.key, 'width'], '')}`)
        .join('\0'),
    }),
    ({ requested, tableName, visibleCount }) => {
      if (!requested) {
        return;
      }

      const tableLabel = tableName ? ` tableName="${tableName}"` : '';
      const max = Math.max(0, visibleCount - 1);

      if (requested > max) {
        console.warn(
          `[Ui3nTable] stickyColumns clamped:${tableLabel} requested=${requested}, max=${max} (visibleColumns.length - 1).`,
        );
      }

      const invalid = getInvalidStickyColumnWidths();
      if (!invalid.length) {
        return;
      }

      const details = invalid.map(({ key, width }) => `key="${key}" width="${width}"`).join(', ');
      console.warn(
        `[Ui3nTable] stickyColumns disabled:${tableLabel} column width must be an absolute CSS length.\nInvalid: ${details}`,
      );
    },
    { immediate: true },
  );

  watch([tableEl, stickyColumnsActive, scrollbarContainerRef], syncScrollportObserver, {
    immediate: true,
    flush: 'post',
  });

  onBeforeUnmount(() => {
    disconnectScrollportObserver();
  });

  return {
    tableEl,
    tableColumnWidth,
    unusedPlaceCssStyle,
    currentConfig,
    visibleColumns,
    hasGroupActionsRow,
    showGroupActionsRow,
    selectedRows,
    selectedRowsArray,
    selectedRowsSize,
    stickyColumnsActive,
    stickyColumnsCount,
    stickyColumnLefts,
    scrollportWidth,
    closeGroupActionsRow,
    getRowKey,
    isRowSelected,
    getRowStyle,
    processSelection,
    toggleSelectedRows,
    changeSortOrder,
    clear,
  };
}
