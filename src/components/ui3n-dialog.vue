<script lang="ts" setup>
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, onMounted, ref } from 'vue'
  import type { Component } from 'vue'
  import { getRandomId } from '../tools'
  import Ui3nButton from './ui3n-button.vue'

  export type Ui3nDialogEvent = 'open' | 'before-close' | 'close' | 'confirm' | 'cancel' | 'click-overlay'

  export interface Ui3nDialogProps {
    teleport?: string;
    title?: string;
    width?: string | number;
    cssClass?: string;
    cssStyle?: Record<string, string>;
    contentCssClass?: string;
    contentCssStyle?: Record<string, string>;
    confirmButton?: boolean;
    cancelButton?: boolean;
    onConfirm?: (data: any) => void;
    onCancel?: (data: any) => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonBackground?: string;
    cancelButtonBackground?: string;
    closeOnClickOverlay?: boolean;
  }
    
  export interface Ui3nDialogComponentProps {
    component: Component;
    componentProps?: Record<string, any>;
    dialogProps?: Ui3nDialogProps;
  }

  export interface Ui3nDialogComponentEmits {
    (ev: 'open', value?: any): void;
    (ev: 'before-close', value?: any): void;
    (ev: 'close', value?: any): void;
    (ev: 'confirm', value?: any): void;
    (ev: 'cancel', value?: any): void;
    (ev: 'click-overlay', value?: any): void;
  }

  const props = defineProps<Ui3nDialogComponentProps>()

  const emit = defineEmits<Ui3nDialogComponentEmits>()

  const dialogProps = computed(() => {
    const {
      teleport = 'body',
      title = '',
      width = 380,
      cssClass = '',
      cssStyle = {},
      contentCssClass = '',
      contentCssStyle = {},
      confirmButton = true,
      cancelButton = true,
      confirmButtonText = 'Done',
      cancelButtonText = 'Cancel',
      confirmButtonColor = 'var(--system-white, #fff)',
      cancelButtonColor = 'var(--blue-main, #0090ec)',
      confirmButtonBackground = 'var(--blue-main, #0090ec)',
      cancelButtonBackground = 'var(--system-white, #fff)',
      closeOnClickOverlay = true,
    } = props.dialogProps || {}
    return {
      teleport,
      title,
      cssClass: cssClass ? `ui3n-dialog ${cssClass}` : 'ui3n-dialog',
      cssStyle: { width: `${width}px`, ...cssStyle  },
      contentCssClass: contentCssClass ? `ui3n-dialog__content ${contentCssClass}` : 'ui3n-dialog__content',
      contentCssStyle,
      confirmButton,
      cancelButton,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonBackground,
      cancelButtonBackground,
      closeOnClickOverlay,
    }
  })

  const show = ref(true)
  const data = ref(null)
  const isValid = ref(true)
  const dialogId = `dialog-${getRandomId(4)}`

  onMounted(() => {
    const dialogElement = document.getElementById(dialogId)
    if (dialogElement) {
      dialogElement.style.setProperty('--dialog-confirm-button-color', dialogProps.value.confirmButtonColor)
      dialogElement.style.setProperty('--dialog-cancel-button-color', dialogProps.value.cancelButtonColor)
      dialogElement.style.setProperty('--dialog-confirm-background-color', dialogProps.value.confirmButtonBackground)
      dialogElement.style.setProperty('--dialog-cancel-background-color', dialogProps.value.cancelButtonBackground)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectData = (value: any) => {
    data.value = value
    if (
      !dialogProps.value.confirmButton
      && !dialogProps.value.cancelButton
      && props.dialogProps?.onConfirm
    ) {
      props.dialogProps.onConfirm(data.value)
      closeDialog()
    }
  }

  const validate = (value: boolean) => {
    isValid.value = value
  }

  const closeDialog = (arg?: { ev?: Event, withAction?: boolean }) => {
    const { ev, withAction = false } = arg || {}
    if (ev) {
      ev.stopImmediatePropagation()
      ev.preventDefault()
    }
    show.value = false
    if (withAction) {
      emit('close')
    }
  }

  const startEmit = (event: Ui3nDialogEvent) => {
    if (event === 'click-overlay') {
      emit(event)
      closeDialog()
    }

    if (event === 'confirm' && props.dialogProps?.onConfirm) {
      props.dialogProps.onConfirm(data.value)
      closeDialog()
    }

    if (event === 'cancel' && props.dialogProps?.onCancel) {
      props.dialogProps.onCancel(data.value)
      closeDialog()
    }

    if (data.value) {
      // @ts-ignore
      emit(event, data.value)
    } else {
      // @ts-ignore
      emit(event)
    }
  }

  const handleEvent = (event: Event, eventName: Ui3nDialogEvent) => {
    event.stopImmediatePropagation()
    event.preventDefault()
    startEmit(eventName)
  }
</script>

<template>
  <teleport :to="dialogProps.teleport">
    <div
      v-if="show"
      class="ui3n-dialog__overlay"
      @click="dialogProps.closeOnClickOverlay
        ? closeDialog({ ev: $event, withAction: true })
        : startEmit('click-overlay')
      "
    >
      <div
        :id="dialogId"
        :class="dialogProps.cssClass"
        :style="dialogProps.cssStyle"
      >
        <div
          v-if="dialogProps.title"
          class="ui3n-dialog__title"
          @click.stop
        >
          <span>{{ dialogProps.title }}</span>
          <ui3n-button
            round
            color="transparent"
            icon="close"
            icon-size="12"
            icon-color="var(--gray-90, #444)"
            class="ui3n-dialog__close"
            @click="closeDialog({ ev: $event, withAction: true })"
          />
        </div>

        <div
          v-if="props.component"
          :class="dialogProps.contentCssClass"
          :style="dialogProps.contentCssStyle"
          @click.stop
        >
          <component
            :is="props.component"
            v-bind="props.componentProps"
            @select="selectData"
            @validate="validate"
            @close="closeDialog({ ev: $event, withAction: true })"
            @confirm="startEmit('confirm')"
            @cancel="startEmit('cancel')"
          />
        </div>

        <div
          v-if="dialogProps.confirmButton || dialogProps.cancelButton"
          :class="[
            'ui3n-dialog__actions',
            { 'ui3n-dialog__actions--both': dialogProps.confirmButton && dialogProps.cancelButton },
          ]"
          @click.stop
        >
          <ui3n-button
            v-if="dialogProps.cancelButton"
            :color="dialogProps.cancelButtonBackground"
            :text-color="dialogProps.cancelButtonColor"
            @click="handleEvent($event, 'cancel')"
          >
            {{ dialogProps.cancelButtonText }}
          </ui3n-button>

          <ui3n-button
            v-if="dialogProps.confirmButton"
            :color="dialogProps.confirmButtonBackground"
            :text-color="dialogProps.confirmButtonColor"
            :disabled="!isValid"
            @click="handleEvent($event, 'confirm')"
          >
            {{ dialogProps.confirmButtonText }}
          </ui3n-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
  @import "../assets/styles/mixins";

  .ui3n-dialog__overlay {
    position: fixed;
    z-index: 1000;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .ui3n-dialog {
    --dialog-border-radius: 8px;
    --dialog-title-padding: 16px 24px 16px;
    --dialog-title-font-size: 14px;
    --dialog-actions-padding: 16px;
    --dialog-confirm-button-color: var(--system-white, #fff);
    --dialog-cancel-button-color: var(--blue-main, #0090ec);
    --dialog-confirm-background-color: var(--blue-main, #0090ec);
    --dialog-cancel-background-color: var(--system-white, #fff);

    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 95%;
    background-color: var(--system-white, #fff);
    border-radius: var(--dialog-border-radius);
    @include elevation();

    &__title {
      padding: var(--dialog-title-padding);
      font-size: var(--dialog-title-font-size);
      font-weight: 600;
      line-height: 1.3;
      color: var(--black-90, #212121);
      border-bottom: 1px solid var(--grey-50, #f2f2f2);
      @include text-overflow-ellipsis();
    }

    &__close {
      position: absolute;
      right: 4px;
      top: 4px;
    }

    &__content {
      flex-grow: 2;
      overflow-y: auto;
    }

    &__actions {
      padding: var(--dialog-actions-padding);
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &--both {
        .ui3n-button {
          margin-left: 8px;
        }
      }
    }
  }
</style>
