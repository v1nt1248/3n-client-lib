export type TimeParts = { hours: number; minutes: number; seconds: number };

export type Ui3nDateTimePickerSize = 'regular' | 'large';

/**
 * Supported date formats for typing and displaying a date.
 * In the "without year" mode the year token and its separator are dropped
 * (`MM.DD.YYYY` -> `MM.DD`, `YYYY-MM-DD` -> `MM-DD`).
 */
export type Ui3nDateFormat = 'YYYY-MM-DD' | 'MM.DD.YYYY' | 'DD.MM.YYYY';

export interface Ui3nTimePickerFieldProps {
  size?: Ui3nDateTimePickerSize;
  items: { id: string; value: string }[];
  selectionTransform?: (value: string) => string;
  disabled?: boolean;
}

export interface Ui3nDatePickerFieldProps {
  size?: Ui3nDateTimePickerSize;
  items: { id: string; value: string; label: string }[];
  disabled?: boolean;
}

export interface Ui3nDateTimeLocaleConfig {
  /** Short hour label, e.g. `h` */
  hourShort?: string;
  /** Short minute label, e.g. `min` */
  minuteShort?: string;
  /** Short second label, e.g. `sec` */
  secondShort?: string;
  /** Localized weekday labels */
  days?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  /** Localized month labels */
  months?: {
    january?: string;
    february?: string;
    march?: string;
    april?: string;
    may?: string;
    june?: string;
    july?: string;
    august?: string;
    september?: string;
    october?: string;
    november?: string;
    december?: string;
  };
  /** Label of the "without year" switch in the date picker */
  withoutYear?: string;
}

export type Ui3nTimePickerHourFormat = '24' | '12';

/**
 * Time picker display configuration
 */
export interface Ui3nTimePickerConfig {
  /**
   * Hour format: 24-hour or 12-hour (with AM/PM)
   * @default '24'
   */
  hourFormat?: Ui3nTimePickerHourFormat;
  /**
   * Whether to show the hours field
   * @default true
   */
  showHours?: boolean;
  /**
   * Whether to show the minutes field
   * @default true
   */
  showMinutes?: boolean;
  /**
   * Whether to show the seconds field
   * @default false
   */
  showSeconds?: boolean;
  /**
   * Whether to pad single-digit values with a leading zero
   * @default true
   */
  leadingZeros?: boolean;
}

export type Ui3nTimePickerMinuteSecondStep = 1 | 2 | 5 | 10 | 15 | 20 | 30;

export interface Ui3nTimePickerProps {
  /** Root element id */
  id?: string;
  /** Time picker display configuration */
  config?: Ui3nTimePickerConfig;
  /**
   * Component size
   * @default 'regular'
   */
  size?: Ui3nDateTimePickerSize;
  /**
   * Step for minutes. The displayed value is aligned to the step; on mount the
   * component emits the aligned value if it differs from `modelValue`.
   * @default 5
   */
  minuteStep?: Ui3nTimePickerMinuteSecondStep;
  /**
   * Step for seconds. The displayed value is aligned to the step; on mount the
   * component emits the aligned value if it differs from `modelValue`.
   * @default 1
   */
  secondStep?: Ui3nTimePickerMinuteSecondStep;
  /**
   * Time value in the format produced by `config`, e.g. `HH:mm`, `HH:mm:ss` or `hh:mm A`
   * @example '22:32'
   */
  modelValue: string | null;
  /** Localized short labels for hours, minutes and seconds */
  localeConfig?: Pick<Ui3nDateTimeLocaleConfig, 'secondShort' | 'minuteShort' | 'hourShort'>;
  /**
   * Whether all time fields are disabled
   * @default false
   */
  disabled?: boolean;
}

export interface Ui3nTimePickerEmits {
  /**
   * Emitted when a time field changes or an incoming value is normalized to the
   * configured format and step.
   */
  (ev: 'update:modelValue', value: string | null): void;
}

export interface Ui3nCalendarDay {
  /** ISO date string `YYYY-MM-DD` */
  date: string;
  /** Day of the month (1 - 31) */
  dayNumber: number;
  /** Day of the week in JS: 0 (Sun) – 6 (Sat) */
  day: number;
  isCurrentMonth: boolean;
  disabled?: boolean;
}

export interface Ui3nCalendarProps {
  /** ISO date of the selected day (`YYYY-MM-DD`) or null */
  modelValue: string | null;
  /** Displayed year */
  year: number;
  /** Displayed month, 1 - 12 */
  month: number;
  size?: Ui3nDateTimePickerSize;
  localeConfig?: Partial<Ui3nDateTimeLocaleConfig['days']>;
  firstDayOfWeek?: 0 | 1;
  highlightWeekends?: boolean;
  /** ISO dates to disable (`YYYY-MM-DD`) */
  disabledDays?: string[];
  disabled?: boolean;
  /**
   * Hides the weekday header and the days of adjacent months; the days of the
   * month are rendered from the first cell. Used when the year is unknown and
   * weekdays are meaningless.
   * @default false
   */
  hideWeekdays?: boolean;
}

export interface Ui3nCalendarEmits {
  (ev: 'update:modelValue', value: string): void;
}

export interface Ui3nDatePickerProps {
  /** Selected date or null */
  modelValue: Date | null;
  /** Root element id */
  id?: string;
  /**
   * Component size
   * @default 'regular'
   */
  size?: Ui3nDateTimePickerSize;
  /** Localized weekday, month and time-unit labels */
  localeConfig?: Ui3nDateTimeLocaleConfig;
  /**
   * First day of the week: 0 (Sunday) or 1 (Monday)
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * Whether to render the time picker below the calendar
   * @default false
   */
  showTimepicker?: boolean;
  /** Time picker configuration used when `showTimepicker` is true */
  timepickerConfig?: Ui3nTimePickerConfig;
  /**
   * Whether to highlight Saturdays and Sundays
   * @default false
   */
  highlightWeekends?: boolean;
  /** ISO dates to disable (`YYYY-MM-DD`) */
  disabledDays?: string[];
  /**
   * Whether the whole picker is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * "Without year" mode: the year selector is hidden, weekdays are not shown and
   * the emitted date always has the `UI3N_NO_YEAR_REFERENCE` year.
   * Not supported together with `showTimepicker` (ignored in that case).
   * @default false
   */
  withoutYear?: boolean;
  /**
   * Whether to render the "without year" switch that toggles `withoutYear`
   * (emits `update:withoutYear`).
   * @default false
   */
  allowWithoutYear?: boolean;
}

export interface Ui3nDatePickerEmits {
  /**
   * Emitted when the selected date changes. The time is preserved when
   * `showTimepicker` is true; otherwise the value is reset to the start of the day.
   */
  (ev: 'update:modelValue', value: Date | null): void;
  /** Emitted when the user toggles the "without year" switch */
  (ev: 'update:withoutYear', value: boolean): void;
}
