const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, char => HTML_ESCAPES[char]!);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {string} str - source text
 * @param {string} search - user query; its whitespace-separated words are highlighted
 * @return {string} - safe HTML: every match is wrapped in `span.match-search`, the rest is escaped
 *
 * The query is treated literally (regex metacharacters are escaped) and the source is
 * HTML-escaped, because the result is rendered through raw `innerHTML` by v-ui3n-html.
 */
export function markSearch(str: string, search: string): string {
  if (!str) {
    return '';
  }

  const words = search.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    // NBSP to space is kept for backward compatibility; unrelated to highlighting.
    return escapeHtml(str).replace(/\u00a0/g, ' ');
  }

  const regex = new RegExp(words.map(escapeRegExp).join('|'), 'gi');

  const parts: string[] = [];
  let lastIndex = 0;
  for (const match of str.matchAll(regex)) {
    parts.push(escapeHtml(str.slice(lastIndex, match.index)));
    parts.push(`<span class="match-search">${escapeHtml(match[0])}</span>`);
    lastIndex = (match.index ?? 0) + match[0].length;
  }
  parts.push(escapeHtml(str.slice(lastIndex)));

  return parts.join('');
}
