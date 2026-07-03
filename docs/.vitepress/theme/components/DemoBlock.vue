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

  const copyCode = () => {
    navigator.clipboard
      .writeText(processedCode.value)
      .then(() => {
        copyText.value = 'Copied!';
        setTimeout(() => {
          copyText.value = 'Copy';
        }, 200);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
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
      <div class="demo-viewport-content">
        <slot />
      </div>
    </div>

    <div class="demo-controls">
      <button
        @click="copyCode"
        class="control-btn copy-btn"
        :class="{ 'is-copied': copyText === 'Copied!' }"
      >
        {{ copyText }}
      </button>

      <button
        @click="isExpanded = !isExpanded"
        class="control-btn toggle-btn"
      >
        {{ isExpanded ? 'Hide code' : 'Show code' }}
      </button>
    </div>

    <transition name="fade-slide">
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
    </transition>
  </div>
</template>

<style scoped>
  .demo-block {
    border: 1px solid var(--color-border-table-primary-default);
    border-radius: 8px;
    margin: 24px 0;
    overflow: hidden;
    background-color: var(--color-bg-block-primary-default);
  }

  .demo-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--color-border-table-primary-default);
  }

  .demo-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-table-primary-default);
  }

  .demo-description {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-block-secondary-default);
  }

  .demo-viewport {
    padding: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-block-primary-default);
    background-image: radial-gradient(var(--color-border-table-primary-default) 1px, transparent 1px);
    background-size: 16px 16px;
    min-height: 120px;
  }

  .demo-viewport-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .demo-controls {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 16px;
    border-top: 1px solid var(--color-border-table-primary-default);
    background-color: var(--color-bg-table-header-default);
  }

  .control-btn {
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--color-text-button-secondary-default);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .control-btn:hover {
    background-color: var(--color-bg-control-primary-hover);
    color: var(--color-text-control-accent-default);
  }

  .copy-btn.is-copied {
    color: var(--color-text-control-accent-default);
    font-weight: 600;
  }

  .demo-code {
    border-top: 1px solid var(--color-border-table-primary-default);
    overflow: hidden;
  }
</style>

<style>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition:
      max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease;
    max-height: 1500px;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    max-height: 0 !important;
    opacity: 0;
  }
</style>
