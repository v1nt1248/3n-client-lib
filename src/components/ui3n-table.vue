<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import Ui3nTableSortIcon from './ui3n-table-sort-icon.vue'

  const props = defineProps<{
    items: ListingEntryTypeExtended[];
    textIfEmpty?: string;
  }>()
  const emit = defineEmits<{
    (ev: 'go', name: string): void;
    (ev: 'action', value: { action: EntityAction, entity: ListingEntryTypeExtended }): void;
  }>()

  const sortField = ref<SortField>('name')
  const sortDirection = ref<'asc'|'desc'>('asc')

  const sortByName = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
    if (sortDirection.value === 'desc') {
      return itemA.name < itemB.name ? 1 : -1
    }
    return itemA.name > itemB.name ? 1 : -1
  }
  const sortByType = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
    if (sortDirection.value === 'desc') {
      return itemA.type! < itemB.type! ? 1 : -1
    }
    return itemA.type! > itemB.type! ? 1 : -1
  }
  const sortByCreatedAt = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
    const tsA = itemA.ctime!.getTime()
    const tsB = itemB.ctime!.getTime()
    return sortDirection.value === 'asc' ? tsA - tsB : tsB - tsA
  }
  const sortByChangedAt = (itemA: ListingEntryTypeExtended, itemB: ListingEntryTypeExtended) => {
    const tsA = itemA.mtime!.getTime()
    const tsB = itemB.mtime!.getTime()
    return sortDirection.value === 'asc' ? tsA - tsB : tsB - tsA
  }

  const placeholder = computed(() => props.textIfEmpty || 'Empty')
  const sortMap = {
    name: sortByName,
    type: sortByType,
    createdAt: sortByCreatedAt,
    changedAt: sortByChangedAt,
  }
  const sortedItems =computed(() => [...props.items].sort(sortMap[sortField.value]))
  const changeSort = (field: SortField) => {
    if (field !== sortField.value) {
      sortField.value = field
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    }
  }

  const getTimeAsString = (date: Date) => {
    return date
      ? `${`${date.getDate()}`.padStart(2, '0')}/${`${date.getMonth() + 1}`.padStart(2, '0')}/${date.getFullYear()} ${`${date.getHours()}`.padStart(2, '0')}:${`${date.getMinutes()}`.padStart(2, '0')}`
      : ''
  }

  const handleClick = (ev: MouseEvent) => {
    ev.preventDefault()
    const { target } = ev
    const { id, classList } = target as Element
    if (classList.contains('ui3n-table__item') && id) {
      return props.items.find(i => i.id === id)
    }
    return undefined
  }
  const onClick = (ev: MouseEvent) => {
    handleClick(ev)
    const entity = handleClick(ev)
    if (entity && entity.isFolder && entity.fullPath) {
      emit('go', entity.fullPath)
    }
  }
  const onRightClick = (ev: MouseEvent) => {
    handleClick(ev)
    const entity = handleClick(ev)
    if (entity) {
      emit( 'action', { action: 'open-menu', entity })
    }
  }

  const handleActions = (ev: MouseEvent, action: EntityAction, entity: ListingEntryTypeExtended) => {
    ev.preventDefault()
    ev.stopImmediatePropagation()
    emit('action', { action, entity })
  }
</script>

