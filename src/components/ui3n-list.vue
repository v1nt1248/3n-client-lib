<script lang="ts" setup generic="T extends { id?: string }">
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Ui3nListProps<T> {
  title?: string;
  sticky?: boolean;
  items: T[];
  disabled?: boolean;
}

export interface Ui3nListEmits<T> {
  (ev: 'select', value: { value: T, index: number }): void;
}

export interface Ui3nListSlots<T> {
  title?: () => any;
  item?: ({ item, index }: { item: T, index: number }) => any;
}

const props = withDefaults(defineProps<Ui3nListProps<T>>(), {
  title: '',
  sticky: true,
  disabled: false,
});

const emits = defineEmits<Ui3nListEmits<T>>();
defineSlots<Ui3nListSlots<T>>();
</script>

<template>
  <div ref="listElement" :class="$style.list">
    <div :class="[$style.title, sticky && $style.stickyTitle]">
      <slot name="title">
        <div v-if="props.title" :class="$style.titleContent">
          {{ title }}
        </div>
      </slot>
    </div>

    <div :class="$style.content">
      <div
        v-for="(item, index) in items"
        :key="item.id ?? index"
        :class="$style.item"
      >
        <slot name="item" :item="item" :index="index">
          <div
            :class="[$style.itemContent, disabled && $style.itemContentDisabled]"
            @click.stop="emits('select', { value: item, index })"
          >
            {{ item }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.list {
  --ui3n-list-item-height: 28px;
  --ui3n-list-bg-color: transparent;

  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.title {
  position: relative;
  top: 0;
  z-index: 1;
}

.stickyTitle {
  position: sticky;
}

.content {
  position: relative;
  flex-grow: 1;
}

.titleContent,
.item {
  position: relative;
  width: 100%;
  min-height: var(--ui3n-list-item-height);
  padding: 4px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.titleContent {
  z-index: 1;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--ui3n-list-bg-color);
}

.itemContent {
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}

.itemContentDisabled {
  pointer-events: none;
  cursor: default;
}
</style>
