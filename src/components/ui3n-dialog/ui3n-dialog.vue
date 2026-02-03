<script lang="ts" setup generic="T extends Component, V">
  import { type Component, computed, nextTick, onMounted, ref } from 'vue';
  import omit from 'lodash/omit';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import type { Ui3nDialogEvent, Ui3nDialogComponentProps, Ui3nDialogComponentEmits } from './types';
  import { ExtractComponentProps } from '@/types';
  import { determineWindowWidth } from './util';

  const props = defineProps<Ui3nDialogComponentProps<T, V>>();
  const emits = defineEmits<Ui3nDialogComponentEmits<V>>();

  const currentDialogProps = computed(() => ({
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
  const data = ref<V | null>(null);
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

  const iconData = computed(() => {
    if (!props.dialogProps?.icon) return null;

    if (typeof props.dialogProps.icon === 'string') {
      return {
        icon: props.dialogProps.icon,
        width: 14,
        height: 14,
        color: 'var(--color-icon-control-secondary-default)',
      };
    }

    return {
      icon: props.dialogProps.icon.icon,
      width: props.dialogProps.icon.size || 14,
      height: props.dialogProps.icon.size || 14,
      color: props.dialogProps.icon.color || 'var(--color-icon-control-secondary-default)',
    };
  });

  function selectData(value: V) {
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
    props.dialogProps?.onClose && props.dialogProps.onClose(data.value);
    if (withAction) {
      emits('close', data.value);
    }
  }

  function onKeydown(event: KeyboardEvent) {
    const { code } = event;

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
    @click.self.prevent="startEmit('click-overlay', $event)"
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
            keydown: onKeydown,
          }
          : { keydown: onKeydown }
      "
    >
      <div
        v-if="currentDialogProps.title"
        :class="$style.title"
      >
        <ui3n-icon
          v-if="iconData"
          v-bind="iconData"
          :class="$style.icon"
        />

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
      >
        <ui3n-button
          v-if="currentDialogProps.cancelButton"
          type="custom"
          :color="currentDialogProps.cancelButtonBackground"
          :text-color="currentDialogProps.cancelButtonColor"
          @click="handleEvent($event, 'cancel')"
        >
          {{ currentDialogProps.cancelButtonText }}
        </ui3n-button>

        <ui3n-button
          v-if="currentDialogProps.confirmButton"
          type="custom"
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
    --dialog-title-height: 48px;
    --dialog-title-padding: 0 32px 0 16px;
    --dialog-title-font-size: 14px;
    --dialog-actions-height: 64px;
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
    min-height: var(--dialog-title-height);
    height: var(--dialog-title-height);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-s);
    padding: var(--dialog-title-padding);
    border-bottom: 1px solid var(--color-border-block-primary-default);

    span {
      display: block;
      position: relative;
      flex-grow: 1;
      font-size: var(--dialog-title-font-size);
      font-weight: 600;
      color: var(--color-text-control-primary-default);
      @include mixins.text-overflow-ellipsis();
    }

    .icon {
      position: relative;
    }
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
    width: 100%;
    min-height: var(--dialog-actions-height);
    height: var(--dialog-actions-height);
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-s);
  }

  .bothBtns {
    margin-left: var(--spacing-s);
  }
</style>
