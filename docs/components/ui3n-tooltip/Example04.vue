<script setup lang="ts">
  import { useTemplateRef } from 'vue';

  const target = useTemplateRef<HTMLElement>('target');
</script>

<template>
  <div class="tooltip-container">
    <span ref="target">
      <Ui3nButton>Hover me</Ui3nButton>
    </span>
    <Ui3nTooltip
      v-if="target"
      :trigger-element="target"
      content="Anchored to an external DOM element"
    />
  </div>
</template>

<style scoped>
  .tooltip-container {
    padding: 40px;
  }
</style>
