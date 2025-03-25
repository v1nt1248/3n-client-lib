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
<script setup lang="ts" generic="T extends Ui3nAutocompleteOptionBase">
  import { computed, ref, watch } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import isEmpty from 'lodash/isEmpty';
  import size from 'lodash/size';
  import Ui3nChip from '../ui3n-chip/ui3n-chip.vue';
  import Ui3nMenu from '../ui3n-menu/ui3n-menu.vue';
  import Ui3nHtml from '@/directives/ui3n-html';
  import { markSearch, getRandomId } from '@/utils';
  import type { Nullable } from '@/components/types';
  import {
    Ui3nAutocompleteOptionBase,
    Ui3nAutocompleteProps,
    Ui3nAutocompleteEmits,
    Ui3nAutocompleteSlots,
  } from './types';

  const vUi3nHtml = Ui3nHtml;

  const props = withDefaults(defineProps<Ui3nAutocompleteProps<T>>(), {
    clearOnSelect: false,
    filterKeys: () => [],
    hideSelected: false,
    items: () => [],
    itemTitle: 'name',
    itemValue: 'id',
  });
  const emits = defineEmits<Ui3nAutocompleteEmits<T>>();
  defineSlots<Ui3nAutocompleteSlots<T>>();

  const componentId = `auto-${getRandomId(4)}`;

  const query = ref('');
  const isMenuOpen = ref(false);
  const activatorEl = ref<Nullable<HTMLDivElement>>(null);
  const inputEl = ref<Nullable<HTMLInputElement>>(null);
  const menuBodyEl = ref<Nullable<HTMLDivElement>>(null);
  const activeItemsIndex = ref<Nullable<number>>(null);
  const isNewValueValid = ref(true);

  const ids = computed(() => props.returnObject
    ? (props.modelValue as T[]).map(item => item.id)
    : (props.modelValue as Array<T[keyof T]>));

  const displayValue = computed(() => {
    if (props.chips) return '';

    if (props.returnObject) {
      return (props.modelValue as T[]).map(v => v[props.itemTitle] || '?').join(', ');
    }

    return props.modelValue.join(', ');
  });

  const filteredItems = computed(() => {
    if (props.customFilter) {
      return props.items
        .filter(item => props.customFilter!(item, query.value))
        .filter(item => {
          if (!props.hideSelected) return true;

          return props.returnObject
            ? !(ids.value as string[]).includes(item.id as string)
            : !(ids.value as Array<T[keyof T]>).includes(item as T[keyof T]);
        });
    }

    return props.items
      .filter(item => (item[props.itemTitle] as string).toLowerCase().includes(query.value.toLowerCase()))
      .filter(item => {
        if (!props.hideSelected) return true;

        return props.returnObject
          ? !(ids.value as string[]).includes(item.id as string)
          : !(ids.value as Array<T[keyof T]>).includes(item as T[keyof T]);
      });
  });

  function onInput() {
    emits('update:search', query.value);
  }

  function onBlur() {
    emits('update:focused', false);
    activeItemsIndex.value = null;

    setTimeout(() => {
      isMenuOpen.value = false;
      query.value = '';
    }, 150);
  }

  function onItemClick(item: T) {
    if (props.disabled) return;

    if (!props.multiple) {
      const newValue = props.returnObject ? [item] : [item[props.itemValue]];
      emits('update:modelValue', newValue);
      return;
    }

    const updatedValue = cloneDeep(props.modelValue);
    const index = props.returnObject
      ? (props.modelValue as T[]).findIndex(v => v.id === item.id)
      : props.modelValue.findIndex(v => v === item[props.itemValue]);

    if (index > -1) {
      updatedValue.splice(index, 1);
    } else {
      // @ts-ignore
      updatedValue.push(props.returnObject ? item : item[props.itemValue]);
    }
    emits('update:modelValue', updatedValue);

    props.clearOnSelect && (query.value = '');
  }

  function onChipClose(item: T | T[keyof T]) {
    if (props.disabled) return;

    const index = props.returnObject
      ? (props.modelValue as T[]).findIndex(v => v.id === (item as T).id)
      : (props.modelValue as Array<T[keyof T]>).findIndex(v => v === item);
    const updatedModelValue = cloneDeep(props.modelValue);
    updatedModelValue.splice(index, 1);
    emits('update:modelValue', updatedModelValue);
  }

  function handlePressingDownKey() {
    if (activeItemsIndex.value === null) {
      activeItemsIndex.value = 0;
      menuBodyEl.value && menuBodyEl.value.focus();
      return;
    }

    if (activeItemsIndex.value >= 0 && activeItemsIndex.value < size(filteredItems.value) - 1) {
      activeItemsIndex.value += 1;
    }
  }

  function handlePressingUpKey() {
    if (activeItemsIndex.value === null) {
      activeItemsIndex.value = size(filteredItems.value) - 1;
      menuBodyEl.value && menuBodyEl.value.focus();
      return;
    }

    if (activeItemsIndex.value > 0 && activeItemsIndex.value < size(filteredItems.value)) {
      activeItemsIndex.value -= 1;
    }
  }

  function handlePressingEscOrTabKeys() {
    emits('update:focused', false);
    isMenuOpen.value = false;
    activeItemsIndex.value = null;
    query.value = '';
    inputEl.value && inputEl.value.blur();
    activatorEl.value && activatorEl.value.blur();
  }

  function handlePressingEnterKey() {
    if (activeItemsIndex.value === null && !isMenuOpen.value) {
      isMenuOpen.value = true;
      activeItemsIndex.value = 0;
      menuBodyEl.value && menuBodyEl.value.focus();
      return;
    }

    if (activeItemsIndex.value === null && isMenuOpen.value && query.value) {
      isNewValueValid.value = !props.newValueValidator ? true : props.newValueValidator(query.value);
      emits('valid:new-value', isNewValueValid.value);
      if (isNewValueValid.value) {
        const item =  {
          id: getRandomId(6),
          [props.itemTitle]: query.value,
          [props.itemValue]: query.value,
        };
        onItemClick(item as unknown as T);
      }
      return;
    }

    if (activeItemsIndex.value !== null) {
      const item = filteredItems.value[activeItemsIndex.value!];
      onItemClick(item);
      activeItemsIndex.value = null;
    }
  }

  function onKeydown(event: KeyboardEvent, key: 'down' | 'up' | 'esc' | 'enter' | 'tab') {
    switch (key) {
      case 'down':
        event.preventDefault();
        event.stopPropagation();
        handlePressingDownKey();
        break;
      case 'up':
        event.preventDefault();
        event.stopPropagation();
        handlePressingUpKey();
        break;
      case 'esc':
      case 'tab':
        handlePressingEscOrTabKeys();
        break;
      case 'enter':
        event.preventDefault();
        event.stopPropagation();
        handlePressingEnterKey();
        break;
    }
  }

  watch(
    () => size(filteredItems.value),
    (val, oVal) => {
      if (val !== oVal) {
        activeItemsIndex.value = null;
      }

      if (val && !isNewValueValid.value) {
        isNewValueValid.value = true;
      }
    },
  );
