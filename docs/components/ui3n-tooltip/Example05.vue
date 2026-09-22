<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';

  const open = ref(false);
  const target = useTemplateRef<HTMLElement>('target');
</script>

<template>
  <div class="tooltip-container">
    <span ref="target">
      <Ui3nButton @click="open = !open">Toggle tooltip</Ui3nButton>
    </span>
    <Ui3nTooltip
      v-if="target"
      v-model="open"
      :trigger-element="target"
      trigger="manual"
      content="Opened manually next to the button"
    />
  </div>
</template>

<style scoped>
  .tooltip-container {
    padding: 40px;
  }
</style>
