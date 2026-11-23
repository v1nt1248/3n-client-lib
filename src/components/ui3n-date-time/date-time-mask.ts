import { createDateMaskOptions } from './date-mask';
import { createTimeMaskOptions } from './time-mask';
import type { MaskedPatternOptions } from 'imask';
import type { Ui3nDateFormat, Ui3nTimePickerConfig } from './types';

/**
 * Builds IMask options for the `<date> HH:mm[:ss]` format (ISO date by default)
 * used when the date picker also renders a time picker. Returns undefined for
 * configurations the time mask cannot describe (e.g. `leadingZeros: false`).
 *
 * @param config - time picker config
 * @param format - date format of the date part
 */
export function createDateTimeMaskOptions(
  config?: Ui3nTimePickerConfig,
  format?: Ui3nDateFormat,
): MaskedPatternOptions | undefined {
  const timeOptions = createTimeMaskOptions(config);

  if (!timeOptions) {
    return undefined;
  }

  const dateOptions = createDateMaskOptions({ format });
  const datePattern = dateOptions.mask;
  const timePattern = timeOptions.mask;

  if (!datePattern || !timePattern) {
    return undefined;
  }

  return {
    mask: `${datePattern} ${timePattern}`,
    lazy: true,
    blocks: {
      ...dateOptions.blocks,
      ...timeOptions.blocks,
    },
  };
}
