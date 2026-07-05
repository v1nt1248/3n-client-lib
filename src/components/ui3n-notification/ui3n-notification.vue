<script lang="ts" setup>
  import { computed, onMounted, onBeforeUnmount, ref, useCssModule } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nNotificationProps } from './types';

  const props = withDefaults(defineProps<Ui3nNotificationProps>(), {
    type: 'info',
    position: 'center',
    duration: 0,
    withIcon: true,
    onOpen: () => {},
    onClose: () => {},
  });

  let timerId: ReturnType<typeof setTimeout> | null = null;

  const $style = useCssModule();

  const currentTypeConfig = computed(() => {
    const stylesByTypes = {
      success: {
        color: 'var(--success-content-default)',
        icon: 'round-check-circle',
        iconColor: 'var(--success-fill-default)',
        iconRotate: 0,
      },
      warning: {
        color: 'var(--warning-content-default)',
        icon: 'round-warning',
        iconColor: 'var(--warning-fill-default)',
        iconRotate: 0,
      },
      info: {
        color: 'var(--info-content-default)',
        icon: 'round-info',
        iconColor: 'var(--info-fill-default)',
        iconRotate: 180,
      },
      error: {
        color: 'var(--error-content-default)',
        icon: 'round-info',
        iconColor: 'var(--error-fill-default)',
        iconRotate: 180,
      },
    };
    return stylesByTypes[props.type || 'info'];
  });

  const mainCssClasses = computed(() => {
    const val = [$style.ui3nNotification, $style[`${props.type}Type`], $style[`${props.position}Position`]];
    props.withIcon && val.push($style.withIcon);
    return val;
  });

  function closeNotification() {
    if (props.onClose) {
      props.onClose();
    }
  }

  onMounted(() => {
    if (props.onOpen) {
      props.onOpen();
    }

    if (props.duration > 0) {
      timerId = setTimeout(() => {
        closeNotification();
      }, props.duration);
    }
  });

  onBeforeUnmount(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
  });
</script>

<template>
  <div
    :id="id"
    :class="mainCssClasses"
  >
    <div
      v-if="withIcon"
      :class="$style.ui3nNotificationIcon"
    >
      <ui3n-icon
        :icon="currentTypeConfig.icon"
        size="16"
        :rotate="currentTypeConfig.iconRotate"
        :color="currentTypeConfig.iconColor"
      />
    </div>

    <div :class="$style.ui3nNotificationContent">
      {{ content }}
    </div>

    <ui3n-button
      v-if="!duration"
      type="icon"
      size="small"
      color="transparent"
      icon="round-close"
      :icon-color="currentTypeConfig.color"
      icon-size="16"
      :class="$style.closeBtn"
      @click="closeNotification"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nNotification {
    --ui3n-notification-width: 380px;
    --ui3n-notification-font-size: 12px;
    --ui3n-notification-border-radius: 4px;
    --ui3n-notification-margin-bottom: 4px;
    --ui3n-notification-icon-size: 32px;

    display: flex;
    position: relative;
    box-sizing: border-box;
    z-index: 5000;
    border-radius: var(--ui3n-notification-border-radius);
    outline: 1px solid var(--color-border-control-tritery-default);
    padding: var(--spacing-m);
    max-width: var(--ui3n-notification-width);
    margin-bottom: var(--ui3n-notification-margin-bottom);
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .withIcon {
    justify-content: flex-start;
  }

  .ui3nNotificationIcon {
    position: relative;
    min-width: var(--ui3n-notification-icon-size);
    width: var(--ui3n-notification-icon-size);
    min-height: var(--ui3n-notification-icon-size);
    height: var(--ui3n-notification-icon-size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .ui3nNotificationContent {
    position: relative;
    flex-grow: 2;
    font-size: var(--ui3n-notification-font-size);
    font-weight: 500;
    line-height: 1.33;
    padding-right: 20px;
  }

  .closeBtn {
    position: absolute;
    z-index: 1;
    top: 6px;
    right: 6px;
  }

  .infoType {
    background-color: var(--info-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--info-content-default);
    }

    .ui3nNotificationContent {
      color: var(--info-content-default);
    }
  }

  .successType {
    background-color: var(--success-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--success-content-default);
    }

    .ui3nNotificationContent {
      color: var(--success-content-default);
    }
  }

  .warningType {
    background-color: var(--warning-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--warning-content-default);
    }

    .ui3nNotificationContent {
      color: var(--warning-content-default);
    }
  }

  .errorType {
    background-color: var(--error-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--error-content-default);
    }

    .ui3nNotificationContent {
      color: var(--error-content-default);
    }
  }

  .leftPosition {
    margin-left: 0;
    margin-right: auto;
  }

  .centerPosition {
    margin-left: auto;
    margin-right: auto;
  }

  .rightPosition {
    margin-left: auto;
    margin-right: 0;
  }
</style>
