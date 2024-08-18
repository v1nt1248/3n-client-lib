<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { emoticons } from '@/constants/emoticons';
import type { Ui3nEmojiEmits, Ui3nEmojiProps } from './types';

const props = withDefaults(
  defineProps<Ui3nEmojiProps>(),
  {
    size: 16,
    readonly: false,
  },
);
const emits = defineEmits<Ui3nEmojiEmits>();

const emojiElement = ref<HTMLDivElement | null>(null);
const emojiData = computed(() => emoticons[props.emoji]);

onMounted(() => {
  if (emojiElement.value) {
    emojiElement.value.style.setProperty('--emoji-size', `${props.size}px`);
  }
});

watch(
  () => props.emoji,
  newValue => {
    if (!Object.keys(emoticons).includes(newValue)) {
      console.error(`[Ui3nEmoji] Invalid emoticon: ${newValue}`);
    }
  },
  { immediate: true },
);

watch(
  () => props.size,
  (newValue, prevValue) => {
    if (emojiElement.value && newValue && newValue !== prevValue) {
      emojiElement.value.style.setProperty('--ui3n-emoji-size', `${newValue}px`);
    }
  },
);

const onClick = (ev: Event) => {
  ev.stopImmediatePropagation();
  emits('click', ev);
};
</script>

<template>
  <div
    ref="emojiElement"
    :class="[$style.emoji, readonly && $style.readonly]"
    v-on="readonly ? {} : { 'click': onClick }"
  >
    {{ emojiData && emojiData.value }}
  </div>
</template>

<style lang="scss" module>
.emoji {
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
}

.readonly {
  cursor: default;
}
</style>
