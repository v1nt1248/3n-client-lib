<script setup lang="ts" generic="T extends Ui3nAutocompleteOptionBase">
  import { computed, ref, watch } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import isEmpty from 'lodash/isEmpty';
  import size from 'lodash/size';
  import Ui3nChip from '../ui3n-chip/ui3n-chip.vue';
  import Ui3nMenu from '../ui3n-menu/ui3n-menu.vue';
  import Ui3nHtml from '../../directives/ui3n-html';
  import { markSearch, getRandomId } from '../../utils';
  import type { Nullable } from '@/types';
  import type {
    Ui3nAutocompleteOptionBase,
    Ui3nAutocompleteProps,
    Ui3nAutocompleteEmits,
    Ui3nAutocompleteSlots,
    Ui3nAutocompleteExpose,
  } from './types';

  const vUi3nHtml = Ui3nHtml;

  const props = withDefaults(defineProps<Ui3nAutocompleteProps<T>>(), {
    lockScroll: false,
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
  const isLastChipHighlighted = ref(false);
  const isNewValueValid = ref(true);

  const ids = computed(() =>
    props.returnObject ? (props.modelValue as T[]).map(item => item.id) : (props.modelValue as Array<T[keyof T]>),
  );

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
            : !(ids.value as Array<T[keyof T]>).includes(item[props.itemValue]);
        });
    }

    return props.items
      .filter(item => (item[props.itemTitle] as string).toLowerCase().includes(query.value.toLowerCase()))
      .filter(item => {
        if (!props.hideSelected) return true;

        return props.returnObject
          ? !(ids.value as string[]).includes(item.id as string)
          : !(ids.value as Array<T[keyof T]>).includes(item[props.itemValue]);
      });
  });

  function onInput() {
    isLastChipHighlighted.value = false;
    emits('update:search', query.value);
  }

  function onBlur() {
    emits('update:focused', false);
    activeItemsIndex.value = null;
    isLastChipHighlighted.value = false;

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
      menuBodyEl.value && menuBodyEl.value.focus({ preventScroll: true });
      return;
    }

    if (activeItemsIndex.value >= 0 && activeItemsIndex.value < size(filteredItems.value) - 1) {
      activeItemsIndex.value += 1;
    }
  }

  function handlePressingUpKey() {
    if (activeItemsIndex.value === null) {
      activeItemsIndex.value = size(filteredItems.value) - 1;
      menuBodyEl.value && menuBodyEl.value.focus({ preventScroll: true });
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
      menuBodyEl.value && menuBodyEl.value.focus({ preventScroll: true });
      return;
    }

    if (activeItemsIndex.value === null && isMenuOpen.value && query.value) {
      isNewValueValid.value = !props.newValueValidator ? true : props.newValueValidator(query.value);
      emits('valid:new-value', isNewValueValid.value);
      if (isNewValueValid.value) {
        const item = {
          id: getRandomId(6),
          [props.itemTitle]: query.value,
          [props.itemValue]: query.value,
        };
        onItemClick(item as unknown as T);
      }
      props.clearOnSelect && (query.value = '');
      return;
    }

    if (activeItemsIndex.value !== null) {
      const item = filteredItems.value[activeItemsIndex.value!];
      onItemClick(item);
      activeItemsIndex.value = null;
      props.clearOnSelect && (query.value = '');
    }
  }

  function handleBackspaceKey() {
    if (props.disabled || query.value !== '' || isEmpty(props.modelValue)) {
      return;
    }

    if (!isLastChipHighlighted.value) {
      isLastChipHighlighted.value = true;
      return;
    }

    const updatedModelValue = cloneDeep(props.modelValue);
    updatedModelValue.pop();
    emits('update:modelValue', updatedModelValue);

    isLastChipHighlighted.value = false;
  }

  function onKeydown(event: KeyboardEvent, key: 'down' | 'up' | 'esc' | 'enter' | 'tab' | 'backspace') {
    switch (key) {
      case 'down': {
        event.preventDefault();
        event.stopPropagation();
        handlePressingDownKey();
        break;
      }

      case 'up': {
        event.preventDefault();
        event.stopPropagation();
        handlePressingUpKey();
        break;
      }

      case 'esc':
      case 'tab':
        handlePressingEscOrTabKeys();
        break;

      case 'enter': {
        event.preventDefault();
        event.stopPropagation();
        handlePressingEnterKey();
        break;
      }

      case 'backspace':
        handleBackspaceKey();
        break;
    }
  }

  function clear() {
    query.value = '';
    isMenuOpen.value = false;
    activeItemsIndex.value = null;
    isNewValueValid.value = true;

    emits('update:modelValue', [] as unknown as T[] & Array<T[keyof T]>);
    emits('update:search', '');
  }

  defineExpose<Ui3nAutocompleteExpose>({
    clear,
  });

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clear();
      }
    },
  );

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
    <!-- 'hidden inputs' block for setting of 'name' attr when used in a form -->
    <fieldset
      v-if="name && !isEmpty(modelValue)"
      :class="$style.hiddenBlock"
    >
      <template v-if="!multiple">
        <input
          type="hidden"
          :name="name"
          :value="returnObject ? JSON.stringify(modelValue) : modelValue"
        />
      </template>

      <template v-else>
        <template v-if="!returnObject">
          <input
            v-for="(val, index) in modelValue as Array<T[keyof T]>"
            :key="`${name}-flat-${index}`"
            type="hidden"
            :name="`${name}[]`"
            :value="val"
          />
        </template>

        <template v-else>
          <input
            v-for="(item, index) in modelValue as T[]"
            :key="item.id || `${name}-obj-${index}`"
            type="hidden"
            :name="`${name}[]`"
            :value="JSON.stringify(item)"
          />
        </template>
      </template>
    </fieldset>

    <ui3n-menu
      v-model="isMenuOpen"
      :lock-scroll="lockScroll"
      :offset-x="2"
      :offset-y="4"
      position-strategy="fixed"
      position-autoupdate
      :content-border-radius="[0, 0, 8, 8]"
      :disabled="disabled"
    >
      <div
        ref="activatorEl"
        :class="$style.trigger"
      >
        <transition-group
          v-if="chips"
          name="chipAnim"
          tag="div"
          :class="$style.chipsContainer"
        >
          <!-- @vue-ignore -->
          <div
            v-for="(item, index) in modelValue"
            :key="item.id || index"
            :class="$style.chipWrapper"
          >
            <slot
              name="chip"
              :item="item"
              :index="index"
              :is-highlighted="index === size(modelValue) - 1 && isLastChipHighlighted"
            >
              <ui3n-chip
                height="32"
                :color="
                  index === size(modelValue) - 1 && isLastChipHighlighted
                    ? 'var(--color-bg-control-primary-hover)'
                    : undefined
                "
                round
                closeable
                @close="onChipClose(item)"
              >
                {{ returnObject ? (item as T)[props.itemTitle] : item }}
              </ui3n-chip>
            </slot>
          </div>
        </transition-group>

        <template v-else>
          <div :class="$style.displayValue">
            {{ displayValue }}
          </div>
        </template>

        <input
          ref="inputEl"
          v-model="query"
          type="text"
          :class="[$style.input, !isNewValueValid && $style.inputWithError]"
          :placeholder="isEmpty(modelValue) && placeholder ? placeholder : ''"
          :disabled="disabled"
          @input="onInput"
          @focusin.prevent="emits('update:focused', true)"
          @focusout="onBlur"
          @keydown.down="onKeydown($event, 'down')"
          @keydown.up="onKeydown($event, 'up')"
          @keydown.esc="onKeydown($event, 'esc')"
          @keydown.enter="onKeydown($event, 'enter')"
          @keydown.tab="onKeydown($event, 'tab')"
          @keydown.delete="onKeydown($event, 'backspace')"
        />
      </div>

      <template #menu>
        <div
          v-if="!isEmpty(filteredItems) || (isEmpty(filteredItems) && noDataText)"
          ref="menuBodyEl"
          :class="$style.body"
        >
          <template v-if="size(filteredItems)">
            <template
              v-for="(item, index) in filteredItems"
              :key="item.id"
            >
              <div
                :id="`${componentId}-${index}`"
                :class="[
                  $style.item,
                  activeItemsIndex === index && $style.itemSelected,
                  disabled && $style.itemDisabled,
                ]"
                @click.stop.prevent="onItemClick(item)"
              >
                <slot
                  name="item"
                  :item="item"
                  :index="index"
                  :query="query"
                >
                  <div
                    v-ui3n-html="markSearch(item[props.itemTitle] as string, query)"
                    :class="$style.simpleItem"
                  />
                </slot>
              </div>
            </template>
          </template>

          <div
            v-if="!size(filteredItems) && noDataText"
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
  .ui3nAutocomplete {
    --ui3n-autocomplete-min-height: 32px;
    --ui3n-autocomplete-font-size: 12px;
    --ui3n-autocomplete-item-font-size: 13px;
    --ui3n-autocomplete-padding-inline: 8px;
    --ui3n-autocomplete-padding-block: 4px;
    --ui3n-autocomplete-border-radius: 4px;

    position: relative;
    width: 100%;
    min-height: var(--ui3n-autocomplete-min-height);

    :global(.match-search) {
      font-weight: 600;
      color: var(--color-text-control-accent-default) !important;
    }
  }

  .hiddenBlock {
    display: none;
    border: none;
    padding: 0;
    margin: 0;
  }

  .trigger {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
  }

  .displayValue {
    font-size: var(--ui3n-autocomplete-font-size);
    line-height: var(--ui3n-autocomplete-min-height);
    font-weight: 400;
    color: var(--color-text-control-primary-default);
  }

  .input {
    border-radius: var(--ui3n-autocomplete-border-radius);
    padding: 0 var(--ui3n-autocomplete-padding-inline);
    flex: 1 1 60px;
    height: var(--ui3n-autocomplete-min-height);
    width: 100%;
    font-size: var(--ui3n-autocomplete-font-size);
    line-height: var(--ui3n-autocomplete-min-height);
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
      background-color: var(--color-bg-control-secondary-default);
    }

    &.inputWithError {
      height: calc(var(--ui3n-autocomplete-min-height) - 2px);
      padding: 0 calc(var(--ui3n-autocomplete-padding-inline) - 1px);
      border: 1px solid var(--error-content-default);
    }
  }

  .body {
    position: relative;
    background-color: var(--color-bg-block-primary-default);
    padding: 4px;
  }

  .item {
    display: flex;
    min-height: var(--ui3n-autocomplete-min-height);
    justify-content: flex-start;
    align-items: center;
    padding: var(--ui3n-autocomplete-padding-block) var(--ui3n-autocomplete-padding-inline);
    font-size: var(--ui3n-autocomplete-item-font-size);
    line-height: 1.23;
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    border-radius: var(--ui3n-autocomplete-border-radius);
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

  .simpleItem {
    position: relative;
    width: max-content;
  }

  .noData {
    display: flex;
    min-height: var(--ui3n-autocomplete-min-height);
    justify-content: flex-start;
    align-items: center;
    padding: var(--ui3n-autocomplete-padding-block) var(--ui3n-autocomplete-padding-inline);
    font-size: var(--ui3n-autocomplete-item-font-size);
    line-height: 1.23;
    font-weight: 500;
    color: var(--color-text-control-primary-default);
    border-radius: var(--ui3n-autocomplete-border-radius);
  }

  .chipsContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: flex-start;
  }

  .chipWrapper {
    display: inline-flex;
  }

  :global {
    .chipAnim-enter-from,
    .chipAnim-leave-to {
      opacity: 0;
      transform: scale(0.85);
    }

    .chipAnim-enter-active,
    .chipAnim-leave-active {
      transition: all 0.2s ease;
    }

    .chipAnim-move {
      transition: transform 0.2s ease;
    }

    .chipAnim-leave-active {
      position: absolute !important;
    }
  }
</style>
