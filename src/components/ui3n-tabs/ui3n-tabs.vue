<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch, useCssModule } from 'vue';
  import type { Ui3nTabsEmits, Ui3nTabsProps, Ui3nTabsSlots } from './types';

  /* colours and the indicator size keep their defaults in CSS */
  const props = withDefaults(defineProps<Ui3nTabsProps>(), {
    modelValue: 0,
    itemDirection: 'horizontal',
    indicatorPosition: 'normal',
  });
  const emits = defineEmits<Ui3nTabsEmits>();
  defineSlots<Ui3nTabsSlots>();

  const $style = useCssModule();

  const tabs = ref<HTMLDivElement | null>(null);
  const activeIndex = ref(props.modelValue);

  const tabsStyle = computed(() => {
    const styles: Record<string, string> = {
      '--ui3n-tabs-indicator-position': props.indicatorPosition === 'reverse' ? '100%' : '0',
    };

    if (props.activeColor) {
      styles['--ui3n-tabs-active-color'] = props.activeColor;
    }

    if (props.inactiveColor) {
      styles['--ui3n-tabs-inactive-color'] = props.inactiveColor;
    }

    if (props.indicatorColor) {
      styles['--ui3n-tabs-indicator-color'] = props.indicatorColor;
    }

    if (props.indicatorSize !== undefined) {
      styles['--ui3n-tabs-indicator-size'] = `${props.indicatorSize}px`;
    }

    return styles;
  });

  function updateChildrenAttributes(): void {
    if (tabs.value?.children) {
      const children = tabs.value.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;

        child.dataset.index = `${i}`;

        if (!child.classList.contains($style.item)) {
          child.classList.add($style.item);
        }

        if (i === activeIndex.value) {
          child.classList.add($style.active);
        } else {
          child.classList.remove($style.active);
        }
      }
    }
  }

  function onClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement;

    const itemEl = target.closest('[data-index]') as HTMLElement | null;

    if (itemEl && itemEl.dataset.index) {
      if (itemEl.hasAttribute('disabled') || itemEl.classList.contains($style.disabled)) {
        return;
      }

      const index = Number(itemEl.dataset.index);

      activeIndex.value = index;
      updateChildrenAttributes();

      emits('update:modelValue', index);
    }
  }

  watch(
    () => props.modelValue,
    newVal => {
      if (newVal !== activeIndex.value) {
        activeIndex.value = newVal;
        nextTick(() => {
          updateChildrenAttributes();
        });
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    updateChildrenAttributes();
  });
</script>

<template>
  <div
    ref="tabs"
    :id="id"
    :style="tabsStyle"
    :class="[$style.ui3nTabs, itemDirection === 'vertical' && $style.vertical]"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
  .ui3nTabs {
    --_tabs-height: var(--ui3n-tabs-height, 48px);
    --_tabs-active-color: var(--ui3n-tabs-active-color, var(--color-text-control-accent-default));
    --_tabs-inactive-color: var(--ui3n-tabs-inactive-color, var(--color-text-control-primary-default));
    --_tabs-indicator-color: var(--ui3n-tabs-indicator-color, var(--color-border-control-accent-default));
    --_tabs-indicator-size: var(--ui3n-tabs-indicator-size, 2px);

    position: relative;
    height: var(--_tabs-height);
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: transparent;
  }

  .item {
    cursor: pointer;
    position: relative;
    user-select: none;
    color: var(--_tabs-inactive-color);

    &:hover {
      background-color: var(--color-bg-control-secondary-default);
    }

    &::after {
      position: absolute;
      content: '';
      left: 0;
      width: 100%;
      bottom: var(--ui3n-tabs-indicator-position, 0);
      height: var(--_tabs-indicator-size);
      background-color: transparent;
      transition: background-color 250ms ease-in-out;
    }

    &[disabled] {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
  }

  .active {
    color: var(--_tabs-active-color);

    &::after {
      background-color: var(--_tabs-indicator-color);
      transition: background-color 250ms ease-in-out;
    }
  }

  .vertical {
    height: auto;
    flex-direction: column;

    .item {
      &::after {
        left: var(--ui3n-tabs-indicator-position, 0);
        width: var(--_tabs-indicator-size);
        bottom: 0;
        height: 100%;
      }
    }
  }
</style>
