<script setup lang="ts"></script>

<template>
  <div class="chips-container">
    <ui3n-chip>Default chip</ui3n-chip>
    <ui3n-chip>Another chip</ui3n-chip>
    <ui3n-chip>Tag label</ui3n-chip>
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