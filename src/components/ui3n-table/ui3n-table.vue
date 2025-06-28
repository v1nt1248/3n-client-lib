<script setup lang="ts" generic="T extends Ui3nTableBodyBaseItem">
  import size from 'lodash/size';
  import { useTable } from './composables/useTable';
  import type { Ui3nTableBodyBaseItem, Ui3nTableEmits, Ui3nTableProps, Ui3nTableSlots, Ui3nTableExpose } from './types';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import Ui3nCheckbox from '../ui3n-checkbox/ui3n-checkbox.vue';
  import Ui3nTableSortIcon from './ui3n-table-sort-icon.vue';

  const props = defineProps<Ui3nTableProps<T>>();
  const emits = defineEmits<Ui3nTableEmits<T>>();
  defineSlots<Ui3nTableSlots<T, string & keyof T>>();

  const {
    tableEl,
    currentConfig,
    visibleColumns,
    hasGroupActionsRow,
    showGroupActionsRow,
    selectedRows,
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

  const eventHandlers = {
    select: processSelection,
  };

  defineExpose<Ui3nTableExpose<T>>({
    getRowStyle,
    selectedRows,
    selectedRowsArray,
    hasGroupActionsRow,
    closeGroupActionsRow,
  });
</script>

<template>
  <div
    ref="tableEl"
    :class="$style.ui3nTable"
  >
    <div :class="[$style.header, showGroupActionsRow && $style.withGroupActions]">
      <!-- group actions -->
      <div
        v-if="showGroupActionsRow"
        :class="$style.groupActions"
      >
        <ui3n-checkbox
          :indeterminate="selectedRowsSize < body.content.length && selectedRowsSize !== 0"
          :model-value="selectedRowsSize === body.content.length"
          @change="toggleSelectedRows"
        >
          Selected: {{ selectedRowsSize }}
        </ui3n-checkbox>

        <div :class="$style.groupActionsBody">
          <slot
            name="group-actions"
            :selected-rows="selectedRowsArray"
          />
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
          :style="h.headCellStyle"
        >
          <div
            :class="$style.headerItem"
            :style="h.headCellStyle"
            v-on="h.sortable ? { click: () => changeSortOrder(h.key) } : {}"
          >
            <slot :name="`header-cell-${h.key as string & keyof T}`">
              <span :class="$style.headerText">
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

    <!-- table: body -->
    <div :class="$style.body">
      <template v-if="config?.showNoDataMessage && !size(body.content)">
        <slot name="no-data">
          <div :class="$style.noData">No data</div>
        </slot>
      </template>

      <template v-else>
        <template v-if="$slots['row']">
          <div
            v-for="(row, rowIndex) in body.content"
            :key="getRowKey(row, rowIndex)"
            :class="[
              $style.row,
              $slots['row'] && $style.customRow,
              isRowSelected(row) && $style.selected,
              config.selectable && $style.selectable,
            ]"
          >
            <slot
              name="row"
              :row="row"
              :row-style="getRowStyle(row)"
              :row-index="rowIndex"
              :is-row-selected="isRowSelected(row)"
              :column-style="config?.columnStyle"
              :events="eventHandlers"
            />
          </div>
        </template>

        <template v-else>
          <div
            v-for="(row, rowIndex) in body.content"
            :key="getRowKey(row, rowIndex)"
            :class="[$style.row, isRowSelected(row) && $style.selected, config.selectable && $style.selectable]"
            :style="getRowStyle(row)"
          >
            <div
              v-if="config.selectable"
              :class="$style.rowCheckbox"
            >
              <ui3n-checkbox
                :model-value="isRowSelected(row)"
                @change="processSelection(row)"
              />
            </div>

            <template
              v-for="(col, colIndex) in visibleColumns"
              :key="col.key"
            >
              <div :class="[$style.bodyItem, colIndex === 0 && $style.bodyItemFirst]">
                <slot
                  :name="`row-cell-${col.key as string & keyof T}`"
                  :row="row"
                  :row-index="rowIndex"
                  :is-row-selected="isRowSelected(row)"
                  :column-style="config?.columnStyle"
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
      </template>
    </div>

    <!-- table: unused space-->
    <div :class="$style.unusedPlace">
      <slot name="unused-place" />
    </div>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nTable {
    --ui3n-table-columns-width: auto;
    --ui3n-table-base-head-height: 36px;
    --ui3n-table-group-actions-height: 48px;
    --ui3n-table-body-row-height: 28px;
    --ui3n-table-group-actions-bg-color: var(--color-bg-block-primary-default);
    --ui3n-table-header-bg-color: var(--color-bg-table-header-default);
    --ui3n-table-header-color: var(--color-text-table-primary-default);
    --ui3n-table-row-color: var(--color-text-table-primary-default);
    --ui3n-table-row-bg-color-selected: var(--color-bg-control-primary-hover);
    --ui3n-table-nodata-color: var(--color-text-control-secondary-default);

    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .header {
    position: sticky;
    top: 0;
    width: 100%;
    min-height: var(--ui3n-table-base-head-height);
    height: var(--ui3n-table-base-head-height);
    display: grid;
    grid-template-columns: var(--ui3n-table-columns-width);
    background-color: var(--ui3n-table-header-bg-color);
    padding-left: var(--spacing-m);
    z-index: 5;

    &.withGroupActions {
      height: calc(var(--ui3n-table-base-head-height) + var(--ui3n-table-group-actions-height));
      min-height: calc(var(--ui3n-table-base-head-height) + var(--ui3n-table-group-actions-height));
      padding-top: var(--ui3n-table-group-actions-height);
    }

    .headerItemWrapper:not(:first-child) {
      padding: 0 var(--spacing-xs);
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
    color: var(--ui3n-table-header-color);
    @include mixins.text-overflow-ellipsis();
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
    background-color: var(--color-bg-table-cell-default);
  }

  .row {
    position: relative;
    width: 100%;
    min-height: var(--ui3n-table-body-row-height);
    border-left: 1px solid var(--color-border-table-primary-default);
    border-right: 1px solid var(--color-border-table-primary-default);
    border-bottom: 1px solid var(--color-border-block-primary-default);
    background-color: transparent;

    &:not(.customRow) {
      padding-left: var(--spacing-m);
      display: grid;
      grid-template-columns: var(--ui3n-table-columns-width);
    }

    &.selectable {
      cursor: pointer;
    }

    &:hover {
      background-color: var(--color-bg-control-primary-hover);
    }
  }

  .selected {
    background-color: var(--ui3n-table-row-bg-color-selected);
  }

  .rowCheckbox {
    position: absolute;
    top: 0;
    left: 16px;
    width: var(--spacing-m);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
  }

  .bodyItem {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.bodyItemFirst {
      padding-left: var(--spacing-ml);
    }
  }

  .cell {
    font-size: var(--font-12);
    font-weight: 400;
    color: var(--ui3n-table-row-color);
  }

  .noData {
    position: relative;
    width: 100%;
    height: var(--spacing-xxl);
    padding-top: var(--spacing-ml);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-12);
    font-weight: 600;
    color: var(--ui3n-table-nodata-color);
  }

  .unusedPlace {
    flex-grow: 1;
  }
</style>
