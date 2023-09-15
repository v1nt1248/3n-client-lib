<script lang="ts" setup generic="T extends { id?: string }">
  /* eslint-disable @typescript-eslint/no-explicit-any */ 
  import { computed, onMounted, ref } from 'vue'

  export interface Ui3nVirtualScrollProps<T> {
    items: T[];
    minChildHeight: number;
    renderAhread?: number;
  }

  export interface Ui3nVirtualScrollSlots<T> {
    item: (item: T, index: number) => any;
  }

  const props = withDefaults(defineProps<Ui3nVirtualScrollProps<T>>(), {
    renderAhread: 20,
  })
  defineSlots<Ui3nVirtualScrollSlots<T>>()

  const scrollTop = ref(0)
  const animationFrame = ref<number | undefined>()
  const wrapElement = ref<HTMLDivElement | null>(null)
  const wrapElementHeight = computed(() => wrapElement.value
    ? wrapElement.value.clientHeight
    : 0
  )
  const itemCount = computed(() => props.items.length)
  const totalHeight = computed(() => itemCount.value * props.minChildHeight)
  const startNode = computed(() => {
    const val = Math.floor(scrollTop.value / props.minChildHeight) - props.renderAhread
    return Math.max(0, val)
  })
  const visibleNodeCount = computed(() => {
    const val = Math.ceil(wrapElementHeight.value / props.minChildHeight) +2 * props.renderAhread
    return Math.min(itemCount.value - startNode.value, val)
  })
  const offsetY = computed(() => startNode.value * props.minChildHeight)
  const visibleChildren = computed(() => props.items.slice(startNode.value, startNode.value + visibleNodeCount.value))

  const onScroll = (event: Event) => {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
    }
    
    animationFrame.value = requestAnimationFrame(() => scrollTop.value = (event.target as HTMLDivElement).scrollTop)
  }

  onMounted(() => {
    if (wrapElement.value) {
      scrollTop.value = wrapElement.value.scrollTop
    }
  })
</script>

<template>
  <div
    ref="wrapElement"
    class="ui3n-virtual-scroll"
    @scroll="onScroll"
  >
    <div
      class="ui3n-virtual-scroll__viewport"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="ui3n-virtual-scroll__content"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="(item, index) in visibleChildren"
          :key="item.id"
          :data-sid="item.id ?? index"
          class="ui3n-virtual-scroll__item"
        >
          <slot
            name="item"
            :item="item"
            :index="startNode + index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-virtual-scroll {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &__viewport {
      position: relative;
      overflow: hidden;
      will-change: transform;
    }

    &__content {
      will-change: transform;
    }

    &__item {
      position: relative;
      min-height: 16px;
    }
  }
</style>
