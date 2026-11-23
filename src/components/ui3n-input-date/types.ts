import type {
  Ui3nDateFormat,
  Ui3nDateTimePickerSize,
  Ui3nDateTimeLocaleConfig,
  Ui3nTimePickerConfig,
} from '../ui3n-date-time/types';
import type { Ref } from 'vue';

export interface Ui3nInputDateProps {
  /** Root element id */
  id?: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  autofocus?: boolean;
  readonly?: boolean;
  name?: string;
  rules?: Array<(v: unknown) => boolean | string>;
  validateAtStartup?: boolean;
  hideBottomSpace?: boolean;
  displayStateMode?: 'error' | 'success';
  displayStateWithIcon?: boolean;
  displayStateMessage?: string;
  /**
   * Component size
   * @default 'regular'
   */
  size?: Ui3nDateTimePickerSize;
  /** Selected date or null */
  modelValue: Date | null;
  /** Localized weekday, month and time-unit labels */
  localeConfig?: Ui3nDateTimeLocaleConfig;
  /**
   * First day of the week: 0 (Sunday) or 1 (Monday)
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * When true, the input displays and accepts a date with time
   * (`YYYY-MM-DD HH:mm[:ss]`) and the picker renders the time block below the
   * calendar.
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
   * Whether to apply the date mask to the input.
   * @default true
   */
  masked?: boolean;
  /**
   * Format used to display and type the date.
   * @default 'YYYY-MM-DD'
   */
  format?: Ui3nDateFormat;
  /**
   * "Without year" mode: only month and day are typed and displayed
   * (e.g. `MM.DD`); the model value gets the `UI3N_NO_YEAR_REFERENCE` year.
   * Supports `v-model:without-year`. Not supported together with
   * `showTimepicker` (ignored in that case).
   * @default false
   */
  withoutYear?: boolean;
  /**
   * Whether the picker renders the "without year" switch.
   * @default false
   */
  allowWithoutYear?: boolean;
}

export interface Ui3nInputDateEmits {
  (event: 'init', value: HTMLInputElement): void;
  (event: 'open-picker'): void;
  (event: 'close-picker'): void;
  (event: 'input', value: string): void;
  (event: 'keydown', value: KeyboardEvent): void;
  (event: 'focus', value: Event): void;
  (event: 'blur', value: Event): void;
  (event: 'clear'): void;
  (event: 'change', value: string): void;
  (event: 'update:valid', value: boolean): void;
  (event: 'update:modelValue', value: Date | null): void;
  (event: 'update:withoutYear', value: boolean): void;
}

export interface Ui3nInputDateExpose {
  /**
   * Reference to the input DOM element
   */
  inputElement: Readonly<Ref<HTMLInputElement | null | undefined>>;
  /**
   * Whether the input has been modified
   */
  isDirty: Readonly<Ref<boolean | undefined>>;
  /**
   * Whether the input is currently focused
   */
  isFocused: Readonly<Ref<boolean | undefined>>;
  /**
   * Clear the input value
   */
  clearValue: (() => void) | undefined;
}
