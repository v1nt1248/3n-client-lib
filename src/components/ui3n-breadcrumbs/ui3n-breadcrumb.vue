<script lang="ts" setup>
import { computed, getCurrentInstance, useCssModule } from 'vue';
import type { Ui3nBreadcrumbEmits, Ui3nBreadcrumbProps, Ui3nBreadcrumbSlots } from './types';

const props = withDefaults(defineProps<Ui3nBreadcrumbProps>(), {
  separator: undefined,
  isActive: false,
  disabled: false,
});
const emits = defineEmits<Ui3nBreadcrumbEmits>();
defineSlots<Ui3nBreadcrumbSlots>();

const $css = useCssModule();

const separatorValue = computed(() => {
  if (props.separator) {
    return props.separator;
  }

  const instance = getCurrentInstance();
  return instance?.parent?.props.separator || '/';
});

const parentDisabled = computed(() => {
  const instance = getCurrentInstance();
  return instance?.parent?.props.disabled || false;
});

const cssClasses = computed(() => {
  const val = [$css.ui3nBreadcrumb];
  props.isActive && val.push($css.ui3nBreadcrumbActive);
  (props.disabled || parentDisabled.value) && val.push($css.ui3nBreadcrumbDisabled);

  return val;
});

const onClick = (ev: Event) => {
  emits('click', ev);
};
</script>

<template>
  <div
    :class="cssClasses"
    v-on="isActive && !(disabled || parentDisabled) ? { click: onClick } : {}"
  >
    <slot />
    <div
      v-if="isActive"
      :class="$style.ui3nBreadcrumbSeparator"
    >
      <slot name="separator">
        <span>{{ separatorValue }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.ui3nBreadcrumb {
  --ui3n-breadcrumb-font-size: var(--spacing-m);
  --ui3n-breadcrumb-color-default: var(--color-text-block-primary-default);
  --ui3n-breadcrumb-color-selected: var(--color-text-block-accent-default);

  position: relative;
  display: flex;
  align-items: center;
}

.separator {
  display: flex;
  align-items: center;
  margin: 0 var(--spacing-s);
}

.ui3nBreadcrumbActive {
  font-size: var(--ui3n-breadcrumb-font-size);
  line-height: 1.25;
  color: var(--ui3n-breadcrumb-color-default);

  &:hover {
    cursor: pointer;
    color: var(--ui3n-breadcrumb-color-selected);

    .ui3nBreadcrumbSeparator {
      color: var(--ui3n-breadcrumb-color-default);
    }
  }
}

.ui3nBreadcrumbDisabled {
  cursor: default;
  pointer-events: none;
}
</style>
