/**
 * Rounding with a given accuracy
 * @param num {number}
 * @param precision {number} - rounding accuracy (number of digits after the decimal point
 * indicated with the "-" sign)
 * @return {number}
 */
export function round(num: number, precision: number): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tmpNum = num.toString().split('e') as any;
  tmpNum = Math.round(+(tmpNum[0] + 'e' + (tmpNum[1] ? +tmpNum[1] - precision : -precision)));
  tmpNum = tmpNum.toString().split('e');
  return +(tmpNum[0] + 'e' + (tmpNum[1] ? +tmpNum[1] - +precision : precision));
}
