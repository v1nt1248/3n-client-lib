import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTable } from '../src/components/ui3n-table/composables/useTable';

interface Row {
  id: number;
  name: string;
  age: number;
}

const rows: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    config: {},
    head: [
      { key: 'name', text: 'Name' },
      { key: 'age', text: 'Age', sortable: true },
    ],
    body: { content: rows },
    ...overrides,
  };
}

function setupTable(props: Record<string, unknown>, emits = vi.fn()) {
  let api: ReturnType<typeof useTable<Row>> | undefined;

  const wrapper = mount(
    defineComponent({
      setup() {
        api = useTable<Row>(props as never, emits as never, ref(null));
        return () => h('div');
      },
    }),
  );

  return { api: api!, emits, wrapper };
}

describe('useTable · initial config', () => {
  it('keeps an explicit sort order', () => {
    const { api } = setupTable(makeProps({ config: { sortOrder: { field: 'name', direction: 'asc' } } }));

    expect(api.currentConfig.value.sortOrder).toEqual({ field: 'name', direction: 'asc' });
  });

  it('falls back to the first sortable column, descending', () => {
    const { api } = setupTable(makeProps());

    expect(api.currentConfig.value.sortOrder).toEqual({ field: 'age', direction: 'desc' });
  });

  it('has no sort order without a sortable column', () => {
    const { api } = setupTable(makeProps({ head: [{ key: 'name', text: 'Name' }] }));

    expect(api.currentConfig.value.sortOrder).toEqual({});
  });

  it('uses the configured row key', () => {
    const { api } = setupTable(makeProps({ config: { fieldAsRowKey: 'name' } }));

    expect(api.currentConfig.value.fieldAsRowKey).toBe('name');
  });

  it('falls back to id, then to nothing', () => {
    expect(setupTable(makeProps()).api.currentConfig.value.fieldAsRowKey).toBe('id');

    const withoutId = setupTable(
      makeProps({ body: { content: [{ name: 'A' }, { name: 'B' }] } }),
    ).api;
    expect(withoutId.currentConfig.value.fieldAsRowKey).toBeUndefined();
  });

  it('hides columns marked as hidden', () => {
    const props = makeProps({
      head: [
        { key: 'name', text: 'Name' },
        { key: 'age', text: 'Age', hidden: true },
      ],
    });
    const { api } = setupTable(props);

    expect(api.visibleColumns.value.map(c => c.key)).toEqual(['name']);
  });
});

describe('useTable · selection', () => {
  it('selects and deselects a single row by key', () => {
    const props = makeProps({ config: { selectable: 'single', fieldAsRowKey: 'id' } });
    const { api, emits } = setupTable(props);

    api.processSelection(rows[0]);
    expect(api.selectedRowsArray.value).toEqual([rows[0]]);
    expect(emits).toHaveBeenLastCalledWith('select:row', [rows[0]]);

    api.processSelection(rows[1]);
    expect(api.selectedRowsArray.value).toEqual([rows[1]]);

    api.processSelection(rows[1]);
    expect(api.selectedRowsArray.value).toEqual([]);
  });

  it('toggles rows in multiple mode by key', () => {
    const props = makeProps({ config: { selectable: 'multiple', fieldAsRowKey: 'id' } });
    const { api } = setupTable(props);

    api.processSelection(rows[0]);
    api.processSelection(rows[1]);
    expect(api.selectedRowsArray.value).toEqual([rows[0], rows[1]]);
    expect(api.selectedRowsSize.value).toBe(2);

    api.processSelection(rows[0]);
    expect(api.selectedRowsArray.value).toEqual([rows[1]]);
  });

  it('selects whole rows when there is no key field', () => {
    const content = [{ name: 'A' }, { name: 'B' }];
    const props = makeProps({ config: { selectable: 'multiple' }, body: { content } });
    const { api } = setupTable(props);

    api.processSelection(content[0]);
    api.processSelection(content[1]);
    expect(api.selectedRowsArray.value).toEqual(content);

    api.processSelection(content[0]);
    expect(api.selectedRowsArray.value).toEqual([content[1]]);
  });

  it('does not emit when asked to stay silent', () => {
    const props = makeProps({ config: { selectable: 'multiple', fieldAsRowKey: 'id' } });
    const { api, emits } = setupTable(props);

    api.processSelection(rows[0], true);
    expect(emits).not.toHaveBeenCalled();
    expect(api.selectedRowsArray.value).toEqual([rows[0]]);
  });

  it('toggles all rows at once', () => {
    const props = makeProps({ config: { selectable: 'multiple', fieldAsRowKey: 'id' } });
    const { api, emits } = setupTable(props);

    api.toggleSelectedRows(true);
    expect(api.selectedRowsArray.value).toEqual(rows);

    api.toggleSelectedRows(false);
    expect(api.selectedRowsArray.value).toEqual([]);
    expect(emits).toHaveBeenLastCalledWith('select:row', []);
  });

  it('clears the selection', () => {
    const props = makeProps({ config: { selectable: 'multiple', fieldAsRowKey: 'id' } });
    const { api, emits } = setupTable(props);

    api.processSelection(rows[0]);
    api.clear();
    expect(api.selectedRowsArray.value).toEqual([]);
    expect(emits).toHaveBeenLastCalledWith('select:row', []);
  });

  it('reports row keys by field or by index', () => {
    const withKey = setupTable(makeProps({ config: { fieldAsRowKey: 'id' } })).api;
    expect(withKey.getRowKey(rows[1], 1)).toBe(2);

    const withoutId = setupTable(
      makeProps({ body: { content: [{ name: 'A' }] } }),
    ).api;
    expect(withoutId.getRowKey({ name: 'A' } as never, 7)).toBe(7);
  });

  it('reveals the group actions row after selecting in multiple mode', async () => {
    const props = makeProps({ config: { selectable: 'multiple', fieldAsRowKey: 'id' } });
    const { api } = setupTable(props);

    expect(api.showGroupActionsRow.value).toBe(false);

    api.processSelection(rows[0]);
    await nextTick();
    expect(api.hasGroupActionsRow.value).toBe(true);
    expect(api.showGroupActionsRow.value).toBe(true);

    api.closeGroupActionsRow();
    expect(api.hasGroupActionsRow.value).toBe(false);
    expect(api.selectedRowsArray.value).toEqual([]);
  });
});

