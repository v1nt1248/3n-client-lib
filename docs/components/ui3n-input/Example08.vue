<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';

  const phone = ref('');
  const time = ref('');
</script>

<template>
  <div class="mask-demo">
    <div class="mask-demo__field">
      <Ui3nInput
        v-model="phone"
        label="Phone (masked model)"
        mask="+{1} (000) 000-00-00"
        placeholder="+1 (___) ___-__-__"
        clearable
      />
      <span>v-model: {{ phone }}</span>
    </div>

    <div class="mask-demo__field">
      <Ui3nInput
        v-model="time"
        label="Time (unmasked model)"
        mask="00:00"
        mask-value-mode="unmasked"
        placeholder="HH:mm"
        clearable
      />
      <span>v-model: {{ time }}</span>
    </div>
  </div>
</template>

<style scoped>
  .mask-demo {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .mask-demo__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 220px;
    font-size: 12px;
  }
</style>
