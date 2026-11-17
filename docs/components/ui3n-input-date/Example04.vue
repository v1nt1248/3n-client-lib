<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';

  const date = ref<Date | null>(new Date(2026, 10, 18));

  const rules = [
    (value: unknown) => Boolean(value) || 'Date is required',
    (value: unknown) => {
      if (typeof value !== 'string' || !value) {
        return true;
      }

      const [year, month, day] = value.slice(0, 10).split('-').map(Number);
      const parsed = new Date(year, month - 1, day);

      if (
        parsed.getFullYear() !== year ||
        parsed.getMonth() !== month - 1 ||
        parsed.getDate() !== day
      ) {
        return 'Enter a valid date';
      }

      return parsed.getDay() !== 0 || 'Sundays are not allowed';
    },
  ];
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nInputDate
      v-model="date"
      label="Working day"
      placeholder="YYYY-MM-DD"
      clearable
      validate-at-startup
      :rules="rules"
    />

    <p class="result-text">
      Selected value: <strong>{{ date ? date.toLocaleDateString() : 'null' }}</strong>
    </p>
    <p class="hint-text">
      Invalid text stays in the field but does not update the model; the rule
      reports the error.
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 320px;
  }

  .result-text,
  .hint-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .hint-text {
    line-height: 1.4;
  }
</style>
