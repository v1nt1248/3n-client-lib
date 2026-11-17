import { defineComponent, h, nextTick, ref, type ComponentPublicInstance } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Ui3nInputDate from '../src/components/ui3n-input-date/ui3n-input-date.vue';
import Ui3nDatePicker from '../src/components/ui3n-date-time/ui3n-date-picker.vue';

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

const mountedWrappers: { unmount: () => void }[] = [];

function mountInputDate(
  props: Record<string, unknown> = {},
  options: { attachTo?: HTMLElement } = {},
) {
  const wrapper = mount(Ui3nInputDate, {
    props: {
      modelValue: null,
      ...props,
    },
    attachTo: options.attachTo,
  });

  mountedWrappers.push(wrapper);

  return wrapper;
}

function mountWithModel(initial: Date | null, extraProps: Record<string, unknown> = {}) {
  const value = ref<Date | null>(initial);

  const wrapper = mount(
    defineComponent({
      setup() {
        return () =>
          h(Ui3nInputDate, {
            modelValue: value.value,
            ...extraProps,
            'onUpdate:modelValue': (next: Date | null) => {
              value.value = next;
            },
          });
      },
    }),
  );

  mountedWrappers.push(wrapper);

  return { wrapper, value, inputDate: wrapper.findComponent(Ui3nInputDate) };
}

function inputElement(wrapper: ReturnType<typeof mountInputDate>) {
  return wrapper.find('input').element as HTMLInputElement;
}

async function openPanel(wrapper: { find: (selector: string) => { trigger: (event: string) => Promise<void> } }) {
  await wrapper.find('[data-icon="outline-calendar-month"]').trigger('click');
  await nextTick();
}

async function typeText(wrapper: ReturnType<typeof mountInputDate>, text: string) {
  for (const char of text) {
    const element = inputElement(wrapper);

    element.focus();

    const start = element.selectionStart ?? element.value.length;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true }));
    element.value = `${element.value.slice(0, start)}${char}${element.value.slice(start)}`;
    element.setSelectionRange(start + 1, start + 1);
    element.dispatchEvent(
      new InputEvent('input', { bubbles: true, inputType: 'insertText', data: char }),
    );

    await nextTick();
  }
}

async function replaceText(wrapper: ReturnType<typeof mountInputDate>, text: string) {
  const element = inputElement(wrapper);

  element.focus();
  element.setSelectionRange(0, element.value.length);

  for (const char of text) {
    const start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? start;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true }));
    element.value = `${element.value.slice(0, start)}${char}${element.value.slice(end)}`;
    element.setSelectionRange(start + 1, start + 1);
    element.dispatchEvent(
      new InputEvent('input', { bubbles: true, inputType: 'insertText', data: char }),
    );

    await nextTick();
  }
}

