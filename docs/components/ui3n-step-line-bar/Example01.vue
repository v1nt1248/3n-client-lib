<template>
  <div class="step-container">
    <Ui3nStepLineBar
      label="Registration"
      :current="2"
      :steps="5"
    />

    <Ui3nStepLineBar
      label="Profile Setup"
      :current="4"
      :steps="6"
    />

    <Ui3nStepLineBar
      label="Verification"
      :current="1"
      :steps="3"
    />
  </div>
</template>

<style scoped>
  .step-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 300px;
  }
</style>
