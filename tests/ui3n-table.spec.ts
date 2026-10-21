import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Ui3nTable from '../src/components/ui3n-table/ui3n-table.vue';

interface Row {
  id: number;
  name: string;
  age: number;
}

const head = [
  { key: 'name', text: 'Name' },
  { key: 'age', text: 'Age' },
  { key: 'id', text: 'Id' },
];

const body = {
  content: [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
  ] as Row[],
};

const columnStyle = {
  name: { width: '100px' },
  age: { width: '80px' },
  id: { width: '60px' },
};

function mountTable(config: Record<string, unknown>) {
  return mount(Ui3nTable as never, {
    props: { config, head, body } as never,
    slots: {
      row: () => [h('div', 'Alice'), h('div', '30'), h('div', '1')],
    } as never,
  });
}

function rootStyle(wrapper: ReturnType<typeof mountTable>): string {
  return wrapper.find('[data-ui3n="table"]').attributes('style') ?? '';
}

describe('Ui3nTable · custom #row sticky columns', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('pins the first N direct children automatically', async () => {
    const wrapper = mountTable({ stickyColumns: 2, columnStyle });

    await nextTick();

    expect(wrapper.find('[data-ui3n="table"]').attributes('data-ui3n-sticky-count')).toBe('2');
    expect(rootStyle(wrapper)).toMatch(/--ui3n-table-sticky-left-0:\s*0px/);
    expect(rootStyle(wrapper)).toMatch(/--ui3n-table-sticky-left-1:\s*100px/);
  });

  it('stays off when stickyColumns is omitted', async () => {
    const wrapper = mountTable({ columnStyle });

    await nextTick();

    expect(wrapper.find('[data-ui3n="table"]').attributes('data-ui3n-sticky-count')).toBeUndefined();
    expect(rootStyle(wrapper)).not.toMatch(/--ui3n-table-sticky-left-/);
  });

  it('stays off when a visible column has no absolute width', async () => {
    const wrapper = mountTable({
      stickyColumns: 2,
      columnStyle: { name: { width: '100px' }, age: { width: 'auto' }, id: { width: '60px' } },
    });

    await nextTick();

    expect(wrapper.find('[data-ui3n="table"]').attributes('data-ui3n-sticky-count')).toBeUndefined();
    expect(rootStyle(wrapper)).not.toMatch(/--ui3n-table-sticky-left-/);
  });
});
