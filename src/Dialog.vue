<script lang="ts" setup>
  const props = defineProps<{
    dialogText?: string;
    additionalDialogText?: string;
  }>()
</script>

<template>
  <div class="dialog">
    {{ props.dialogText }}
    <span v-if="props.additionalDialogText">{{ props.additionalDialogText }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .dialog {
    display: flex;
    flex-direction: column;
    font-size: var(--font-14);
    font-weight: 400;
    color: var(--black-90);
    text-align: center;
    padding: var(--base-size);
  }
</style>
