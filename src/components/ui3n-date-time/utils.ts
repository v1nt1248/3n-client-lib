import dayjs from 'dayjs';
import type { Ui3nTimePickerConfig, Ui3nCalendarDay, TimeParts } from './types';

/**
 * Resolves which time fields are displayed. When every field is disabled, hours
 * stay visible so the picker never renders an empty widget.
 */
export function resolveTimeVisibility(config?: Ui3nTimePickerConfig) {
  const showMinutes = config?.showMinutes ?? true;
  const showSeconds = config?.showSeconds ?? false;

  let showHours = config?.showHours ?? true;
  if (!showHours && !showMinutes && !showSeconds) {
    showHours = true;
  }

  return { showHours, showMinutes, showSeconds };
}

/**
 * Constructs a dayjs time format based on the time picker configuration.
 *
 * @param config - timepicker config
 * @returns dayjs format, e.g. 'HH:mm', 'HH:mm:ss', 'h:mm:ss A'
 */
export function getTimeOutputFormat(config?: Ui3nTimePickerConfig): string {
  const { showHours, showMinutes, showSeconds } = resolveTimeVisibility(config);
  const is12Hour = (config?.hourFormat ?? '24') === '12';
  const leadingZeros = config?.leadingZeros ?? true;

  const hourToken = is12Hour ? (leadingZeros ? 'hh' : 'h') : leadingZeros ? 'HH' : 'H';
  const minuteToken = leadingZeros ? 'mm' : 'm';
  const secondToken = leadingZeros ? 'ss' : 's';

  const parts: string[] = [];
  if (showHours) {
    parts.push(hourToken);
  }
  if (showMinutes) {
    parts.push(minuteToken);
  }
  if (showSeconds) {
    parts.push(secondToken);
  }

  const timePart = parts.join(':');
  return is12Hour && showHours ? `${timePart} A` : timePart;
}

/**
 * Rounds a minute or second value to the nearest step and keeps it below 60.
 */
export function alignToStep(value: number, step: number): number {
  if (step <= 0) {
    return value;
  }

  const maxValue = Math.floor(59 / step) * step;
  return Math.min(Math.round(value / step) * step, maxValue);
}

/**
 * Parses a time string written in the format produced by `getTimeOutputFormat`.
 * Only the fields enabled by the config are read; every enabled field must be
 * present and valid, otherwise `null` is returned.
 *
 * @param value - a value in the timepicker format
 * @param config - timepicker config
 */
export function parseTime(
  value: string | null,
  config?: Ui3nTimePickerConfig,
): Partial<TimeParts> | null {
  const { showHours, showMinutes, showSeconds } = resolveTimeVisibility(config);
  const is12Hour = (config?.hourFormat ?? '24') === '12';

  if (!value) {
    return null;
  }

  let raw = value.trim();
  if (!raw) {
    return null;
  }

  let meridiem: 'AM' | 'PM' | null = null;
  const meridiemMatch = raw.match(/\s*([AaPp][Mm])$/);

  if (meridiemMatch) {
    if (!is12Hour || !showHours) {
      return null;
    }

    meridiem = meridiemMatch[1].toUpperCase() as 'AM' | 'PM';
    raw = raw.slice(0, meridiemMatch.index).trim();
  } else if (is12Hour && showHours) {
    return null;
  }

  const chunks = raw.split(':');
  const expectedChunks = Number(showHours) + Number(showMinutes) + Number(showSeconds);
  if (chunks.length !== expectedChunks) {
    return null;
  }

  let cursor = 0;

  function takeNumber(min: number, max: number): number | null {
    const chunk = chunks[cursor++];
    if (chunk === undefined || !/^\d+$/.test(chunk)) {
      return null;
    }

    const num = Number(chunk);
    return num >= min && num <= max ? num : null;
  }

  const parts: Partial<TimeParts> = {};

  if (showHours) {
    const hour = takeNumber(is12Hour ? 1 : 0, is12Hour ? 12 : 23);
    if (hour === null) {
      return null;
    }

    parts.hours = is12Hour ? (hour % 12) + (meridiem === 'PM' ? 12 : 0) : hour;
  }

  if (showMinutes) {
    const minute = takeNumber(0, 59);
    if (minute === null) {
      return null;
    }

    parts.minutes = minute;
  }

  if (showSeconds) {
    const second = takeNumber(0, 59);
    if (second === null) {
      return null;
    }

    parts.seconds = second;
  }

  return parts;
}

