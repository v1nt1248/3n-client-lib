const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

export function formatFileSize(size?: number): string {
  if (!size) {
    return '0';
  }

  let formatedSize = size;
  let unitIndex = 0;
  while (formatedSize >= 1024 && unitIndex < UNITS.length - 1) {
    formatedSize = formatedSize / 1024;
    unitIndex++;
  }
  return `${formatedSize.toFixed(2)} ${UNITS[unitIndex]}`;
}
