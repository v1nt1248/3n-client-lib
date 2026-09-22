<script lang="ts" setup>
  import { ref } from 'vue';
  import Ui3nTooltip from './ui3n-tooltip.vue';
  import type { TooltipInstance, Ui3nTooltipShowOptions } from '../../plugins/tooltips/types';

  const items = ref<TooltipInstance[]>([]);

  function add(item: TooltipInstance) {
    items.value.push(item);
  }

  function remove(id: string) {
    items.value = items.value.filter(item => item.id !== id);
  }

  function removeByKind(kind: 'show' | 'attach') {
    items.value = items.value.filter(item => item.kind !== kind);
  }

  function removeByTarget(target: HTMLElement) {
    items.value = items.value.filter(item => !(item.kind === 'attach' && item.target === target));
  }

  function update(id: string, patch: Partial<Ui3nTooltipShowOptions>) {
    const item = items.value.find(entry => entry.id === id);
    if (item) {
      Object.assign(item, patch);
    }
  }

  function clearAll() {
    items.value = [];
  }

  function tooltipBind(item: TooltipInstance) {
    return {
      id: item.id,
      content: item.content,
      maxContentWidth: item.maxContentWidth,
      color: item.color,
      textColor: item.textColor,
      placement: item.placement,
      positionStrategy: item.positionStrategy ?? 'fixed',
      offsetX: item.offsetX,
      offsetY: item.offsetY,
      trigger: item.trigger,
      modelValue: item.modelValue,
      disabled: item.disabled,
      triggerElement: item.target,
    };
  }

  defineExpose({ add, remove, removeByKind, removeByTarget, update, clearAll });
</script>

<template>
  <div
    id="ui3n-tooltips-container"
    data-ui3n="tooltip-container"
    :class="$style.container"
  >
    <ui3n-tooltip
      v-for="item in items"
      :key="item.id"
      v-bind="tooltipBind(item)"
    />
  </div>
</template>

<style lang="scss" module>
  .container {
    position: absolute;
    width: 0;
    height: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 2000;
  }
</style>
