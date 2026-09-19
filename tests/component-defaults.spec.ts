import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ui3nChip from '../src/components/ui3n-chip/ui3n-chip.vue';
import Ui3nIcon from '../src/components/ui3n-icon/ui3n-icon.vue';
import Ui3nTabs from '../src/components/ui3n-tabs/ui3n-tabs.vue';
import Ui3nProgressLinear from '../src/components/ui3n-progress/ui3n-progress-linear.vue';

/**
 * A component left to its defaults must not write its sizes and colours into
 * the element's style attribute: an inline value beats every stylesheet, and
 * an application could no longer reach it. Passing a prop still wins, as it
 * always did.
 */

function inlineVariables(html: string): string[] {
  const style = html.match(/style="([^"]*)"/)?.[1] ?? '';
  return [...style.matchAll(/--[a-z0-9-]+/g)].map(m => m[0]);
}

describe('styling defaults stay in CSS', () => {
  it('Ui3nChip writes nothing when no prop is given', () => {
    const wrapper = mount(Ui3nChip, { slots: { default: 'chip' } });

    expect(inlineVariables(wrapper.html())).toEqual([]);
  });

  it('Ui3nChip writes only the props it was given', () => {
    const wrapper = mount(Ui3nChip, { props: { height: 32 }, slots: { default: 'chip' } });

    expect(inlineVariables(wrapper.html())).toEqual(['--ui3n-chip-height']);
    expect(wrapper.attributes('style')).toContain('32px');
  });

  it('Ui3nIcon writes nothing when no size or colour is given', () => {
    const wrapper = mount(Ui3nIcon, { props: { icon: 'round-close' } });

    expect(inlineVariables(wrapper.html())).toEqual([]);
  });

  it('Ui3nIcon turns a bare number into a length', () => {
    const wrapper = mount(Ui3nIcon, { props: { icon: 'round-close', size: 24 } });

    expect(wrapper.attributes('style')).toContain('--ui3n-icon-width: 24px');
  });

  it('Ui3nTabs writes only the indicator position it computes', () => {
    const wrapper = mount(Ui3nTabs);

    expect(inlineVariables(wrapper.html())).toEqual(['--ui3n-tabs-indicator-position']);
  });

  it('Ui3nProgressLinear keeps its geometry inline and its colours in CSS', () => {
    const wrapper = mount(Ui3nProgressLinear, { props: { value: 40 } });

    expect(inlineVariables(wrapper.html())).toEqual([
      '--ui3n-progress-linear-height',
      '--ui3n-progress-linear-font-size',
    ]);
  });
});

describe('root hooks', () => {
  it.each([
    [Ui3nChip, 'chip'],
    [Ui3nIcon, 'icon'],
    [Ui3nTabs, 'tabs'],
    [Ui3nProgressLinear, 'progress-linear'],
  ])('%# names itself on its root element', (component, name) => {
    const wrapper = mount(component as never, { props: { icon: 'round-close' } as never });

    expect(wrapper.attributes('data-ui3n')).toBe(name);
  });
});
