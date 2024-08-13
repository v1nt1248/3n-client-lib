<script setup lang="ts" generic="T extends Ui3nTableBodyBaseItem">
import { useTable } from './composables/useTable';
import {
  Ui3nTableBodyBaseItem,
  Ui3nTableEvents,
  Ui3nTableProps,
} from './types';
import Ui3nButton from '../ui3n-button.vue';
import Ui3nCheckbox from '../ui3n-checkbox.vue';
import Ui3nTableSortIcon from '../ui3n-table-sort-icon.vue';

const props = defineProps<Ui3nTableProps<T>>();
const emits = defineEmits<Ui3nTableEvents<T>>();

const {
  tableEl,
  currentConfig,
  visibleColumns,
  showGroupActionsRow,
  selectedRowsArray,
  selectedRowsSize,
  closeGroupActionsRow,
  getRowKey,
  isRowSelected,
  getRowStyle,
  processSelection,
  toggleSelectedRows,
  changeSortOrder,
} = useTable(props, emits);

const eventsHandlers = {
  select: processSelection,
};
</script>

<template>
  <div ref="tableEl" :class="$style.table">
    <div :class="[$style.header, showGroupActionsRow && $style.withGroupActions]">
      <!-- group actions -->
      <div v-if="showGroupActionsRow" :class="$style.groupActions">
        <ui3n-checkbox
          :indeterminate="selectedRowsSize < body.content.length && selectedRowsSize !== 0"
          :model-value="selectedRowsSize === body.content.length"
          @change="toggleSelectedRows"
        >
          Selected: {{ selectedRowsSize }}
        </ui3n-checkbox>

        <div :class="$style.groupActionsBody">
          <slot name="group-actions" :selected-rows="selectedRowsArray" />
        </div>

        <ui3n-button
          type="secondary"
          @click="closeGroupActionsRow"
        >
          Cancel
        </ui3n-button>
      </div>
      <!-- table header  -->
      <template
        v-for="h in visibleColumns"
        :key="h.key"
      >
        <div
          :class="[
            $style.headerItemWrapper,
            h.sortable && $style.sortable,
            h.sortable && currentConfig.sortOrder?.field === h.key && $style.sortableActive,
          ]"
          :style="{
            ...h.headCellStyle,
            width: `var(--ui3n-table-col-${String(h.key)}-width)`,
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
            <ui3n-table-sort-icon
              v-if="h.sortable && currentConfig.sortOrder?.field === h.key"
              :value="currentConfig.sortOrder?.direction"
              size="16"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- table body -->
    <div :class="$style.body">
      <template v-if="$slots['row']">
        <div
          v-for="(row, rowIndex) in body.content"
          :class="[
            $style.row,
            isRowSelected(row) && $style.selected,
            config.selectable && $style.selectable,
          ]"
          :key="getRowKey(row, rowIndex)"
        >
          <slot
            name="row"
            :row="row"
            :row-style="getRowStyle(row)"
            :row-index="rowIndex"
            :events="eventsHandlers"
          />
        </div>
      </template>

      <template v-else>
        <div
          v-for="(row, rowIndex) in body.content"
          :class="[
            $style.row,
            isRowSelected(row) && $style.selected,
            config.selectable && $style.selectable,
          ]"
          :key="getRowKey(row, rowIndex)"
          :style="getRowStyle(row)"
        >
          <ui3n-checkbox
            v-if="config.selectable"
            :class="$style.rowCheckbox"
            :model-value="isRowSelected(row)"
            @change="processSelection(row)"
          />

          <template
            v-for="(col, colIndex) in visibleColumns"
            :key="col.key"
          >
            <div
              :class="[$style.bodyItem]"
              :style="{
                width: colIndex === 0 && !!config.selectable
                  ? `calc(var(--ui3n-table-col-${String(col.key)}-width) - var(--spacing-ml))`
                  : `var(--ui3n-table-col-${String(col.key)}-width)`,
              }"
            >
              <slot
                :name="`row-cell-${String(col.key)}`"
                :row="row"
                :row-index="rowIndex"
                :cell="row[col.key]"
              >
                <span :class="$style.cell">
                  {{ row[col.key] }}
                </span>
              </slot>
            </div>
          </template>
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
  padding-left: var(--spacing-m);
  border-left: 1px solid var(--color-bg-table-header-default);
  border-right: 1px solid var(--color-bg-table-header-default);

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

.body {
  position: relative;
  width: 100%;
}

.row {
  position: relative;
  width: 100%;
  min-height: var(--spacing-ml);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: var(--spacing-m);
  border-left: 1px solid var(--color-border-table-primary-default);
  border-right: 1px solid var(--color-border-table-primary-default);
  border-bottom: 1px solid var(--color-border-block-primary-default);
  background-color: var(--color-bg-control-secondary-default);

  &.selectable {
    cursor: pointer;
  }
}

.selected {
  background-color: var(--color-bg-control-primary-hover);
}

.rowCheckbox {
  margin-right: var(--spacing-s);
}

.bodyItem {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.cell {
  font-size: var(--font-12);
  font-weight: 400;
  color: var(--color-text-table-primary-default);
}
</style>
