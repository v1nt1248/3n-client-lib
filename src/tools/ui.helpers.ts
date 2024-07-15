import {
  Comment,
  Text,
  Slot,
  VNode,
} from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { colorsMap } from '../constants/general';

export function hasSlotContent(slot?: Slot, slotProps = {}) {
  if (!slot) return false;

  return slot(slotProps).some((vnode: VNode) => {
    if (vnode.type === Comment)
      return false;

    if (Array.isArray(vnode.children) && !vnode.children.length)
      return false;

    return (
      vnode.type !== Text
      || (typeof vnode.children === 'string' && vnode.children.trim() !== '')
    );
  });
}

export function getElementColor(initials = '?'): string {
  const code = initials.length === 1
    ? initials.charCodeAt(0) % 64
    : (initials.charCodeAt(0) + initials.charCodeAt(1)) % 64;
  const codeStr = initials[0] === '?' ? '?' : code.toFixed();
  return colorsMap[codeStr];
}

export function invertColor(color: string): string {
  if (color) {
    let tmpColor = color.substring(1);
    let tmpColorNum = parseInt(tmpColor, 16);
    tmpColorNum = 0xFFFFFF ^ tmpColorNum;
    tmpColor = tmpColorNum.toString(16);
    tmpColor = ('00000' + tmpColor).slice(-6);
    tmpColor = `#${tmpColor}`;
    return tmpColor;
  }
  return '#000';
}

export function html2text(html: string): string {
  const tag = document.createElement('div');
  tag.innerHTML = html;
  return tag.innerText;
}

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

export function capitalize(text: string): string {
  return `${text[0].toLocaleUpperCase()}${text.slice(1)}`;
}
