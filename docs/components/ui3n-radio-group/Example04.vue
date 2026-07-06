<script setup lang="ts">
  import { ref } from 'vue';
  import { Ui3nRadio, Ui3nRadioGroup } from '@';

  const selected = ref('like');
</script>

<template>
  <div class="radio-group-container">
    <Ui3nRadioGroup
      v-model="selected"
      name="custom-icons-group"
    >
      <Ui3nRadio
        checked-value="like"
        unchecked-value="unlike"
        color="var(--color-bg-button-error-default, #e91e63)"
      >
        <template #checkedIcon>
          <Ui3nIcon
            icon="round-done-all"
            color="green"
            :size="16"
          />
        </template>

        <template #uncheckedIcon>
          <Ui3nIcon
            icon="round-done"
            color="orange"
            :size="16"
          />
        </template>
        I love this design
      </Ui3nRadio>

      <Ui3nRadio
        checked-value="visible"
        unchecked-value="invisible"
        color="var(--color-bg-control-accent-default, #2196f3)"
      >
        <template #checkedIcon>
          <Ui3nIcon
            icon="eye-outline"
            color="green"
            :size="16"
          />
        </template>

        <template #uncheckedIcon>
          <Ui3nIcon
            icon="eye-off-outline"
            color="orange"
            :size="16"
          />
        </template>
        Public visibility active
      </Ui3nRadio>
    </Ui3nRadioGroup>

    <p class="status-text">
      Selected value: <strong>{{ selected }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .radio-group-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .status-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
