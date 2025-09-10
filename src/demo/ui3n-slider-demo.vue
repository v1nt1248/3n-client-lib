<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nSlider from '../components/ui3n-slider/ui3n-slider.vue';

  const val1 = ref(0);
  const val2 = ref(25);
  const val3 = ref<[number, number]>([10, 40]);

  function onInputComponentEvent(eventName: string, value?: unknown) {
    console.log('Ui3nSlider component event: ', eventName, value);
  }
</script>

<template>
  <demo-layout title="Ui3nSlider">
    <div class="demo__body-grid">
      <demo-layout-cell :label="`Default use, value: <i>${val1}</i>`">
        <ui3n-slider
          v-model="val1"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`Default use, disabled, value: <i>${val2}</i>`">
        <ui3n-slider
          v-model="val2"
          :disabled="true"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`Range mode, value: <i>[${val3}]</i>`">
        <ui3n-slider
          v-model="val3"
          range
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss"></style>
