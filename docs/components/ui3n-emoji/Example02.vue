<script setup lang="ts">
  import Ui3nEmoji from '@/components/ui3n-emoji/ui3n-emoji.vue';
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEmoji
      emoji="star2"
      :size="16"
    />
    <Ui3nEmoji
      emoji="star2"
      :size="24"
    />
    <Ui3nEmoji
      emoji="star2"
      :size="32"
    />
    <Ui3nEmoji
      emoji="star2"
      :size="48"
    />
  </div>
</template>

<style lang="scss" module>
  .wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }
</style>
