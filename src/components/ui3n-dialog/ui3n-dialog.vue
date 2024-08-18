<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, nextTick, onMounted, ref } from 'vue';
import Ui3nButton from '../ui3n-button/ui3n-button.vue';
import type { Ui3nDialogEvent, Ui3nDialogProps, Ui3nDialogComponentProps, Ui3nDialogComponentEmits } from './types';

const props = defineProps<Ui3nDialogComponentProps>();
const emits = defineEmits<Ui3nDialogComponentEmits>();

const show = ref(true);
const data = ref(null);
const isValid = ref(true);
const dialogElement = ref<HTMLDivElement | null>(null);

const dialogProps = computed<Required<Omit<Ui3nDialogProps, 'onClose' | 'onConfirm' | 'onCancel'>>>(() => ({
  teleport: props.dialogProps?.teleport ?? 'body',
  title: props.dialogProps?.title ?? '',
  width: props.dialogProps?.width ?? 380,
  cssClass: props.dialogProps?.cssClass ?? [],
  cssStyle: props.dialogProps?.cssStyle ?? {},
  contentCssClass: props.dialogProps?.contentCssClass ?? [],
  contentCssStyle: props.dialogProps?.contentCssStyle ?? {},
  confirmButton: props.dialogProps?.confirmButton ?? true,
  cancelButton: props.dialogProps?.confirmButton ?? true,
  confirmButtonText: props.dialogProps?.confirmButtonText ?? 'Done',
  cancelButtonText: props.dialogProps?.cancelButtonText ?? 'Cancel',
  confirmButtonColor: props.dialogProps?.confirmButtonColor ?? 'var(--color-text-button-primary-default)',
  cancelButtonColor: props.dialogProps?.cancelButtonColor ?? 'var(--color-text-button-secondary-default)',
  confirmButtonBackground: props.dialogProps?.confirmButtonBackground ?? 'var(--color-bg-button-primary-default)',
  cancelButtonBackground: props.dialogProps?.cancelButtonBackground ?? 'var(--color-bg-button-secondary-default)',
  closeOnClickOverlay: props.dialogProps?.closeOnClickOverlay ?? true,
}));
const cssStyle = computed(() => ({ width: `${dialogProps.value.width}px`, ...dialogProps.value.cssStyle }));

onMounted(() => {
  if (dialogElement.value) {
    dialogElement.value.style.setProperty('--dialog-confirm-button-color', dialogProps.value.confirmButtonColor!);
    dialogElement.value.style.setProperty('--dialog-cancel-button-color', dialogProps.value.cancelButtonColor!);
    dialogElement.value.style.setProperty('--dialog-confirm-background-color', dialogProps.value.confirmButtonBackground!);
    dialogElement.value.style.setProperty('--dialog-cancel-background-color', dialogProps.value.cancelButtonBackground!);
  }

  if (dialogElement.value) {
    nextTick(() => {
      dialogElement.value!.focus();
    });
  }
});

const selectData = (value: any) => {
  data.value = value;
  if (
    !dialogProps.value.confirmButton
    && !dialogProps.value.cancelButton
    && props.dialogProps?.onConfirm
  ) {
    props.dialogProps?.onConfirm(data.value);
    closeDialog();
  }
};

const validate = (value: boolean) => {
  isValid.value = value;
};

const closeDialog = (arg?: { ev?: Event, withAction?: boolean }) => {
  const { ev, withAction = true } = arg || {};
  if (ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();
  }
  show.value = false;
  props.dialogProps?.onClose && props.dialogProps.onClose();
  if (withAction) {
    emits('close');
  }
};

const startEmit = (event: Ui3nDialogEvent) => {
  if (event === 'click-overlay') {
    emits(event);
    closeDialog();
  }

  if (event === 'confirm') {
    props.dialogProps?.onConfirm && props.dialogProps.onConfirm(data.value);
    closeDialog();
  }

  if (event === 'cancel') {
    props.dialogProps?.onCancel && props.dialogProps.onCancel(data.value);
    closeDialog();
  }

  if (data.value) {
    // @ts-ignore
    emits(event, data.value);
  } else {
    // @ts-ignore
    emits(event);
  }
};

const handleEvent = (event: Event, eventName: Ui3nDialogEvent) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  startEmit(eventName);
};
</script>

<template>
  <div
    v-if="show"
    :class="$style.overlay"
    @click="dialogProps.closeOnClickOverlay
      ? closeDialog({ ev: $event })
      : startEmit('click-overlay')
    "
  >
    <div
      ref="dialogElement"
      tabindex="1"
      :class="[$style.dialog, ...dialogProps.cssClass]"
      :style="cssStyle"
      @keydown.esc.stop="startEmit('cancel')"
      @keydown.enter.stop=" isValid && startEmit('confirm')"
    >
      <div
        v-if="dialogProps.title"
        :class="$style.title"
        @click.stop
      >
        <span>{{ dialogProps.title }}</span>
      </div>

      <ui3n-button
        :class="$style.closeBtn"
        type="icon"
        size="small"
        color="transparent"
        icon="close"
        icon-size="16"
        icon-color="var(--color-icon-control-primary-default)"
        @click="closeDialog({ ev: $event })"
      />

      <div
        v-if="props.component"
        :class="[$style.content, ...dialogProps.contentCssClass]"
        :style="dialogProps.contentCssStyle"
        @click.stop
      >
        <component
          :is="component"
          v-bind="componentProps"
          @select="selectData"
          @validate="validate"
          @close="closeDialog({ ev: $event })"
          @confirm="startEmit('confirm')"
          @cancel="startEmit('cancel')"
        />
      </div>

      <div
        v-if="dialogProps.confirmButton || dialogProps.cancelButton"
        :class="[
          $style.actions,
          dialogProps.confirmButton && dialogProps.cancelButton && $style.bothBtns,
        ]"
        @click.stop
      >
        <ui3n-button
          v-if="dialogProps.cancelButton"
          type="secondary"
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
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins";

.overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.dialog {
  --dialog-border-radius: 8px;
  --dialog-title-padding: 16px 32px 16px 16px;
  --dialog-title-font-size: 14px;
  --dialog-actions-padding: 16px;
  --dialog-confirm-button-color: var(--color-text-button-primary-default);
  --dialog-cancel-button-color: var(--color-text-button-secondary-default);
  --dialog-confirm-background-color: var(--color-bg-button-primary-default);
  --dialog-cancel-background-color: var(--color-bg-button-secondary-default);

  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 95%;
  background-color: var(--color-bg-block-primary-default);
  border-radius: var(--dialog-border-radius);
  outline: none;
  @include elevation();
}

.title {
  position: relative;
  width: 100%;
  height: calc(var(--spacing-m) * 3);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: var(--dialog-title-padding);
  font-size: var(--dialog-title-font-size);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-control-primary-default);
  border-bottom: 1px solid var(--color-border-block-primary-default);
  @include text-overflow-ellipsis();
}

.closeBtn {
  position: absolute;
  right: 4px;
  top: 12px;
}

.content {
  flex-grow: 2;
  overflow-y: auto;
}

.actions {
  padding: var(--dialog-actions-padding);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-s);
}

.bothBtns {
  margin-left: var(--spacing-s);
}
</style>
