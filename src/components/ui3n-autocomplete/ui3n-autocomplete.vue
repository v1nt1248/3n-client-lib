<!--
 Copyright (C) 2025 3NSoft Inc.

 This program is free software: you can redistribute it and/or modify it under
 the terms of the GNU General Public License as published by the Free Software
 Foundation, either version 3 of the License, or (at your option) any later
 version.

 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with
 this program. If not, see <http://www.gnu.org/licenses/>.
-->
<script setup lang="ts" generic="T extends { id: string; name: string }">
  import { computed, ref } from 'vue';
  import Ui3nChip from '../ui3n-chip/ui3n-chip.vue';
  import Ui3nMenu from '../ui3n-menu/ui3n-menu.vue';
  import type { Ui3nAutocompleteProps, Ui3nAutocompleteEmits, Ui3nAutocompleteSlots } from './types';

  const props = withDefaults(defineProps<Ui3nAutocompleteProps<T>>(), {
    clearOnSelect: false,
    filterKeys: () => [],
    filterMode: 'every',
    hideSelected: false,
    items: () => [],
    itemTitle: 'name',
    itemValue: 'id',
  });
  const emits = defineEmits<Ui3nAutocompleteEmits<T>>();
  defineSlots<Ui3nAutocompleteSlots<T>>();

  const query = ref('');

  const displayValue = computed(() => {
    if (props.chips) return '';

    if (!props.returnObject) {
      return props.modelValue.map(v => v[props.itemTitle] || '?').join(', ');
    }

    return props.modelValue.join(', ');
  });
</script>

<template>
  <div :class="$style.ui3nAutocomplete">
    <ui3n-menu>
      <div :class="$style.trigger">
        <template v-if="chips">
          <template v-for="(item, index) in modelValue" :key="item.id">
            <slot name="chip" :item="item" :index="index">
              <ui3n-chip round closeable>
                {{ item[props.itemTitle] }}
              </ui3n-chip>
            </slot>
          </template>
        </template>

        <template v-else>
          <div :class="$style.displayValue">{{ displayValue }}</div>
        </template>

        <input v-model="query" :class="$style.input" type="text" />
      </div>

      <template #menu>
        <template v-for="(item, index) in items" :key="item.id">
          <slot name="item" :item="item" :index="index">
            <div :class="$style.item">
              {{ item[props.itemTitle] }}
            </div>
          </slot>
        </template>
      </template>
    </ui3n-menu>
  </div>
</template>

<style lang="scss" module>
  .ui3nAutocomplete {
    --autocomplete-min-height: var(--spacing-ml);

    position: relative;
    width: 100%;
    min-height: var(--autocomplete-min-height);
  }

  .trigger {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .displayValue {
    font-size: var(--font-12);
    line-height: var(--font-16);
    font-weight: 400;
    color: var(--color-text-control-primary-default);
  }

  .input {
    border-radius: var(--spacing-xs);
    padding: 0 var(--spacing-s);
    flex-grow: 1;
    height: var(--autocomplete-min-height);
    font-size: var(--font-12);
    line-height: var(--font-16);
    font-weight: 400;
    color: var(--color-text-control-primary-default);
    border: none;
    outline: none;

    &::placeholder {
      color: var(--color-text-control-secondary-default);
    }

    &:hover,
    &:focus {
      height: calc(var(--autocomplete-min-height) - 2px);
      border: 1px solid var(--color-border-control-accent-focused);
    }
  }

  .item {
    display: flex;
    min-height: var(--spacing-l);
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--spacing-s);
    font-size: var(--font-13);
    line-height: var(--font-16);
    font-weight: 500;
    color: var(--color-text-control-primary-default);
  }
</style>
