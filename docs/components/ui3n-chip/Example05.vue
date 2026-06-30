<script setup lang="ts"></script>

<template>
  <div class="chips-container">
    <ui3n-chip
      :height="28"
      color="var(--color-bg-button-primary-default)"
      text-color="#ffffff"
      :text-size="12"
    >
      Primary
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      color="var(--color-bg-button-secondary-default)"
      text-color="var(--color-text-button-secondary-default)"
      :text-size="12"
    >
      Secondary
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      color="#e8f5e9"
      text-color="#2e7d32"
      :text-size="12"
    >
      Success
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      color="#ffebee"
      text-color="#c62828"
      :text-size="12"
    >
      Error
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      color="#fff3e0"
      text-color="#e65100"
      :text-size="12"
    >
      Warning
    </ui3n-chip>
  </div>
</template>

<style scoped>
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
</style>