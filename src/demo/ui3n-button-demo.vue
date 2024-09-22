<script setup lang="ts">
import DemoLayout from './demo-layout.vue';
import DemoLayoutCell from './demo-layout-cell.vue';
import Ui3nButton from '../components/ui3n-button/ui3n-button.vue';

</script>

<template>
  <demo-layout title="Ui3nButton">
    <div class="ui3n-button-demo__body">
      <demo-layout-cell label="Primary">
        <ui3n-button
          @enter="ev => console.log('ENTER ON BUTTON 1: ', ev)"
        >
          Primary 1
        </ui3n-button>
      </demo-layout-cell>
      <demo-layout-cell label="Primary">
        <ui3n-button
          @enter="ev => console.log('ENTER ON BUTTON 2: ', ev)"
        >
          Primary 2
        </ui3n-button>
      </demo-layout-cell>
      <demo-layout-cell label="Primary">
        <ui3n-button
          @enter="ev => console.log('ENTER ON BUTTON 3: ', ev)"
        >
          Primary 3
        </ui3n-button>
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss">
.ui3n-button-demo__body {
  display: grid;
  grid-template-columns: repeat(6, 150px);
  column-gap: 8px;
  row-gap: 16px;
}
</style>
