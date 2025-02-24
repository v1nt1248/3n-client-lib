<script lang="ts" setup generic="T extends Component">
  import { type Component, computed, nextTick, onMounted, ref } from 'vue';
  import omit from 'lodash/omit';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nDialogEvent, Ui3nDialogComponentProps, Ui3nDialogComponentEmits } from './types';
  import { ExtractComponentProps } from '@/components/types';
  import { determineWindowWidth } from './util';

  const props = defineProps<Ui3nDialogComponentProps<T>>();
  const emits = defineEmits<Ui3nDialogComponentEmits>();

  const currentDialogProps = computed(() => ({
    teleport: props.dialogProps?.teleport || 'body',
    title: props.dialogProps?.title || '',
    cssClass: props.dialogProps?.cssClass || [],
    cssStyle: props.dialogProps?.cssStyle || {},
    contentCssClass: props.dialogProps?.contentCssClass || [],
    contentCssStyle: props.dialogProps?.contentCssStyle || {},
    width: props.dialogProps?.width
      ? props.dialogProps?.width
      : props.dialogProps?.cssStyle?.width
        ? props.dialogProps?.cssStyle?.width
        : 380,
    confirmButton: props.dialogProps?.confirmButton !== false,
    cancelButton: props.dialogProps?.cancelButton !== false,
    confirmButtonText: props.dialogProps?.confirmButtonText || 'Done',
    cancelButtonText: props.dialogProps?.cancelButtonText || 'Cancel',
    confirmButtonColor: props.dialogProps?.confirmButtonColor || 'var(--color-text-button-primary-default)',
    cancelButtonColor: props.dialogProps?.cancelButtonColor || 'var(--color-text-button-secondary-default)',
    confirmButtonBackground: props.dialogProps?.confirmButtonBackground || 'var(--color-bg-button-primary-default)',
    cancelButtonBackground: props.dialogProps?.cancelButtonBackground || 'var(--color-bg-button-secondary-default)',
    closeOnClickOverlay: props.dialogProps?.closeOnClickOverlay !== false,
  }));

  const show = ref(true);
  const data = ref<unknown>(null);
  const isValid = ref(true);
  const dialogOverlayElement = ref<HTMLElement | null>(null);
  const dialogElement = ref<HTMLDivElement | null>(null);
  const isMousedown = ref(false);
  const dragData = ref({
    initialLeft: 0,
    initialTop: 0,
    left: 0,
    top: 0,
    shiftX: 0,
    shiftY: 0,
  });

  const cssStyle = computed(() => ({
    width: determineWindowWidth({ width: currentDialogProps.value.width, style: currentDialogProps.value.cssStyle }),
    ...omit(currentDialogProps.value.cssStyle, 'width'),
    ...(props.dialogProps?.draggable && {
      left: `${dragData.value.left}px`,
      top: `${dragData.value.top}px`,
    }),
  }));

  function selectData(value: unknown) {
    data.value = value;
    if (
      !currentDialogProps.value.confirmButton &&
      !currentDialogProps.value.cancelButton &&
      props.dialogProps?.onConfirm
    ) {
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

  function onKeydown(event: KeyboardEvent) {
    const { code } = event;
    console.log('onKeydown: ', code, props.dialogProps?.closeOnEsc);
    if (code === 'Escape' && props.dialogProps?.closeOnEsc) {
      event.preventDefault();
      event.stopPropagation();
      startEmit('cancel');
    }
  }

  function startEmit(event: Ui3nDialogEvent, ev?: Event) {
    if (event === 'click-overlay') {
      emits(event);
      currentDialogProps.value.closeOnClickOverlay && closeDialog({ ev });
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
    dragData.value.shiftX = 0;
    dragData.value.shiftY = 0;
    return false;
  }

  function onMousedown(ev: MouseEvent) {
    isMousedown.value = true;
    const dialogElementRect = dialogElement.value!.getBoundingClientRect();
    dragData.value.shiftX = ev.clientX - dialogElementRect.left;
    dragData.value.shiftY = ev.clientY - dialogElementRect.top;
  }

  function onMousemove(ev: MouseEvent) {
    if (!isMousedown.value) {
      return;
    }
    dragData.value.left = ev.clientX - dragData.value.shiftX - dragData.value.initialLeft;
    dragData.value.top = ev.clientY - dragData.value.shiftY - dragData.value.initialTop;
  }

  onMounted(() => {
    if (dialogElement.value) {
      dialogElement.value.style.setProperty(
        '--dialog-confirm-button-color',
        currentDialogProps.value.confirmButtonColor!,
      );
      dialogElement.value.style.setProperty(
        '--dialog-cancel-button-color',
        currentDialogProps.value.cancelButtonColor!,
      );
      dialogElement.value.style.setProperty(
        '--dialog-confirm-background-color',
        currentDialogProps.value.confirmButtonBackground!,
      );
      dialogElement.value.style.setProperty(
        '--dialog-cancel-background-color',
        currentDialogProps.value.cancelButtonBackground!,
      );

      nextTick(() => {
        dialogElement.value!.focus();

        setTimeout(() => {
          const dialogClientRect = dialogElement.value!.getBoundingClientRect();
          dragData.value.initialLeft = dialogClientRect.left;
          dragData.value.initialTop = dialogClientRect.top;
        }, 100);
      });
    }
  });
</script>

<template>
  <div
    v-if="show"
    ref="dialogOverlayElement"
    :class="$style.overlay"
    @click="startEmit('click-overlay', $event)"
  >
    <div
      :id="dialogProps?.id"
      ref="dialogElement"
      tabindex="1"
      :class="[
        $style.dialog,
        dialogProps?.draggable && isMousedown && $style.draggable,
        ...currentDialogProps.cssClass!,
      ]"
      :style="cssStyle"
      v-on="
        dialogProps?.draggable
          ? {
            dragstart: onDragstart,
            mousedown: onMousedown,
            mouseup: onMouseup,
            mousemove: onMousemove,
            keydown: onKeydown
        }
          : { keydown: onKeydown }
      "
    >
      <div
        v-if="currentDialogProps.title"
        :class="$style.title"
        @click.stop
      >
        <span>{{ currentDialogProps.title }}</span>
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
        :class="[$style.content, ...currentDialogProps.contentCssClass!]"
        :style="currentDialogProps.contentCssStyle"
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
        v-if="currentDialogProps.confirmButton || currentDialogProps.cancelButton"
        :class="[
          $style.actions,
          currentDialogProps.confirmButton && currentDialogProps.cancelButton && $style.bothBtns,
        ]"
        @click.stop
      >
        <ui3n-button
          v-if="currentDialogProps.cancelButton"
          type="secondary"
          :color="currentDialogProps.cancelButtonBackground"
          :text-color="currentDialogProps.cancelButtonColor"
          @click="handleEvent($event, 'cancel')"
        >
          {{ currentDialogProps.cancelButtonText }}
        </ui3n-button>

        <ui3n-button
          v-if="currentDialogProps.confirmButton"
          :color="currentDialogProps.confirmButtonBackground"
          :text-color="currentDialogProps.confirmButtonColor"
          :disabled="!isValid"
          @click="handleEvent($event, 'confirm')"
        >
          {{ currentDialogProps.confirmButtonText }}
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
      cursor: move;
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

  .dragHandleIcon {
    position: absolute;
    left: 0;
    top: 16px;
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
