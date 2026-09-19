<script lang="ts" setup>
  import { computed, onMounted, onBeforeUnmount, useCssModule } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import { toCssLength } from '../../utils/ui/to-css-length';
  import type { Ui3nNotificationProps } from './types';

  const props = withDefaults(defineProps<Ui3nNotificationProps>(), {
    type: 'info',
    position: 'center',
    duration: 0,
    withIcon: true,
    borderRadius: 8,
    onOpen: () => {},
    onClose: () => {},
  });

  let timerId: ReturnType<typeof setTimeout> | null = null;

  const $style = useCssModule();

  const currentTypeConfig = computed(() => {
    const stylesByTypes = {
      success: {
        icon: 'round-check-circle',
        iconColor: 'var(--success-fill-default)',
        iconRotate: 0,
      },
      warning: {
        icon: 'round-warning',
        iconColor: 'var(--warning-fill-default)',
        iconRotate: 0,
      },
      info: {
        icon: 'round-info',
        iconColor: 'var(--info-fill-default)',
        iconRotate: 180,
      },
      error: {
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

  const inlineStyles = computed(() => ({
    '--ui3n-notification-border-radius': toCssLength(props.borderRadius, '8px'),
  }));

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
    :style="inlineStyles"
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
      icon-size="16"
      :class="$style.closeBtn"
      @click="closeNotification"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nNotification {
    --_notification-width: var(--ui3n-notification-width, 380px);
    --_notification-font-size: var(--ui3n-notification-font-size, 12px);
    --_notification-border-radius: var(--ui3n-notification-border-radius, 8px);
    --_notification-margin-bottom: var(--ui3n-notification-margin-bottom, 4px);
    --_notification-icon-size: var(--ui3n-notification-icon-size, 32px);
    --_notification-padding: var(--ui3n-notification-padding, 16px);
    --_notification-text-color: var(--ui3n-notification-text-color, var(--default-content-default));

    display: flex;
    position: relative;
    box-sizing: border-box;
    z-index: 5000;
    border-radius: var(--_notification-border-radius);
    outline: 1px solid var(--color-border-block-primary-default);
    padding: var(--_notification-padding);
    max-width: var(--_notification-width);
    margin-bottom: var(--_notification-margin-bottom);
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: var(--_notification-text-color);
  }

  .withIcon {
    justify-content: flex-start;
  }

  .ui3nNotificationIcon {
    position: relative;
    min-width: var(--_notification-icon-size);
    width: var(--_notification-icon-size);
    min-height: var(--_notification-icon-size);
    height: var(--_notification-icon-size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .ui3nNotificationContent {
    position: relative;
    flex-grow: 2;
    font-size: var(--_notification-font-size);
    font-weight: 500;
    line-height: 1.33;
    padding-right: 20px;
    color: var(--_notification-text-color);
  }

  .closeBtn {
    position: absolute;
    z-index: 1;
    top: 6px;
    right: 6px;
    color: var(--_notification-text-color);
  }

  .infoType {
    --_notification-text-color: var(--ui3n-notification-text-color, var(--info-content-default));

    background-color: var(--info-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--info-content-default);
    }

    :global(.dark-theme) &,
    :global(.midnight-theme) &,
    :global(.dark2-theme) & {
      --_notification-text-color: var(--ui3n-notification-text-color, oklch(from var(--info-content-default) calc(l + 0.15) c h));
    }
  }

  .successType {
    --_notification-text-color: var(--ui3n-notification-text-color, var(--success-content-default));

    background-color: var(--success-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--success-content-default);
    }

    :global(.dark-theme) &,
    :global(.midnight-theme) &,
    :global(.dark2-theme) & {
      --_notification-text-color: var(--ui3n-notification-text-color, oklch(from var(--success-content-default) calc(l + 0.15) c h));
    }
  }

  .warningType {
    --_notification-text-color: var(--ui3n-notification-text-color, var(--warning-content-default));

    background-color: var(--warning-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--warning-content-default);
    }

    :global(.dark-theme) &,
    :global(.midnight-theme) &,
    :global(.dark2-theme) & {
      --_notification-text-color: var(--ui3n-notification-text-color, color-mix(in oklch, var(--warning-content-default) 45%, white));
    }
  }

  .errorType {
    --_notification-text-color: var(--ui3n-notification-text-color, var(--error-content-default));

    background-color: var(--error-fill-default);

    .ui3nNotificationIcon {
      background-color: var(--error-content-default);
    }

    :global(.dark-theme) &,
    :global(.midnight-theme) &,
    :global(.dark2-theme) & {
      --_notification-text-color: var(--ui3n-notification-text-color, color-mix(in oklch, var(--error-content-default) 45%, white));
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
