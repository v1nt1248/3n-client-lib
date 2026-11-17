<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import Ui3nTimePicker from '@/components/ui3n-date-time/ui3n-time-picker.vue';

  const time = ref<string | null>('22:30');
  const open = ref(false);

  async function openHours() {
    open.value = false;
    await nextTick();
    open.value = true;
  }
</script>

<template>
  <div class="demo-wrapper">
    <div class="controls">
      <button
        type="button"
        class="control-button"
        @click.stop="openHours"
      >
        Open hours
      </button>

      <button
        type="button"
        class="control-button"
        @click.stop="open = false"
      >
        Close
      </button>
    </div>

    <Ui3nTimePicker
      v-model="time"
      v-model:open="open"
    />

    <p class="result-text">
      Dropdown open: <strong>{{ open }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 320px;
    min-height: 320px;
  }

  .controls {
    display: flex;
    gap: 8px;
  }

  .control-button {
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border: 1px solid var(--color-border-table-primary-default);
    border-radius: 6px;
    background-color: var(--color-bg-control-secondary-default);
    color: var(--color-text-control-primary-default);
    cursor: pointer;
  }

  .control-button:hover {
    background-color: var(--color-bg-control-primary-hover);
  }

  .result-text {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
