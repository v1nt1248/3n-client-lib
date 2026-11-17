import { describe, expect, it } from 'vitest';
import { IMask, type FactoryArg } from '../src/utils/ui/input-mask';
import { createDateMaskOptions } from '../src/components/ui3n-date-time/date-mask';
import { createDateTimeMaskOptions } from '../src/components/ui3n-date-time/date-time-mask';
import { isValidDate, parseDateInput } from '../src/components/ui3n-date-time/utils';
import type { Ui3nTimePickerConfig } from '../src/components/ui3n-date-time/types';

function resolveMask(value: string): string {
  const masked = IMask.createMask(createDateMaskOptions() as FactoryArg);

  masked.resolve(value);

  return masked.value;
}

function resolveDateTimeMask(value: string, config?: Ui3nTimePickerConfig): string {
  const masked = IMask.createMask(createDateTimeMaskOptions(config) as FactoryArg);

  masked.resolve(value);

  return masked.value;
}

describe('createDateMaskOptions', () => {
  it('masks an ISO date', () => {
    expect(resolveMask('20261117')).toBe('2026-11-17');
  });

  it('does not produce an out-of-range month', () => {
    expect(resolveMask('20261317')).not.toBe('2026-13-17');
  });

  it('does not produce an out-of-range day', () => {
    expect(resolveMask('20261132')).not.toBe('2026-11-32');
  });

  it('accepts a leap day', () => {
    expect(resolveMask('20240229')).toBe('2024-02-29');
  });
});

describe('createDateTimeMaskOptions', () => {
  it('masks a date with hours and minutes', () => {
    expect(resolveDateTimeMask('202611172232')).toBe('2026-11-17 22:32');
  });

  it('masks a date with seconds', () => {
    expect(resolveDateTimeMask('20261117223212', { showSeconds: true })).toBe(
      '2026-11-17 22:32:12',
    );
  });

  it('masks a 12-hour date-time value', () => {
    expect(resolveDateTimeMask('202611170733PM', { hourFormat: '12' })).toBe(
      '2026-11-17 07:33 PM',
    );
  });

  it('returns undefined for formats the time mask cannot describe', () => {
    expect(createDateTimeMaskOptions({ leadingZeros: false })).toBeUndefined();
  });
});

describe('parseDateInput', () => {
  it('parses a padded ISO date', () => {
    expect(parseDateInput('2026-11-17')?.getTime()).toBe(new Date(2026, 10, 17).getTime());
  });

  it('parses single-digit month and day', () => {
    expect(parseDateInput('2026-1-7')?.getTime()).toBe(new Date(2026, 0, 7).getTime());
  });

  it('rejects non-existent dates', () => {
    expect(parseDateInput('2026-02-30')).toBeNull();
    expect(parseDateInput('2026-13-01')).toBeNull();
  });

  it('rejects malformed values', () => {
    expect(parseDateInput('2026-11')).toBeNull();
    expect(parseDateInput('')).toBeNull();
  });
});

describe('isValidDate', () => {
  it('accepts a valid Date and rejects other values', () => {
    expect(isValidDate(new Date(2026, 10, 17))).toBe(true);
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate('2026-11-17')).toBe(false);
  });
});
