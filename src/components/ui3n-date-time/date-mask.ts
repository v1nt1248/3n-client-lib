import { IMask } from '../../utils/ui/input-mask';
import { getDatePatternParts } from './utils';
import type { MaskedPatternOptions } from 'imask';
import type { Ui3nDateFormat } from './types';

type MaskBlocks = NonNullable<MaskedPatternOptions['blocks']>;

export interface DateMaskOptions {
  /**
   * Date format
   * @default 'YYYY-MM-DD'
   */
  format?: Ui3nDateFormat;
  /**
   * Whether the year is omitted (`MM.DD`, `DD.MM`, `MM-DD`)
   * @default false
   */
  withoutYear?: boolean;
}

/**
 * Builds IMask options for a date format (ISO `YYYY-MM-DD` by default).
 * The mask enforces digit ranges, while semantic validation (e.g. February 30)
 * is handled by `parseFormattedDate`.
 *
 * @param options - date format and the "without year" mode
 */
export function createDateMaskOptions(options: DateMaskOptions = {}): MaskedPatternOptions {
  const { order, pattern } = getDatePatternParts(options.format, options.withoutYear);

  const allBlocks: MaskBlocks = {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 9999,
      maxLength: 4,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
  };

  const blocks: MaskBlocks = {};
  order.forEach(token => {
    blocks[token] = allBlocks[token];
  });

  return {
    mask: pattern,
    lazy: true,
    blocks,
  };
}
