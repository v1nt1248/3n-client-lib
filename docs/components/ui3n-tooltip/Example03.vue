<template>
  <div class="tooltip-container">
    <Ui3nTooltip trigger="click">
      <Ui3nButton>Click for rich tooltip</Ui3nButton>
      <template #content>
        <div class="custom-content">
          <h4>User Profile</h4>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </template>
    </Ui3nTooltip>
  </div>
</template>

<style scoped>
.tooltip-container {
  padding: 40px;
}

.custom-content {
  padding: 8px;
}

.custom-content h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.custom-content p {
  margin: 4px 0;
  font-size: 12px;
}
</style>