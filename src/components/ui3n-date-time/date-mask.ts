import { IMask } from '../../utils/ui/input-mask';
import type { MaskedPatternOptions } from 'imask';

type MaskBlocks = NonNullable<MaskedPatternOptions['blocks']>;

/**
 * Builds IMask options for the ISO date format (`YYYY-MM-DD`).
 * The mask enforces digit ranges, while semantic validation (e.g. February 30)
 * is handled by `parseDateInput`.
 */
export function createDateMaskOptions(): MaskedPatternOptions {
  const blocks: MaskBlocks = {
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

  return {
    mask: 'YYYY-MM-DD',
    lazy: true,
    blocks,
  };
}
