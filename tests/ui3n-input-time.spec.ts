import { defineComponent, h, nextTick, ref, type ComponentPublicInstance } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Ui3nInputTime from '../src/components/ui3n-input-time/ui3n-input-time.vue';
import Ui3nTimePicker from '../src/components/ui3n-date-time/ui3n-time-picker.vue';

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

function mountInputTime(props: Record<string, unknown> = {}) {
  const wrapper = mount(Ui3nInputTime, {
    props: {
      modelValue: '22:30',
      ...props,
    },
  });

  mountedWrappers.push(wrapper);

  return wrapper;
}

async function openPanel(wrapper: ReturnType<typeof mountInputTime>) {
  await wrapper.find('[data-icon="calendar-clock"]').trigger('click');
  await nextTick();
}

async function typeText(wrapper: ReturnType<typeof mountInputTime>, text: string) {
  for (const char of text) {
    const element = wrapper.find('input').element as HTMLInputElement;
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

describe('Ui3nInputTime', () => {
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

  it('opens the time picker on the calendar-clock click', async () => {
    const wrapper = mountInputTime();

    expect(wrapper.findComponent(Ui3nTimePicker).exists()).toBe(false);

    await openPanel(wrapper);

    expect(wrapper.findComponent(Ui3nTimePicker).exists()).toBe(true);
    expect(wrapper.emitted('open-picker')).toHaveLength(1);
  });

  it('does not open the time picker when disabled', async () => {
    const wrapper = mountInputTime({ disabled: true });

    await openPanel(wrapper);

    expect(wrapper.findComponent(Ui3nTimePicker).exists()).toBe(false);
    expect(wrapper.emitted('open-picker')).toBeUndefined();
  });

  it('shows the hours list when a time field is clicked', async () => {
    const wrapper = mountInputTime();

    await openPanel(wrapper);

    const hourSelector = wrapper.findAll('[data-ui3n="selector"]')[0];
    await hourSelector.find('[tabindex="0"]').trigger('click');
    await nextTick();
    await nextTick();

    expect(wrapper.findAll('[data-selector-item]')).toHaveLength(24);
  });

  it('forwards the selection to the model', async () => {
    const wrapper = mountInputTime();
    await openPanel(wrapper);

    wrapper.findComponent(Ui3nTimePicker).vm.$emit('update:modelValue', '23:15');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['23:15']);
    expect(wrapper.emitted('input')).toContainEqual(['23:15']);
    expect(wrapper.emitted('change')).toContainEqual(['23:15']);
  });

  it('keeps the value in sync when the model changes', async () => {
    const value = ref<string | null>('22:30');
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Ui3nInputTime, {
              modelValue: value.value,
              'onUpdate:modelValue': (next: string | null) => {
                value.value = next;
              },
            });
        },
      }),
    );

    mountedWrappers.push(wrapper);

    await wrapper.find('[data-icon="calendar-clock"]').trigger('click');
    await nextTick();

    expect(wrapper.find('input').element.value).toBe('22:30');

    wrapper.findComponent(Ui3nTimePicker).vm.$emit('update:modelValue', '23:15');
    await nextTick();

    expect(value.value).toBe('23:15');
    expect(wrapper.find('input').element.value).toBe('23:15');
  });

  it('closes the panel on a click outside', async () => {
    const wrapper = mountInputTime();

    await openPanel(wrapper);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(wrapper.findComponent(Ui3nTimePicker).exists()).toBe(false);
    expect(wrapper.emitted('close-picker')?.length).toBeGreaterThan(0);
  });

  it('exposes the input state', () => {
    const wrapper = mountInputTime();
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

  it('applies the mask derived from the config', async () => {
    const wrapper = mountInputTime({ modelValue: '' });

    await typeText(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('22:32');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['22:32']);
  });

  it('applies the 12-hour mask', async () => {
    const wrapper = mountInputTime({ modelValue: '07:33 PM', config: { hourFormat: '12' } });

    await nextTick();

    expect(wrapper.find('input').element.value).toBe('07:33 PM');
  });

  it('does not mask when leadingZeros is false', async () => {
    const wrapper = mountInputTime({ modelValue: '', config: { leadingZeros: false } });

    await typeText(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('2232');
  });

  it('does not mask when masked is false', async () => {
    const wrapper = mountInputTime({ modelValue: '', masked: false });

    await typeText(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('2232');
  });

  it('converts the unmasked model for the picker and back', async () => {
    const wrapper = mountInputTime({ modelValue: '2230', maskValueMode: 'unmasked' });

    await nextTick();
    await openPanel(wrapper);

    const picker = wrapper.findComponent(Ui3nTimePicker);
    expect(picker.props('modelValue')).toBe('22:30');

    picker.vm.$emit('update:modelValue', '23:15');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2315']);
  });

  it('uses the wide panel for three time fields', async () => {
    const wrapper = mountInputTime({ config: { showSeconds: true } });

    await openPanel(wrapper);

    const panel = wrapper.findComponent(Ui3nTimePicker).element.parentElement;
    expect(panel?.className).toMatch(/cells-3/);
  });

  it('keeps the default panel for two time fields', async () => {
    const wrapper = mountInputTime();

    await openPanel(wrapper);

    const panel = wrapper.findComponent(Ui3nTimePicker).element.parentElement;
    expect(panel?.className).toMatch(/cells-2/);
  });

  it('keeps scrolling inside the time picker when another instance is open', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h('div', [
              h(Ui3nInputTime, { modelValue: '22:30' }),
              h(Ui3nInputTime, { modelValue: '23:45' }),
            ]);
        },
      }),
      { attachTo: document.body },
    );

    mountedWrappers.push(wrapper);
    await nextTick();

    const icons = wrapper.findAll('[data-icon="calendar-clock"]');
    await icons[0].trigger('click');
    await nextTick();
    await icons[1].trigger('click');
    await nextTick();

    const pickers = wrapper.findAll('[data-ui3n="timepicker"]');
    expect(pickers).toHaveLength(2);

    const selector = pickers[1].findAll('[data-ui3n="selector"]')[0];
    await selector.find('[tabindex="0"]').trigger('click');
    await nextTick();
    await nextTick();

    const scrollbar = pickers[1].find('[data-ui3n="scrollbar-vertical"]');
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

  it('keeps an edited value while the picker is open', async () => {
    const value = ref<string | null>('22:30');
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Ui3nInputTime, {
              modelValue: value.value,
              'onUpdate:modelValue': (next: string | null) => {
                value.value = next;
              },
            });
        },
      }),
    );

    mountedWrappers.push(wrapper);
    await nextTick();
    await wrapper.find('[data-icon="calendar-clock"]').trigger('click');
    await nextTick();

    const element = wrapper.find('input').element as HTMLInputElement;

    element.focus();
    element.setSelectionRange(4, 5);
    element.dispatchEvent(new KeyboardEvent('keydown', { key: '7', bubbles: true }));
    element.value = `${element.value.slice(0, 4)}7${element.value.slice(5)}`;
    element.setSelectionRange(5, 5);
    element.dispatchEvent(
      new InputEvent('input', { bubbles: true, inputType: 'insertText', data: '7' }),
    );

    await nextTick();
    await nextTick();

    expect(value.value).toBe('22:37');
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('22:37');
  });
});
