<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nInput from '../components/ui3n-input/ui3n-input.vue';

  const val1 = ref('');
  const val2 = ref('');
  const val3 = ref('');
  const val4 = ref('');
  const val5 = ref('');
  const val6 = ref('');

  function onInputComponentEvent(eventName: string, value?: unknown) {
    console.log('Ui3nInput component event: ', eventName, value);
  }
</script>

<template>
  <demo-layout title="Ui3nInput">
    <div class="demo__body-grid">
      <demo-layout-cell :label="`Default use, value: <i>${val1}</i>`">
        <ui3n-input
          v-model="val1"
          placeholder="Enter any text"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
          @enter="onInputComponentEvent('enter', $event)"
          @escape="onInputComponentEvent('escape', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`Default use, disabled, value: <i>${val1}</i>`">
        <ui3n-input
          v-model="val1"
          placeholder="Enter any text"
          :disabled="true"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`Default use, clearable, value: <i>${val1}</i>`">
        <ui3n-input
          v-model="val1"
          placeholder="Enter any text"
          clearable
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>

      <demo-layout-cell :label="`With label, value: <i>${val2}</i>`">
        <ui3n-input
          v-model="val2"
          label="Some label"
          placeholder="Enter any text"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`With label, disabled, value: <i>${val2}</i>`">
        <ui3n-input
          v-model="val2"
          label="Some label"
          placeholder="Enter any text"
          :disabled="true"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`With label, clearable, value: <i>${val2}</i>`">
        <ui3n-input
          v-model="val2"
          label="Some label"
          placeholder="Enter any text"
          clearable
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>

      <demo-layout-cell :label="`With label & icon, value: <i>${val3}</i>`">
        <ui3n-input
          v-model="val3"
          label="Some label"
          icon="round-search"
          placeholder="Enter any text"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`With label & icon, clearable, value: <i>${val3}</i>`">
        <ui3n-input
          v-model="val3"
          label="Some label"
          icon="round-search"
          placeholder="Enter any text"
          clearable
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`With icon, clearable, value: <i>${val3}</i>`">
        <ui3n-input
          v-model="val3"
          icon="round-search"
          placeholder="Enter any text"
          clearable
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>

      <demo-layout-cell :label="`With label & icon & external validation rules, clearable, value: <i>${val4}</i>`">
        <ui3n-input
          v-model="val4"
          label="Some label"
          icon="round-search"
          placeholder="Enter any text less than 5 characters"
          clearable
          :rules="[(v: unknown) => ((v as string).length <= 5 ? true : 'Not more than 5 characters')]"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell :label="`With label & forced set error state, clearable, value: <i>${val5}</i>`">
        <ui3n-input
          v-model="val5"
          label="Some label"
          placeholder="Enter any text"
          clearable
          display-state-mode="error"
          display-state-message="Some error text"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
        />
      </demo-layout-cell>
      <demo-layout-cell
        :label="`With label & forced set success state (display-state-with-icon), clearable, value: <i>${val6}</i>`"
      >
        <ui3n-input
          v-model="val6"
          label="Password"
          placeholder="Enter any text"
          type="password"
          clearable
          display-state-mode="success"
          display-state-with-icon
          display-state-message="All is OK"
          @input="onInputComponentEvent('input', $event)"
          @focus="onInputComponentEvent('focus', $event)"
          @blur="onInputComponentEvent('blur', $event)"
          @change="onInputComponentEvent('change', $event)"
          @clear="onInputComponentEvent('clear')"
        />
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss"></style>
