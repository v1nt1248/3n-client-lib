<script lang="ts" setup generic="V extends any">
  import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
  import omit from 'lodash/omit';
  import { determineWindowWidth } from './util';
  import type { Ui3nDialogComponentProps, Ui3nDialogComponentEmits, Ui3nDialogComponentSlots } from './types';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';

  const props = withDefaults(
    defineProps<Ui3nDialogComponentProps<V>>(), {
      cssClass: () => [],
      cssStyle: () => ({}),
      contentCssClass: () => [],
      contentCssStyle: () => ({}),
      confirmButtonText: 'Done',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'var(--color-text-button-primary-default)',
      cancelButtonColor: 'var(--color-text-button-secondary-default)',
      confirmButtonBackground: 'var(--color-bg-button-primary-default)',
      cancelButtonBackground: 'var(--color-bg-button-secondary-default)',
      data: null,
      isValid: true,
    },
  );
  const emits = defineEmits<Ui3nDialogComponentEmits<V>>();
  defineSlots<Ui3nDialogComponentSlots>();

  const dialogElement = useTemplateRef('dialog-el');
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
    width: determineWindowWidth({ width: props.width, style: props.cssStyle }),
    ...omit(props.cssStyle, 'width'),
    ...(props.draggable && {
      left: `${dragData.value.left}px`,
      top: `${dragData.value.top}px`,
    }),
  }));

  const iconData = computed(() => {
    if (!props.icon) {
      return null;
    }

    if (typeof props.icon === 'string') {
      return {
        icon: props.icon,
        size: 14,
        color: 'var(--color-icon-control-secondary-default)',
      };
    }

    return {
      icon: props.icon.icon,
      size: props.icon.size || 14,
      color: props.icon.color || 'var(--color-icon-control-secondary-default)',
    };
  });

  function onKeydown(event: KeyboardEvent) {
    const { code } = event;

    if (code === 'Escape' && props.closeOnEsc) {
      event.preventDefault();
      event.stopPropagation();
      emits('action', { event: 'cancel', data: props.data });
    }
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
        '--ui3n-dialog-confirm-button-color',
        props.confirmButtonColor,
      );
      dialogElement.value.style.setProperty(
        '--ui3n-dialog-cancel-button-color',
        props.cancelButtonColor,
      );
      dialogElement.value.style.setProperty(
        '--ui3n-dialog-confirm-background-color',
        props.confirmButtonBackground,
      );
      dialogElement.value.style.setProperty(
        '--ui3n-dialog-cancel-background-color',
        props.cancelButtonBackground,
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
    :id="id"
    ref="dialog-el"
    tabindex="1"
    :class="[$style.dialog, draggable && isMousedown && $style.draggable, ...cssClass]"
    :style="cssStyle"
    v-on="
      draggable
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
    <!-- HEADER  -->
    <div
      v-if="title"
      :class="[$style.title, $style.titleDefault]"
    >
      <ui3n-icon
        v-if="iconData"
        v-bind="iconData"
        :class="$style.icon"
      />

      <span>{{ title }}</span>
    </div>

    <div
      v-if="$slots['header']"
      :class="$style.title"
    >
      <slot name="header" />
    </div>

    <div
      v-if="$slots['body']"
      :class="$style.content"
    >
      <slot name="body" />
    </div>

    <div
      v-if="confirmButton || cancelButton"
      :class="[$style.actions, $style.actionsDefault]"
    >
      <ui3n-button
        v-if="cancelButton"
        type="custom"
        :color="cancelButtonBackground"
        :text-color="cancelButtonColor"
        @click.stop.prevent="() => emits('action', { event: 'cancel', data: props.data })"
      >
        {{ cancelButtonText }}
      </ui3n-button>

      <ui3n-button
        v-if="confirmButton"
        type="custom"
        :color="confirmButtonBackground"
        :text-color="confirmButtonColor"
        :disabled="!isValid"
        @click.stop.prevent="() => emits('action', { event: 'confirm', data: props.data })"
      >
        {{ confirmButtonText }}
      </ui3n-button>
    </div>

    <div
      v-if="$slots['actions']"
      :class="$style.actions"
    >
      <slot name="actions" />
    </div>

    <div
      v-if="$slots['loading']"
      :class="$style.loading"
    >
      <slot name="loading" />
    </div>

    <ui3n-button
      :class="$style.closeBtn"
      type="icon"
      size="small"
      color="var(--color-bg-block-primary-default)"
      icon="round-close"
      icon-size="16"
      icon-color="var(--color-icon-control-primary-default)"
      @click.stop.prevent="emits('action', { event: 'close' })"
    />
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .dialog {
    --ui3n-dialog-border-radius: 8px;
    --ui3n-dialog-title-height: 48px;
    --ui3n-dialog-title-padding: 0 32px 0 16px;
    --ui3n-dialog-title-font-size: 14px;
    --ui3n-dialog-actions-height: 64px;
    --ui3n-dialog-actions-padding: 16px;
    --ui3n-dialog-confirm-button-color: var(--color-text-button-primary-default);
    --ui3n-dialog-cancel-button-color: var(--color-text-button-secondary-default);
    --ui3n-dialog-confirm-background-color: var(--color-bg-button-primary-default);
    --ui3n-dialog-cancel-background-color: var(--color-bg-button-secondary-default);

    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: var(--spacing-xxl);
    max-height: 95%;
    background-color: var(--color-bg-block-primary-default);
    border-radius: var(--ui3n-dialog-border-radius);
    outline: none;
    @include mixins.elevation(2);

    &.draggable {
      cursor: move;
    }
  }

  .closeBtn {
    position: absolute;
    right: 4px;
    top: 12px;
    z-index: 5;
  }

  .title {
    position: relative;
    width: 100%;
    min-height: var(--ui3n-dialog-title-height);
    height: var(--ui3n-dialog-title-height);
  }

  .titleDefault {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-s);
    padding: var(--ui3n-dialog-title-padding);
    border-bottom: 1px solid var(--color-border-block-primary-default);

    span {
      display: block;
      position: relative;
      flex-grow: 1;
      font-size: var(--ui3n-dialog-title-font-size);
      font-weight: 600;
      color: var(--color-text-control-primary-default);
      @include mixins.text-overflow-ellipsis();
    }

    .icon {
      position: relative;
    }
  }

  .content {
    flex-grow: 2;
    overflow-y: auto;
  }

  .actions {
    position: relative;
    width: 100%;
    min-height: var(--ui3n-dialog-actions-height);
    height: var(--ui3n-dialog-actions-height);
  }

  .actionsDefault {
    padding: var(--ui3n-dialog-actions-padding);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-s);
  }

  .loading {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
