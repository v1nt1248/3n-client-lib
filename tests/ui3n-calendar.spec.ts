import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ui3nCalendar from '../src/components/ui3n-date-time/ui3n-calendar.vue';

function mountCalendar(props: Record<string, unknown> = {}) {
  return mount(Ui3nCalendar, {
    props: {
      modelValue: '2026-01-01',
      year: 2026,
      month: 1,
      ...props,
    },
  });
}

describe('Ui3nCalendar', () => {
  it('marks its root and renders a 42-cell grid', () => {
    const wrapper = mountCalendar();

    expect(wrapper.attributes('data-ui3n')).toBe('calendar');
    expect(wrapper.findAll('[data-date]')).toHaveLength(42);
  });

  it('emits an ISO date when a current-month day is clicked', async () => {
    const wrapper = mountCalendar();

    await wrapper.find('[data-date="2026-01-15"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-01-15']);
  });

  it('highlights the selected ISO date', () => {
    const wrapper = mountCalendar({ modelValue: '2026-01-15' });
    const selected = wrapper.find('[data-date="2026-01-15"]');
    const other = wrapper.find('[data-date="2026-01-16"]');

    expect(selected.classes()).not.toEqual(other.classes());
  });

  it('does not emit for disabled or adjacent-month days', async () => {
    const wrapper = mountCalendar({ disabledDays: ['2026-01-15'] });

    await wrapper.find('[data-date="2026-01-15"]').trigger('click');
    await wrapper.find('[data-date="2025-12-29"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('does not emit while disabled', async () => {
    const wrapper = mountCalendar({ disabled: true });

    await wrapper.find('[data-date="2026-01-15"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});

describe('Ui3nCalendar hideWeekdays', () => {
  it('hides the weekday header and adjacent-month days', () => {
    const regular = mountCalendar({ year: 2000, month: 2 });
    const hidden = mountCalendar({ year: 2000, month: 2, hideWeekdays: true });

    expect(regular.text()).toContain('MO');
    expect(hidden.text()).not.toContain('MO');

    const cells = hidden.findAll('[data-date]');
    expect(cells).toHaveLength(29);
    expect(cells[0].attributes('data-date')).toBe('2000-02-01');
  });

  it('emits a date from the month-only grid', async () => {
    const wrapper = mountCalendar({ year: 2000, month: 2, hideWeekdays: true });

    await wrapper.find('[data-date="2000-02-29"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2000-02-29']);
  });
});
