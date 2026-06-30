<script setup lang="ts"></script>

<template>
  <div class="container">
    <ui3n-badge value="5" />
    <ui3n-badge dot color="#ff4757" />
    <ui3n-badge value="NEW" color="#2ed573" text-color="white" />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    gap: 16px;
    align-items: center;
  }
</style>