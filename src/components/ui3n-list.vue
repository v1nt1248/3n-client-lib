<script lang="ts" setup generic="T">
  import { onMounted, ref, useSlots } from 'vue'

  const props = withDefaults(defineProps<{
    virtual?: boolean;
    title?: string;
    sticky?: boolean;
    items: T[];
  }>(), {
    virtual: false,
    title: '',
    sticky: true,
  })

  const emits = defineEmits(['select'])

  const slots = useSlots()
  const listElement = ref<HTMLDivElement | null>(null)

  onMounted(() => {
    if (props.virtual) {
      console.log('SLOTS: ', slots.default!()[0].children)
    }
  })
</script>

<template>
  <!-- eslint-disable vue/no-v-for-template-key -->
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
        <div class="ui3n-list-title">
          {{ props.title }}
        </div>
      </slot>
    </div>

    <template
      v-for="(item, index) in props.items"
    >
      <slot
        name="item"
        :index="index"
        :item="item"
      >
        <div
          :key="item.id ?? index"
          class="ui3n-list-item"
          @click.stop="emits('select', { item, index })"
        >
          {{ item }}
        </div>
      </slot>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-list {
    --ui3n-list-item-height: 24px;
    --ui3n-list-bg-color: var(--system-white, #fff);

    position: relative;
    width: 100%;
    background-color: var(--ui3n-list-bg-color);

    &__title {
      position: relative;
      width: 100%;
      top: 0;
      z-index: 1;

      &--sticky {
        position: sticky;
      }
    }

    &-title,
    &-item {
      position: relative;
      width: 100%;
      height: var(--ui3n-list-item-height);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
    }

    &-title {
      z-index: 1;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--ui3n-list-bg-color);
    }

    &-item {
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
</style>
