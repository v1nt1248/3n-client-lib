<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Ui3nTableSortIcon from './ui3n-table-sort-icon.vue';
import type { ListingEntryTypeExtended, EntityAction, SortField } from '../constants';

export interface Ui3nTableProps {
  items: ListingEntryTypeExtended[];
  textIfEmpty?: string;
}

export interface Ui3nTableEmits {
  (ev: 'go', name: string): void;

  (ev: 'action', value: { action: EntityAction, entity: ListingEntryTypeExtended }): void;
}

const props = defineProps<Ui3nTableProps>();
const emits = defineEmits<Ui3nTableEmits>();

const sortField = ref<SortField>('name');
const sortDirection = ref<'asc' | 'desc'>('asc');

const sortByName = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
  if (sortDirection.value === 'desc') {
    return itemA.name < itemB.name ? 1 : -1;
  }
  return itemA.name > itemB.name ? 1 : -1;
};
const sortByType = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
  if (sortDirection.value === 'desc') {
    return itemA.type! < itemB.type! ? 1 : -1;
  }
  return itemA.type! > itemB.type! ? 1 : -1;
};
const sortByCreatedAt = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
  const tsA = itemA.ctime!.getTime();
  const tsB = itemB.ctime!.getTime();
  return sortDirection.value === 'asc' ? tsA - tsB : tsB - tsA;
};
const sortByChangedAt = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
  const tsA = itemA.mtime!.getTime();
  const tsB = itemB.mtime!.getTime();
  return sortDirection.value === 'asc' ? tsA - tsB : tsB - tsA;
};

const placeholder = computed(() => props.textIfEmpty || 'Empty');
const sortMap = {
  name: sortByName,
  type: sortByType,
  createdAt: sortByCreatedAt,
  changedAt: sortByChangedAt,
};
const sortedItems = computed(() => [...props.items].sort(sortMap[sortField.value]));
const changeSort = (field: SortField) => {
  if (field !== sortField.value) {
    sortField.value = field;
    sortDirection.value = 'asc';
  } else {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  }
};

const getTimeAsString = (date: Date) => {
  return date
    ? `${`${date.getDate()}`.padStart(2, '0')}/${`${date.getMonth() + 1}`.padStart(2, '0')}/${date.getFullYear()} ${`${date.getHours()}`.padStart(2, '0')}:${`${date.getMinutes()}`.padStart(2, '0')}`
    : '';
};

const handleClick = (ev: MouseEvent) => {
  ev.preventDefault();
  const { target } = ev;
  const { id, classList } = target as Element;
  if (classList.contains('ui3n-table__item') && id) {
    return props.items.find(i => i.id === id);
  }
  return undefined;
};
const onClick = (ev: MouseEvent) => {
  handleClick(ev);
  const entity = handleClick(ev);
  if (entity && entity.isFolder && entity.fullPath) {
    emits('go', entity.fullPath);
  }
};
const onRightClick = (ev: MouseEvent) => {
  handleClick(ev);
  const entity = handleClick(ev);
  if (entity) {
    emits('action', { action: 'open:menu', entity });
  }
};

const handleActions = (ev: MouseEvent, action: EntityAction, entity: ListingEntryTypeExtended) => {
  ev.preventDefault();
  ev.stopImmediatePropagation();
  emits('action', { action, entity });
};
</script>

<template>
  <div :class="$style.table">
    <div :class="$style.header">
      <div
        :class="[$style.cellHeader, $style.cellHeaderSortable, $style.columnName]"
        @click="changeSort('name')"
      >
        <span :class="$style.cellHeaderText">Name</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'name'"
          :value="sortDirection"
          :size="18"
        />
      </div>
      <div
        :class="[$style.cellHeader, $style.cellHeaderSortable, $style.columnType]"
        @click="changeSort('type')"
      >
        <span :class="$style.cellHeaderText">Type</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'type'"
          :value="sortDirection"
          :size="18"
        />
      </div>

      <div
        :class="[$style.cellHeader, $style.cellHeaderSortable, $style.columnChangeAt]"
        @click="changeSort('changedAt')"
      >
        <span :class="$style.cellHeaderText">Changed At</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'changedAt'"
          :value="sortDirection"
          :size="18"
        />
      </div>
    </div>

    <div :class="$style.content">
      <div
        v-for="item in sortedItems"
        :id="item.id"
        :key="item.id"
        :class="$style.row"
        @click="onClick"
        @click.right="onRightClick"
      >
        <icon
          :icon="item.isFolder ? 'folder' : 'subject'"
          :width="16"
          :height="16"
          :class="$style.rowIcon"
        />
        <div :class="[$style.cellRow, $style.columnName]">
          {{ item.name }}
        </div>
        <div :class="[$style.cellRow, $style.columnType]">
          {{ item.ext || '' }}
        </div>
        <div :class="[$style.cellRow, $style.columnChangeAt]">
          {{ getTimeAsString(item.mtime!) }}
        </div>

        <icon
          v-if="item.isFolder"
          icon="bookmark"
          :width="12"
          :height="12"
          :class="$style.rowBookmark"
          @click="handleActions($event, 'add:favorites', item)"
        />

        <icon
          icon="baseline-edit"
          :width="12"
          :height="12"
          :class="$style.rowRename"
          @click="handleActions($event, 'rename', item)"
        />
      </div>

      <div
        v-if="!sortedItems.length"
        :class="$style.emptyText"
      >
        {{ placeholder }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../assets/styles/mixins";

.table {
  --table-header-height: 36px;
  --table-row-height: 28px;

  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: var(--table-header-height);
  justify-content: flex-start;
  align-items: center;
  padding: var(--spacing-m);
  background-color: var(--color-bg-table-header-default);
}

.cellHeader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-14);
  line-height: var(--font-20);
  font-weight: 500;
  color: var(--color-text-table-primary-default);
}

.cellHeaderSortable {
  cursor: pointer;
}

.cellHeaderText {
  display: block;
  position: relative;
  @include text-overflow-ellipsis(100%);
}

.row {
  display: flex;
  width: 100%;
  height: var(--table-row-height);
  justify-content: flex-start;
  align-items: center;
  padding: 0 var(--spacing-m) 0 calc(var(--spacing-l) + var(--spacing-s));
  cursor: pointer;
  border-bottom: 1px solid var(--color-border-table-primary-default);

  &:hover {
    background-color: var(--color-bg-control-primary-hover);

    .rowBookmark,
    .rowRename {
      display: block;
    }

    .rowIcon {
      color: var(--color-icon-table-accent-hover);
    }
  }
}

.rowBookmark,
.rowRename {
  display: none;
  position: absolute;
  z-index: 1;
  color: var(--color-icon-control-accent-unselected);
}

.rowBookmark{
  left: 2px;
}

.rowRename{
  right: calc(var(--spacing-l) * 4);
}

.rowIcon {
  position: absolute;
  left: var(--spacing-m);
  color: var(--color-icon-table-secondary-default);
  pointer-events: none;
}

.cellRow {
  position: relative;
  font-weight: 400;
  pointer-events: none;
}

.columnName {
  flex: 1 0;

  .rowCell {
    font-size: var(--font-12);
  }
}

.columnType {
  position: relative;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;


  .rowCell {
    font-size: var(--font-10);
  }
}

.columnChangeAt {
  position: relative;
  width: 104px;

  .rowCell {
    font-size: var(--font-12);
  }
}

.emptyText {
  font-size: var(--font-14);
  line-height: var(--font-20);
  color: var(--color-text-control-secondary-default);
  text-align: center;
  padding: 56px 0 ;
}
</style>
