<script setup lang="ts">
import { ref } from 'vue';

const count = ref(150);
</script>

<template>
  <div class="container">
    <ui3n-badge :value="count > 99 ? '99+' : count">
      <div class="block">Messages</div>
    </ui3n-badge>

    <ui3n-badge :value="count > 99 ? '99+' : count" color="#ff4757" text-color="white">
      <div class="block">Notifications</div>
    </ui3n-badge>

    <ui3n-badge value="99+" color="#ffa502" text-color="white">
      <div class="block">Updates</div>
    </ui3n-badge>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .block {
    position: relative;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text-block-primary-default);
    border: 1px solid var(--color-border-button-primary-focused);
  }
</style>