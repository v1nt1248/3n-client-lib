<script lang="ts" setup generic="T extends { id?: string }">
  import type { Ui3nListEmits, Ui3nListProps, Ui3nListSlots } from './types';

  withDefaults(defineProps<Ui3nListProps<T>>(), {
    title: '',
    sticky: true,
    disabled: false,
  });

  const emits = defineEmits<Ui3nListEmits<T>>();
  defineSlots<Ui3nListSlots<T>>();
</script>

<template>
  <div
    ref="listElement"
    :class="$style.ui3nList"
  >
    <div :class="[$style.ui3nListTitle, sticky && $style.ui3nListTitleSticky]">
      <slot name="title">
        <div
          v-if="title"
          :class="$style.ui3nListTitleContent"
        >
          {{ title }}
        </div>
      </slot>
    </div>

    <div :class="$style.ui3nListContent">
      <div
        v-for="(item, index) in items"
        :key="item.id ?? index"
        :class="$style.item"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
        >
          <div
            :class="[$style.ui3nListItemContent, disabled && $style.ui3nListItemContentDisabled]"
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
  .ui3nList {
    --ui3n-list-item-height: 28px;
    --ui3n-list-bg-color: transparent;

    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--ui3n-list-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .ui3nListTitle {
    position: relative;
    top: 0;
    z-index: 1;
  }

  .ui3nListTitleSticky {
    position: sticky;
  }

  .ui3nListContent {
    position: relative;
    flex-grow: 1;
  }

  .ui3nListTitleContent,
  .ui3nListItem {
    position: relative;
    width: 100%;
    min-height: var(--ui3n-list-item-height);
    padding: 4px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .ui3nListTitleContent {
    z-index: 1;
    font-size: 16px;
    font-weight: 600;
    background-color: var(--ui3n-list-bg-color);
  }

  .ui3nListItemContent {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }

  .ui3nListItemContentDisabled {
    pointer-events: none;
    cursor: default;
  }
</style>
