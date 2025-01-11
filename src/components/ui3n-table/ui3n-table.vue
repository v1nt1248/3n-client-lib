<script setup lang="ts" generic="T extends Ui3nTableBodyBaseItem">
  import { useTable } from './composables/useTable';
  import type { Ui3nTableBodyBaseItem, Ui3nTableEmits, Ui3nTableProps, Ui3nTableSlots } from './types';
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
      <template v-for="h in visibleColumns" :key="h.key">
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

    <!-- table body -->
    <div :class="$style.body">
      <template v-if="$slots['row']">
        <div
          v-for="(row, rowIndex) in body.content"
          :key="getRowKey(row, rowIndex)"
          :class="[$style.row, isRowSelected(row) && $style.selected, config.selectable && $style.selectable]"
        >
          <slot
            name="row"
            :row="row"
            :row-style="getRowStyle(row)"
            :row-index="rowIndex"
            :is-row-selected="isRowSelected(row)"
            :column-style="config?.columnStyle"
            :events="eventsHandlers"
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

    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow-y: auto;
  }

  .header {
    position: sticky;
    top: 0;
    width: 100%;
    min-height: var(--ui3n-table-header-height);
    height: var(--ui3n-table-base-head-height);
    display: grid;
    grid-template-columns: var(--ui3n-table-columns-width);
    background-color: var(--color-bg-table-header-default);
    padding-left: var(--spacing-m);
    z-index: 5;

    &.withGroupActions {
      height: calc(var(--ui3n-table-base-head-height) + var(--ui3n-table-group-actions-height));
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
    color: var(--color-text-table-primary-default);
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
  }

  .row {
    position: relative;
    width: 100%;
    min-height: var(--ui3n-table-body-row-height);
    display: grid;
    grid-template-columns: var(--ui3n-table-columns-width);
    padding-left: var(--spacing-m);
    border-left: 1px solid var(--color-border-table-primary-default);
    border-right: 1px solid var(--color-border-table-primary-default);
    border-bottom: 1px solid var(--color-border-block-primary-default);
    background-color: transparent;

    &.selectable {
      cursor: pointer;
    }

    &:hover {
      background-color: var(--color-bg-control-primary-hover);
    }
  }

  .selected {
    background-color: var(--color-bg-control-primary-hover);
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
    color: var(--color-text-table-primary-default);
  }
</style>
