<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch, useCssModule } from 'vue';
  import type { Ui3nTabsEmits, Ui3nTabsProps, Ui3nTabsSlots } from './types';

  const props = withDefaults(defineProps<Ui3nTabsProps>(), {
    modelValue: 0,
    itemDirection: 'horizontal',
    activeColor: 'var(--color-text-control-accent-default)',
    inactiveColor: 'var(--color-text-control-primary-default)',
    indicatorColor: 'var(--color-border-control-accent-default)',
    indicatorSize: 2,
    indicatorPosition: 'normal',
  });
  const emits = defineEmits<Ui3nTabsEmits>();
  defineSlots<Ui3nTabsSlots>();

  const $style = useCssModule();

  const tabs = ref<HTMLDivElement | null>(null);
  const activeIndex = ref(props.modelValue);

  const tabsStyle = computed(() => ({
    '--ui3n-tabs-active-color': props.activeColor,
    '--ui3n-tabs-inactive-color': props.inactiveColor,
    '--ui3n-tabs-indicator-color': props.indicatorColor,
    '--ui3n-tabs-indicator-size': `${props.indicatorSize}px`,
    '--ui3n-tabs-indicator-position': props.indicatorPosition === 'reverse' ? '100%' : '0',
  }));

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
  @use '../../assets/styles/mixins' as mixins;

  .ui3nTabs {
    --ui3n-tabs-height: 48px;

    position: relative;
    height: var(--ui3n-tabs-height);
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: transparent;
  }

  .item {
    cursor: pointer;
    position: relative;
    user-select: none;
    color: var(--ui3n-tabs-inactive-color);
    @include mixins.ripple(var(--color-bg-control-secondary-default));

    &:hover {
      background-color: var(--color-bg-control-secondary-default);
    }

    &::after {
      position: absolute;
      content: '';
      left: 0;
      width: 100%;
      bottom: var(--ui3n-tabs-indicator-position);
      height: var(--ui3n-tabs-indicator-size);
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
    color: var(--ui3n-tabs-active-color);

    &::after {
      background-color: var(--ui3n-tabs-indicator-color);
      transition: background-color 250ms ease-in-out;
    }
  }

  .vertical {
    height: auto;
    flex-direction: column;

    .item {
      &::after {
        left: var(--ui3n-tabs-indicator-position);
        width: var(--ui3n-tabs-indicator-size);
        bottom: 0;
        height: 100%;
      }
    }
  }
</style>
