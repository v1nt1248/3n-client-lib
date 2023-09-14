<script lang="ts" setup generic="T extends { id?: string }">
  import { computed, onMounted, ref } from 'vue'

  const props = withDefaults(defineProps<{
    items: T[];
    childHeight: number;
    renderAhread?: number;
  }>(), {
    renderAhread: 20
  })

  const scrollTop = ref(0)
  const wrapElement = ref<HTMLDivElement | null>(null)
  const wrapElementHeight = computed(() => wrapElement.value
    ? wrapElement.value.clientHeight
    : 0
  )
  const totalHeight = computed(() => props.items.length * props.childHeight)
  const startNode = computed(() => {
    const val = Math.floor(scrollTop.value / props.childHeight) - props.renderAhread
    return Math.max(0, val)
  })
  const visibleNodeCount = computed(() => {
    const val = Math.ceil(wrapElementHeight.value / props.childHeight) +2 * props.renderAhread
    return Math.min(props.items.length - startNode.value, val)
  })
  const offsetY = computed(() => startNode.value * props.childHeight)
  const visibleChildren = computed(() => props.items.slice(startNode.value, startNode.value + visibleNodeCount.value))

  const onScroll = (event: Event) => {
    requestAnimationFrame(() => scrollTop.value = (event.target as HTMLDivElement).scrollTop)
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
          v-for="item in visibleChildren"
          :key="item.id"
        >
          <slot
            name="item"
            :item="item"
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
  }
</style>
