<script setup lang="ts"></script>

<template>
  <div class="container">
    <ui3n-badge value="1" position="right-top">
      <div class="block">Top Right</div>
    </ui3n-badge>
    <ui3n-badge value="2" position="right-bottom">
      <div class="block">Bottom Right</div>
    </ui3n-badge>
    <ui3n-badge value="3" position="left-top">
      <div class="block">Top Left</div>
    </ui3n-badge>
    <ui3n-badge value="4" position="left-bottom">
      <div class="block">Bottom Left</div>
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
