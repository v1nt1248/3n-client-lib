<script lang="ts" setup generic="T extends Component">
import { type Component, computed, nextTick, onMounted, ref } from 'vue';
import Ui3nButton from '../ui3n-button/ui3n-button.vue';
import type { Ui3nDialogEvent, Ui3nDialogProps, Ui3nDialogComponentProps, Ui3nDialogComponentEmits } from './types';
import { ExtractComponentProps } from '@/components/types';

const props = defineProps<Ui3nDialogComponentProps<T>>();
const emits = defineEmits<Ui3nDialogComponentEmits>();

const show = ref(true);
const data = ref<unknown>(null);
const isValid = ref(true);
const dialogOverlayElement = ref<HTMLElement | null>(null);
const dialogElement = ref<HTMLDivElement | null>(null);
const isMousedown = ref(false);
const dragData = ref({
  left: 0,
  top: 0,
  shiftX: 0,
  shiftY: 0,
});

const dialogProps = computed<Required<Omit<Ui3nDialogProps, 'onClose' | 'onConfirm' | 'onCancel'>>>(() => ({
  id: props.dialogProps.id,
  teleport: props.dialogProps?.teleport ?? 'body',
  title: props.dialogProps?.title ?? '',
  width: props.dialogProps?.width ?? 380,
  draggable: props.dialogProps.draggable,
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
const cssStyle = computed(() => {
  const value = {
    width: `${dialogProps.value.width}px`,
    ...dialogProps.value.cssStyle,
  };
  //
  // if (dialogProps.value.draggable) {
  //   value
  // }

  return value;
});

onMounted(() => {
  if (dialogElement.value) {
    dialogElement.value.style.setProperty('--dialog-confirm-button-color', dialogProps.value.confirmButtonColor!);
    dialogElement.value.style.setProperty('--dialog-cancel-button-color', dialogProps.value.cancelButtonColor!);
    dialogElement.value.style.setProperty(
      '--dialog-confirm-background-color',
      dialogProps.value.confirmButtonBackground!,
    );
    dialogElement.value.style.setProperty(
      '--dialog-cancel-background-color',
      dialogProps.value.cancelButtonBackground!,
    );

    nextTick(() => {
      dialogElement.value!.focus();

      const overlayClientRect = dialogOverlayElement.value!.getBoundingClientRect();
      const dialogClientRect = dialogElement.value!.getBoundingClientRect();
      dragData.value.left = dialogClientRect.left;
      dragData.value.top = dialogClientRect.top;
      console.log('EL: ', overlayClientRect, dialogClientRect);
    });
  }
});

function selectData(value: unknown) {
  data.value = value;
  if (!dialogProps.value.confirmButton && !dialogProps.value.cancelButton && props.dialogProps?.onConfirm) {
    props.dialogProps?.onConfirm(data.value);
    closeDialog();
  }
}

function validate(value: boolean) {
  isValid.value = value;
}

function closeDialog(arg?: { ev?: Event; withAction?: boolean }) {
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
}

function startEmit(event: Ui3nDialogEvent, ev?: Event) {
  if (event === 'click-overlay') {
    emits(event);
    dialogProps.value.closeOnClickOverlay && closeDialog({ ev });
    return;
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
}

function handleEvent(event: Event, eventName: Ui3nDialogEvent) {
  event.stopImmediatePropagation();
  event.preventDefault();
  startEmit(eventName);
}

/* drag */
function onDragstart() {
  return false;
}

function onMouseup() {
  isMousedown.value = false;
  return false;
}

function onMousedown(ev: MouseEvent) {
  console.log('onMousedown', ev);
  isMousedown.value = true;
  dragData.value.shiftX = ev.clientX - dialogElement.value.getBoundingClientRect().left;
  dragData.value.shiftY = ev.clientY - dialogElement.value.getBoundingClientRect().top;
}

function onMousemove(ev: MouseEvent) {
  if (!isMousedown.value) {
    return;
  }
  console.log('onMousemove', ev, ev.pageX, ev.pageY);
}
</script>

<template>
  <div
    v-if="show"
    ref="dialogOverlayElement"
    :class="$style.overlay"
    @click="startEmit('click-overlay', $event)"
  >
    <div
      :id="dialogProps.id"
      ref="dialogElement"
      tabindex="1"
      :class="[$style.dialog, dialogProps.draggable && $style.draggable, ...dialogProps.cssClass]"
      :style="cssStyle"
      @keydown.esc.stop="startEmit('cancel')"
      @keydown.enter.stop="isValid && startEmit('confirm')"
      v-on="dialogProps.draggable
        ? { dragstart: onDragstart, mousedown: onMousedown, mouseup: onMouseup,  mousemove: onMousemove }
        : {}"
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
        icon="round-close"
        icon-size="16"
        icon-color="var(--color-icon-control-primary-default)"
        @click="closeDialog({ ev: $event })"
      />

      <div
        v-if="component"
        :class="[$style.content, ...dialogProps.contentCssClass]"
        :style="dialogProps.contentCssStyle"
        @click.stop
      >
        <!-- @vue-ignore  -->
        <component
          :is="component"
          v-bind="componentProps as ExtractComponentProps<T>"
          @select="selectData"
          @validate="validate"
          @close="closeDialog({ ev: $event })"
          @confirm="startEmit('confirm')"
          @cancel="startEmit('cancel')"
        />
      </div>

      <div
        v-if="dialogProps.confirmButton || dialogProps.cancelButton"
        :class="[$style.actions, dialogProps.confirmButton && dialogProps.cancelButton && $style.bothBtns]"
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
@use '../../assets/styles/mixins' as mixins;

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

  @include mixins.elevation();

  &.draggable {
    .title {
      cursor: grab;
    }
  }
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
  @include mixins.text-overflow-ellipsis();
}

.closeBtn {
  position: absolute;
  right: 4px;
  top: 12px;
  z-index: 5;
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