describe('useTable · sorting', () => {
  it('toggles the direction of the active field', () => {
    const { api, emits } = setupTable(makeProps());

    api.changeSortOrder('age');
    expect(api.currentConfig.value.sortOrder).toEqual({ field: 'age', direction: 'asc' });
    expect(emits).toHaveBeenLastCalledWith('change:sort', { field: 'age', direction: 'asc' });
  });

  it('starts a newly clicked field descending', () => {
    const { api } = setupTable(makeProps());

    api.changeSortOrder('name');
    expect(api.currentConfig.value.sortOrder).toEqual({ field: 'name', direction: 'desc' });
  });
});

describe('useTable · sticky columns', () => {
  const head = [
    { key: 'name', text: 'Name' },
    { key: 'age', text: 'Age' },
    { key: 'id', text: 'Id' },
  ];
  const body = { content: rows };

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('is off by default', () => {
    const { api } = setupTable(makeProps());

    expect(api.stickyColumnsCount.value).toBe(0);
    expect(api.stickyColumnsActive.value).toBe(false);
    expect(api.stickyColumnLefts.value).toEqual([]);
  });

  it('clamps to one less than the visible column count', () => {
    const props = makeProps({
      head,
      body,
      config: {
        stickyColumns: 5,
        columnStyle: {
          name: { width: '100px' },
          age: { width: '80px' },
          id: { width: '60px' },
        },
      },
    });
    const { api } = setupTable(props);

    expect(api.stickyColumnsCount.value).toBe(2);
    expect(api.stickyColumnLefts.value).toEqual(['0px', '100px']);
  });

  it('turns itself off when a column width is not absolute', () => {
    const props = makeProps({
      head,
      body,
      config: {
        stickyColumns: 2,
        columnStyle: {
          name: { width: '100px' },
          age: { width: 'auto' },
          id: { width: '60px' },
        },
      },
    });
    const { api } = setupTable(props);

    expect(api.stickyColumnsCount.value).toBe(0);
  });
});

describe('useTable · layout helpers', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('reports the whole width until the table is mounted', () => {
    const { api } = setupTable(makeProps());

    expect(api.tableColumnWidth.value).toBe('100%');
  });

  it('builds a minimum height only for a numeric config', () => {
    expect(setupTable(makeProps({ config: { minHeightUnusedPlace: '120' } })).api.unusedPlaceCssStyle.value).toEqual({
      minHeight: '120px',
    });
    expect(setupTable(makeProps({ config: { minHeightUnusedPlace: 'oops' } })).api.unusedPlaceCssStyle.value).toEqual({});
  });

  it('returns a stored row style only when a key field is used', () => {
    const props = makeProps({
      config: { fieldAsRowKey: 'id' },
      body: { content: rows, rowsStyle: { 1: { color: 'red' } } },
    });
    const { api } = setupTable(props);

    expect(api.getRowStyle(rows[0])).toEqual({ color: 'red' });
    expect(api.getRowStyle(rows[1])).toEqual({});
  });
});
