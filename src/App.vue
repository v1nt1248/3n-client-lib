<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { inject, defineAsyncComponent, ref } from 'vue'
  import { useAppStore } from './store/app.store'
  import Ui3nButton from './components/ui3n-button.vue'
  import type { DialogsPlugin, DialogInstance } from './plugins/dialogs'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useAppStore()
  const { $openDialog } = inject<DialogsPlugin>('dialogs')!

  const dialog = ref<DialogInstance|undefined>()

  const openDialog = async () => {
    const component = defineAsyncComponent(() => import('./Dialog.vue'))
    dialog.value = $openDialog({
      component,
      componentProps: {
        dialogText: 'Any text',
        additionalDialogText: 'Additional text',
      },
      dialogProps: {
        title: 'Confirmation dialog',
        width: 400,
        onConfirm: data => {
          console.log('CONFIRM: ', data)
        },
        onCancel: () => {
          console.log('CANCEL')
        },
      },
    })
  }

  const onClick = (ev: MouseEvent) => {
    console.log('CLICK OUTSIDE ELEMENT: ', ev)
  }
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-button
        v-ui3n-click-outside="onClick"
        @click="openDialog"
      >
        Click
      </ui3n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;

    &-block {
      position: relative;
      width: 250px;
    }
  }
</style>
