<!--
 Copyright (C) 2026 3NSoft Inc.

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
<script setup lang="ts" generic="T extends Ui3nSelectorOptionBase">
  import { ref, computed, type ComputedRef, useTemplateRef, watch } from 'vue';
  import isEmpty from 'lodash/isEmpty';
  import size from 'lodash/size';
  import { getRandomId } from '@/utils';
  import type { Nullable } from '@/types';
  import type {
    Ui3nSelectorOptionBase,
    Ui3nSelectorProps,
    Ui3nSelectorEmits,
    Ui3nSelectorSlots,
    Ui3nSelectorItemDisplayingFunction,
  } from './types';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nMenu from '../ui3n-menu/ui3n-menu.vue';

  const props = withDefaults(defineProps<Ui3nSelectorProps<T>>(), {
    label: '',
    items: () => [] as T[],
    itemValue: 'id',
    itemDisplay: 'id' as keyof T,
    clearable: false,
    withSearch: false,
    returnObject: false,
    noDataText: '',
  });
  const emits = defineEmits<Ui3nSelectorEmits<T>>();
  defineSlots<Ui3nSelectorSlots<T>>();

  const componentId = `select-${getRandomId(4)}`;

  const activatorEl = useTemplateRef<HTMLDivElement>('activator');
  const bodyEl = useTemplateRef<HTMLDivElement>('body');
  const isMenuOpen = ref(false);
  const isFocused = ref(false);
  const activeItemIndex = ref<Nullable<number>>(null);

  const query = ref('');
  const processedQuery = computed(() => query.value.toLowerCase());

  const filteredItems = computed(() => {
    return props.items
      .filter(item => {
        if (props.customFilter) {
          return props.customFilter(item, query.value);
        }

        const itemDisplayingVal = getItemTitle(item, true);
        return itemDisplayingVal.includes(processedQuery.value);
      })
      .filter(item => {
        if (!props.hideSelected) {
          return true;
        }

        return props.returnObject
          ? (props.modelValue as T).id !== item.id
          : (props.modelValue as T[keyof T]) !== item[props.itemValue];
      });
  }) as ComputedRef<T[]>;

  const displayingSelection = computed(() => {
    if (!props.modelValue) {
      return '';
    }

    if (props.returnObject && typeof props.modelValue === 'object') {
      const selectedItem = props.items.find(item => item.id === (props.modelValue as T).id);
      return selectedItem ? getItemTitle(selectedItem) : JSON.stringify(props.modelValue);
    }

    if (props.returnObject && typeof props.returnObject !== 'object') {
      return JSON.stringify(props.modelValue);
    }

    const selectedItem = props.items.find(item => item[props.itemValue] === props.modelValue);
    return selectedItem ? getItemTitle(selectedItem) : props.modelValue;
  });

  function getItemTitle(value: T | T[keyof T], withProcessing?: boolean): string {
    if (props.returnObject || typeof value === 'object') {
      const isItemDisplayFunction = typeof props.itemDisplay === 'function';
      const val = isItemDisplayFunction
        ? (props.itemDisplay as Ui3nSelectorItemDisplayingFunction<T>)(value as T)
        : value
          ? ((value as T)[props.itemDisplay as keyof T] as string)
          : '';
      return withProcessing ? val.toLowerCase() : val;
    }

    return withProcessing
      ? value
        ? (value as T[keyof T] as string).toLowerCase()
        : ''
      : value
        ? (value as T[keyof T] as string)
        : '';
  }

  function onFocus() {
    isFocused.value = true;
    emits('focus');
  }

  function onBlur() {
    setTimeout(() => {
      isFocused.value = false;
      emits('blur');
    }, 100);
  }

  function onItemClick(item: T) {
    if (props.disabled) {
      return;
    }

    const newValue = props.returnObject ? item : item[props.itemValue];
    emits('update:modelValue', newValue);
    query.value = '';
    isMenuOpen.value = false;
  }

  function resetValue() {
    emits('update:modelValue', null);
    isMenuOpen.value = false;
    activeItemIndex.value = null;
    query.value = '';
  }

  function handlePressingDownKey() {
    if (activeItemIndex.value === null) {
      activeItemIndex.value = 0;
      bodyEl.value && bodyEl.value.focus();
      return;
    }

    if (activeItemIndex.value >= 0 && activeItemIndex.value < size(filteredItems.value) - 1) {
      activeItemIndex.value += 1;
    }
  }

  function handlePressingUpKey() {
    if (activeItemIndex.value === null) {
      activeItemIndex.value = size(filteredItems.value) - 1;
      bodyEl.value && bodyEl.value.focus();
      return;
    }

    if (activeItemIndex.value > 0 && activeItemIndex.value < size(filteredItems.value)) {
      activeItemIndex.value -= 1;
    }
  }

  function handlePressingEscOrTabKeys() {
    emits('blur');
    isMenuOpen.value = false;
    bodyEl.value!.blur();
    activatorEl.value && activatorEl.value.blur();
  }

  function handlePressingEnterKey() {
    if (activeItemIndex.value === null && !isMenuOpen.value) {
      isMenuOpen.value = true;
      bodyEl.value && bodyEl.value.focus();
      return;
    }

    if (activeItemIndex.value === null && isMenuOpen.value) {
      isMenuOpen.value = false;
      return;
    }

    if (activeItemIndex.value !== null) {
      const item = filteredItems.value[activeItemIndex.value!];
      onItemClick(item);
      activeItemIndex.value = null;
      query.value = '';
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
    () => isMenuOpen.value,
    (val, oVal) => {
      if (val !== oVal && val) {
        if (props.modelValue) {
          const selectedItemIndex = filteredItems.value.findIndex(item => {
            if (typeof props.modelValue === 'object') {
              return item.id === (props.modelValue as T).id;
            }

            return item[props.itemValue] === props.modelValue;
          });
          activeItemIndex.value = selectedItemIndex >= 0 ? selectedItemIndex : 0;
        }

        emits('list:open');
      } else if (val !== oVal && !val) {
        activeItemIndex.value = null;
        query.value = '';
        emits('list:close');
      }
    },
  );
</script>

<template>
  <div :class="$style.ui3nSelector">
    <label
      v-if="label"
      :class="$style.label"
    >
      {{ label }}
    </label>

    <ui3n-menu
      v-model="isMenuOpen"
      :offset-x="-3"
      :offset-y="4"
      position-autoupdate
      :content-border-radius="8"
      :content-styles="{ width: '100%' }"
      :class="$style.menu"
      :disabled="disabled"
    >
      <div
        ref="activator"
        tabindex="0"
        :class="[
          $style.trigger,
          isFocused && $style.triggerFocused,
          clearable && modelValue && $style.clearable,
          placeholder && !modelValue && !disabled && $style.placeholder,
          disabled && $style.triggerDisabled,
        ]"
        @focusin="onFocus"
        @focusout="onBlur"
        @keydown.down="onKeydown($event, 'down')"
        @keydown.up="onKeydown($event, 'up')"
        @keydown.esc="onKeydown($event, 'esc')"
        @keydown.enter="onKeydown($event, 'enter')"
        @keydown.tab="onKeydown($event, 'tab')"
      >
        <slot
          name="selection"
          :value="modelValue"
          :selected-item="activeItemIndex !== null ? filteredItems[activeItemIndex] : undefined"
        >
          {{ displayingSelection || placeholder || '' }}
        </slot>

        <ui3n-button
          v-if="clearable && modelValue"
          type="icon"
          size="small"
          color="transparent"
          icon="round-close"
          icon-size="16"
          icon-color="var(--color-icon-block-primary-default)"
          :disabled="disabled"
          :class="$style.clearBtn"
          @click.stop.prevent="resetValue"
        />

        <ui3n-icon
          icon="outline-arrow-drop-down"
          color="var(--color-icon-block-primary-default)"
          size="16"
          :vertical-flip="isMenuOpen"
          :class="$style.menuIcon"
        />
      </div>

      <template #menu>
        <div
          v-if="!isEmpty(filteredItems) || (isEmpty(filteredItems) && noDataText)"
          ref="body"
          :class="$style.body"
        >
          <template v-if="!isEmpty(filteredItems)">
            <template
              v-for="(item, index) in filteredItems"
              :key="item.id"
            >
              <div
                :id="`${componentId}-${index}`"
                :class="[
                  $style.item,
                  activeItemIndex === index && $style.itemSelected,
                  disabled && $style.itemDisabled,
                ]"
                @click.stop.prevent="onItemClick(item)"
              >
                <slot
                  name="item"
                  :item="item"
                  :index="index"
                  :active-index="activeItemIndex"
                  :query="query"
                >
                  {{ getItemTitle(item) }}
                </slot>
              </div>
            </template>
          </template>

          <div
            v-if="isEmpty(filteredItems) && noDataText"
            :class="$style.noData"
          >
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
  @use '@/assets/styles/mixins' as mixins;

  .ui3nSelector {
    --selector-activator-height: 32px;

    position: relative;
    width: 100%;
  }

  .label {
    display: block;
    width: 100%;
    font-size: var(--font-12);
    font-weight: 500;
    line-height: var(--font-16);
    color: var(--color-text-control-primary-default);
    margin-bottom: var(--spacing-xs);
  }

  .menu {
    width: 100%;
    max-width: 100% !important;

    & > div {
      max-width: 100% !important;
    }
  }

  .trigger {
    display: flex;
    width: 100%;
    height: var(--selector-activator-height);
    padding: 0 var(--spacing-ml) 0 var(--spacing-s);
    justify-content: flex-start;
    align-items: center;
    background-color: var(--color-bg-control-secondary-default);
    border-radius: var(--spacing-xs);
    color: var(--color-text-control-primary-default);
    font-size: var(--font-13);
    font-weight: 400;
    line-height: var(--font-16);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    @include mixins.text-overflow-ellipsis();

    &.placeholder {
      color: var(--color-text-control-secondary-default);
      font-style: italic;
    }

    &.triggerDisabled {
      background-color: var(--color-bg-control-secondary-disabled);
      color: var(--color-text-control-secondary-disabled);
      cursor: default;
      pointer-events: none;
    }

    .menuIcon {
      position: absolute;
      top: 8px;
      right: 4px;
    }

    &.clearable {
      padding-right: calc(var(--spacing-xxl) + var(--spacing-xs));
    }

    .clearBtn {
      position: absolute;
      top: var(--spacing-xs);
      right: var(--spacing-ml);
    }

    &.triggerFocused {
      background-color: var(--color-bg-control-secondary-focused);
      outline: 1px solid var(--color-border-control-accent-focused);
    }
  }

  .body {
    position: relative;
    width: 100%;
    background-color: var(--color-bg-block-primary-default);
    padding: var(--spacing-xs);

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
  }
</style>
