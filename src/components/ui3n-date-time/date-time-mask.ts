import { createDateMaskOptions } from './date-mask';
import { createTimeMaskOptions } from './time-mask';
import type { MaskedPatternOptions } from 'imask';
import type { Ui3nTimePickerConfig } from './types';

/**
 * Builds IMask options for the `YYYY-MM-DD HH:mm[:ss]` format used when the
 * date picker also renders a time picker. Returns undefined for configurations
 * the time mask cannot describe (e.g. `leadingZeros: false`).
 */
export function createDateTimeMaskOptions(
  config?: Ui3nTimePickerConfig,
): MaskedPatternOptions | undefined {
  const timeOptions = createTimeMaskOptions(config);

  if (!timeOptions) {
    return undefined;
  }

  const dateOptions = createDateMaskOptions();
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
