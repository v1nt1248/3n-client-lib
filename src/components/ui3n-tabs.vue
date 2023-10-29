<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'

  export interface Ui3nTabsProps {
    modelValue: number;
    activeColor?: string;
    inactiveColor?: string;
    indicatorColor?: string;
    indicatorSize?: number | string;
    indicatorPosition?: 'normal' | 'reverse';
  }

  export interface Ui3nTabsEmits {
    (ev: 'update:modelValue', val: number): void;
  }

  export interface Ui3nTabsSlots {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: () => any;
  }

  const props = withDefaults(
    defineProps<Ui3nTabsProps>(),
    {
      modelValue: 0,
      activeColor: 'var(--blue-main, #0090ec)',
      inactiveColor: 'var(--black-90, #212121)',
      indicatorColor: 'var(--blue-main, #0090ec)',
      indicatorSize: 2,
      indicatorPosition: 'normal',
    },
  )
  const emits = defineEmits<Ui3nTabsEmits>()


  const tabs = ref<HTMLDivElement | null>(null)
  const children = ref<HTMLCollection | null>(null)

  const activeColor = computed(() => props.activeColor)
  const inactiveColor = computed(() => props.inactiveColor)
  const indicatorColor = computed(() => props.indicatorColor)
  const indicatorSize = computed(() => `${props.indicatorSize}px`)
  const indicatorPosition = computed(() => props.indicatorPosition === 'normal' ? '0' : '100%')

  onMounted(() => {
    if (tabs.value) {
      children.value = tabs.value.children
      if (children.value) {
        for (let i = 0; i < children.value.length; i++) {
          children.value[i].classList.add('ui3n-tabs__item')
          // @ts-ignore
          children.value[i].dataset.index = `${i}`
          if (i === props.modelValue) {
            children.value[i].classList.add('ui3n-tabs__item--active')
          }
        }
      }
    }
  })

  const onClick = (ev: MouseEvent) => {
    // @ts-ignore
    const { index } = ev.target.dataset
    if (index) {
      children.value![props.modelValue].classList.remove('ui3n-tabs__item--active')
      children.value![Number(index)].classList.add('ui3n-tabs__item--active')
      emits('update:modelValue', Number(index))
    }
  }
</script>

<template>
  <div
    ref="tabs"
    class="ui3n-tabs"
    v-on="children ? { click: onClick } : {}"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-tabs {
    --ui3n-tabs-height: 48px;

    position: relative;
    height: var(--ui3n-tabs-height);
    display: flex;
    justify-content: center;
    align-items: stretch;

    :deep(.ui3n-tabs__item) {
      cursor: pointer;

      &.ui3n-tabs__item {
        position: relative;
        user-select: none;
        color: v-bind('inactiveColor');

        &:hover {
          background-color: var(--blue-main-20, #d8edfd);
        }

        &::after {
          position: absolute;
          content: '';
          left: 0;
          bottom: v-bind('indicatorPosition');
          width: 100%;
          height: v-bind('indicatorSize');
          background-color: transparent;
          transition: background-color 250ms ease-in-out;
        }

        &[disabled] {
          opacity: 0.5;
          cursor: default;
          pointer-events: none
        }

        @include ripple(#d8edfd);
      }

      &.ui3n-tabs__item--active {
        color: v-bind('activeColor');

        &::after {
          background-color: v-bind('indicatorColor');
          transition: background-color 250ms ease-in-out;
        }
      }
    }
  }
</style>
