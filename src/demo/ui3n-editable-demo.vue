<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nEditable from '../components/ui3n-editable/ui3n-editable.vue';

  const val1 = ref('Beautiful');
</script>

<template>
  <demo-layout title="Ui3nEditable">
    <div class="demo__body-grid">
      <demo-layout-cell :label="`Default use, value: <i>${val1}</i>`">
        <ui3n-editable
          v-model="val1"
          placeholder="Enter text here"
          disallow-empty-value
          @update:model-value="(ev) => console.log('update:modelValue ', ev)"
          @done="() => console.log('done')"
          @cancel="() => console.log('cancel')"
          @focusin="(ev) => console.log('focusin: ', ev)"
          @focusout="() => console.log('focusout')"
        />
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>
