<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { Component, defineAsyncComponent, ref, shallowRef } from 'vue'
  import Ui3nButton from './components/ui3n-button.vue'
  import Ui3nDialog, { type Ui3nDialogProps } from './components/ui3n-dialog.vue'

  const isOpen = ref(false)
  const test = ref<{
    componentProps: any;
    dialogProps: Ui3nDialogProps;
  }>({
    componentProps: {
      dialogText: '',
      additionalDialogText: '',
    },
    dialogProps: {} as Ui3nDialogProps,
  })
  const testComponent = shallowRef<Component|null>(null)

  const openDialog = async () => {
    testComponent.value = defineAsyncComponent(() => import('./Dialog.vue'))
    test.value = {
      componentProps: {
        dialogText: 'Any text',
        additionalDialogText: 'Additional text',
      },
      dialogProps: {
        title: 'Confirmation dialog',
        width: 400,
      },
    }
    isOpen.value = true
  }
  const closeDialog = () => {
    isOpen.value = false
  }
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-button
        @click="openDialog"
      >
        Click
      </ui3n-button>
    </div>

    <ui3n-dialog
      v-if="isOpen && testComponent"
      :component="testComponent"
      :component-props="test.componentProps"
      :dialog-props="test.dialogProps"
      @close="closeDialog"
    />
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