/**
 * Formats time parts according to the time picker config.
 */
export function formatTimeParts(parts: TimeParts, config?: Ui3nTimePickerConfig): string {
  return dayjs()
    .hour(parts.hours)
    .minute(parts.minutes)
    .second(parts.seconds)
    .format(getTimeOutputFormat(config));
}

/**
 * Formats a date as an ISO calendar date in local time.
 */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks that a value is a valid `Date` instance.
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * Parses a date typed in the structured input. Unlike `parseIsoDate`, it also
 * accepts single-digit month and day (`2026-1-7`) because the mask may leave
 * them unpadded while typing. Returns null for malformed or non-existent dates.
 */
export function parseDateInput(value: string): Date | null {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
}

/**
 * Parses an ISO calendar date (`YYYY-MM-DD`) as a local date.
 * Returns null for malformed or non-existent dates such as `2026-02-30`.
 */
export function parseIsoDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  return parseDateInput(value);
}

/**
 * Applies a date part to a base date, clamping the day to the target month
 * instead of rolling over (31 January -> February becomes the last day of February).
 * The time of day is preserved.
 */
export function setDateParts(
  base: Date,
  patch: { year?: number; month?: number; day?: number },
): Date {
  const baseDayjs = dayjs(base);
  const year = patch.year ?? baseDayjs.year();
  const month = patch.month ?? baseDayjs.month();
  const target = dayjs(
    new Date(
      year,
      month,
      1,
      baseDayjs.hour(),
      baseDayjs.minute(),
      baseDayjs.second(),
      baseDayjs.millisecond(),
    ),
  );
  const day = Math.min(patch.day ?? baseDayjs.date(), target.daysInMonth());
  return target.date(day).toDate();
}

/**
 * Builds a 6x7 calendar grid for the given month.
 *
 * @param year - displayed year
 * @param month - displayed month, 1 - 12
 * @param disabledDays - ISO dates to disable (`YYYY-MM-DD`)
 * @param firstDayOfWeek - 0 (Sunday) or 1 (Monday)
 */
export function generateCalendarGrid(
  year: number,
  month: number,
  disabledDays: string[] = [],
  firstDayOfWeek: 0 | 1 = 1,
): Ui3nCalendarDay[] {
  const now = new Date();
  const safeYear = Number.isFinite(year) ? year : now.getFullYear();
  const safeMonth = Number.isFinite(month) ? Math.min(12, Math.max(1, month)) : now.getMonth() + 1;
  const monthIndex = safeMonth - 1;
  const safeFirstDay = firstDayOfWeek === 0 ? 0 : 1;

  const days: Ui3nCalendarDay[] = [];
  const TOTAL_CELLS = 42;
  const disabledSet = new Set(disabledDays);

  const monthStartDate = new Date(safeYear, monthIndex, 1);
  const rawDayOfWeek = monthStartDate.getDay();
  const prevMonthDaysCount = (rawDayOfWeek - safeFirstDay + 7) % 7;
  const gridStartDate = new Date(safeYear, monthIndex, 1 - prevMonthDaysCount);

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const currentDate = new Date(
      gridStartDate.getFullYear(),
      gridStartDate.getMonth(),
      gridStartDate.getDate() + i,
    );

    const date = toIsoDate(currentDate);
    const isCurrentMonth =
      currentDate.getMonth() === monthIndex && currentDate.getFullYear() === safeYear;

    days.push({
      date,
      dayNumber: currentDate.getDate(),
      day: currentDate.getDay(),
      isCurrentMonth,
      disabled: disabledSet.has(date),
    });
  }

  return days;
}
