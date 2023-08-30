<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'

  export interface Ui3nEmojiProps {
    emoji: string;
    size?: string | number;
    readonly?: boolean;
  }

  export interface Ui3nEmojiEmits {
    (ev: 'click', value: Event): void;
  }

  const props = defineProps<Ui3nEmojiProps>()
  const emit = defineEmits<Ui3nEmojiEmits>()

  const emojiElement = ref<HTMLDivElement | null>(null)
  const params = computed(() => {
    const {
      emoji,
      size = 16,
      readonly = false,
    } = props

    return { emoji, size, readonly }
  })

  onMounted(() => {
    if (emojiElement.value) {
      emojiElement.value.style.setProperty('--emoji-size', `${params.value.size}px`)
    }
  })

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
      { 'ui3n-emoji--readonly': params.readonly },
    ]"
    v-on="readonly ? {} : { 'click': onClick }"
  >
    {{ emoji }}
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-emoji {
    --emoji-size: 16px;

    display: flex;
    width: var(--emoji-size);
    height: var(--emoji-size);
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &--readonly {
      cursor: default;
    }
  }
</style>
