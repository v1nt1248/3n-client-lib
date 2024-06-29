<script lang="ts" setup>
  import { computed, getCurrentInstance } from 'vue';

  export interface Ui3nBreadcrumbProps {
    separator?: string | undefined;
    isActive?: boolean;
    disabled?: boolean;
  }
  export interface Ui3nBreadcrumbEmits {
    (ev: 'click', value: Event): void;
  }
  export interface Ui3nBreadcrumbSlots {
    separator: () => unknown;
    default: () => unknown;
  }

  const props = withDefaults(
    defineProps<Ui3nBreadcrumbProps>(),
    {
      separator: undefined,
      isActive: false,
      disabled: false,
    },
  );

  const emits = defineEmits<Ui3nBreadcrumbEmits>();
  defineSlots<Ui3nBreadcrumbSlots>();

  const separatorValue = computed(() => {
    if (props.separator) {
      return props.separator
    }

    const instance = getCurrentInstance()
    return instance?.parent?.props.separator || '/'
  });

  const parentDisabled = computed(() => {
    const instance = getCurrentInstance()
    return instance?.parent?.props.disabled || false
  });

  const onClick = (ev: Event) => {
    emits('click', ev)
  }
</script>

<template>
  <div
    :class="[
      $style.breadcrumb,
      isActive && $style.active,
      (disabled || parentDisabled) && $style.disabled,
    ]"
    v-on="isActive && !(disabled || parentDisabled) ? { click: onClick } : {}"
  >
    <slot />
    <div v-if="isActive" :class="$style.separator"
    >
      <slot name="separator">
        <span>{{ separatorValue }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.breadcrumb {
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

.active {
  font-size: var(--ui3n-breadcrumb-font-size);
  line-height: 1.25;
  color: var(--ui3n-breadcrumb-color-default);

  &:hover {
    cursor: pointer;
    color: var(--ui3n-breadcrumb-color-selected);

    .separator {
      color: var(--ui3n-breadcrumb-color-default);
    }
  }
}

.disabled {
  cursor: default;
  pointer-events: none;
}
</style>
