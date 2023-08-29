<script setup lang="ts">
  import { inject } from 'vue'
  import Ui3nButton from './components/ui3n-button.vue'


  const { $createNotice } = inject<any>('notifications')!

  const openNotice = () => {
    $createNotice({
      type: 'success',
      content: 'Success',
    })

    setTimeout(() => {
      $createNotice({
        type: 'warning',
        content: 'Warning',
      })
    }, 300)

    setTimeout(() => {
      $createNotice({
        type: 'info',
        content: 'Info',
      })
    }, 600)

    setTimeout(() => {
      $createNotice({
        type: 'error',
        content: 'Error',
      })
    }, 900)
  }
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-button
        @click="openNotice"
      >
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
