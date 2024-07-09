<script lang="ts" setup>
import { onMounted } from 'vue';
import Ui3nIcon from './ui3n-icon.vue';
import Ui3nButton from './ui3n-button.vue';
import type { Ui3nNotificationProps } from '../constants';

const props = withDefaults(
  defineProps<Ui3nNotificationProps>(),
  {
    type: 'info',
    position: 'center',
    duration: 0,
    withIcon: true,
    onOpen: () => void (0),
    onClose: () => void (0),
  },
);

const stylesByTypes = {
  success: {
    color: 'var(--success-content-default)',
    icon: 'warning',
    iconColor: 'var(--success-fill-default)',
    iconRotate: 0,
  },
  warning: {
    color: 'var(--warning-content-default)',
    icon: 'warning',
    iconColor: 'var(--warning-fill-default)',
    iconRotate: 0,
  },
  info: {
    color: 'var(--info-content-default)',
    icon: 'info',
    iconColor: 'var(--info-fill-default)',
    iconRotate: 90,
  },
  error: {
    color: 'var(--error-content-default)',
    icon: 'info',
    iconColor: 'var(--error-fill-default)',
    iconRotate: 90,
  },
};

onMounted(() => {
  if (props.duration > 500) {
    setTimeout(() => {
      props.onClose();
    }, props.duration);
  }
});

const closeNotification = () => {
  props.onClose();
};
</script>

<template>
  <div
    :id="id"
    :class="[$style.notification, $style[`${type}Type`], $style[`${position}Position`], withIcon && $style.withIcon]"
  >
    <div v-if="withIcon" :class="$style.icon">
      <ui3n-icon
        :icon="stylesByTypes[type].icon"
        width="16"
        height="16"
        :rotate="stylesByTypes[type].iconRotate"
        :color="stylesByTypes[type].iconColor"
      />
    </div>


    <div :class="$style.content">
      {{ content }}
    </div>

    <ui3n-button
      v-if="!props.duration"
      type="icon"
      size="small"
      color="transparent"
      icon="close"
      :icon-color="stylesByTypes[type].color"
      :class="$style.closeBtn"
      @click="closeNotification"
    />
  </div>
</template>

<style lang="scss" module>
.notification {
  --ui3n-notification-width: 380px;

  display: flex;
  position: relative;
  z-index: 5000;
  border-radius: var(--spacing-s);
  outline: 1px solid var(--color-border-control-tritery-default);
  padding: var(--spacing-m);
  max-width: var(--ui3n-notification-width);
  margin-bottom: var(--spacing-s);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-s);
}

.withIcon {
  justify-content: flex-start;
}

.icon {
  position: relative;
  min-width: var(--spacing-l);
  width: var(--spacing-l);
  min-height: var(--spacing-l);
  height: var(--spacing-l);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: relative;
  flex-grow: 2;
  font-size: var(--font-12);
  font-weight: 500;
  line-height: var(--font-16);
}

.closeBtn {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
}

.infoType {
  background-color: var(--info-fill-default);

  .icon {
    background-color: var(--info-content-default);
  }

  .content {
    color: var(--info-content-default);
  }
}

.successType {
  background-color: var(--success-fill-default);

  .icon {
    background-color: var(--success-content-default);
  }

  .content {
    color: var(--success-content-default);
  }
}

.warningType {
  background-color: var(--warning-fill-default);

  .icon {
    background-color: var(--warning-content-default);
  }

  .content {
    color: var(--warning-content-default);
  }
}

.errorType {
  background-color: var(--error-fill-default);

  .icon {
    background-color: var(--error-content-default);
  }

  .content {
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
