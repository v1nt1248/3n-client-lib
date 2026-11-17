import type { Ui3nDateTimeLocaleConfig } from './types';

export const DEFAULT_DAYS = {
  monday: 'mo',
  tuesday: 'tu',
  wednesday: 'we',
  thursday: 'th',
  friday: 'fr',
  saturday: 'sa',
  sunday: 'su',
} as const;

export const DEFAULT_MONTHS = {
  january: 'january',
  february: 'february',
  march: 'march',
  april: 'april',
  may: 'may',
  june: 'june',
  july: 'july',
  august: 'august',
  september: 'september',
  october: 'october',
  november: 'november',
  december: 'december',
} as const;

export const DEFAULT_LOCALE = {
  hourShort: 'h',
  minuteShort: 'min',
  secondShort: 'sec',
  days: { ...DEFAULT_DAYS },
  months: { ...DEFAULT_MONTHS },
} as const;

export const FIELD_HEIGHTS = {
  regular: 32,
  large: 40,
} as const;

export const monthsMap: Record<string, keyof NonNullable<Ui3nDateTimeLocaleConfig['months']>> = {
  '0': 'january',
  '1': 'february',
  '2': 'march',
  '3': 'april',
  '4': 'may',
  '5': 'june',
  '6': 'july',
  '7': 'august',
  '8': 'september',
  '9': 'october',
  '10': 'november',
  '11': 'december',
};

export const daysMap: Record<string, keyof NonNullable<Ui3nDateTimeLocaleConfig['days']>> = {
  '0': 'sunday',
  '1': 'monday',
  '2': 'tuesday',
  '3': 'wednesday',
  '4': 'thursday',
  '5': 'friday',
  '6': 'saturday',
};
