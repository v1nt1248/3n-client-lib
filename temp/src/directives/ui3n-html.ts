import type { DirectiveBinding } from 'vue';
import sanitizeHtml from 'sanitize-html';
import omit from 'lodash/omit';

export type Ui3nHtmlArg = 'sanitize';

export interface Ui3nHtmlValue extends sanitizeHtml.IOptions {
  dirty: string;
}

function setValue(el: Element, binding: DirectiveBinding<string | Ui3nHtmlValue, string, Ui3nHtmlArg>) {
  const { arg, value } = binding;

  if (arg !== 'sanitize') {
    if (typeof value !== 'string') {
      throw Error('[v-ui3n-html] If the data is not sanitized, the value must be a string.');
    }

    el.innerHTML = value;
    return;
  }

  if (typeof value === 'string') {
    el.innerHTML = sanitizeHtml(value);
    return;
  }

  try {
    el.innerHTML = sanitizeHtml(
      value.dirty,
      {
        ...omit(value, 'dirty'),
      },
    );
    return;
  } catch (e) {
    // @ts-ignore
    throw Error(`[v-ui3n-html] `, e);
  }
}

export default function ui3nHtml(el: Element, binding: DirectiveBinding<string | Ui3nHtmlValue>) {
  setValue(el, binding);
}
