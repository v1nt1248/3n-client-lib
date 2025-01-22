import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import sanitizeHtml from 'sanitize-html';
import { selectAll } from '@/utils';
import type { Nullable } from '@/components/types';
import type { Ui3nContentEditableEmits, Ui3nContentEditableProps } from '@/components/ui3n-editable/types';

export function useContentEditable(props: Ui3nContentEditableProps, emits: Ui3nContentEditableEmits) {
  const el = ref<Nullable<HTMLElement>>(null);
  const initialValue = ref('');
  const isFocused = ref(false);

  function convertHtmlToValue(html: Nullable<string>): Nullable<string> {
    let clearedHtml = (html ?? '').trim();
    if (props.placeholder) {
      clearedHtml = clearedHtml.replace(props.placeholder, '');
    }

    return clearedHtml === '' ? null : html;
  }

  function convertValueToHtml(value: string): string {
    return value || (!isFocused.value && props.placeholder) || '';
  }

  function setHtmlFromValue(value: string): void {
    const sanitizedValue = value ? sanitizeHtml(value) : value;
    el.value!.innerText = convertValueToHtml(sanitizedValue);
  }

  function getContent(ev: Event): Nullable<string> {
    return (ev.target as HTMLElement)?.textContent;
  }

  function updateValue(newHtml: Nullable<string>) {
    if (props.disabled) {
      return;
    }

    const newValue = convertHtmlToValue(newHtml);
    if (props.modelValue !== newValue) {
      emits('update:modelValue', newValue);
    }
  }

  const updateValueDebounced = debounce(updateValue, props.debounceDelay);

  function onFocusIn(ev: FocusEvent) {
    if (props.disabled) {
      return;
    }

    isFocused.value = true;
    if (props.disallowEmptyValue) {
      initialValue.value = props.modelValue;
    }

    setHtmlFromValue(props.modelValue);

    if (props.selectAllOnFocus) {
      selectAll(el.value!);
    }

    emits('focusin', ev);
  }

  function onFocusOut(ev: FocusEvent) {
    isFocused.value = false;
    const content = getContent(ev);
    const updatedContent = props.disallowEmptyValue && !content ? initialValue.value : content;

    updateValue(updatedContent);
    setHtmlFromValue(props.modelValue);
    el.value!.scrollLeft = 0;
    emits('focusout', ev);
    emits('change', updatedContent);
    emits('update:modelValue', updatedContent);
  }

  function onClick(ev: MouseEvent) {
    ev.stopPropagation();
    emits('click', ev);
  }

  function onPaste(ev: ClipboardEvent) {
    if (props.maxLength) {
      const text = ev.clipboardData?.getData('text/plain');
      // Strip &nbsp and html tags from string
      const value = `${el.value!.textContent}${text}`
        .replace(new RegExp(String.fromCharCode(160), 'g'), ' ')
        .replace(/(<([^>]+)>)/gi, '');

      if (value.length >= props.maxLength) ev.preventDefault();
    }
  }

  function onKeyDown(ev: KeyboardEvent) {
    if (props.maxLength) {
      // Strip &nbsp and html tags from string
      const value = (ev.target as HTMLElement)?.innerHTML
        // @ts-ignore
        .replaceAll(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')
        .replaceAll(/(<([^>]+)>)/gi, '');

      const selection = window.getSelection();

      if (value.length >= props.maxLength && ev.code !== 'Backspace' && selection?.toString().length === 0)
        ev.preventDefault();
    }

    emits('keydown', ev);

    if (ev.code === 'Enter') {
      if (!props.isMultiline) {
        ev.preventDefault();
        (ev.target as HTMLElement).blur();
        window.getSelection()?.removeAllRanges();
      }
    } else if (ev.code === 'Esc') {
      (ev.target as HTMLElement).blur();
    }
  }

  function onInput(ev: InputEvent) {
    emits('input', (ev.target as HTMLElement).textContent);
    updateValueDebounced((ev.target as HTMLElement).textContent);
  }

  onMounted(() => {
    el.value && emits('init', el.value);
  });

  watch(
    () => props.modelValue,
    (val: string) => {
      if (!isFocused.value) {
        setHtmlFromValue(val);
      }
    },
    { immediate: true },
  );

  return {
    el,
    isFocused,
    onFocusIn,
    onFocusOut,
    onClick,
    onPaste,
    onKeyDown,
    onInput,
  };
}
