<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Highlighter from './Highlighter.vue';

  const props = defineProps<{
    title?: string;
    description?: string;
    code: string;
    hideScriptBlock?: boolean;
    hideStyleBlock?: boolean;
    onlyTemplateContent?: boolean;
  }>();

  const isExpanded = ref(false);
  const copyText = ref('Copy');
  const processedCode = ref(props.code);

  const escapedCode = computed(() => {
    return props.code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  });

  const copyCode = () => {
    navigator.clipboard.writeText(processedCode.value);
    copyText.ref = 'Copied!';
    setTimeout(() => (copyText.value = 'Copy'), 2000);
  };
</script>

<template>
  <div class="demo-block">
    <div
      v-if="title"
      class="demo-header"
    >
      <h4 class="demo-title">{{ title }}</h4>
      <p
        v-if="description"
        class="demo-description"
      >
        {{ description }}
      </p>
    </div>

    <div class="demo-viewport">
      <slot />
    </div>

    <div class="demo-controls">
      <button
        @click="copyCode"
        class="control-btn"
      >
        {{ copyText }}
      </button>

      <button
        @click="isExpanded = !isExpanded"
        class="control-btn"
      >
        {{ isExpanded ? 'Hide code' : 'Show code' }}
      </button>
    </div>

    <div
      v-if="isExpanded"
      class="demo-code"
    >
      <Highlighter
        :code="code"
        lang="vue"
        :hide-script-block="hideScriptBlock"
        :hide-style-block="hideStyleBlock"
        :only-template-content="onlyTemplateContent"
        @update:processed-code="processedCode = $event"
      />
    </div>
  </div>
</template>

<style scoped>
  .demo-block {
    border: 1px solid var(--color-border-table-primary-default);
    border-radius: 8px;
    margin: 1.5rem 0;
    overflow: hidden;
  }

  .demo-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border-table-primary-default);
  }
  .demo-title {
    margin: 0;
    font-weight: 600;
  }

  .demo-description {
    margin: 0.5rem 0 0;
    font-size: 0.9em;
    color: var(--color-text-block-secondary-default);
  }

  .demo-viewport {
    padding: 2rem;
    background-size: 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .demo-controls {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 8px 16px;
    border-top: 1px solid var(--color-border-table-primary-default);
    background-color: var(--color-bg-table-header-default);
  }

  .control-btn {
    font-size: 12px;
    color: var(--color-text-button-secondary-default);
    transition: all 0.2s;
  }

  .control-btn:hover {
    color: var(--color-text-button-secondary-hover);
    font-weight: 600;
  }

  .demo-code {
    border-top: 1px solid var(--color-border-table-primary-default);
  }
</style>
