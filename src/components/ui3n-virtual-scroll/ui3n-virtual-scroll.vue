<script lang="ts" setup generic="T extends { id?: string }">
  import { computed, ref } from 'vue';
  import Ui3nScrollbarVertical from '@/components/ui3n-scrollbar-vertical/ui3n-scrollbar-vertical.vue';
  import type { Ui3nVirtualScrollProps, Ui3nVirtualScrollSlots } from './types';

  const props = withDefaults(defineProps<Ui3nVirtualScrollProps<T>>(), {
    renderAhead: 20,
  });
  defineSlots<Ui3nVirtualScrollSlots<T>>();

  const scrollTop = ref(0);
  const scrollbarComponentRef = ref<InstanceType<typeof Ui3nScrollbarVertical> | null>(null);

  const itemCount = computed(() => props.items.length);
  const totalHeight = computed(() => itemCount.value * props.minChildHeight);

  const wrapElementHeight = computed(() => {
    const el = scrollbarComponentRef.value?.getContainer();
    return el ? el.clientHeight : 0;
  });

  const startNode = computed(() => {
    const val = Math.floor(scrollTop.value / props.minChildHeight) - props.renderAhead;
    return Math.max(0, val);
  });

  const visibleNodeCount = computed(() => {
    return Math.ceil(wrapElementHeight.value / props.minChildHeight) + 2 * props.renderAhead;
  });

  const offsetY = computed(() => startNode.value * props.minChildHeight);
  const visibleChildren = computed(() =>
    props.items.slice(startNode.value, startNode.value + visibleNodeCount.value),
  );

  const onScroll = (event: Event) => {
    scrollTop.value = (event.target as HTMLDivElement).scrollTop;
  };
</script>

<template>
  <ui3n-scrollbar-vertical
    ref="scrollbarComponentRef"
    :class="$style.ui3nVirtualScroll"
    @scroll="onScroll"
  >
    <div
      :class="$style.viewport"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        :class="$style.content"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="(item, index) in visibleChildren"
          :key="item.id"
          :data-sid="item.id ?? index"
          :class="$style.item"
        >
          <slot
            name="item"
            :value="item"
            :index="startNode + index"
          />
        </div>
      </div>
    </div>
  </ui3n-scrollbar-vertical>
</template>

<style lang="scss" module>
  .ui3nVirtualScroll {
    --ui3n-virtual-scroll-item-min-height: 16px;

    background-color: var(--color-bg-block-primary-default);
  }

  .viewport {
    position: relative;
    overflow: hidden;
    will-change: transform;
  }

  .content {
    will-change: transform;
  }

  .item {
    position: relative;
    min-height: var(--ui3n-virtual-scroll-item-min-height);
  }
</style>
