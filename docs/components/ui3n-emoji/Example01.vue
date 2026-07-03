<script setup lang="ts">
  import Ui3nEmoji from '@/components/ui3n-emoji/ui3n-emoji.vue';
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEmoji emoji="smile" />
    <Ui3nEmoji emoji="heart_eyes" />
    <Ui3nEmoji emoji="thumbs_up" />
    <Ui3nEmoji emoji="fire" />
    <Ui3nEmoji emoji="rocket" />
  </div>
</template>

<style lang="scss" module>
  .wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }
</style>
