<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { emoticons } from '@/constants/emoticons';
  import type { Ui3nEmojiEmits, Ui3nEmojiProps } from './types';

  const props = withDefaults(defineProps<Ui3nEmojiProps>(), {
    size: 16,
    readonly: false,
  });
  const emits = defineEmits<Ui3nEmojiEmits>();

  const emojiElement = ref<HTMLDivElement | null>(null);
  const emojiData = computed(() => emoticons[props.emoji]);

  const inlineStyles = computed(() => {
    const isNumeric = !isNaN(Number(props.size));
    const sizeStr = isNumeric ? `${props.size}px` : String(props.size);

    return {
      '--ui3n-emoji-size': sizeStr,
      'line-height': sizeStr,
    };
  });

  function onClick(ev: Event) {
    ev.stopPropagation();
    emits('click', ev);
  }

  watch(
    () => props.emoji,
    newValue => {
      if (!Object.keys(emoticons).includes(newValue)) {
        console.error(`[Ui3nEmoji] Invalid emoticon: ${newValue}`);
      }
    },
    { immediate: true },
  );
</script>

<template>
  <div
    ref="emojiElement"
    :class="[$style.ui3nEmoji, readonly && $style.readonly]"
    :style="inlineStyles"
    v-on="readonly ? {} : { click: onClick }"
  >
    {{ emojiData && emojiData.value }}
  </div>
</template>

<style lang="scss" module>
  .ui3nEmoji {
    --ui3n-emoji-size: 16px;

    display: flex;
    min-width: var(--ui3n-emoji-size);
    width: var(--ui3n-emoji-size);
    min-height: var(--ui3n-emoji-size);
    height: var(--ui3n-emoji-size);
    font-size: var(--ui3n-emoji-size);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .readonly {
    cursor: default;
  }
</style>
