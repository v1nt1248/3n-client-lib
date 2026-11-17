import type {
  Ui3nTimePickerConfig,
  Ui3nDateTimePickerSize,
  Ui3nTimePickerMinuteSecondStep,
  Ui3nDateTimeLocaleConfig,
} from '../ui3n-date-time/types';
import type { Ui3nInputMaskValueMode } from '../ui3n-input/types';
import type { FactoryArg } from 'imask';
import type { Ref } from 'vue';

export interface Ui3nInputTimeProps {
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
  /**
   * Whether to apply the input mask derived from `config`. Ignored when
   * `config.leadingZeros` is false, because the format is not fixed then.
   * @default true
   */
  masked?: boolean;
  /**
   * Custom IMask options that override the mask derived from `config`.
   */
  mask?: FactoryArg;
  /**
   * Which value is emitted through `update:modelValue`, `input` and `change`.
   * @default 'masked'
   */
  maskValueMode?: Ui3nInputMaskValueMode;
}

export interface Ui3nInputTimeEmits {
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
  (event: 'update:modelValue', value: string | null): void;
}

export interface Ui3nInputTimeExpose {
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
