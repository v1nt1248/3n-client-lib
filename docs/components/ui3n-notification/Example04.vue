<template>
  <div class="notifications-container">
    <Ui3nNotification
      type="info"
      content="Square corners (borderRadius: 0)"
      :border-radius="0"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="success"
      content="Default radius (borderRadius: 8px)"
      :border-radius="8"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="warning"
      content="Large radius (borderRadius: 16px)"
      :border-radius="16"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="error"
      content="Pill shape (borderRadius: 24px)"
      :border-radius="24"
      :on-close="() => {}"
    />
  </div>
</template>

<style scoped>
.notifications-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
