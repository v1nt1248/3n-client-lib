<script setup lang="ts"></script>

<template>
  <div class="chips-container">
    <ui3n-chip
      :height="28"
      plain
    >
      Plain chip
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      plain
      text-color="var(--color-text-button-primary-default)"
    >
      Primary outline
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      plain
      text-color="#2e7d32"
    >
      Success outline
    </ui3n-chip>

    <ui3n-chip
      :height="28"
      plain
      closeable
      text-color="#c62828"
    >
      Closeable outline
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