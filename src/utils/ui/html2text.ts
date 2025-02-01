export function html2text(html: string): string {
  const tag = document.createElement('div');
  tag.innerHTML = html;
  return tag.innerText;
}
