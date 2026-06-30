<script setup lang="ts"></script>

<template>
  <div class="chips-container">
    <ui3n-chip :height="20">Small (20px)</ui3n-chip>
    <ui3n-chip :height="24">Default (24px)</ui3n-chip>
    <ui3n-chip :height="32">Medium (32px)</ui3n-chip>
    <ui3n-chip :height="40">Large (40px)</ui3n-chip>
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