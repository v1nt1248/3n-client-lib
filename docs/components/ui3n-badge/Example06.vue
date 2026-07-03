<script setup lang="ts">
  import { ref } from 'vue';

  const count = ref(95);
</script>

<template>
  <div class="container">
    <div class="controls">
      <button
        @click="count > 0 && count--"
        class="demo-btn"
      >
        -
      </button>

      <span class="count-value"
        >Current count: <strong>{{ count }}</strong></span
      >

      <button
        @click="count++"
        class="demo-btn"
      >
        +
      </button>
    </div>

    <div class="badge-showcase">
      <ui3n-badge
        :value="count > 99 ? '99+' : count"
        color="#ff4757"
        text-color="white"
      >
        <div class="block">Notifications</div>
      </ui3n-badge>

      <ui3n-badge :value="count > 99 ? '99+' : count">
        <div class="block">Messages</div>
      </ui3n-badge>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    width: 100%;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
  }

  .count-value {
    min-width: 120px;
    text-align: center;
    color: var(--color-text-table-primary-default);
  }

  .demo-btn {
    padding: 2px 10px;
    border-radius: 4px;
    border: 1px solid var(--color-border-table-primary-default);
    background-color: var(--color-bg-control-secondary-default);
    color: var(--color-text-table-primary-default);
    cursor: pointer;
    font-weight: 600;
  }

  .demo-btn:hover {
    background-color: var(--color-bg-control-primary-hover);
  }

  .badge-showcase {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
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
