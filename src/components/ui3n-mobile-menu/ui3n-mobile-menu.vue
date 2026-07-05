<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Ui3nMobileMenuProps, Ui3nMobileMenuEmits, Ui3nMobileMenuSlots } from './types';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';

  const props = defineProps<Ui3nMobileMenuProps>();
  const emits = defineEmits<Ui3nMobileMenuEmits>();
  defineSlots<Ui3nMobileMenuSlots>();

  const inlineStyles = computed(() => {
    const numericWidth = !isNaN(Number(props.width));
    const widthStr = numericWidth ? `${props.width}px` : props.width || '240px';
    const blurStr = props.withBlur ? '2px' : '0';

    return {
      '--ui3n-menu-width-custom': widthStr,
      '--ui3n-menu-blur-custom': blurStr,
    };
  });

  function toggleMenu() {
    emits('update:modelValue', !props.modelValue);
  }
</script>

<template>
  <div
    :class="$style.ui3nMobileMenu"
    :style="inlineStyles"
  >
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
        :class="$style.menuWrapper"
      >
        <div
          :class="$style.overlay"
          @click="toggleMenu"
        />

        <div :class="$style.menuPanel">
          <div :class="$style.appMenu">
            <div :class="$style.appMenuHeader">
              <slot name="header" />
            </div>
            <div :class="$style.appMenuBody">
              <slot name="menuBody" />
            </div>
            <div :class="$style.appMenuFooter">
              <slot name="footer" />
            </div>
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
      </div>
    </transition>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nMobileMenu {
    --ui3n-menu-width-custom: 240px;

    display: inline-block;
    width: max-content;
  }

  .menuWrapper {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    z-index: 1050;
    pointer-events: auto;
  }

  .menuPanel {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-start;
    height: 100dvh;
    z-index: 2;
  }

  .appMenu {
    position: relative;
    top: 0;
    left: 0;
    width: var(--ui3n-menu-width-custom);
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: 100%;
    color: var(--color-text-block-primary-default);
    background-color: var(--color-bg-block-primary-default);
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 4px 0 16px var(--shadow-close);
    flex-shrink: 0;
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
    margin-top: 8px;
    margin-left: 8px;
    min-width: 48px !important;
    height: 48px;
    flex-shrink: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background-color: oklch(from var(--color-bg-block-primary-default) calc(l * 0.1) c h / 0.5);
    backdrop-filter: blur(v-bind(blurValue));
    z-index: 1;
    cursor: pointer;
  }
</style>

<style lang="scss">
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;

    div[class*='menuPanel'] {
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(calc(var(--ui3n-menu-width-custom) * -1));
    opacity: 0;

    div[class*='menuPanel'] {
      transform: translateX(-100%);
    }
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;

    div[class*='menuPanel'] {
      transform: translateX(0);
    }
  }
</style>
