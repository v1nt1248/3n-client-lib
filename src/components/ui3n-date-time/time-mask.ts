import { IMask } from '../../utils/ui/input-mask';
import { resolveTimeVisibility } from './utils';
import type { MaskedPatternOptions } from 'imask';
import type { Ui3nTimePickerConfig } from './types';

type MaskBlocks = NonNullable<MaskedPatternOptions['blocks']>;

/**
 * Builds IMask options for the format produced by Ui3nTimePicker.
 * Returns undefined when the format cannot be fixed, e.g. `leadingZeros: false`.
 */
export function createTimeMaskOptions(
  config?: Ui3nTimePickerConfig,
): MaskedPatternOptions | undefined {
  if ((config?.leadingZeros ?? true) === false) {
    return undefined;
  }

  const { showHours, showMinutes, showSeconds } = resolveTimeVisibility(config);
  const is12Hour = (config?.hourFormat ?? '24') === '12';

  const blocks: MaskBlocks = {};
  const segments: string[] = [];

  if (showHours) {
    const hourBlock = is12Hour ? 'hh' : 'HH';
    segments.push(hourBlock);
    blocks[hourBlock] = {
      mask: IMask.MaskedRange,
      from: is12Hour ? 1 : 0,
      to: is12Hour ? 12 : 23,
      maxLength: 2,
    };
  }

  if (showMinutes) {
    segments.push('mm');
    blocks.mm = {
      mask: IMask.MaskedRange,
      from: 0,
      to: 59,
      maxLength: 2,
    };
  }

  if (showSeconds) {
    segments.push('ss');
    blocks.ss = {
      mask: IMask.MaskedRange,
      from: 0,
      to: 59,
      maxLength: 2,
    };
  }

  if (is12Hour && showHours) {
    blocks.AA = {
      mask: IMask.MaskedEnum,
      enum: ['AM', 'PM'],
      matchValue: (enumStr, inputStr, matchFrom) =>
        IMask.MaskedEnum.DEFAULTS.matchValue(
          enumStr.toLowerCase(),
          inputStr.toLowerCase(),
          matchFrom,
        ),
    };
  }

  const pattern = segments.join(':') + (is12Hour && showHours ? ' AA' : '');

  return {
    mask: pattern,
    lazy: true,
    blocks,
  };
}
