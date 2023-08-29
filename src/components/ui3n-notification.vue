ui<script lang="ts" setup>
  import { computed  } from 'vue'
  import Ui3nIcon from './ui3n-icon.vue'
  import Ui3nButton from './ui3n-button.vue'

  const props = defineProps<{
    id?: string;
    type?: 'success' | 'warning' | 'info' | 'error';
    content: string;
    icon?: string;
    iconSize?: string | number;
    iconColor?: string;
    position?: 'left' | 'center' | 'right';
    duration?: number;
    teleport?: string;
    onOpen?: () => void;
    onClose?: () => void;
  }>()
  const params = computed(() => {
    const {
      id,
      type = 'info',
      content,
      icon,
      iconSize = '16',
      iconColor = 'var(--black-30, #b3b3b3)',
      position = 'center',
      duration = 0,
      onOpen = () => void(0),
      onClose = () => void(0),
    } = props
    return { id, type, content, icon, iconSize, iconColor, position, duration, onOpen, onClose }
  })

  const closeNotification = () => {
    params.value.onClose()
  }
</script>

<template>
  <div
    :id="params.id"
    :class="[
      'ui3n-notification',
      `ui3n-notification--${params.type}`,
      `ui3n-notification--${params.position}`,
      {
        'ui3n-notification--with-icon': params.icon,
      },
    ]"
  >
    <ui3n-icon
      v-if="params.icon"
      :icon="params.icon"
      :width="params.iconSize"
      :height="params.iconSize"
      :color="params.iconColor"
    />

    <div class="ui3n-notification__content">
      {{ params.content }}
    </div>

    <ui3n-button
      v-if="!props.duration"
      round
      color="transparent"
      icon="close"
      icon-size="12"
      icon-color="var(--system-white, #fff)"
      class="ui3n-notification__close"
      @click="closeNotification"
    />
  </div>
</template>

<style lang="scss" scoped>
  .ui3n-notification {
    display: flex;
    position: relative;
    z-index: 5000;
    border-radius: var(--half-size, 4px);
    padding: var(--base-size, 8px);
    max-width: 400px;
    margin-bottom: var(--base-size);

    &--with-icon {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .ui3n-notification__content {
        padding-left: var(--base-size, 8px);
      }
    }

    &__content {
      position: relative;
      flex-grow: 2;
      font-size: var(--font-13, 13px);
      font-weight: 400;
      line-height: 1.5;
      color: var(--system-white, #fff);
    }

    &__close {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
    }

    &--success {
      background-color: rgb(16, 196, 143);
    }

    &--warning {
      background-color: rgb(255, 136,0);
    }

    &--info {
      background-color: rgb(16, 175, 239);
    }

    &--error {
      background-color: rgb(239, 83, 80);
    }

    &--left {
      margin-left: 0;
      margin-right: auto;
    }

    &--center {
      margin-left: auto;
      margin-right: auto;
    }

    &--right {
      margin-left: auto;
      margin-right: 0;
    }
  }
</style>
