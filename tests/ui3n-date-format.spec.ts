import { describe, expect, it } from 'vitest';
import { IMask, type FactoryArg } from '../src/utils/ui/input-mask';
import { createDateMaskOptions, type DateMaskOptions } from '../src/components/ui3n-date-time/date-mask';
import { createDateTimeMaskOptions } from '../src/components/ui3n-date-time/date-time-mask';
import {
  UI3N_NO_YEAR_REFERENCE,
  convertDateForYearMode,
  formatDate,
  generateMonthDaysGrid,
  getDatePatternParts,
  parseDateInput,
  parseFormattedDate,
  parseIsoDate,
} from '../src/components/ui3n-date-time/utils';

function resolveMask(value: string, options?: DateMaskOptions): string {
  const masked = IMask.createMask(createDateMaskOptions(options) as FactoryArg);

  masked.resolve(value);

  return masked.value;
}

function expectDate(value: Date | null, year: number, month: number, day: number) {
  expect(value).not.toBeNull();
  expect(value?.getFullYear()).toBe(year);
  expect(value?.getMonth()).toBe(month);
  expect(value?.getDate()).toBe(day);
}

describe('getDatePatternParts', () => {
  it('defaults to ISO', () => {
    expect(getDatePatternParts()).toEqual({
      order: ['YYYY', 'MM', 'DD'],
      separator: '-',
      pattern: 'YYYY-MM-DD',
    });
  });

  it('resolves dotted formats', () => {
    expect(getDatePatternParts('MM.DD.YYYY').pattern).toBe('MM.DD.YYYY');
    expect(getDatePatternParts('DD.MM.YYYY').pattern).toBe('DD.MM.YYYY');
  });

  it('drops the year in the without-year mode', () => {
    expect(getDatePatternParts('YYYY-MM-DD', true).pattern).toBe('MM-DD');
    expect(getDatePatternParts('MM.DD.YYYY', true).pattern).toBe('MM.DD');
    expect(getDatePatternParts('DD.MM.YYYY', true).pattern).toBe('DD.MM');
  });
});

describe('formatDate', () => {
  const date = new Date(1990, 2, 5);

  it('formats ISO by default', () => {
    expect(formatDate(date)).toBe('1990-03-05');
  });

  it('formats dotted formats', () => {
    expect(formatDate(date, 'MM.DD.YYYY')).toBe('03.05.1990');
    expect(formatDate(date, 'DD.MM.YYYY')).toBe('05.03.1990');
  });

  it('omits the year in the without-year mode', () => {
    expect(formatDate(date, 'MM.DD.YYYY', true)).toBe('03.05');
    expect(formatDate(date, 'DD.MM.YYYY', true)).toBe('05.03');
    expect(formatDate(date, 'YYYY-MM-DD', true)).toBe('03-05');
  });
});

describe('parseFormattedDate', () => {
  it('parses every format', () => {
    expectDate(parseFormattedDate('1990-03-15'), 1990, 2, 15);
    expectDate(parseFormattedDate('03.15.1990', 'MM.DD.YYYY'), 1990, 2, 15);
    expectDate(parseFormattedDate('15.03.1990', 'DD.MM.YYYY'), 1990, 2, 15);
  });

  it('requires zero-padded parts in the strict mode', () => {
    expect(parseFormattedDate('3.5.1990', 'MM.DD.YYYY', { strict: true })).toBeNull();
    expectDate(parseFormattedDate('3.5.1990', 'MM.DD.YYYY'), 1990, 2, 5);
  });

  it('rejects malformed and non-existent dates', () => {
    expect(parseFormattedDate('1990-03-15', 'MM.DD.YYYY')).toBeNull();
    expect(parseFormattedDate('02.30.2026', 'MM.DD.YYYY')).toBeNull();
    expect(parseFormattedDate('13.01.2026', 'MM.DD.YYYY')).toBeNull();
    expect(parseFormattedDate('03.15', 'MM.DD.YYYY')).toBeNull();
  });

  it('uses the reference year in the without-year mode', () => {
    expectDate(
      parseFormattedDate('03.15', 'MM.DD.YYYY', { withoutYear: true }),
      UI3N_NO_YEAR_REFERENCE,
      2,
      15,
    );
    expectDate(
      parseFormattedDate('15.03', 'DD.MM.YYYY', { withoutYear: true }),
      UI3N_NO_YEAR_REFERENCE,
      2,
      15,
    );
    expect(parseFormattedDate('03.15.1990', 'MM.DD.YYYY', { withoutYear: true })).toBeNull();
  });

  it('accepts February 29 without a year and rejects February 30', () => {
    expectDate(
      parseFormattedDate('02.29', 'MM.DD.YYYY', { withoutYear: true }),
      UI3N_NO_YEAR_REFERENCE,
      1,
      29,
    );
    expect(parseFormattedDate('02.30', 'MM.DD.YYYY', { withoutYear: true })).toBeNull();
  });

  it('keeps the legacy ISO parsers unchanged', () => {
    expectDate(parseDateInput('2026-1-7'), 2026, 0, 7);
    expect(parseIsoDate('2026-1-7')).toBeNull();
    expectDate(parseIsoDate('2026-01-07'), 2026, 0, 7);
    expect(parseDateInput('2026-02-30')).toBeNull();
  });
});

