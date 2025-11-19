import { colorsMap } from '@/constants';

export function getElementColor(initials = '?'): string {
  const code =
    initials.length === 1 ? initials.charCodeAt(0) % 64 : (initials.charCodeAt(0) + initials.charCodeAt(1)) % 64;
  const codeStr = initials[0] === '?' ? '?' : code.toFixed();
  return colorsMap[codeStr];
}
