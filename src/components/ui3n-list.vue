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
  })


  const emits = defineEmits<Ui3nListEmits<T>>()
  defineSlots<Ui3nListSlots<T>>()
</script>

<template>
  <div
    ref="listElement"
    class="ui3n-list"
  >
    <div
      :class="[
        'ui3n-list__title',
        { 'ui3n-list__title--sticky': props.sticky },
      ]"
    >
      <slot name="title">
        <div
          v-if="props.title"
          class="ui3n-list__title-content"
        >
          {{ props.title }}
        </div>
      </slot>
    </div>

    <div class="ui3n-list__content">
      <div
        v-for="(item, index) in props.items"
        :key="item.id ?? index"
        class="ui3n-list__item"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
        >
          <div
            :class="[
              'ui3n-list__item-content',
              { 'ui3n-list__item-content--disables': props.disabled },
            ]"
            @click.stop="emits('select', { value: item, index })"
          >
            {{ item }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-list {
    --ui3n-list-item-height: 28px;
    --ui3n-list-bg-color: var(--system-white, #fff);

    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--ui3n-list-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    &__title {
      position: relative;
      top: 0;
      z-index: 1;

      &--sticky {
        position: sticky;
      }
    }

    &__content {
      position: relative;
      flex-grow: 1;
    }

    &__title-content,
    &__item {
      position: relative;
      width: 100%;
      min-height: var(--ui3n-list-item-height);
      padding: 4px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__title-content {
      z-index: 1;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--ui3n-list-bg-color);
    }

    &__item-content {
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;

      &--disabled {
        pointer-events: none;
        cursor: default;
      }
    }
  }
</style>