describe('Ui3nInputDate', () => {
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
    while (mountedWrappers.length) {
      mountedWrappers.pop()?.unmount();
    }

    vi.unstubAllGlobals();
  });

  it('opens the date picker on the calendar icon click', async () => {
    const wrapper = mountInputDate();

    expect(wrapper.findComponent(Ui3nDatePicker).exists()).toBe(false);

    await openPanel(wrapper);

    expect(wrapper.findComponent(Ui3nDatePicker).exists()).toBe(true);
    expect(wrapper.emitted('open-picker')).toHaveLength(1);
  });

  it('passes date picker props through', async () => {
    const wrapper = mountInputDate({
      size: 'large',
      showTimepicker: true,
      firstDayOfWeek: 0,
      highlightWeekends: true,
      disabledDays: ['2026-11-17'],
    });

    await openPanel(wrapper);

    const picker = wrapper.findComponent(Ui3nDatePicker);
    expect(picker.props('size')).toBe('large');
    expect(picker.props('showTimepicker')).toBe(true);
    expect(picker.props('firstDayOfWeek')).toBe(0);
    expect(picker.props('highlightWeekends')).toBe(true);
    expect(picker.props('disabledDays')).toEqual(['2026-11-17']);
  });

  it('renders the model date in the input', async () => {
    const { wrapper } = mountWithModel(new Date(2026, 10, 17));

    await nextTick();

    expect(inputElement(wrapper).value).toBe('2026-11-17');
  });

  it('updates the model from the picker and formats the input', async () => {
    const { wrapper, value, inputDate } = mountWithModel(null);
    const selected = new Date(2026, 10, 17);

    await openPanel(wrapper);
    wrapper.findComponent(Ui3nDatePicker).vm.$emit('update:modelValue', selected);
    await nextTick();
    await nextTick();

    expect(value.value?.getTime()).toBe(selected.getTime());
    expect(inputDate.emitted('input')?.at(-1)).toEqual(['2026-11-17']);
    expect(inputDate.emitted('change')?.at(-1)).toEqual(['2026-11-17']);
    expect(inputElement(wrapper).value).toBe('2026-11-17');
  });

  it('updates the model when a valid date is typed', async () => {
    const { wrapper, value } = mountWithModel(null);

    await typeText(wrapper, '20261117');
    await nextTick();

    expect(value.value?.getFullYear()).toBe(2026);
    expect(value.value?.getMonth()).toBe(10);
    expect(value.value?.getDate()).toBe(17);
    expect(inputElement(wrapper).value).toBe('2026-11-17');
  });

  it('does not update the model for a non-existent date', async () => {
    const { wrapper, value } = mountWithModel(null);

    await typeText(wrapper, '20260230');
    await nextTick();

    expect(value.value).toBeNull();
    expect(inputElement(wrapper).value).toBe('2026-02-30');
  });

  it('accepts a single-digit date on blur', async () => {
    const { wrapper, value } = mountWithModel(null, { masked: false });

    await typeText(wrapper, '2026-1-7');

    expect(value.value).toBeNull();

    inputElement(wrapper).dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    await nextTick();

    expect(value.value?.getTime()).toBe(new Date(2026, 0, 7).getTime());
  });

  it('renders date and time when showTimepicker is enabled', async () => {
    const { wrapper } = mountWithModel(new Date(2026, 10, 17, 10, 20), {
      showTimepicker: true,
    });

    await nextTick();

    expect(inputElement(wrapper).value).toBe('2026-11-17 10:20');
  });

  it('renders the 12-hour format when configured', async () => {
    const { wrapper } = mountWithModel(new Date(2026, 10, 17, 19, 33), {
      showTimepicker: true,
      timepickerConfig: { hourFormat: '12' },
    });

    await nextTick();

    expect(inputElement(wrapper).value).toBe('2026-11-17 07:33 PM');
  });

  it('updates the model when a date and time are typed', async () => {
    const { wrapper, value } = mountWithModel(null, { showTimepicker: true });

    await typeText(wrapper, '202611172232');
    await nextTick();

    expect(value.value?.getFullYear()).toBe(2026);
    expect(value.value?.getMonth()).toBe(10);
    expect(value.value?.getDate()).toBe(17);
    expect(value.value?.getHours()).toBe(22);
    expect(value.value?.getMinutes()).toBe(32);
    expect(inputElement(wrapper).value).toBe('2026-11-17 22:32');
  });

  it('updates the model from the picker with the time included', async () => {
    const { wrapper, value, inputDate } = mountWithModel(null, { showTimepicker: true });
    const selected = new Date(2026, 10, 17, 14, 5);

    await openPanel(wrapper);
    wrapper.findComponent(Ui3nDatePicker).vm.$emit('update:modelValue', selected);
    await nextTick();
    await nextTick();

    expect(value.value?.getTime()).toBe(selected.getTime());
    expect(inputDate.emitted('input')?.at(-1)).toEqual(['2026-11-17 14:05']);
    expect(inputElement(wrapper).value).toBe('2026-11-17 14:05');
  });

  it('resets the time to midnight without showTimepicker', async () => {
    const { wrapper, value } = mountWithModel(new Date(2026, 10, 17, 10, 20));

    await nextTick();
    await replaceText(wrapper, '20261201');
    await nextTick();

    expect(value.value?.getFullYear()).toBe(2026);
    expect(value.value?.getMonth()).toBe(11);
    expect(value.value?.getDate()).toBe(1);
    expect(value.value?.getHours()).toBe(0);
    expect(value.value?.getMinutes()).toBe(0);
  });

  it('clears the model and the input', async () => {
    const { wrapper, value, inputDate } = mountWithModel(new Date(2026, 10, 17));

    await nextTick();

    const vm = inputDate.vm as unknown as ComponentPublicInstance & { clearValue: () => void };
    vm.clearValue();
    await nextTick();
    await nextTick();

    expect(value.value).toBeNull();
    expect(inputElement(wrapper).value).toBe('');
    expect(inputDate.emitted('clear')).toHaveLength(1);
  });

  it('closes the panel on a click outside', async () => {
    const wrapper = mountInputDate();

    await openPanel(wrapper);
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(wrapper.findComponent(Ui3nDatePicker).exists()).toBe(false);
    expect(wrapper.emitted('close-picker')?.length).toBeGreaterThan(0);
  });

  it('does not open when disabled', async () => {
    const wrapper = mountInputDate({ disabled: true });

    await openPanel(wrapper);

    expect(wrapper.findComponent(Ui3nDatePicker).exists()).toBe(false);
    expect(wrapper.emitted('open-picker')).toBeUndefined();
  });

  it('exposes the input state', () => {
    const wrapper = mountInputDate();
    const vm = wrapper.vm as unknown as ComponentPublicInstance & {
      inputElement: HTMLInputElement | null;
      isDirty: boolean;
      isFocused: boolean;
      clearValue: () => void;
    };

    expect(vm.inputElement).toBeInstanceOf(HTMLInputElement);
    expect(vm.isDirty).toBe(false);
    expect(vm.isFocused).toBe(false);
    expect(typeof vm.clearValue).toBe('function');
  });

  it('keeps scrolling inside the date picker dropdowns', async () => {
    const wrapper = mountInputDate({}, { attachTo: document.body });

    await nextTick();
    await openPanel(wrapper);

    const picker = wrapper.find('[data-ui3n="datepicker"]');
    const selector = picker.findAll('[data-ui3n="selector"]')[0];

    await selector.find('[tabindex="0"]').trigger('click');
    await nextTick();
    await nextTick();

    const scrollbar = picker.find('[data-ui3n="scrollbar-vertical"]');
    expect(scrollbar.exists()).toBe(true);

    const insideWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    scrollbar.element.dispatchEvent(insideWheel);
    expect(insideWheel.defaultPrevented).toBe(false);

    const outsideWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(outsideWheel);
    expect(outsideWheel.defaultPrevented).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    await nextTick();

    const afterCloseWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(afterCloseWheel);
    expect(afterCloseWheel.defaultPrevented).toBe(false);
  });
});
