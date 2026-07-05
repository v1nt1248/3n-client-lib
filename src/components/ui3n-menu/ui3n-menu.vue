<script lang="ts" setup>
  import { computed, nextTick, onUnmounted, ref, watch, useTemplateRef } from 'vue';
  import { autoUpdate, flip, useFloating, offset, shift } from '@floating-ui/vue';
  import { default as vClickOutside } from '../../directives/ui3n-click-outside';
  import { Nullable } from '@/types';
  import type { Ui3nMenuEmits, Ui3nMenuProps, Ui3nMenuSlots, Ui3nMenuExpose } from './types';

  const props = withDefaults(defineProps<Ui3nMenuProps>(), {
    lockScroll: false,
    positionStrategy: 'absolute',
    offsetX: 0,
    offsetY: 0,
    contentBorderRadius: 4,
    allowFlip: true,
    zIndex: 1000,
    closeOnClick: true,
    closeOnClickOutside: true,
    disabled: false,
  });
  const emits = defineEmits<Ui3nMenuEmits>();
  defineSlots<Ui3nMenuSlots>();

  const menuTriggerElement = useTemplateRef<HTMLDivElement>('menu-trigger-element');
  const menuContentElement = useTemplateRef<HTMLDivElement>('menu-content-element');
  const isShow = ref(false);

  const outerTriggerElement = ref<Nullable<HTMLElement>>(props.triggerElement || null);

  const usedTriggerElement = computed(() => outerTriggerElement.value || menuTriggerElement.value);

  const middleware = computed(() => {
    const list = [
      offset({
        mainAxis: props.offsetY,
        crossAxis: props.offsetX + 2,
      }),
    ];

    if (props.allowFlip) {
      list.push(
        flip({
          fallbackAxisSideDirection: 'end',
          fallbackPlacements: ['top-end', 'bottom-end'],
        }),
      );
    }

    list.push(shift());
    return list;
  });

  const { floatingStyles, isPositioned, update } = useFloating(usedTriggerElement, menuContentElement, {
    placement: 'bottom-start',
    strategy: props.positionStrategy,
    middleware,
    whileElementsMounted: props.positionAutoupdate || props.positionStrategy === 'fixed' ? autoUpdate : undefined,
  });

  const contentStylesComputed = computed(() => {
    let borderRadiusStr = '';
    if (typeof props.contentBorderRadius === 'number') {
      borderRadiusStr = `${props.contentBorderRadius}px`;
    } else if (Array.isArray(props.contentBorderRadius)) {
      const [tl, tr, br, bl] = props.contentBorderRadius;
      borderRadiusStr = `${tl}px ${tr}px ${br}px ${bl}px`;
    }

    return {
      ...floatingStyles.value,
      '--ui3n-menu-zIndex': String(props.zIndex),
      ...(borderRadiusStr && { '--ui3n-menu-border-radius': borderRadiusStr }),
      ...(props.contentStyles || {}),
    };
  });

  function preventScrollEvent(e: Event) {
    e.preventDefault();
  }

  function getVerticalScrollParent(element: HTMLElement | null): HTMLElement {
    if (!element) {
      return document.body;
    }

    let parent: HTMLElement | null = element.parentElement;

    while (parent && parent !== document.body && parent !== document.documentElement) {
      const style = window.getComputedStyle(parent);

      if (/(auto|scroll)/.test(style.overflowY || style.overflow)) {
        if (parent.scrollHeight > parent.clientHeight) {
          return parent;
        }
      }
      parent = parent.parentElement;
    }

    return document.body;
  }

  function lockScroll() {
    if (!props.lockScroll) {
      return;
    }

    const trigger = usedTriggerElement.value;
    const scrollParent = getVerticalScrollParent(trigger);

    if (scrollParent) {
      const currentLocks = Number(scrollParent.dataset.scrollLocksCount || '0');

      if (currentLocks === 0) {
        scrollParent.dataset.scrollLocksCount = '1';
        scrollParent.dataset.originalOverscroll = scrollParent.style.overscrollBehaviorY || '';
        scrollParent.style.overscrollBehaviorY = 'contain';

        if (scrollParent === document.body) {
          document.addEventListener('wheel', preventScrollEvent, { passive: false });
          document.addEventListener('touchmove', preventScrollEvent, { passive: false });
        } else {
          scrollParent.addEventListener('wheel', preventScrollEvent, { passive: false });
          scrollParent.addEventListener('touchmove', preventScrollEvent, { passive: false });
        }
      } else {
        scrollParent.dataset.scrollLocksCount = String(currentLocks + 1);
      }
    }
  }

  function unlockScroll() {
    const trigger = usedTriggerElement.value;
    const scrollParent = getVerticalScrollParent(trigger);

    if (!scrollParent) {
      return;
    }

    const currentLocks = Number(scrollParent.dataset.scrollLocksCount || '0');

    if (currentLocks > 0) {
      const newLocks = currentLocks - 1;

      if (newLocks === 0) {
        const originalOverscroll = scrollParent.dataset.originalOverscroll;

        if (originalOverscroll) {
          scrollParent.style.overscrollBehaviorY = originalOverscroll;
        } else {
          scrollParent.style.removeProperty('overscroll-behavior-y');
        }

        if (scrollParent === document.body) {
          document.removeEventListener('wheel', preventScrollEvent);
          document.removeEventListener('touchmove', preventScrollEvent);
        } else {
          scrollParent.removeEventListener('wheel', preventScrollEvent);
          scrollParent.removeEventListener('touchmove', preventScrollEvent);
        }

        delete scrollParent.dataset.scrollLocksCount;
        delete scrollParent.dataset.originalOverscroll;
      } else {
        scrollParent.dataset.scrollLocksCount = String(newLocks);
      }
    }
  }

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

  function onClickOutside(event: MouseEvent) {
    if (usedTriggerElement.value?.contains(event.target as Node)) {
      return;
    }

    emits('click-outside');
    if (props.closeOnClickOutside) {
      isShow.value = false;
      emits('close');
      emits('update:modelValue', isShow.value);
    }
  }

  watch(
    () => isShow.value,
    val => {
      if (val) {
        lockScroll();
      } else {
        unlockScroll();
      }
    },
  );

  watch(
    () => props.modelValue,
    val => {
      if (val !== undefined && isShow.value !== val) {
        isShow.value = val;
        val ? emits('open') : emits('close');
      }
    },
    { immediate: true },
  );

  watch(
    () => props.triggerElement,
    val => {
      if (val) {
        outerTriggerElement.value = val;
        update();
      }
    },
  );

  watch([() => props.offsetX, () => props.offsetY], ([offsetX, offsetY], [oldOffsetX, oldOffsetY]) => {
    if (offsetX !== oldOffsetX || offsetY !== oldOffsetY) {
      update();
    }
  });

  onUnmounted(() => {
    unlockScroll();
  });

  defineExpose<Ui3nMenuExpose>({
    isPositioned,
    update,
  });
</script>

<template>
  <div
    ref="menu-element"
    :id="id"
    :class="$style.ui3nMenu"
  >
    <div
      ref="menu-trigger-element"
      :class="[$style.ui3nMenuTrigger, disabled && $style.ui3nMenuTriggerDisabled]"
      @click.stop="toggleMenu"
    >
      <slot />
    </div>

    <div
      v-if="isShow"
      ref="menu-content-element"
      v-click-outside="onClickOutside"
      :style="contentStylesComputed"
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

    position: relative;
    width: max-content;
    display: inline-block;
    overflow: visible;
  }

  .ui3nMenuTrigger {
    position: relative;
    width: 100%;

    &.ui3nMenuTriggerDisabled {
      pointer-events: none;
      cursor: default;
    }
  }

  .ui3nMenuContent {
    position: absolute;
    border-radius: var(--ui3n-menu-content-border-radius);
    background-color: var(--ui3n-menu-content-bg);
    z-index: var(--ui3n-menu-zIndex, 1000);
    overflow: hidden;
    @include mixins.dropShadow();
  }
</style>
