<script setup lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { inject, defineAsyncComponent, ref } from 'vue'
  import { useAppStore } from './store/app.store'
  import Ui3nButton from './components/ui3n-button.vue'
  import { DIALOGS_KEY } from './plugins/dialogs.ts'
  import type { DialogsPlugin, DialogInstance } from './plugins/dialogs.ts'
  import Ui3nMenu from './components/ui3n-menu.vue'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useAppStore()
  const { $openDialog } = inject<DialogsPlugin>(DIALOGS_KEY)!

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

    <ui3n-menu>
      <ui3n-button>
        Menu
      </ui3n-button>

      <template #menu>
        <div class="app-menu-content">
          <div class="app-menu-content__item">
            Item 1
          </div>
          <div class="app-menu-content__item">
            Item 2
          </div>
          <div class="app-menu-content__item">
            Item 3
          </div>
        </div>
      </template>
    </ui3n-menu>
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
      margin-bottom: 20px;
    }

    &-menu-content {
      position: relative;
      width: 200px;

      &__item {
        display: flex;
        padding: 0 8px;
        width: 100%;
        height: 28px;
        cursor: pointer;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        font-weight: 400;

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>
