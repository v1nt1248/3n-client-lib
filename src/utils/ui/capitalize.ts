export function capitalize(text: string): string {
  if (!text) {
    return '';
  }

  return `${text[0].toLocaleUpperCase()}${text.slice(1)}`;
}
