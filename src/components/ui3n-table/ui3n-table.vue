<script lang="ts" setup generic="T extends object">
import { onMounted, ref, UnwrapRef } from 'vue';
import { getInitialSortOrder, setColumnWidth } from './utils';
import type { Ui3nTableEvents, Ui3nTableProps, Ui3nTableSort } from './types';
import Ui3nIcon from '../ui3n-icon.vue';
import Ui3nButton from '../ui3n-button.vue';
import Ui3nCheckbox from '../ui3n-checkbox.vue';

const props = defineProps<Ui3nTableProps<T>>();
const emits = defineEmits<Ui3nTableEvents<T>>();

const tableEl = ref<HTMLDivElement | null>(null);
const currentSortOrder = ref<Ui3nTableSort<T>>(getInitialSortOrder(props));
const selectedRows = ref<Array<T>>([]);

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

function toggleSelectedRows(val: boolean) {
  console.log('toggleSelectedRows', val);
}
</script>

<template>
  <div ref="tableEl" :class="$style.table">
    <div :class="[$style.header, selectedRows?.length > 0 && $style.withGroupActions]">
      <div v-if="!!selectedRows?.length" :class="$style.groupActions">
        <ui3n-checkbox
          :indeterminate="selectedRows?.length < body.length"
          :model-value="selectedRows?.length === body.length"
          @change="toggleSelectedRows"
        >
          Selected: {{ selectedRows?.length }}
        </ui3n-checkbox>

        <div :class="$style.groupActionsBody">
          <slot name="group-actions" :selected-rows="selectedRows" />
        </div>

        <ui3n-button type="secondary">Cancel</ui3n-button>
      </div>

      <template v-for="(h, index) in head" :key="h.key">
        <div
          v-if="!h.hidden"
          :class="[
            $style.headerItemWrapper,
            h.sortable && $style.sortable,
            h.sortable && currentSortOrder?.field === h.key && $style.sortableActive,
          ]"
          :style="{
            ...h.headCellStyle,
            width: `var(--ui3n-table-col-${String(h.key)}-width)`,
            ...(index === 0 && { paddingLeft: 'var(--spacing-m)' }),
          }"
        >
          <div
            :class="$style.headerItem"
            :style="h.headCellStyle"
            v-on="h.sortable ? { click: () => changeSortOrder(h.key) }: {}"
          >
            <slot :name="`column-${String(h.key)}`">
              <span
                :class="$style.headerText"
                :style="{
                  maxWidth: h.sortable
                    ? `calc(var(--ui3n-table-col-${String(h.key)}-width) - - var(--spacing-ml))`
                    : 'var(--ui3n-table-col-${String(h.key)}-width)'
                }"
              >
                {{ h.text }}
              </span>
            </slot>
            <transition mode="out-in" name="fade">
              <ui3n-icon
                v-if="h.sortable && currentSortOrder?.field === h.key"
                :key="currentSortOrder.direction === 'desc' ? 'arrow-downward' : 'arrow-upward'"
                :icon="currentSortOrder.direction === 'desc' ? 'arrow-downward' : 'arrow-upward'"
                width="16"
                height="16"
                color="var(--color-icon-table-primary-default)"
              />
            </transition>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins.scss";

.table {
  --ui3n-table-base-head-height: 36px;
  --ui3n-table-group-actions-height: 48px;
  --ui3n-table-group-actions-bg-color: var(--color-bg-block-primary-default);

  position: relative;
  width: 100%;
  background-color: transparent;
  overflow-y: auto;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: var(--ui3n-table-base-head-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg-table-header-default);

  &.withGroupActions {
    height: calc(var(--ui3n-table-base-head-height) + var(--ui3n-table-group-actions-height));
    padding-top: var(--ui3n-table-group-actions-height);
  }
}

.headerItemWrapper {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.headerItem {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  user-select: none;
}

.sortable {
  .headerItem {
    cursor: pointer;
  }
}

.headerText {
  display: block;
  font-size: var(--font-14);
  font-weight: 500;
  color: var(--color-text-table-primary-default);
  @include text-overflow-ellipsis;
}

.sortableActive {
  .headerItem {
    gap: var(--spacing-s);
  }
}

.groupActions {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: var(--ui3n-table-group-actions-height);
  padding: 0 var(--spacing-m);
  justify-content: space-between;
  align-items: center;
  background-color: var(--ui3n-table-group-actions-bg-color);
  border-left: 1px solid var(--color-border-block-primary-default);
  border-top: 1px solid var(--color-border-block-primary-default);
  border-right: 1px solid var(--color-border-block-primary-default);
}

.groupActionsBody {
  display: flex;
  height: 100%;
  padding: 0 var(--spacing-s);
  flex-grow: 1;
}
</style>
