<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import Ui3nRipple from '@/directives/ui3n-ripple';
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';
  import type { Ui3nEditableProps, Ui3nEditableEmits } from './types';

  const vUi3nRipple = Ui3nRipple;

  const props = defineProps<Ui3nEditableProps>();
  const emits = defineEmits<Ui3nEditableEmits>();

  const value = ref<string>(props.modelValue);
  const initialValue = ref<string>(props.modelValue);

  const inEdit = ref(false);

  watch(
    () => props.modelValue,
    (val, oVal) => {
      if (val !== oVal) {
        value.value = val;
        initialValue.value = val;
      }
    },
  );
</script>

<template>
  <div :class="[$style.ui3nEditable, inEdit && $style.inEdit]">
    <template v-if="inEdit">
      <div>ED</div>
    </template>

    <template v-else>
      <span :class="$style.content">
        {{ value }}
      </span>

      <div v-ui3n-ripple :class="[$style.btn, $style.editBtn]">
        <ui3n-icon icon="" size="12" color="var(--color-icon-control-accent-unselected)" />
      </div>
    </template>

  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nEditable {
    position: relative;
    box-sizing: border-box;
    width: max-content;
    max-width: 100%;
    padding: var(--spacing-xs);
    border-radius: var(--spacing-xs);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-xs);

    &:hover {
      .btn.editBtn {
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
      }
    }
  }

  .inEdit {
    padding: calc(var(--spacing-xs) - 1px);
    border: 1px solid var(--color-border-table-accent-default);
  }

  .content {
    display: inline-block;
    width: calc(100% - 24px);
    font-size: var(--font-14);
    font-weight: 400;
    line-height: var(--font-16);
    color: var(--color-text-table-primary-default);
    @include mixins.text-overflow-ellipsis(calc(100% - 24px));
  }

  .btn {
    position: relative;
    width: var(--spacing-m);
    min-width: var(--spacing-m);
    height: var(--spacing-m);
    min-height: var(--spacing-m);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &.editBtn {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
  }
</style>
