<template>
  <Ui3nNotification
    content="This is a basic notification message"
    :on-close="handleClose"
  />
</template>

<script setup lang="ts">
const handleClose = () => {
  console.log('Notification closed');
};
</script>