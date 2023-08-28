<script lang="ts" setup>
  import { computed, onMounted, ref, useSlots } from 'vue'
  import { hasSlotContent } from '../helpers/ui.helpers'
  import Ui3nIcon from './ui3n-icon.vue'

  const slots = useSlots()
  const props = defineProps<{
    textColor?: string;
    color?: string;
    round?: boolean;
    elevation?: boolean;
    icon?: string;
    iconSize?: string | number;
    iconColor?: string;
    disabled?: boolean;
  }>()
  const emit = defineEmits<{
    (ev: 'click', value: Event): void;
    (ev: 'focus', value: Event): void;
    (ev: 'blur', value: Event): void;
  }>()

  const buttonEl = ref<HTMLButtonElement | null>(null)
  const isSlotEmpty = computed(() => !hasSlotContent(slots['default']))

  onMounted(() => {
    if (buttonEl.value) {
      if (props.color) {
        buttonEl.value.style.setProperty('--ui3n-button-background', props.color)
      }
      if (props.textColor) {
        buttonEl.value.style.setProperty('--ui3n-button-text-color', props.textColor)
      }
    }
  })
</script>

<template>
  <button
    ref="buttonEl"
    :class="[
      'ui3n-button',
      { 'ui3n-button--round': props.round, 'ui3n-button--elevation': props.elevation },
    ]"
    type="button"
    :disabled="props.disabled"
    @click="emit('click', $event)"
    @focusin="emit('focus', $event)"
    @focusout="emit('blur', $event)"
  >
    <ui3n-icon
      v-if="props.icon"
      class="ui3n-button__icon"
      :icon="props.icon"
      :width="props.iconSize"
      :height="props.iconSize"
      :color="props.iconColor || 'var(--ui3n-button-text-color)'"
    />
    <span
      :class="[
        'ui3n-button__text',
        { 'ui3n-button__text--margin': !isSlotEmpty && props.icon },
      ]"
    >
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
  .ui3n-button {
    --ui3n-button-text-size: 12px;
    --ui3n-button-text-height: 16px;
    --ui3n-button-text-color: var(--system-white, #fff);
    --ui3n-button-background: var(--blue-main, #0090ec);
    --ui3n-button-padding-vert: 8px;
    --ui3n-button-padding-horiz: 16px;

    display: flex;
    align-items: center;
    border: none;
    outline: none;
    padding: var(--ui3n-button-padding-vert) var(--ui3n-button-padding-horiz);
    border-radius: 4px;
    background: var(--ui3n-button-background);
    font-size: var(--ui3n-button-text-size);
    line-height: var(--ui3n-button-text-height);
    font-weight: 600;
    color: var(--ui3n-button-text-color);
    background-position: center;
    transition: background 0.5s ease-in-out;

    &--round {
      --ui3n-button-padding-vert: 4px;
      --ui3n-button-padding-horiz: 4px;

      border-radius: 50%;
    }

    &--elevation {
      box-shadow:
        rgba(0, 0, 0, 0.2) 0px 3px 1px -2px
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px
        rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    }

    &:not([disabled]) {
      cursor: pointer;

      &:hover {
        background:
          var(--ui3n-button-background)
          radial-gradient(circle, transparent 1%, var(--ui3n-button-background) 1%)
          center/15000%;

        .ui3n-button {
          &__icon,
          &__text {
            opacity: 1;
          }
        }
      }

      &:active {
        opacity: 1;
        background-color: var(--gray-90, #444);
        background-size: 100%;
        transition: background 0s;
      }
    }

    &__icon {
      opacity: 0.85;
      transition: opacity 0.2s ease-in-out;
    }

    &__text {
      display: block;
      opacity: 0.85;
      transition: opacity 0.2s ease-in-out;

      &--margin {
        margin-left: 4px;
      }
    }

    &[disabled] {
      opacity: 0.7;
    }
  }
</style>
