ui
<script lang="ts" setup>
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

const closeNotification = () => {
  props.onClose();
};
</script>

<template>
  <div
    :id="id"
    :class="[$style.notification, `${type}Type`, `${position}Position`, withIcon && $style.withIcon]"
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

.content {
  position: relative;
  flex-grow: 2;
  font-size: var(--font-12);
  font-weight: 500;
  line-height: 1.2;
}

.closeBtn {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
}

.successType {

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
