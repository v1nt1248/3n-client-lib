<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, onMounted, ref } from 'vue';
import { default as vClickOutside } from '../directives/ui3n-click-outside';

export interface Ui3nMenuProps {
  offsetX?: number;
  offsetY?: number;
  closeOnClick?: boolean;
  closeOnClickOutside?: boolean;
  disabled?: boolean;
}

export interface Ui3nMenuEmits {
  (ev: 'open'): void;
  (ev: 'opened'): void;
  (ev: 'close'): void;
  (ev: 'closed'): void;
  (ev: 'click-outside'): void;
}

export interface Ui3nMenuSlots {
  default: () => any;
  menu?: () => any;
}

const props = withDefaults(defineProps<Ui3nMenuProps>(), {
  offsetX: 0,
  offsetY: 0,
  closeOnClick: true,
  closeOnClickOutside: true,
  disabled: false,
});
const emits = defineEmits<Ui3nMenuEmits>();
defineSlots<Ui3nMenuSlots>();

const menuElement = ref<HTMLDivElement | null>(null);
const menuTriggerElement = ref<HTMLDivElement | null>(null);
const isShow = ref(false);
const defaultAnimationDuration = 400;
const menuContentStyle = computed(() => {
  if (!props.offsetX && !props.offsetY) {
    return {};
  }
  return {
    ...(props.offsetX && { left: `${props.offsetX}px` }),
    ...(props.offsetY && { top: `${menuTriggerElement.value!.clientHeight + props.offsetY}px` }),
  };
});

onMounted(() => {
  menuElement.value!.style.setProperty('--ui3n-menu-animation-duration', `${defaultAnimationDuration}ms`);
});

function toggleMenu() {
  isShow.value = !isShow.value;
}

function onContentClick() {
  isShow.value = false;
}

function onClickOutside() {
  emits('click-outside');
  if (props.closeOnClickOutside) {
    isShow.value = false;
  }
}
</script>

<template>
  <div ref="menuElement" :class="$style.menu">
    <div
      ref="menuTriggerElement"
      :class="$style.trigger"
      @click.stop="toggleMenu"
    >
      <slot />
    </div>

    <transition
      name="menu"
      :duration="defaultAnimationDuration"
      @before-enter="emits('open')"
      @after-enter="emits('opened')"
      @before-leave="emits('close')"
      @after-leave="emits('closed')"
    >
      <div
        v-if="isShow"
        v-click-outside="onClickOutside"
        :style="menuContentStyle"
        :class="$style.content"
        v-on="props.closeOnClick ? { click: onContentClick } : {}"
      >
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" module>
@import "../assets/styles/mixins";

.menu {
  --ui3n-menu-animation-duration: 400ms;
  --ui3n-menu-content-bg: var(--color-bg-control-secondary-default);

  position: relative;
  overflow: visible;
}

.trigger {
  position: relative;
}

.content {
  position: absolute;
  border-radius: 4px;
  background-color: var(--ui3n-menu-content-bg);
  z-index: 1000;
  @include elevation(3);
}
</style>

<style lang="scss" scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--ui3n-menu-animation-duration);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
