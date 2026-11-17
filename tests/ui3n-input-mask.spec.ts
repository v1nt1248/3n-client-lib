import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Ui3nInput from '../src/components/ui3n-input/ui3n-input.vue';
import type { ComponentPublicInstance } from 'vue';

const mountedWrappers: { unmount: () => void }[] = [];

function mountInput(props: Record<string, unknown> = {}) {
  const wrapper = mount(Ui3nInput, {
    props: {
      modelValue: '',
      ...props,
    },
  });

  mountedWrappers.push(wrapper);

  return wrapper;
}

async function type(wrapper: ReturnType<typeof mountInput>, text: string) {
  for (const char of text) {
    const element = wrapper.find('input').element as HTMLInputElement;
    element.focus();

    const start = element.selectionStart ?? element.value.length;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true }));

    element.value = `${element.value.slice(0, start)}${char}${element.value.slice(start)}`;
    element.setSelectionRange(start + 1, start + 1);
    element.dispatchEvent(
      new InputEvent('input', { bubbles: true, inputType: 'insertText', data: char }),
    );

    await nextTick();
  }
}

function lastEmitted(wrapper: ReturnType<typeof mountInput>, event: string) {
  return wrapper.emitted(event)?.at(-1);
}

describe('Ui3nInput mask', () => {
  afterEach(() => {
    while (mountedWrappers.length) {
      mountedWrappers.pop()?.unmount();
    }
  });

  it('keeps the raw behaviour without a mask', async () => {
    const wrapper = mountInput();
    const element = wrapper.find('input').element as HTMLInputElement;

    element.value = 'plain text';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();

    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['plain text']);
    expect(lastEmitted(wrapper, 'input')).toEqual(['plain text']);
  });

  it('formats typed digits and emits the masked value', async () => {
    const wrapper = mountInput({ mask: '00:00' });

    await type(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('22:32');
    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['22:32']);
    expect(lastEmitted(wrapper, 'input')).toEqual(['22:32']);
  });

  it('emits the unmasked value in the unmasked mode', async () => {
    const wrapper = mountInput({ mask: '00:00', maskValueMode: 'unmasked' });

    await type(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('22:32');
    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['2232']);
    expect(lastEmitted(wrapper, 'input')).toEqual(['2232']);
  });

  it('formats a programmatic model update without an echo emit', async () => {
    const wrapper = mountInput({ mask: '00:00', modelValue: '22:32' });

    await nextTick();
    expect(wrapper.find('input').element.value).toBe('22:32');

    await wrapper.setProps({ modelValue: '07:08' });
    await nextTick();

    expect(wrapper.find('input').element.value).toBe('07:08');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('resets the mask when the value is cleared', async () => {
    const wrapper = mountInput({ mask: '00:00', modelValue: '22:32', clearable: true });

    await nextTick();

    const vm = wrapper.vm as unknown as ComponentPublicInstance & { clearValue: () => void };
    vm.clearValue();
    await nextTick();

    expect(wrapper.find('input').element.value).toBe('');
    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['']);
    expect(lastEmitted(wrapper, 'input')).toEqual(['']);
    expect(lastEmitted(wrapper, 'change')).toEqual(['']);
  });

  it('recreates the mask when the mask option changes', async () => {
    const wrapper = mountInput({ mask: '0000', modelValue: '1234' });

    await nextTick();
    expect(wrapper.find('input').element.value).toBe('1234');

    await wrapper.setProps({ mask: '00-00' });
    await nextTick();

    expect(wrapper.find('input').element.value).toBe('12-34');
    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['12-34']);
  });

  it('ignores the mask for a password input', async () => {
    const wrapper = mountInput({ type: 'password', mask: '00:00' });

    await type(wrapper, '2232');

    expect(wrapper.find('input').element.value).toBe('2232');
    expect(lastEmitted(wrapper, 'update:modelValue')).toEqual(['2232']);
  });

  it('passes the emitted value to the validation rules', async () => {
    const wrapper = mountInput({
      mask: '00:00',
      rules: [(value: unknown) => (value === '22:32' ? true : 'invalid')],
    });

    await type(wrapper, '2232');

    expect(lastEmitted(wrapper, 'update:valid')).toEqual([true]);
  });
});
