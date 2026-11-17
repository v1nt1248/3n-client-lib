import { describe, expect, it } from 'vitest';
import { IMask, type FactoryArg } from '../src/utils/ui/input-mask';
import { createTimeMaskOptions } from '../src/components/ui3n-date-time/time-mask';
import type { Ui3nTimePickerConfig } from '../src/components/ui3n-date-time/types';

function resolveMask(value: string, config?: Ui3nTimePickerConfig): string {
  const options = createTimeMaskOptions(config) as FactoryArg;
  const masked = IMask.createMask(options);

  masked.resolve(value);

  return masked.value;
}

describe('createTimeMaskOptions', () => {
  it('masks a 24-hour time with minutes', () => {
    expect(resolveMask('2232')).toBe('22:32');
  });

  it('masks a 24-hour time with seconds', () => {
    expect(resolveMask('223212', { showSeconds: true })).toBe('22:32:12');
  });

  it('masks a 12-hour time with the meridiem', () => {
    expect(resolveMask('0733PM', { hourFormat: '12' })).toBe('07:33 PM');
  });

  it('masks a 12-hour time with seconds', () => {
    expect(resolveMask('073312PM', { hourFormat: '12', showSeconds: true })).toBe('07:33:12 PM');
  });

  it('masks minutes and seconds without hours and meridiem', () => {
    expect(resolveMask('3213', { hourFormat: '12', showHours: false, showSeconds: true })).toBe(
      '32:13',
    );
  });

  it('does not produce out-of-range minutes', () => {
    expect(resolveMask('2360')).not.toBe('23:60');
  });

  it('returns undefined when leading zeros are disabled', () => {
    expect(createTimeMaskOptions({ leadingZeros: false })).toBeUndefined();
  });
});