</script>

<template>
  <div :class="$style.ui3nAutocomplete">
    <ui3n-menu v-model="isMenuOpen" :offset-x="2" :offset-y="4" :disabled="disabled">
      <div ref="activatorEl" :class="$style.trigger">
        <template v-if="chips">
          <template v-for="(item, index) in modelValue" :key="item.id">
            <slot name="chip" :item="item" :index="index">
              <ui3n-chip
                round
                closeable
                @close="onChipClose(item)"
              >
                {{ returnObject ? (item as T)[props.itemTitle] : item }}
              </ui3n-chip>
            </slot>
          </template>
        </template>

        <template v-else>
          <div :class="$style.displayValue">{{ displayValue }}</div>
        </template>

        <input
          ref="inputEl"
          v-model="query"
          type="text"
          :class="[$style.input, !isNewValueValid && $style.inputWithError]"
          :placeholder="isEmpty(modelValue) && placeholder ? placeholder : ''"
          :disabled="disabled"
          @input="onInput"
          @focusin="emits('update:focused', true)"
          @focusout="onBlur"
          @keydown.down="onKeydown($event, 'down')"
          @keydown.up="onKeydown($event, 'up')"
          @keydown.esc="onKeydown($event, 'esc')"
          @keydown.enter="onKeydown($event, 'enter')"
          @keydown.tab="onKeydown($event, 'tab')"
        />
      </div>

      <template #menu>
        <div ref="menuBodyEl" :class="$style.body">
          <template v-if="size(filteredItems)">
            <template v-for="(item, index) in filteredItems" :key="item.id">
              <div
                :id="`${componentId}-${index}`"
                :class="[
                  $style.item,
                  activeItemsIndex === index && $style.itemSelected,
                  disabled && $style.itemDisabled
                ]"
                @click.stop.prevent="onItemClick(item)"
              >
                <slot name="item" :item="item" :index="index" :query="query">
                  <span v-ui3n-html="markSearch(item[props.itemTitle] as string, query)" />
                </slot>
              </div>
            </template>
          </template>

          <div v-if="!size(filteredItems) && noDataText" :class="$style.noData">
            <slot name="noDataText">
              {{ noDataText }}
            </slot>
          </div>
        </div>
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

    :global(.match-search) {
      font-weight: 600;
      color: var(--color-text-control-accent-default) !important;
    }
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
    line-height: var(--autocomplete-min-height);
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
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--color-text-control-secondary-default);
    }

    &:hover,
    &:focus {
      height: calc(var(--autocomplete-min-height) - 2px);

      &:not(.inputWithError) {
        border: 1px solid var(--color-border-control-accent-focused);
      }

      border: 1px solid var(--error-content-default);
    }
  }

  .body {
    position: relative;
    background-color: var(--color-bg-control-secondary-default);
    padding: var(--spacing-xs);
  }

  .item {
    display: flex;
    min-height: var(--spacing-l);
    justify-content: flex-start;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-s);
    font-size: var(--font-13);
    line-height: var(--font-16);
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    border-radius: var(--spacing-xs);
    user-select: none;
    cursor: pointer;

    &.itemSelected,
    &:hover {
      background-color: var(--color-bg-control-primary-hover);
      color: var(--color-text-control-accent-default);
    }

    &.itemDisabled {
      opacity: 0.7;
      pointer-events: none;
    }
  }

  .noData {
    display: flex;
    min-height: var(--spacing-l);
    justify-content: flex-start;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-s);
    font-size: var(--font-13);
    line-height: var(--font-16);
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    border-radius: var(--spacing-xs);
  }
</style>
