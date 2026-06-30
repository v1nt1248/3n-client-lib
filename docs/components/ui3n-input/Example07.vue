<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';

const value = ref('');
const events = ref<string[]>([]);

function logEvent(name: string, data?: unknown) {
  const time = new Date().toLocaleTimeString();
  events.value.unshift(`[${time}] ${name}${data ? ': ' + JSON.stringify(data) : ''}`);
  if (events.value.length > 10) {
    events.value.pop();
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInput
      v-model="value"
      label="Events demo"
      placeholder="Type, press Enter, focus/blur..."
      clearable
      @input="(v) => logEvent('input', v)"
      @change="(v) => logEvent('change', v)"
      @enter="(v) => logEvent('enter', v)"
      @focus="() => logEvent('focus')"
      @blur="() => logEvent('blur')"
      @clear="() => logEvent('clear')"
      @escape="() => logEvent('escape')"
    />

    <div style="font-size: 12px; max-height: 200px; overflow-y: auto; background: var(--color-bg-control-secondary-default); padding: 8px; border-radius: 4px;">
      <div v-if="events.length === 0" style="opacity: 0.5;">No events yet. Interact with the input above.</div>
      <div v-for="(event, i) in events" :key="i" style="font-family: monospace; margin-bottom: 2px;">
        {{ event }}
      </div>
    </div>
  </div>
</template>