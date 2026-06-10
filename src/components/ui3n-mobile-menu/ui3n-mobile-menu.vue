<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nMobileMenuProps, Ui3nMobileMenuEmits, Ui3nMobileMenuSlots } from './types';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';

  const props = defineProps<Ui3nMobileMenuProps>();
  const emits = defineEmits<Ui3nMobileMenuEmits>();
  defineSlots<Ui3nMobileMenuSlots>();

  const widthCss = computed(() => props.width || '240px');
  const blurValue = computed(() => (props.withBlur ? '2px' : '0'));

  function toggleMenu() {
    emits('update:modelValue', !props.modelValue);
  }
</script>

<template>
  <div :class="$style.ui3nMobileMenu">
    <ui3n-button
      v-if="!modelValue"
      type="icon"
      :class="$style.menuButton"
      color="var(--color-bg-block-primary-default)"
      icon="round-menu"
      icon-color="var(--color-icon-block-primary-default)"
      icon-size="32"
      @click.stop.prevent="toggleMenu"
    />

    <transition name="slide-fade">
      <div
        v-if="modelValue"
        :class="$style.appMenu"
      >
        <div :class="$style.appMenuHeader">
          <slot name="header" />
        </div>
        <div :class="$style.appMenuBody">
          <slot name="menuBody" />
        </div>
        <div :class="$style.appMenuFooter">
          <slot name="footer" />
        </div>

        <ui3n-button
          type="icon"
          icon="round-close"
          color="transparent"
          icon-color="var(--color-icon-block-secondary-default)"
          icon-size="32"
          :class="$style.closeBtn"
          @click.stop.prevent="toggleMenu"
        />
      </div>
    </transition>
  </div>
  <div
    v-if="modelValue"
    :class="$style.overlay"
  />
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;
  .ui3nMobileMenu {
    --ui3n-menu-width-custom: v-bind(widthCss);

    width: max-content;
  }

  .appMenu {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--ui3n-menu-width-custom);
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    min-height: 100dvh;
    max-height: 100dvh;
    color: var(--color-text-block-primary-default);
    background-color: var(--color-bg-block-primary-default);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1050;
  }

  .appMenuHeader {
    position: relative;
    width: 100%;
  }

  .appMenuBody {
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .appMenuFooter {
    position: relative;
    width: 100%;
  }

  .menuButton {
    min-width: 48px !important;
    height: 48px;
  }

  .closeBtn {
    position: fixed;
    min-width: 48px !important;
    height: 48px;
    top: 8px;
    left: calc(var(--ui3n-menu-width-custom) + 8px);
    z-index: 1005;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: oklch(from var(--color-bg-block-primary-default) calc(l * 0.1) c h / 0.5);
    backdrop-filter: blur(v-bind(blurValue));
    z-index: 1000;
  }
</style>

<style lang="scss">
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(calc(var(--ui3n-menu-width-custom) * -1));
    opacity: 0;
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
  }
</style>
