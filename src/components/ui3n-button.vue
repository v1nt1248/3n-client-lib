<script lang="ts" setup>
  const props = defineProps<{
    disabled: boolean;
  }>()
  const emit = defineEmits<{
    (ev: 'click', value: Event): void;
  }>()
</script>

<template>
  <button
    class="ui3n-button"
    type="button"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <v-slot />
  </button>
</template>

<style lang="scss" scoped>
  .ui3n-button {
    display: flex;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: blue;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    padding: 0 8px;
    height: 32px;
  }
</style>
