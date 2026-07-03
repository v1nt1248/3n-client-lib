<script lang="ts" setup>
  import { computed, inject, useCssModule, useSlots } from 'vue';
  import type { Ui3nBreadcrumbEmits, Ui3nBreadcrumbProps, Ui3nBreadcrumbSlots } from './types';

  const props = withDefaults(defineProps<Ui3nBreadcrumbProps>(), {
    separator: undefined,
    isActive: false,
    disabled: false,
  });

  const emits = defineEmits<Ui3nBreadcrumbEmits>();

  const slots = useSlots();
  defineSlots<Ui3nBreadcrumbSlots>();

  const $css = useCssModule();

  const parentContext = inject<any>('ui3n-breadcrumbs-context', null);

  const separatorValue = computed(() => {
    if (props.separator) return props.separator;
    return parentContext ? parentContext.separator() : '/';
  });

  const parentDisabled = computed(() => {
    return parentContext ? parentContext.disabled() : false;
  });

  const cssClasses = computed(() => {
    const val = [$css.ui3nBreadcrumb];
    props.isActive && val.push($css.ui3nBreadcrumbActive);
    (props.disabled || parentDisabled.value) && val.push($css.ui3nBreadcrumbDisabled);
    return val;
  });

  function onClick(ev: MouseEvent) {
    emits('click', ev);
  }
</script>

<template>
  <div
    :class="cssClasses"
    v-on="isActive && !(disabled || parentDisabled) ? { click: onClick } : {}"
  >
    <span :class="$style.content">
      <slot />
    </span>

    <div :class="$style.ui3nBreadcrumbSeparator">
      <slot
        v-if="typeof slots.separator === 'function'"
        name="separator"
      />

      <component
        v-else-if="parentContext?.customSeparatorSlot"
        :is="parentContext.customSeparatorSlot"
      />

      <span v-else>{{ separatorValue }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nBreadcrumb {
    --ui3n-breadcrumb-font-size: 16px;
    --ui3n-breadcrumb-padding-inline: 4px;
    --ui3n-breadcrumb-separator-distance: 8px;
    --ui3n-breadcrumb-color-default: var(--color-text-block-primary-default);
    --ui3n-breadcrumb-color-selected: var(--color-text-block-accent-default);

    display: flex;
    align-items: center;

    &:last-child {
      .ui3nBreadcrumbSeparator {
        display: none !important;
      }
    }
  }

  .content {
    font-size: var(--ui3n-breadcrumb-font-size);
    line-height: 1.25;
    color: var(--ui3n-breadcrumb-color-default);
  }

  .ui3nBreadcrumbSeparator {
    display: flex;
    align-items: center;
    margin: 0 var(--ui3n-breadcrumb-separator-distance);
    padding-left: var(--ui3n-breadcrumb-padding-inline);
    color: var(--color-text-block-tertiary-default);
  }

  .ui3nBreadcrumbActive {
    .content {
      &:hover {
        cursor: pointer;
        color: var(--ui3n-breadcrumb-color-selected);
      }
    }
  }

  .ui3nBreadcrumbDisabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;
  }
</style>
