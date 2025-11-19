<script setup lang="ts">
import DemoLayout from './demo-layout.vue';
import DemoLayoutCell from './demo-layout-cell.vue';

</script>

<template>
  <demo-layout title="EXAMPLE TITLE">
    <div class="demo__body-grid">
      <demo-layout-cell :label="`Label, value: <i>${''}</i>`">
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss"></style>
