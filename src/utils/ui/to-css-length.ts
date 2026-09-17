export function toCssLength(size: number | string, fallback = '16px'): string {
  if (typeof size === 'number' && Number.isFinite(size)) {
    return `${size}px`;
  }

  const value = String(size).trim();
  if (!value) {
    return fallback;
  }

  if (!Number.isNaN(Number(value))) {
    return `${value}px`;
  }

  return value;
}
