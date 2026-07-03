<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nEmoji from '@/components/ui3n-emoji/ui3n-emoji.vue';

  const clickedEmoji = ref('');

  function onClick(emoji: string) {
    clickedEmoji.value = emoji;
  }
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEmoji
      emoji="thumbs_up"
      :size="32"
      @click="() => onClick('thumbs_up')"
    />
    <Ui3nEmoji
      emoji="heart_eyes"
      :size="32"
      @click="() => onClick('heart_eyes')"
    />
    <Ui3nEmoji
      emoji="fire"
      :size="32"
      @click="() => onClick('fire')"
    />
    <div
      v-if="clickedEmoji"
      :class="$style.info"
    >
      Clicked: {{ clickedEmoji }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .info {
    margin-left: 12px;
    font-size: 12px;
    color: var(--color-text-table-secondary-default);
  }
</style>
