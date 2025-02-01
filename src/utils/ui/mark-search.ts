export function markSearch(str: string, search: string): string {
  if (!str) return '';

  if (search) {
    const regex = new RegExp(`(${search.split(' ').join('|')})`, 'gi');
    // @ts-ignore
    return str.replace(regex, (match, group) => `<span class="match-search">${group}</span>`);
  }

  const regex = new RegExp(String.fromCharCode(160), 'g');
  return str.replace(regex, ' ');
}
