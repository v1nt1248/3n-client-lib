<template>
  <div class="switch-container">
    <Ui3nSwitch
      v-model="small"
      :size="20"
      color="#4caf50"
    >
      Small green
    </Ui3nSwitch>
    <Ui3nSwitch
      v-model="medium"
      :size="30"
      color="#2196f3"
    >
      Medium blue
    </Ui3nSwitch>
    <Ui3nSwitch
      v-model="large"
      :size="40"
      color="#ff9800"
    >
      Large orange
    </Ui3nSwitch>
    <Ui3nSwitch
      v-model="disabled"
      :disabled="true"
    >
      Disabled
    </Ui3nSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const small = ref(true);
const medium = ref(true);
const large = ref(false);
const disabled = ref(true);
</script>

<style scoped>
.switch-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>