describe('createDateMaskOptions with format', () => {
  it('keeps ISO without arguments', () => {
    expect(createDateMaskOptions().mask).toBe('YYYY-MM-DD');
    expect(resolveMask('20261117')).toBe('2026-11-17');
  });

  it('masks dotted formats', () => {
    expect(resolveMask('03151990', { format: 'MM.DD.YYYY' })).toBe('03.15.1990');
    expect(resolveMask('15031990', { format: 'DD.MM.YYYY' })).toBe('15.03.1990');
  });

  it('masks a date without year', () => {
    const options = createDateMaskOptions({ format: 'MM.DD.YYYY', withoutYear: true });

    expect(options.mask).toBe('MM.DD');
    expect(Object.keys(options.blocks ?? {})).toEqual(['MM', 'DD']);
    expect(resolveMask('0315', { format: 'MM.DD.YYYY', withoutYear: true })).toBe('03.15');
    expect(resolveMask('031519', { format: 'MM.DD.YYYY', withoutYear: true })).toBe('03.15');
  });

  it('does not produce an out-of-range month in a dotted format', () => {
    expect(resolveMask('1315', { format: 'MM.DD.YYYY', withoutYear: true })).not.toBe('13.15');
  });

  it('combines a dotted date with time', () => {
    expect(createDateTimeMaskOptions(undefined, 'MM.DD.YYYY')?.mask).toBe('MM.DD.YYYY HH:mm');
    expect(createDateTimeMaskOptions()?.mask).toBe('YYYY-MM-DD HH:mm');
  });
});

describe('convertDateForYearMode', () => {
  it('moves a date to the reference year keeping month, day and time', () => {
    const result = convertDateForYearMode(new Date(1990, 2, 15, 10, 30), true);

    expectDate(result, UI3N_NO_YEAR_REFERENCE, 2, 15);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(30);
  });

  it('moves a date to the target year', () => {
    expectDate(convertDateForYearMode(new Date(2000, 2, 15), false, 2026), 2026, 2, 15);
  });

  it('clamps February 29 in a non-leap year', () => {
    expectDate(convertDateForYearMode(new Date(2000, 1, 29), false, 2026), 2026, 1, 28);
  });
});

describe('generateMonthDaysGrid', () => {
  it('returns only the days of the month', () => {
    const grid = generateMonthDaysGrid(UI3N_NO_YEAR_REFERENCE, 2);

    expect(grid).toHaveLength(29);
    expect(grid[0]).toMatchObject({ date: '2000-02-01', dayNumber: 1, isCurrentMonth: true });
    expect(grid.at(-1)?.date).toBe('2000-02-29');
  });

  it('marks disabled days', () => {
    const grid = generateMonthDaysGrid(2026, 1, ['2026-01-10']);

    expect(grid.find(day => day.date === '2026-01-10')?.disabled).toBe(true);
    expect(grid.find(day => day.date === '2026-01-11')?.disabled).toBe(false);
  });
});