<template>
  <div class="ui3n-table">
    <div class="ui3n-table__header">
      <div
        class="ui3n-table__header-cell ui3n-table__header-cell--sortable ui3n-table__name"
        @click="changeSort('name')"
      >
        <span class="ui3n-table__header-text">Name</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'name'"
          :value="sortDirection"
          :size="18"
        />
      </div>
      <div
        class="ui3n-table__header-cell ui3n-table__header-cell--sortable ui3n-table__type"
        @click="changeSort('type')"
      >
        <span class="ui3n-table__header-text">Type</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'type'"
          :value="sortDirection"
          :size="18"
        />
      </div>

      <div
        class="ui3n-table__header-cell ui3n-table__header-cell--sortable ui3n-table__changedAt"
        @click="changeSort('changedAt')"
      >
        <span class="ui3n-table__header-text">Changed At</span>
        <ui3n-table-sort-icon
          v-if="sortField === 'changedAt'"
          :value="sortDirection"
          :size="18"
        />
      </div>
    </div>

    <div class="ui3n-table__content">
      <div
        v-for="item in sortedItems"
        :id="item.id"
        :key="item.id"
        class="ui3n-table__item"
        @click="onClick"
        @click.right="onRightClick"
      >
        <icon
          :icon="item.isFolder ? 'folder' : 'subject'"
          :width="16"
          :height="16"
          class="ui3n-table__item-icon"
        />
        <div class="ui3n-table__item-cell ui3n-table__name">
          {{ item.name }}
        </div>
        <div class="ui3n-table__item-cell ui3n-table__type">
          {{ item.ext || '' }}
        </div>
        <div class="ui3n-table__item-cell ui3n-table__changedAt">
          {{ getTimeAsString(item.mtime!) }}
        </div>

        <icon
          v-if="item.isFolder"
          icon="bookmark"
          :width="12"
          :height="12"
          class="ui3n-table__item-bookmark"
          @click="handleActions($event, 'add:favorites', item)"
        />

        <icon
          icon="baseline-edit"
          :width="12"
          :height="12"
          class="ui3n-table__item-rename"
          @click="handleActions($event, 'rename', item)"
        />
      </div>

      <div
        v-if="!sortedItems.length"
        class="ui3n-table__empty"
      >
        {{ placeholder }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/mixins";

  .ui3n-table {
    --table-header-height: 36px;
    --table-row-height: 28px;

    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &__header {
      position: sticky;
      top: 0;
      display: flex;
      width: 100%;
      height: var(--table-header-height);
      justify-content: flex-start;
      align-items: center;
      padding: 0 calc(var(--base-size) * 2);
      background-color: var(--gray-50);

      &-cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--font-13);
        line-height: var(--font-18);
        font-weight: 500;
        color: var(--black-90);

        &--sortable {
          cursor: pointer;
        }
      }

      &-text {
        display: block;
        position: relative;
        @include text-overflow-ellipsis(100%)
      }
    }

    &__item {
      display: flex;
      width: 100%;
      height: var(--table-row-height);
      justify-content: flex-start;
      align-items: center;
      padding: 0 calc(var(--base-size) * 2) 0 calc(var(--base-size) * 5);
      cursor: pointer;
      border-bottom: 1px solid var(--gray-50);

      &-bookmark,
      &-rename {
        display: none;
        position: absolute;
        z-index: 1;
        color: var(--black-30);
      }

      &-bookmark {
        left: 2px;
      }

      &-rename {
        right: calc(var(--base-size) * 13 + 24px);
      }

      &-icon {
        position: absolute;
        left: calc(var(--base-size) * 2);
        color: var(--black-30);
        pointer-events: none;
      }

      &-cell {
        position: relative;
        font-weight: 400;
        pointer-events: none;
      }

      &:hover {
        background-color: var(--blue-main-30);

        .ui3n-table__item-bookmark,
        .ui3n-table__item-rename {
          display: block;
        }

        .ui3n-table__item-icon {
          color: var(--blue-main);
        }
      }
    }

    &__name {
      flex: 1 0;

      &.ui3n-table__item-cell {
        font-size: var(--font-12);
      }
    }

    &__type {
      width: calc(var(--base-size) * 7);
      text-align: center;

      &.ui3n-table__item-cell {
        font-size: var(--font-10);
      }
    }

    &__changedAt {
      width: calc(var(--base-size) * 13);

      &.ui3n-table__item-cell {
        font-size: var(--font-11);
      }
    }

    &__empty {
      font-size: var(--font-20);
      font-style: italic;
      color: var(--black-30);
      text-align: center;
      padding-top: calc(var(--base-size) * 10);
    }
  }
</style>
