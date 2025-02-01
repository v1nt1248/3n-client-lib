import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 * @param {number} ts - timestamp
 * @return {string} - times as string%
 * If TS is today, then Date returns as a string 'HH:mm'
 * If ts is period between 3 day before today and today, then Date returns as a string '{1|2|3} days ago'
 * Else Date returns as a string 'YYYY-MM-DD'
 */
export function prepareDateAsSting(ts: number): string {
  dayjs.extend(relativeTime);
  const now = dayjs();
  const dateValue = dayjs(ts);

  if (now.isSame(dateValue, 'day')) {
    return dateValue.format('HH:mm');
  }

  if (now.isBefore(dateValue.add(3, 'day'))) {
    return dateValue.fromNow();
  }

  return dateValue.format('YYYY-MM-DD');
}
