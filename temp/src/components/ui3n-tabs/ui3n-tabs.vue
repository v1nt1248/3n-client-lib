<script lang="ts" setup>
import { computed, onMounted, ref, watch, useCssModule } from 'vue';
import type { Ui3nTabsEmits, Ui3nTabsProps, Ui3nTabsSlots } from './types';

const props = withDefaults(
  defineProps<Ui3nTabsProps>(),
  {
    modelValue: 0,
    itemDirection: 'horizontal',
    activeColor: 'var(--color-text-control-accent-default)',
    inactiveColor: 'var(--color-text-control-primary-default)',
    indicatorColor: 'var(--color-border-control-accent-default)',
    indicatorSize: 2,
    indicatorPosition: 'normal',
  },
);
const emits = defineEmits<Ui3nTabsEmits>();
defineSlots<Ui3nTabsSlots>();

const $style = useCssModule();

const tabs = ref<HTMLDivElement | null>(null);
const children = ref<HTMLCollection | null>(null);

const activeColorValue = computed(() => props.activeColor);
const inactiveColorValue = computed(() => props.inactiveColor);
const indicatorColorValue = computed(() => props.indicatorColor);
const indicatorSizeValue = computed(() => `${props.indicatorSize}px`);
const indicatorPositionValue = computed(() => props.indicatorPosition === 'reverse' ? '100%' : '0');

watch(
  () => props.modelValue,
  newValue => setTabsActivity(newValue),
);

onMounted(() => {
  if (tabs.value) {
    children.value = tabs.value.children;
    initialTabsActivity();
    setTabsActivity(props.modelValue);
  }
});

function initialTabsActivity(): void {
  if (children.value) {
    for (let i = 0; i < children.value.length; i++) {
      // @ts-ignore
      children.value[i].dataset.index = `${i}`;
      children.value[i].classList.add($style.item);
    }
  }
}

function setTabsActivity(index: number): void {
  if (children.value) {
    for (let i = 0; i < children.value.length; i++) {
      if (i === index) {
        children.value[i].classList.add($style.active);
      } else {
        children.value[i].classList.remove($style.active);
      }
    }
  }
}

const onClick = (ev: MouseEvent) => {
  // @ts-ignore
  const { index } = ev.target.dataset;
  if (index) {
    emits('update:modelValue', Number(index));
  }
};
</script>

<template>
  <div
    ref="tabs"
    :class="[$style.ui3nTabs, itemDirection === 'vertical' && $style.vertical]"
    v-on="children ? { click: onClick } : {}"
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
  color: v-bind(inactiveColorValue);
  @include mixins.ripple(var(--color-bg-control-secondary-default));

  &:hover {
    background-color: var(--color-bg-control-secondary-default);
  }

  &::after {
    position: absolute;
    content: '';
    left: 0;
    width: 100%;
    bottom: v-bind(indicatorPositionValue);
    height: v-bind(indicatorSizeValue);
    background-color: transparent;
    transition: background-color 250ms ease-in-out;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none
  }
}

.active {
  color: v-bind(activeColorValue);

  &::after {
    background-color: v-bind(indicatorColorValue);
    transition: background-color 250ms ease-in-out;
  }
}

.vertical {
  height: auto;
  flex-direction: column;

  .item {
    &::after {
      left: v-bind(indicatorPositionValue);
      width: v-bind(indicatorSizeValue);
      bottom: 0;
      height: 100%;
    }
  }
}
</style>
