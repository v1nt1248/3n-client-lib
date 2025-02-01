function focusSelection(el: HTMLElement, type: 'all' | 'start' | 'end') {
  el.focus();

  const textNode = el.firstChild;

  // textNode can be null if there is no text in element.
  // In this case just focusing is enough, no need to select anything
  if (textNode) {
    // @ts-ignore
    const caret = textNode.length;
    const range = document.createRange();
    const sel = window.getSelection();

    switch (type) {
      case 'all':
        range.setStart(textNode, 0);
        range.setEnd(textNode, caret);
        break;
      case 'start':
        range.setStart(textNode, 0);
        range.setEnd(textNode, 0);
        break;
      case 'end':
        range.setStart(textNode, caret);
        range.setEnd(textNode, caret);
        break;
      default:
        range.setStart(textNode, 0);
        range.setEnd(textNode, caret);
    }

    sel && sel.removeAllRanges();
    sel && sel.addRange(range);
  }
}

export function selectAll(el: HTMLElement) {
  focusSelection(el, 'all');
}

export function selectStart(el: HTMLElement) {
  focusSelection(el, 'start');
}

export function selectEnd(el: HTMLElement) {
  focusSelection(el, 'end');
}
