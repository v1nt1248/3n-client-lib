<template>
  <Ui3nList
    :items="['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
const onSelect = ({ value, index }: { value: string; index: number }) => {
  console.log('Selected:', value, 'at index:', index);
};
</script>