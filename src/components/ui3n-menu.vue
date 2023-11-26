<script lang="ts" setup>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, onMounted, ref } from 'vue'
  import { default as vClickOutside } from '../directives/ui3n-click-outside'

  export interface Ui3nMenuProps {
    offsetX?: number;
    offsetY?: number;
    closeOnClick?: boolean;
    closeOnClickOutside?: boolean;
    disabled?: boolean;
  }

  export interface Ui3nMenuEmits {
    (ev: 'open'): void;
    (ev: 'opened'): void;
    (ev: 'close'): void;
    (ev: 'closed'): void;
    (ev: 'click-outside'): void;
  }

  export interface Ui3nMenuSlots {
    default: () => any;
    menu?: () => any;
  }

  const props = withDefaults(defineProps<Ui3nMenuProps>(), {
    offsetX: 0,
    offsetY: 0,
    closeOnClick: true,
    closeOnClickOutside: true,
    disabled: false,
  })
  const emits = defineEmits<Ui3nMenuEmits>()
  defineSlots<Ui3nMenuSlots>()

  const menuElement = ref<HTMLDivElement | null>(null)
  const menuTriggerElement = ref<HTMLDivElement | null>(null)
  const isShow = ref(false)
  const defaultAnimationDuration = 400
  const menuContentStyle = computed(() => {
    if (!props.offsetX && !props.offsetY) {
      return {}
    }
    return {
      ...(props.offsetX && { left: `${props.offsetX}px` }),
      ...(props.offsetY && { top: `${menuTriggerElement.value!.clientHeight + props.offsetY}px` }),
    }
  })

  onMounted(() => {
    menuElement.value!.style.setProperty('--menu-animation-duration', `${defaultAnimationDuration}ms`)
  })

  const toggleMenu = () => {
    isShow.value = !isShow.value
  }

  const onContentClick = () => {
    isShow.value = false
  }
  const onClickOutside = () => {
    emits('click-outside')
    if (props.closeOnClickOutside) {
      isShow.value = false
    }
  }
</script>

<template>
  <div
    ref="menuElement"
    class="ui3n-menu"
  >
    <div
      ref="menuTriggerElement"
      class="ui3n-menu__trigger"
      @click.stop="toggleMenu"
    >
      <slot />
    </div>

    <transition
      name="menu"
      :duration="defaultAnimationDuration"
      @before-enter="emits('open')"
      @after-enter="emits('opened')"
      @before-leave="emits('close')"
      @after-leave="emits('closed')"
    >
      <div
        v-if="isShow"
        v-click-outside="onClickOutside"
        :style="menuContentStyle"
        class="ui3n-menu__content"
        v-on="props.closeOnClick ? { click: onContentClick } : {}"
      >
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-menu {
    --menu-animation-duration: 400ms;

    position: relative;
    overflow: visible;

    .menu-enter-active,
    .menu-leave-active {
      transition: opacity var(--menu-animation-duration);
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
      background-color: var(--system-white, #fff);
      z-index: 1000;
      @include elevation(3);
    }
  }
</style>
