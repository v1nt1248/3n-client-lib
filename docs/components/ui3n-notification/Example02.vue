<template>
  <div class="notifications-container">
    <Ui3nNotification
      type="success"
      content="Operation completed successfully"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="warning"
      content="Please review your input"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="info"
      content="Here is some useful information"
      :on-close="() => {}"
    />
    <Ui3nNotification
      type="error"
      content="An error occurred during processing"
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