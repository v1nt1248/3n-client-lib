<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const props = defineProps<{
    offsetX?: number;
    offsetY?: number;
    closeOnClick?: boolean;
    disabled?: boolean;
  }>()

  const params = computed(() => {
    const {
      offsetX = 0,
      offsetY = 0,
      closeOnClick = false,
      disabled = false,
    } = props
    return { offsetX, offsetY, closeOnClick, disabled }
  })

  const isShow = ref(false)

  const toggleMenu = () => {
    isShow.value = !isShow.value
  }
</script>

<template>
  <div class="ui3n-menu">
    <div
      class="ui3n-menu__trigger"
      @click.stop="toggleMenu"
    >
      <slot />
    </div>

    <transition
      name="menu"
      :duration="400"
    >
      <div
        v-if="isShow"
        class="ui3n-menu__content"
      >
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-menu {
    position: relative;
    overflow: visible;

    .menu-enter-active,
    .menu-leave-active {
      transition: opacity 0.4s;
    }

    .menu-enter-from,
    .menu-leave-to {
      opacity: 0;
    }

    &__trigger {
      position: relative;
    }

    &__content {
      position: absolute;
      border-radius: 4px;

      @include elevation();
    }
  }
</style>
