<script setup lang="ts">
  import { ref } from 'vue';

  const small = ref(true);
  const medium = ref(true);
  const large = ref(false);

  const isDisabledChecked = ref(true);
</script>

<template>
  <div class="switch-container">
    <Ui3nSwitch
      v-model="small"
      :size="20"
      color="#4caf50"
    >
      Small green (Size 20)
    </Ui3nSwitch>

    <Ui3nSwitch
      v-model="medium"
      :size="30"
      color="#2196f3"
    >
      Medium blue (Size 30)
    </Ui3nSwitch>

    <Ui3nSwitch
      v-model="large"
      :size="40"
      color="#ff9800"
    >
      Large orange (Size 40)
    </Ui3nSwitch>

    <Ui3nSwitch
      v-model="isDisabledChecked"
      :disabled="true"
    >
      Disabled state
    </Ui3nSwitch>
  </div>
</template>

<style scoped>
  .switch-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
</style>
