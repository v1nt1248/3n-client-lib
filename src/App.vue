<script setup lang="ts">
  import { Ui3nButton } from '../dist/ui-3n-lib'

</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-button>
        Click
      </ui3n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    padding: 8px;

    &-block {
      position: relative;
      width: 250px;
    }
  }
</style>
