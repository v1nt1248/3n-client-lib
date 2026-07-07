<script setup lang="ts">
  import { ref } from 'vue';

  const notifications = ref(true);
  const darkMode = ref(false);
  const autoSave = ref(true);
</script>

<template>
  <div class="switch-container">
    <Ui3nSwitch v-model="notifications"> Enable notifications </Ui3nSwitch>

    <Ui3nSwitch v-model="darkMode"> Dark mode </Ui3nSwitch>

    <Ui3nSwitch v-model="autoSave"> Auto-save </Ui3nSwitch>
  </div>
</template>

<style scoped>
  .switch-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
