<script setup lang="ts">
import { ref } from 'vue';

const eventLog = ref<string[]>([]);

function logEvent(eventName: string, data?: any) {
  const timestamp = new Date().toLocaleTimeString();
  const message = data ? `${timestamp}: ${eventName} - ${JSON.stringify(data)}` : `${timestamp}: ${eventName}`;
  eventLog.value.unshift(message);
  if (eventLog.value.length > 5) {
    eventLog.value.pop();
  }
}

function handleInit(el: HTMLButtonElement) {
  logEvent('init', { tagName: el.tagName });
}

function handleClick(event: Event) {
  logEvent('click', { type: event.type });
}

function handleEnter(el: HTMLButtonElement) {
  logEvent('enter', { tagName: el.tagName });
}

function handleFocus(event: Event) {
  logEvent('focus', { type: event.type });
}

function handleBlur(event: Event) {
  logEvent('blur', { type: event.type });
}
</script>

<template>
  <div class="demo-container">
    <div class="button-section">
      <Ui3nButton
        @init="handleInit"
        @click="handleClick"
        @enter="handleEnter"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        Click me or press Enter
      </Ui3nButton>
    </div>

    <div class="log-section">
      <div class="log-title">Event log (last 5):</div>
      <div
        v-if="eventLog.length === 0"
        class="log-empty"
      >
        No events yet
      </div>
      <div
        v-for="(log, index) in eventLog"
        :key="index"
        class="log-item"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 400px;
  }

  .button-section {
    display: flex;
    justify-content: center;
  }

  .log-section {
    padding: 12px;
    background-color: var(--color-bg-block-secondary-default);
    border-radius: 8px;
    font-size: 11px;
    font-family: monospace;
  }

  .log-title {
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--color-text-block-primary-default);
  }

  .log-empty {
    color: var(--color-text-block-tertiary-default);
    font-style: italic;
  }

  .log-item {
    padding: 4px 0;
    color: var(--color-text-block-secondary-default);
    border-bottom: 1px solid var(--color-border-block-secondary-default);
  }

  .log-item:last-child {
    border-bottom: none;
  }
</style>