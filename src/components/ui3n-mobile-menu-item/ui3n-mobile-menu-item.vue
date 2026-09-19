<script lang="ts" setup generic="T extends Ui3nMobileMenuItemBase">
  import type { Ui3nMobileMenuItemBase, Ui3nMobileMenuItemProps, Ui3nMobileMenuItemEmits } from './types';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';

  const props = defineProps<Ui3nMobileMenuItemProps<T>>();
  const emits = defineEmits<Ui3nMobileMenuItemEmits<T>>();

  async function selectMenuItem() {
    emits('selectItem', props.item);
  }
</script>

<template>
  <div
    :class="[$style.menuItem, isActive && $style.menuItemSelected]"
    @click="selectMenuItem"
  >
    <ui3n-icon
      v-if="item.icon"
      :icon="item.icon"
      size="20"
      color="var(--color-icon-control-secondary-default)"
    />
    <span :class="$style.menuItemName">
      {{ item.name }}
    </span>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .menuItem {
    display: flex;
    width: 100%;
    height: var(--ui3n-mobile-menu-item-height, 48px);
    border-radius: var(--ui3n-mobile-menu-item-border-radius, 8px);
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--ui3n-mobile-menu-item-gap, 8px);
    padding: 0 var(--ui3n-mobile-menu-item-padding-inline, 8px);
    cursor: pointer;

    .menuItemName {
      font-size: var(--ui3n-mobile-menu-item-font-size, 14px);
      font-weight: 600;
      line-height: var(--ui3n-mobile-menu-item-line-height, 20px);
      color: var(--color-text-control-primary-default);
    }

    &:hover,
    &.menuItemSelected {
      background-color: var(--color-bg-control-primary-hover);

      & > div {
        color: var(--color-icon-control-accent-default);
        animation: bounceOnce 0.4s ease-in-out forwards;
      }
    }
  }

  @keyframes bounceOnce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25); /* Пик увеличения */
    }
    100% {
      transform: scale(1); /* Финал анимации */
    }
  }
</style>
