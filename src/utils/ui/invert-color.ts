export function invertColor(color: string): string {
  if (color) {
    let tmpColor = color.substring(1);
    let tmpColorNum = parseInt(tmpColor, 16);
    tmpColorNum = 0xffffff ^ tmpColorNum;
    tmpColor = tmpColorNum.toString(16);
    tmpColor = ('00000' + tmpColor).slice(-6);
    tmpColor = `#${tmpColor}`;
    return tmpColor;
  }
  return '#000';
}
