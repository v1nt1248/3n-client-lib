<script lang="ts" setup generic="T extends object">
import { onMounted, ref, UnwrapRef } from 'vue';
import { getInitialSortOrder, setColumnWidth } from './utils';
import type { Ui3nTableEvents, Ui3nTableProps, Ui3nTableSort } from './types';
import Ui3nButtom from '../ui3n-button.vue';

const props = defineProps<Ui3nTableProps<T>>();
const emits = defineEmits<Ui3nTableEvents<T>>();

const tableEl = ref<HTMLDivElement | null>(null);
const currentSortOrder = ref<Ui3nTableSort<T>>(getInitialSortOrder(props));

onMounted(() => {
  tableEl.value && setColumnWidth(tableEl.value, props);
});

function changeSortOrder(field: keyof T) {
  if (currentSortOrder.value?.field === field) {
    currentSortOrder.value.direction = currentSortOrder.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortOrder.value.field = field as UnwrapRef<keyof T>;
    currentSortOrder.value.direction = 'desc';
  }
  // @ts-ignore
  currentSortOrder.value && emits('change:sort', currentSortOrder.value);
}
</script>

<template>
  <div ref="tableEl" :class="$style.table">
    <div :class="$style.header">
      <template v-for="(h, index) in head" :key="h.key">
        <div
          v-if="!h.hidden"
          :class="[$style.headerItem, h.sortable && currentSortOrder?.field === h.key && $style.sortable]"
          :style="{
            ...h.headCellStyle,
            width: `var(--ui3n-table-col-${String(h.key)}-width)`,
            ...(index === 0 && { paddingLeft: 'var(--spacing-m)' }),
          }"
        >
          <slot :name="`column-${String(h.key)}`">
            <span :class="$style.headerText">{{ h.text }}</span>
            <transition v-if="h.sortable && currentSortOrder?.field === h.key">
              <ui3n-buttom
                type="icon"
                size="small"
                color="transparent"
                :icon="currentSortOrder.direction === 'desc' ? 'arrow-downward' : 'arrow-upward'"
                icon-size="16"
                icon-color="var(--color-icon-table-primary-default)"
                @click="changeSortOrder(h.key)"
              />
            </transition>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins.scss";

.table {
  position: relative;
  width: 100%;
  background-color: transparent;;
}

.header {
  position: relative;
  width: 100%;
  height: var(--spacing-l);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg-table-header-default);
}

.headerItem {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.sortable {
  gap: var(--spacing-s);

  .headerText {
    --ui3n-table-header-text-width: calc(100% - var(--spacing-ml));

    @include text-overflow-ellipsis(var(--ui3n-table-header-text-width));
  }
}

.headerText {
  display: block;
  font-size: var(--font-14);
  font-weight: 500;
  color: var(--color-text-table-primary-default);
  @include text-overflow-ellipsis;
}
</style>
