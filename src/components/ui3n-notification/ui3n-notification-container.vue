<script lang="ts" setup>
  import { ref } from 'vue';
  import Ui3nNotification from './ui3n-notification.vue';
  import type { Ui3nNotificationProps } from './types';

  interface IdentifiableNotice extends Ui3nNotificationProps {
    id: string;
  }

  const notices = ref<IdentifiableNotice[]>([]);

  function add(notice: IdentifiableNotice) {
    notices.value.push(notice);
  }

  function remove(id: string) {
    notices.value = notices.value.filter(n => n.id !== id);
  }

  function onClose(notice: IdentifiableNotice) {
    if (notice.onClose) {
      notice.onClose();
    }

    remove(notice.id);
  }

  defineExpose({ add, remove });
</script>

<template>
  <div
    id="ui3n-notifications-container"
    :class="$style.ui3nNotificationsWrapper"
  >
    <ui3n-notification
      v-for="notice in notices"
      :key="notice.id"
      v-bind="notice"
      :on-close="() => onClose(notice)"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nNotificationsWrapper {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 380px;
    width: calc(100% - 32px);
    pointer-events: none;
  }

  .ui3nNotificationsWrapper :global([class*='ui3nNotification']) {
    pointer-events: auto;
  }
</style>
