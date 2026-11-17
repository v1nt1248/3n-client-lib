import { describe, expect, it } from 'vitest';
import {
  alignToStep,
  formatTimeParts,
  generateCalendarGrid,
  getTimeOutputFormat,
  parseIsoDate,
  parseTime,
  setDateParts,
  toIsoDate,
} from '../src/components/ui3n-date-time/utils';

describe('getTimeOutputFormat', () => {
  it('uses the 24-hour padded format by default', () => {
    expect(getTimeOutputFormat()).toBe('HH:mm');
    expect(getTimeOutputFormat({})).toBe('HH:mm');
  });

  it('supports the 12-hour format with AM/PM', () => {
    expect(getTimeOutputFormat({ hourFormat: '12' })).toBe('hh:mm A');
    expect(getTimeOutputFormat({ hourFormat: '12', leadingZeros: false })).toBe('h:m A');
  });

  it('respects hidden fields', () => {
    expect(getTimeOutputFormat({ showHours: false })).toBe('mm');
    expect(getTimeOutputFormat({ showHours: false, showSeconds: true })).toBe('mm:ss');
    expect(getTimeOutputFormat({ showSeconds: true })).toBe('HH:mm:ss');
    expect(getTimeOutputFormat({ showHours: false, showMinutes: false })).toBe('HH');
    expect(getTimeOutputFormat({ showHours: false, showMinutes: false, showSeconds: false })).toBe('HH');
  });

  it('drops leading zeros when asked', () => {
    expect(getTimeOutputFormat({ leadingZeros: false, showSeconds: true })).toBe('H:m:s');
  });
});

describe('parseTime', () => {
  it('parses 24-hour values', () => {
    expect(parseTime('22:32')).toEqual({ hours: 22, minutes: 32 });
    expect(parseTime('7:5')).toEqual({ hours: 7, minutes: 5 });
  });

  it('returns null for empty, malformed or out-of-range values', () => {
    expect(parseTime(null)).toBeNull();
    expect(parseTime('')).toBeNull();
    expect(parseTime('   ')).toBeNull();
    expect(parseTime('24:00')).toBeNull();
    expect(parseTime('22:60')).toBeNull();
    expect(parseTime('22')).toBeNull();
  });

  it('returns null when the value does not match the configured format', () => {
    // the default format is 'HH:mm', so seconds are not expected
    expect(parseTime('22:32:00')).toBeNull();
    // the default format is 24-hour, so AM/PM is not expected
    expect(parseTime('7:5 pm')).toBeNull();
  });

  it('parses those values when the config matches their format', () => {
    expect(parseTime('22:32:00', { showSeconds: true })).toEqual({
      hours: 22,
      minutes: 32,
      seconds: 0,
    });
    expect(parseTime('7:5 pm', { hourFormat: '12' })).toEqual({ hours: 19, minutes: 5 });
  });

  it('converts 12-hour values to 24 hours', () => {
    expect(parseTime('07:33 PM', { hourFormat: '12' })).toEqual({ hours: 19, minutes: 33 });
    expect(parseTime('12:00 AM', { hourFormat: '12' })).toEqual({ hours: 0, minutes: 0 });
    expect(parseTime('12:00 PM', { hourFormat: '12' })).toEqual({ hours: 12, minutes: 0 });
  });

  it('requires AM/PM in the 12-hour format and rejects it in the 24-hour format', () => {
    expect(parseTime('07:33', { hourFormat: '12' })).toBeNull();
    expect(parseTime('07:33 PM')).toBeNull();
  });

  it('reads only the enabled fields', () => {
    expect(parseTime('32', { showHours: false, showSeconds: false })).toEqual({ minutes: 32 });
    expect(parseTime('32:05', { showHours: false, showSeconds: true })).toEqual({
      minutes: 32,
      seconds: 5,
    });
    // enabling seconds also requires the seconds chunk
    expect(parseTime('22:05', { showSeconds: true })).toBeNull();
  });
});

describe('formatTimeParts', () => {
  it('formats according to the config', () => {
    expect(formatTimeParts({ hours: 22, minutes: 32, seconds: 0 })).toBe('22:32');
    expect(formatTimeParts({ hours: 7, minutes: 5, seconds: 0 }, { leadingZeros: false })).toBe('7:5');
    expect(formatTimeParts({ hours: 19, minutes: 33, seconds: 0 }, { hourFormat: '12' })).toBe(
      '07:33 PM',
    );
    expect(
      formatTimeParts({ hours: 9, minutes: 5, seconds: 3 }, { showSeconds: true, leadingZeros: false }),
    ).toBe('9:5:3');
  });
});

describe('alignToStep', () => {
  it('rounds to the nearest step and clamps below 60', () => {
    expect(alignToStep(32, 5)).toBe(30);
    expect(alignToStep(33, 5)).toBe(35);
    expect(alignToStep(58, 5)).toBe(55);
    expect(alignToStep(12, 0)).toBe(12);
  });
});

describe('ISO date helpers', () => {
  it('formats and parses local dates', () => {
    expect(toIsoDate(new Date(2026, 10, 5))).toBe('2026-11-05');
    expect(parseIsoDate('2026-11-05')?.getTime()).toBe(new Date(2026, 10, 5).getTime());
  });

  it('rejects malformed and non-existent dates', () => {
    expect(parseIsoDate('2026-02-30')).toBeNull();
    expect(parseIsoDate('05.11.2026')).toBeNull();
    expect(parseIsoDate('2026-13-01')).toBeNull();
  });
});

describe('setDateParts', () => {
  it('clamps the day instead of rolling into the next month', () => {
    const january31 = new Date(2026, 0, 31, 10, 15, 20);

    expect(toIsoDate(setDateParts(january31, { month: 1 }))).toBe('2026-02-28');
    expect(setDateParts(january31, { month: 1 }).getHours()).toBe(10);
    expect(toIsoDate(setDateParts(january31, { year: 2028, month: 1 }))).toBe('2028-02-29');
    expect(toIsoDate(setDateParts(new Date(2026, 2, 31), { month: 3 }))).toBe('2026-04-30');
    expect(toIsoDate(setDateParts(new Date(2028, 1, 29), { year: 2026 }))).toBe('2026-02-28');
  });
});

describe('generateCalendarGrid', () => {
  it('builds a 42-cell grid that starts on Monday', () => {
    const grid = generateCalendarGrid(2026, 1, ['2026-01-02'], 1);

    expect(grid).toHaveLength(42);
    expect(grid[0]).toMatchObject({ date: '2025-12-29', isCurrentMonth: false });
    expect(grid[3]).toMatchObject({ date: '2026-01-01', isCurrentMonth: true });
    expect(grid[41].date).toBe('2026-02-08');
    expect(grid.find(day => day.date === '2026-01-02')?.disabled).toBe(true);
    expect(grid.filter(day => day.isCurrentMonth)).toHaveLength(31);
  });

  it('can start on Sunday', () => {
    const grid = generateCalendarGrid(2026, 1, [], 0);

    expect(grid[0].date).toBe('2025-12-28');
    expect(grid[0].day).toBe(0);
  });

  it('marks days of the next year as outside the current month', () => {
    const grid = generateCalendarGrid(2025, 12, [], 1);
    const nextYear = grid.find(day => day.date === '2026-01-01');

    expect(nextYear?.isCurrentMonth).toBe(false);
  });

  it('clamps an out-of-range month', () => {
    const grid = generateCalendarGrid(2026, 13, [], 1);

    expect(grid.filter(day => day.isCurrentMonth)).toHaveLength(31);
  });
});
