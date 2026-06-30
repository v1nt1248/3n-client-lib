<template>
  <div class="notifications-container">
    <Ui3nNotification
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :content="notification.content"
      :duration="3000"
      :on-close="() => removeNotification(notification.id)"
    />
    <Ui3nButton @click="addNotification">
      Add Notification
    </Ui3nButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type NotificationType = 'success' | 'warning' | 'info' | 'error';

interface Notification {
  id: number;
  type: NotificationType;
  content: string;
}

const notifications = ref<Notification[]>([]);
let nextId = 1;

const types: NotificationType[] = ['success', 'warning', 'info', 'error'];
const messages = [
  'File uploaded successfully',
  'Please check your settings',
  'New update available',
  'Connection lost',
];

const addNotification = () => {
  const typeIndex = Math.floor(Math.random() * types.length);
  notifications.value.push({
    id: nextId++,
    type: types[typeIndex],
    content: messages[typeIndex],
  });
};

const removeNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};
</script>

<style scoped>
.notifications-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>