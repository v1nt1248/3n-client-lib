import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Ui3nDatePicker from '../src/components/ui3n-date-time/ui3n-date-picker.vue';
import Ui3nCalendar from '../src/components/ui3n-date-time/ui3n-calendar.vue';
import Ui3nCheckbox from '../src/components/ui3n-checkbox/ui3n-checkbox.vue';
import Ui3nDatePickerField from '../src/components/ui3n-date-time/ui3n-date-picker-field.vue';
import { UI3N_NO_YEAR_REFERENCE } from '../src/components/ui3n-date-time/utils';

function mountPicker(props: Record<string, unknown> = {}) {
  return mount(Ui3nDatePicker, {
    props: {
      modelValue: null,
      ...props,
    },
  });
}

describe('Ui3nDatePicker without year', () => {
  beforeEach(() => {
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

  it('does not render the switch by default', () => {
    const wrapper = mountPicker({ modelValue: new Date(1990, 2, 15) });

    expect(wrapper.find('[data-ui3n="datepicker-without-year"]').exists()).toBe(false);
    expect(wrapper.findAllComponents(Ui3nDatePickerField)).toHaveLength(2);
  });

  it('renders the switch with a localized label', () => {
    const wrapper = mountPicker({ allowWithoutYear: true, localeConfig: { withoutYear: 'No year' } });
    const row = wrapper.find('[data-ui3n="datepicker-without-year"]');

    expect(row.exists()).toBe(true);
    expect(row.text()).toContain('No year');
  });

  it('hides the year selector and weekdays in the without-year mode', () => {
    const wrapper = mountPicker({ modelValue: new Date(2000, 2, 15), withoutYear: true });

    expect(wrapper.findAllComponents(Ui3nDatePickerField)).toHaveLength(1);

    const calendar = wrapper.findComponent(Ui3nCalendar);
    expect(calendar.props('hideWeekdays')).toBe(true);
    expect(calendar.props('year')).toBe(UI3N_NO_YEAR_REFERENCE);
  });

  it('pins the reference year for the calendar even when the model has another year', () => {
    const wrapper = mountPicker({ modelValue: new Date(1990, 1, 10), withoutYear: true });

    expect(wrapper.findComponent(Ui3nCalendar).props('year')).toBe(UI3N_NO_YEAR_REFERENCE);
  });

  it('keeps the reference year when a day is selected', async () => {
    const wrapper = mountPicker({ modelValue: new Date(2000, 1, 10), withoutYear: true });

    wrapper.findComponent(Ui3nCalendar).vm.$emit('update:modelValue', '2000-02-29');
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date;
    expect(emitted.getFullYear()).toBe(UI3N_NO_YEAR_REFERENCE);
    expect(emitted.getMonth()).toBe(1);
    expect(emitted.getDate()).toBe(29);
  });

  it('keeps the reference year when a month is selected', async () => {
    const wrapper = mountPicker({ modelValue: new Date(2000, 1, 10), withoutYear: true });

    wrapper.findComponent(Ui3nDatePickerField).vm.$emit('update:modelValue', '5');
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date;
    expect(emitted.getFullYear()).toBe(UI3N_NO_YEAR_REFERENCE);
    expect(emitted.getMonth()).toBe(5);
    expect(emitted.getDate()).toBe(10);
  });

  it('toggles the mode and converts the value', async () => {
    const wrapper = mountPicker({ modelValue: new Date(1990, 2, 15), allowWithoutYear: true });

    wrapper.findComponent(Ui3nCheckbox).vm.$emit('update:modelValue', true);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:withoutYear')?.at(-1)).toEqual([true]);
    const converted = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date;
    expect(converted.getFullYear()).toBe(UI3N_NO_YEAR_REFERENCE);
    expect(converted.getMonth()).toBe(2);
    expect(converted.getDate()).toBe(15);

    await wrapper.setProps({ modelValue: converted, withoutYear: true });
    wrapper.findComponent(Ui3nCheckbox).vm.$emit('update:modelValue', false);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:withoutYear')?.at(-1)).toEqual([false]);
    const restored = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date;
    expect(restored.getFullYear()).toBe(new Date().getFullYear());
    expect(restored.getMonth()).toBe(2);
    expect(restored.getDate()).toBe(15);
  });

  it('only emits the mode when there is no value', async () => {
    const wrapper = mountPicker({ allowWithoutYear: true });

    wrapper.findComponent(Ui3nCheckbox).vm.$emit('update:modelValue', true);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:withoutYear')?.at(-1)).toEqual([true]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('ignores the without-year mode together with the time picker', () => {
    const wrapper = mountPicker({
      modelValue: new Date(1990, 2, 15),
      withoutYear: true,
      allowWithoutYear: true,
      showTimepicker: true,
    });

    expect(wrapper.find('[data-ui3n="datepicker-without-year"]').exists()).toBe(false);
    expect(wrapper.findComponent(Ui3nCalendar).props('year')).toBe(1990);
  });
});
