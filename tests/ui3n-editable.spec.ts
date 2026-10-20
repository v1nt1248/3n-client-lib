import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ui3nEditable from '../src/components/ui3n-editable/ui3n-editable.vue';
import type { Ui3nEditableExpose } from '../src/components/ui3n-editable/types';

function mountEditable(props: Record<string, unknown>) {
  return mount(Ui3nEditable, {
    props: { modelValue: 'pr.scv', ...props },
    global: {
      stubs: { Ui3nIcon: true },
    },
  });
}

async function enterValue(wrapper: ReturnType<typeof mountEditable>, text: string) {
  // the edit button follows the shown value
  const editBtn = wrapper.find('span').element.nextElementSibling as HTMLElement;
  editBtn.click();
  await nextTick();
  const input = wrapper.find('input:not([type="hidden"])');
  await input.setValue(text);
  await input.trigger('keydown.enter');
}

function shownValue(wrapper: ReturnType<typeof mountEditable>) {
  return wrapper.find('span').text();
}

describe('Ui3nEditable', () => {
  it('emits the new value when it is accepted', async () => {
    const wrapper = mountEditable({ validator: () => true });

    await enterValue(wrapper, 'report.csv');

    expect(wrapper.emitted('update:modelValue')).toEqual([['report.csv']]);
    expect(wrapper.emitted('invalid')).toBeUndefined();
    expect(wrapper.emitted('done')).toHaveLength(1);
  });

  it('reverts a value rejected by the validator', async () => {
    const wrapper = mountEditable({
      validator: (value: string) => (value === '..' ? 'Invalid name' : true),
    });

    await enterValue(wrapper, '..');

    expect(wrapper.emitted('invalid')).toEqual([['Invalid name', '..']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('done')).toHaveLength(1);
    expect(wrapper.find('input:not([type="hidden"])').exists()).toBe(false);
    expect(shownValue(wrapper)).toBe('pr.scv');
  });

  it('does not run the validator for an unchanged value', async () => {
    let calls = 0;
    const wrapper = mountEditable({
      validator: () => {
        calls += 1;
        return 'Invalid name';
      },
    });

    await enterValue(wrapper, 'pr.scv');

    expect(calls).toBe(0);
    expect(wrapper.emitted('invalid')).toBeUndefined();
  });

  it('shows the model value again on reset after a rejection known later', async () => {
    const wrapper = mountEditable({});

    await enterValue(wrapper, 'report.csv');
    expect(shownValue(wrapper)).toBe('report.csv');

    // the parent did not apply the new value, so modelValue stays the same
    (wrapper.vm as unknown as Ui3nEditableExpose).reset();
    await nextTick();

    expect(shownValue(wrapper)).toBe('pr.scv');
  });
});
