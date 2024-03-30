<script lang="ts" setup>
  import { computed, getCurrentInstance } from 'vue';

  export interface Ui3nBreadcrumdProps {
    separator?: string | undefined;
    isActive?: boolean;
    disabled?: boolean;
  }
  export interface Ui3nBreadcrumdEmits {
    (ev: 'click', value: Event): void;
  }
  export interface Ui3nBreadcrumdSlots {
    separator: () => unknown;
    default: () => unknown;
  }

  const props = withDefaults(
    defineProps<Ui3nBreadcrumdProps>(),
    {
      separator: undefined,
      isActive: false,
      disabled: false,
    },
  )

  const emits = defineEmits<Ui3nBreadcrumdEmits>()
  defineSlots<Ui3nBreadcrumdSlots>()

  const separatorValue = computed(() => {
    if (props.separator) {
      return props.separator
    }

    const instance = getCurrentInstance()
    return instance?.parent?.props.separator || '/'
  })

  const parentDisabled = computed(() => {
    const instance = getCurrentInstance()
    return instance?.parent?.props.disabled || false;
  })

  const onClick = (ev: Event) => {
    emits('click', ev);
  }
</script>

<template>
  <div
    :class="[
      'ui3n-breadcrumb',
      {
        'ui3n-breadcrumb--active': isActive,
        'ui3n-breadcrumb--disabled': disabled || parentDisabled,
      },
    ]"
    v-on="isActive && !(disabled || parentDisabled) ? { click: onClick } : {}"
  >
    <slot />
    <div
      v-if="isActive"
      class="ui3n-breadcrumb__separator"
    >
      <slot name="separator">
        <span>{{ separatorValue }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-breadcrumb {
    --ui3n-breadcrumb-font-size: 16px;
    --ui3n-breadcrumb-color-default: var(--black-90, #212121);
    --ui3n-breadcrumb-color-selected: var(--blue-main, #0090ec);

    position: relative;
    display: flex;
    align-items: center;

    &__separator {
      display: flex;
      align-items: center;
      margin: 0 var(--base-size, 8px);
    }

    &--active {
      font-size: var(--ui3n-breadcrumb-font-size);
      line-height: 1.25;
      color: var(--ui3n-breadcrumb-color-default);

      &:hover {
        cursor: pointer;
        color: var(--ui3n-breadcrumb-color-selected);
      }
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
    }
  }
</style>
