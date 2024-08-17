<script lang="ts" setup>
import { ref, watch } from 'vue';
import { autoUpdate, flip, useFloating, offset, shift } from '@floating-ui/vue';
import { default as vClickOutside } from '../../directives/ui3n-click-outside';
import type { Ui3nMenuEmits, Ui3nMenuProps, Ui3nMenuSlots } from './types';

const props = withDefaults(defineProps<Ui3nMenuProps>(), {
  positionStrategy: 'absolute',
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
const menuContentElement = ref<HTMLDivElement | null>(null);
const isShow = ref(false);

const { floatingStyles, isPositioned } = useFloating(
  menuTriggerElement,
  menuContentElement,
  {
    placement: 'bottom-start',
    strategy: props.positionStrategy,
    middleware: [
      offset({
        mainAxis: props.offsetY,
        crossAxis: props.offsetX + 2,
      }),
      flip({
        fallbackAxisSideDirection: 'end',
        flipAlignment: false,
        fallbackPlacements: ['bottom-end'],
      }),
      shift(),
    ],
    whileElementsMounted: props.positionStrategy === 'fixed' ? autoUpdate : undefined,
  },
);

function toggleMenu() {
  isShow.value = !isShow.value;
  isShow.value ? emits('open') : emits('close');
}

function onContentClick() {
  isShow.value = false;
  emits('close');
}

function onClickOutside() {
  emits('click-outside');
  if (props.closeOnClickOutside) {
    isShow.value = false;
    emits('close');
  }
}

watch(
  isPositioned,
  (val) => {
    val ? emits('opened') : emits('closed');
  },
);
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

    <div
      v-if="isShow"
      ref="menuContentElement"
      v-click-outside="onClickOutside"
      :style="floatingStyles"
      :class="$style.content"
      v-on="props.closeOnClick ? { click: onContentClick } : {}"
    >
      <slot name="menu" />
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins";

.menu {
  --ui3n-menu-content-bg: var(--color-bg-control-secondary-default);

  position: relative;
  max-width: max-content;
  overflow: visible;
}

.trigger {
  position: relative;
  max-width: max-content;
}

.content {
  position: absolute;
  border-radius: 4px;
  background-color: var(--ui3n-menu-content-bg);
  z-index: 1000;
  @include elevation(3);
}
</style>
