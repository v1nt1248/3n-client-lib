import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Ui3nTimePicker from '../src/components/ui3n-date-time/ui3n-time-picker.vue';
import Ui3nTimePickerField from '../src/components/ui3n-date-time/ui3n-time-picker-field.vue';
import Ui3nSelector from '../src/components/ui3n-selector/ui3n-selector.vue';

vi.mock('@floating-ui/vue', () => ({
  autoUpdate: vi.fn(() => () => {}),
  flip: vi.fn(() => ({})),
  offset: vi.fn(() => ({})),
  shift: vi.fn(() => ({})),
  useFloating: vi.fn(() => ({
    floatingStyles: { value: {} },
    isPositioned: { value: true },
    update: vi.fn(),
  })),
}));

function mountTimePicker(props: Record<string, unknown> = {}) {
  return mount(Ui3nTimePicker, {
    props: {
      modelValue: '22:32',
      ...props,
    },
  });
}

describe('Ui3nTimePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
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
  });

  it('normalizes the value to the minute step', () => {
    const wrapper = mountTimePicker();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['22:30']);
  });

  it('normalizes 12-hour values', () => {
    const wrapper = mountTimePicker({
      modelValue: '07:33 PM',
      config: { hourFormat: '12' },
    });

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['07:35 PM']);
  });

  it('does not emit an invalid value when a field is cleared', async () => {
    const wrapper = mountTimePicker();
    const fields = wrapper.findAllComponents(Ui3nTimePickerField);

    fields[1].vm.$emit('update:modelValue', null);
    await nextTick();

    const emits = wrapper.emitted('update:modelValue') ?? [];
    expect(emits).toHaveLength(1);
    expect(emits[0]).toEqual(['22:30']);
  });

  it('does not switch to hours when the minutes selector is opened', async () => {
    const open = ref(false);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Ui3nTimePicker, {
              modelValue: '22:32',
              open: open.value,
              'onUpdate:open': (value: boolean) => {
                open.value = value;
              },
            });
        },
      }),
    );

    wrapper.findAllComponents(Ui3nSelector)[1].vm.$emit('list:open');
    await nextTick();
    await nextTick();

    const fields = wrapper.findAllComponents(Ui3nTimePickerField);
    expect(fields[0].props('open')).toBe(false);
    expect(fields[1].props('open')).toBe(true);
  });

  it('does not rewrite a value changed after mount', async () => {
    const value = ref<string | null>('22:30');
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Ui3nTimePicker, {
              modelValue: value.value,
              'onUpdate:modelValue': (next: string | null) => {
                value.value = next;
              },
            });
        },
      }),
    );

    await nextTick();
    await nextTick();

    value.value = '22:32';
    await nextTick();
    await nextTick();

    expect(value.value).toBe('22:32');
  });

  it('opens the hours selector when the parent opens the picker', async () => {
    const open = ref(false);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Ui3nTimePicker, {
              modelValue: '22:32',
              open: open.value,
              'onUpdate:open': (value: boolean) => {
                open.value = value;
              },
            });
        },
      }),
    );

    open.value = true;
    await nextTick();
    await nextTick();

    expect(wrapper.findAllComponents(Ui3nTimePickerField)[0].props('open')).toBe(true);
  });
});
