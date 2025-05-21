<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { autoUpdate, flip, useFloating, offset, shift } from '@floating-ui/vue';
  import { default as vClickOutside } from '../../directives/ui3n-click-outside';
  import type { Ui3nMenuEmits, Ui3nMenuProps, Ui3nMenuSlots } from './types';
  import { Nullable } from '@/components/types';

  const props = withDefaults(defineProps<Ui3nMenuProps>(), {
    positionStrategy: 'absolute',
    offsetX: 0,
    offsetY: 0,
    contentBorderRadius: 4,
    zIndex: 1000,
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

  const outerTriggerElement = ref<Nullable<HTMLElement>>(props.triggerElement || null);

  const usedTriggerElement = computed(() => outerTriggerElement.value || menuTriggerElement.value);

  const contentBorderRadiusCss = computed(() => {
    if (typeof props.contentBorderRadius === 'number') {
      return `${props.contentBorderRadius}px`;
    }

    const [tl, tr, br, bl] = props.contentBorderRadius;
    return `${tl}px ${tr}px ${br}px ${bl}px`;
  });
  const zIndexCss = computed(() => props.zIndex);

  const {
    floatingStyles,
    isPositioned,
  } = useFloating(
    usedTriggerElement,
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
    whileElementsMounted: props.positionAutoupdate || props.positionStrategy === 'fixed' ? autoUpdate : undefined,
  });

  function toggleMenu() {
    if (props.disabled) {
      return;
    }

    isShow.value = !isShow.value;
    isShow.value ? emits('open') : emits('close');
    emits('update:modelValue', isShow.value);
  }

  function onContentClick() {
    isShow.value = false;
    emits('close');
    emits('update:modelValue', isShow.value);
  }

  function onClickOutside() {
    emits('click-outside');
    if (props.closeOnClickOutside) {
      isShow.value = false;
      emits('close');
      emits('update:modelValue', isShow.value);
    }
  }

  watch(isPositioned, val => {
    val ? emits('opened') : emits('closed');
  });

  watch(
    () => props.modelValue,
    val => {
      if (isShow.value !== val) {
        isShow.value = val;
      }
    },
    { immediate: true },
  );

  watch(
    () => props.triggerElement,
    val => {
      if (val) {
        outerTriggerElement.value = val;
      }
    },
  )
</script>

<template>
  <div
    ref="menuElement"
    :class="$style.ui3nMenu"
  >
    <div
      ref="menuTriggerElement"
      :class="[$style.ui3nMenuTrigger, disabled && $style.ui3nMenuTriggerDisabled]"
      @click.stop="toggleMenu"
    >
      <slot />
    </div>

    <div
      v-if="isShow"
      ref="menuContentElement"
      v-click-outside="onClickOutside"
      :style="floatingStyles"
      :class="$style.ui3nMenuContent"
      v-on="closeOnClick ? { click: onContentClick } : {}"
    >
      <slot name="menu" />
    </div>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nMenu {
    --ui3n-menu-content-bg: var(--color-bg-control-secondary-default);
    --ui3n-menu-content-border-raduis: v-bind(contentBorderRadiusCss);

    position: relative;
    max-width: max-content;
    overflow: visible;
  }

  .ui3nMenuTrigger {
    position: relative;
    max-width: max-content;

    &.ui3nMenuTriggerDisabled {
      pointer-events: none;
      cursor: default;
    }
  }

  .ui3nMenuContent {
    position: absolute;
    border-radius: var(--ui3n-menu-content-border-raduis);
    background-color: var(--ui3n-menu-content-bg);
    z-index: v-bind(zIndexCss);
    overflow: hidden;
    @include mixins.dropShadow();
  }
</style>
