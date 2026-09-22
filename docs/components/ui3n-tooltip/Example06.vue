<script setup lang="ts">
  import { getCurrentInstance, onBeforeUnmount, useTemplateRef } from 'vue';

  const app = getCurrentInstance();
  const $tooltip = app?.appContext.config.globalProperties.$tooltip;
  const showTarget = useTemplateRef<HTMLElement>('show-target');
  const attachTarget = useTemplateRef<HTMLElement>('attach-target');

  function showNow() {
    if (!showTarget.value || !$tooltip) {
      return;
    }

    $tooltip.show(showTarget.value, {
      content: 'Shown next to the button',
      placement: 'top',
    });
  }

  function hideNow() {
    $tooltip?.hide();
  }

  function bindHover() {
    if (!attachTarget.value || !$tooltip) {
      return;
    }

    $tooltip.attach(attachTarget.value, {
      content: 'Attached on hover',
      trigger: 'hover',
    });
  }

  function unbind() {
    if (attachTarget.value) {
      $tooltip?.detach(attachTarget.value);
    }
  }

  onBeforeUnmount(() => {
    $tooltip?.detachAll();
  });
</script>

<template>
  <div class="tooltip-container">
    <div class="row">
      <span ref="show-target">
        <Ui3nButton
          type="primary"
          @click="showNow"
        >
          Show tooltip
        </Ui3nButton>
      </span>
      <Ui3nButton @click="hideNow">Hide</Ui3nButton>
    </div>
    <div class="row">
      <span ref="attach-target">
        <Ui3nButton>Hover after attach</Ui3nButton>
      </span>
      <Ui3nButton
        type="primary"
        @click="bindHover"
      >
        Attach
      </Ui3nButton>
      <Ui3nButton @click="unbind">Detach</Ui3nButton>
    </div>
  </div>
</template>

<style scoped>
  .tooltip-container {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .row {
    display: flex;
    gap: 12px;
    align-items: center;
  }
</style>
