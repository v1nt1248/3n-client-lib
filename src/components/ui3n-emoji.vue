<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import { emoticons } from '../constants/emoticons'


  export interface Ui3nEmojiProps {
    emoji: string;
    size?: string | number;
    readonly?: boolean;
  }

  export interface Ui3nEmojiEmits {
    (ev: 'click', value: Event): void;
  }

  const props = withDefaults(
    defineProps<Ui3nEmojiProps>(),
    {
      size: 16,
      readonly: false,
    },
  )
  const emit = defineEmits<Ui3nEmojiEmits>()

  const emojiElement = ref<HTMLDivElement | null>(null)
  const emojiData = computed(() => emoticons[props.emoji])

  onMounted(() => {
    if (emojiElement.value) {
      emojiElement.value.style.setProperty('--emoji-size', `${props.size}px`)
    }
  })

  watch(
    () => props.emoji,
    newValue => {
      if (!Object.keys(emoticons).includes(newValue)) {
        console.error(`[Ui3nEmoji] Invalid emoticon: ${newValue}`)
      }
    },
    { immediate: true },
  )

  watch(
    () => props.size,
    (newValue, prevValue) => {
      if (emojiElement.value && newValue && newValue !== prevValue) {
        emojiElement.value.style.setProperty('--emoji-size', `${newValue}px`)
      }
    },
  )

  const onClick = (ev: Event) => {
    ev.stopImmediatePropagation()
    emit('click', ev)
  }
</script>

<template>
  <div
    ref="emojiElement"
    :class="[
      'ui3n-emoji',
      { 'ui3n-emoji--readonly': props.readonly },
    ]"
    v-on="readonly ? {} : { 'click': onClick }"
  >
    {{ emojiData && emojiData.value }}
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-emoji {
    --emoji-size: 16px;

    display: flex;
    width: var(--emoji-size);
    height: var(--emoji-size);
    font-size: var(--emoji-size);
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &--readonly {
      cursor: default;
    }
  }
</style>
