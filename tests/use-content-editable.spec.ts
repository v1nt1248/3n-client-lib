import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useContentEditable } from '../src/components/ui3n-editable/useContentEditable';

function setupContentEditable(props: Record<string, unknown>, emits = vi.fn()) {
  let api: ReturnType<typeof useContentEditable> | undefined;

  const wrapper = mount(
    defineComponent({
      setup() {
        api = useContentEditable(props as never, emits as never);
        return () => h('div', { ref: api!.el });
      },
    }),
  );

  return { api: api!, emits, wrapper };
}

describe('useContentEditable', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits init with the element once mounted', () => {
    const { api, emits } = setupContentEditable({ modelValue: '' });

    expect(emits).toHaveBeenCalledWith('init', api.el.value);
    expect(api.el.value).toBeInstanceOf(HTMLElement);
  });

  it('focuses in, reporting the event', () => {
    const { api, emits } = setupContentEditable({ modelValue: '' });

    api.onFocusIn(new FocusEvent('focusin'));

    expect(api.isFocused.value).toBe(true);
    expect(emits).toHaveBeenCalledWith('focusin', expect.any(FocusEvent));
  });

  it('ignores focus while disabled', () => {
    const { api, emits } = setupContentEditable({ modelValue: '', disabled: true });

    api.onFocusIn(new FocusEvent('focusin'));

    expect(api.isFocused.value).toBe(false);
    expect(emits).not.toHaveBeenCalledWith('focusin', expect.anything());
  });

  it('reports the typed content on focus out', () => {
    const { api, emits } = setupContentEditable({ modelValue: '' });
    const target = document.createElement('div');
    target.textContent = 'hello';

    api.onFocusOut({ target } as unknown as FocusEvent);

    expect(api.isFocused.value).toBe(false);
    expect(emits).toHaveBeenCalledWith('focusout', expect.anything());
    expect(emits).toHaveBeenCalledWith('change', 'hello');
    expect(emits).toHaveBeenCalledWith('update:modelValue', 'hello');
  });

  it('restores the initial value when empties are disallowed', () => {
    const { api, emits } = setupContentEditable({ modelValue: 'seed', disallowEmptyValue: true });
    api.onFocusIn(new FocusEvent('focusin'));

    const target = document.createElement('div');
    target.textContent = '';
    api.onFocusOut({ target } as unknown as FocusEvent);

    expect(emits).toHaveBeenCalledWith('change', 'seed');
  });

  it('debounces the model update while typing', async () => {
    vi.useFakeTimers();
    const { api, emits } = setupContentEditable({ modelValue: '', debounceDelay: 50 });
    const target = document.createElement('div');
    target.textContent = 'typed';

    api.onInput({ target } as unknown as InputEvent);

    expect(emits).toHaveBeenCalledWith('input', 'typed');
    expect(emits).not.toHaveBeenCalledWith('update:modelValue', 'typed');

    await vi.advanceTimersByTimeAsync(50);
    expect(emits).toHaveBeenCalledWith('update:modelValue', 'typed');
  });

  it('does not update the model while disabled', async () => {
    vi.useFakeTimers();
    const { api, emits } = setupContentEditable({ modelValue: '', debounceDelay: 50, disabled: true });
    const target = document.createElement('div');
    target.textContent = 'typed';

    api.onInput({ target } as unknown as InputEvent);
    await vi.advanceTimersByTimeAsync(50);

    expect(emits).not.toHaveBeenCalledWith('update:modelValue', 'typed');
  });

  it('drops the value that only repeats the placeholder', async () => {
    vi.useFakeTimers();
    const { api, emits } = setupContentEditable({ modelValue: '', placeholder: 'Type here', debounceDelay: 10 });
    const target = document.createElement('div');
    target.textContent = 'Type here';

    api.onInput({ target } as unknown as InputEvent);
    await vi.advanceTimersByTimeAsync(10);

    expect(emits).toHaveBeenCalledWith('update:modelValue', null);
  });

  it('stops propagation and reports clicks', () => {
    const { api, emits } = setupContentEditable({ modelValue: '' });
    const event = { stopPropagation: vi.fn() } as unknown as MouseEvent;

    api.onClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(emits).toHaveBeenCalledWith('click', event);
  });

  it('blocks a paste that would exceed maxLength', () => {
    const { api } = setupContentEditable({ modelValue: '', maxLength: 5 });
    api.el.value!.textContent = 'abc';
    const event = {
      clipboardData: { getData: () => 'defgh' },
      preventDefault: vi.fn(),
    } as unknown as ClipboardEvent;

    api.onPaste(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('allows a paste that fits within maxLength', () => {
    const { api } = setupContentEditable({ modelValue: '', maxLength: 10 });
    api.el.value!.textContent = 'ab';
    const event = {
      clipboardData: { getData: () => 'cd' },
      preventDefault: vi.fn(),
    } as unknown as ClipboardEvent;

    api.onPaste(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('blocks extra characters at maxLength', () => {
    const { api, emits } = setupContentEditable({ modelValue: '', maxLength: 3 });
    const target = document.createElement('div');
    target.innerHTML = 'abcd';
    const event = { target, code: 'KeyE', preventDefault: vi.fn() } as unknown as KeyboardEvent;

    api.onKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(emits).toHaveBeenCalledWith('keydown', event);
  });

  it('leaves Backspace alone at maxLength', () => {
    const { api } = setupContentEditable({ modelValue: '', maxLength: 3 });
    const target = document.createElement('div');
    target.innerHTML = 'abcd';
    const event = { target, code: 'Backspace', preventDefault: vi.fn() } as unknown as KeyboardEvent;

    api.onKeyDown(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('commits a non-multiline field on Enter', () => {
    const { api } = setupContentEditable({ modelValue: '' });
    const target = document.createElement('div');
    const blur = vi.fn();
    target.blur = blur;
    const event = { target, code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent;

    api.onKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
  });
});
