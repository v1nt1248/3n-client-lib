<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  // import { createHighlighter } from 'shiki';
  import { getHighlighter } from '../../utils/shiki';

  const props = defineProps<{
    code: string;
    lang?: string;
    hideScriptBlock?: boolean;
    hideStyleBlock?: boolean;
    onlyTemplateContent?: boolean;
  }>();
  const emits = defineEmits<{
    (event: 'update:processed-code', value: string): void;
  }>();

  const highlightedCode = ref('');
  let shiki: Highlighter | null = null;
  let observer: MutationObserver | null = null;

  const THEME_MAP: Record<string, string> = {
    'default-theme': 'github-light',
    'dark-theme': 'one-dark-pro',
    'dark2-theme': 'github-dark',
  };

  function dedent(code: string): string {
    const lines = code.split('\n');

    // 1. Находим все непустые строки и их отступы
    const indents = lines
      .filter(line => line.trim().length > 0)
      .map(line => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      });

    if (indents.length === 0) return code;

    // 2. Минимальный отступ среди всех значимых строк
    const minIndent = Math.min(...indents);

    if (minIndent === 0) return code;

    // 3. Обрезаем ровно minIndent
    return lines
      .map(line => (line.length >= minIndent ? line.substring(minIndent) : line.trimStart()))
      .join('\n')
      .trim(); // Убираем лишние хвосты
  }

  function processCode(rawCode: string): string {
    let result = rawCode;

    if (props.onlyTemplateContent) {
      const templateMatch = result.match(/<template>([\s\S]*?)<\/template>/);
      if (templateMatch && templateMatch[1]) {
        result = templateMatch[1];
      }
      return dedent(result);
    }

    if (props.hideScriptBlock) {
      result = result.replace(/<script[\s\S]*?<\/script>/g, '');
    }

    if (props.hideStyleBlock) {
      result = result.replace(/<style[\s\S]*?<\/style>/g, '');
    }

    result = result.trim();
    result = result.replace(/\n{3,}/g, '\n\n');
    return dedent(result);
  }

  function updateHighlight() {
    if (!shiki) {
      return;
    }

    const htmlClassList = document.documentElement.classList;
    const activeThemeKey = htmlClassList.contains('default-theme')
      ? 'default-theme'
      : htmlClassList.contains('dark-theme')
        ? 'dark-theme'
        : 'dark2-theme';

    const finalCode = processCode(props.code);
    emits('update:processed-code', finalCode);
    highlightedCode.value = shiki.codeToHtml(finalCode, {
      lang: props.lang || 'vue',
      theme: THEME_MAP[activeThemeKey],
    });
  }

  watch(
    () => [props.code, props.hideScriptBlock, props.hideStyleBlock, props.onlyTemplateContent],
    async () => {
      shiki = await getHighlighter();
      updateHighlight();
    },
  );

  onMounted(async () => {
    shiki = await getHighlighter();
    updateHighlight();

    observer = new MutationObserver(() => {
      updateHighlight();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
</script>

<template>
  <div
    class="shiki-wrapper"
    v-html="highlightedCode"
  ></div>
</template>

<style scoped>
  .shiki-wrapper :deep(pre) {
    margin: 0;
    padding: 1.5rem;
    background-color: transparent !important;
    font-family: ui-monospace, 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
    font-size: 0.85em;
    overflow-x: auto;
  }
</style>
