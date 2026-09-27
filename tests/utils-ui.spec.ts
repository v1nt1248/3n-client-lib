import { createCommentVNode, createTextVNode, h } from 'vue';
import { describe, expect, it } from 'vitest';
import { toCssLength } from '../src/utils/ui/to-css-length';
import { capitalize } from '../src/utils/ui/capitalize';
import { removeWhitespaceInString } from '../src/utils/remove-whitespace-in-string';
import { invertColor } from '../src/utils/ui/invert-color';
import { generateColor } from '../src/utils/ui/generate-color';
import { markSearch } from '../src/utils/ui/mark-search';
import { hasSlotContent } from '../src/utils/ui/has-slot-content';

describe('toCssLength', () => {
  it('turns a finite number into pixels', () => {
    expect(toCssLength(24)).toBe('24px');
  });

  it('turns a numeric string into pixels', () => {
    expect(toCssLength('24')).toBe('24px');
  });

  it('keeps an explicit CSS length untouched', () => {
    expect(toCssLength('1.5rem')).toBe('1.5rem');
  });

  it('falls back when the value is blank', () => {
    expect(toCssLength('')).toBe('16px');
    expect(toCssLength('   ')).toBe('16px');
    expect(toCssLength('', '2em')).toBe('2em');
  });

  it('returns NaN as-is because it is not a lone number', () => {
    expect(toCssLength(Number.NaN)).toBe('NaN');
  });

  it('appends px to Infinity, which is not finite but parses as a number', () => {
    expect(toCssLength(Number.POSITIVE_INFINITY)).toBe('Infinitypx');
  });
});

describe('capitalize', () => {
  it('upper-cases the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('leaves the rest of the string alone', () => {
    expect(capitalize('hello World')).toBe('Hello World');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('returns an empty string for an empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('removeWhitespaceInString', () => {
  it('removes spaces, tabs and line breaks', () => {
    expect(removeWhitespaceInString(' a b\tc\nd\re ')).toBe('abcde');
  });

  it('also removes non-breaking spaces, as \\s matches them in JS', () => {
    expect(removeWhitespaceInString('a\u00a0b')).toBe('ab');
  });
});

describe('invertColor', () => {
  it('inverts black to white', () => {
    expect(invertColor('#000000')).toBe('#ffffff');
  });

  it('inverts white to black', () => {
    expect(invertColor('#ffffff')).toBe('#000000');
  });

  it('inverts a channel-wise colour', () => {
    expect(invertColor('#ff0000')).toBe('#00ffff');
  });

  it('falls back to black for an empty string', () => {
    expect(invertColor('')).toBe('#000');
  });
});

describe('generateColor', () => {
  it('is deterministic for the same input', () => {
    expect(generateColor('alice')).toBe(generateColor('alice'));
  });

  it('returns an hsl colour with fixed saturation and lightness', () => {
    expect(generateColor('alice')).toMatch(/^hsl\(\d{1,3}, 60%, 40%\)$/);
  });

  it('maps known inputs to known hues', () => {
    expect(generateColor('a')).toBe('hsl(97, 60%, 40%)');
    expect(generateColor('ab')).toBe('hsl(225, 60%, 40%)');
  });
});

describe('markSearch', () => {
  it('wraps a matching substring', () => {
    expect(markSearch('hello world', 'lo')).toBe('hel<span class="match-search">lo</span> world');
  });

  it('matches case-insensitively', () => {
    expect(markSearch('Hello', 'hello')).toBe('<span class="match-search">Hello</span>');
  });

  it('highlights every whitespace-separated word', () => {
    expect(markSearch('foo bar', 'foo bar')).toBe(
      '<span class="match-search">foo</span> <span class="match-search">bar</span>',
    );
  });

  it('ignores extra whitespace in the query', () => {
    expect(markSearch('foo bar', '  foo   bar  ')).toBe(
      '<span class="match-search">foo</span> <span class="match-search">bar</span>',
    );
  });

  it('treats regex metacharacters in the query literally', () => {
    expect(markSearch('a.b', 'a.b')).toBe('<span class="match-search">a.b</span>');
    expect(markSearch('axb', 'a.b')).toBe('axb');
    expect(markSearch('a(b', 'a(b')).toBe('<span class="match-search">a(b</span>');
  });

  it('escapes HTML in the source so nothing is injected', () => {
    expect(markSearch('<img onerror=x>', 'img')).toBe(
      '&lt;<span class="match-search">img</span> onerror=x&gt;',
    );
    expect(markSearch('<b>title</b>', '')).toBe('&lt;b&gt;title&lt;/b&gt;');
  });

  it('finds a literal ampersand in the source', () => {
    expect(markSearch('a&b', '&')).toBe('a<span class="match-search">&amp;</span>b');
  });

  it('replaces non-breaking spaces with spaces when there is no query', () => {
    expect(markSearch('a\u00a0b', '')).toBe('a b');
  });

  it('returns an empty string for an empty source', () => {
    expect(markSearch('', 'anything')).toBe('');
  });
});

/*
 * html2text reads HTMLElement.innerText, which jsdom does not implement, so it
 * cannot be exercised here without faking the very API under test.
 */

describe('hasSlotContent', () => {
  it('is false without a slot', () => {
    expect(hasSlotContent()).toBe(false);
  });

  it('is false for an empty render', () => {
    expect(hasSlotContent(() => [])).toBe(false);
    expect(hasSlotContent(() => createCommentVNode(''))).toBe(false);
    expect(hasSlotContent(() => createTextVNode(''))).toBe(false);
  });

  it('is true for a single vnode or an array of vnodes', () => {
    expect(hasSlotContent(() => h('div'))).toBe(true);
    expect(hasSlotContent(() => [h('div')])).toBe(true);
    expect(hasSlotContent(() => createTextVNode('hi'))).toBe(true);
  });
});
