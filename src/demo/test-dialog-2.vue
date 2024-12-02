<script lang="ts" setup>
defineProps<{
  text?: string;
}>();
</script>

<template>
  <div class="test-dialog">
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.test-dialog {
  font-size: var(--font-14);
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  padding: 32px 16px;
}
</style>
