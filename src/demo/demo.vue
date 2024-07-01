<script setup lang="ts">
import { defineAsyncComponent, inject, ref } from 'vue';
import { DIALOGS_KEY, type DialogsPlugin } from '../plugins/dialogs';
import Ui3nBadge from '../components/ui3n-badge.vue';
import Ui3nButton from '../components/ui3n-button.vue';
import Ui3nSwitch from '../components/ui3n-switch.vue';
import Ui3nBreadcrumb from '../components/ui3n-breadcrumb.vue';
import Ui3nIcon from '../components/ui3n-icon.vue';
import Ui3nBreadcrumbs from '../components/ui3n-breadcrumbs.vue';
import Ui3nCheckbox from '../components/ui3n-checkbox.vue';
import Ui3nChip from '../components/ui3n-chip.vue';

const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)!;
const checkValue = ref([true, false, false]);
const switchValue = ref([true, false]);

function openDialog() {
  const component = defineAsyncComponent(() => import('./test-dialog.vue'));
  dialogs.$openDialog({
    component,
    componentProps: {
      text: 'This is the place for any text!',
    },
    dialogProps: {
      title: 'TEST DIALOG TITLE',
      closeOnClickOverlay: false,
    },
  });
}
</script>

<template>
  <section class="demo">
    <h3>Components</h3>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- BADGE ---</div>
      <ui3n-badge value="5">
        <div class="demo-info">SOME TEXT</div>
      </ui3n-badge>
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- BREADCRUMBS ---</div>
      <ui3n-breadcrumbs>
        <ui3n-breadcrumb
          :is-active="true"
          @click="() => console.log('HOME')"
        >
          Home
        </ui3n-breadcrumb>
        <ui3n-breadcrumb
          :is-active="true"
          @click="() => console.log('PROJECTS')"
        >
          Projects
        </ui3n-breadcrumb>
        <ui3n-breadcrumb>
          Folder
        </ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- BUTTONS ---</div>
      <ui3n-button>Primary</ui3n-button>
      <ui3n-button disabled>Disabled</ui3n-button>
      <ui3n-button size="small">Primary</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button type="secondary">Secondary</ui3n-button>
      <ui3n-button type="secondary" disabled>Secondary</ui3n-button>
      <ui3n-button type="secondary" size="small">Secondary</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button type="tertiary">Tertiary</ui3n-button>
      <ui3n-button type="tertiary" disabled>Tertiary</ui3n-button>
      <ui3n-button type="tertiary" size="small">Tertiary</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be">Custom</ui3n-button>
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be" disabled>Custom</ui3n-button>
      <ui3n-button type="custom" color="#124037" text-color="#ffd0be" size="small">Custom</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button icon="logout">Primary</ui3n-button>
      <ui3n-button icon="logout" disabled>Primary</ui3n-button>
      <ui3n-button icon="logout" size="small">Primary</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button icon="home" icon-position="left">Primary</ui3n-button>
      <ui3n-button icon="home" icon-position="left" disabled>Primary</ui3n-button>
      <ui3n-button icon="home" icon-position="left" size="small">Primary</ui3n-button>
    </div>
    <div class="demo-row">
      <ui3n-button type="icon" icon="check" />
      <ui3n-button type="icon" icon="check" disabled />
      <ui3n-button type="icon" icon="check" size="small" />
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- CHECKBOX ---</div>
      <ui3n-checkbox size="20" v-model="checkValue[0]">
        Checked
      </ui3n-checkbox>
      <ui3n-checkbox size="20" disabled v-model="checkValue[0]">
        Checked (disabled)
      </ui3n-checkbox>
      <ui3n-checkbox size="20" v-model="checkValue[1]">
        Unchecked
      </ui3n-checkbox>
      <ui3n-checkbox size="20" v-model="checkValue[2]" indeterminate>
        Indeterminate
      </ui3n-checkbox>
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- SWITCH ---</div>
      <ui3n-switch size="24" v-model="switchValue[0]" />
      <ui3n-switch size="24" disabled v-model="switchValue[0]" />
      <ui3n-switch size="24" v-model="switchValue[1]" />
      <ui3n-switch size="24" v-model="switchValue[1]">
        With label
      </ui3n-switch>
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- CHIP ---</div>
      <ui3n-chip closeable max-width="150" color="var(--blue-10)">
        simpleuser@test.com
        <template #left="{ size, color }">
          <ui3n-icon icon="person" :width="size" :height="size" :color="color" />
        </template>
      </ui3n-chip>
      <ui3n-chip max-width="150" color="var(--blue-10)">
        simpleuser@test.com
        <template #left="{ size, color }">
          <ui3n-icon icon="person" :width="size" :height="size" :color="color" />
        </template>
      </ui3n-chip>
      <ui3n-chip
        :round="false"
        height="16"
        max-width="150"
        color="var(--color-icon-table-accent-default)"
        text-color="var(--white-0)"
        text-size="9"
      >
        DOCX
      </ui3n-chip>
    </div>

    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- DIALOG ---</div>
      <ui3n-button @click="openDialog">OPEN DIALOG</ui3n-button>
    </div>
  </section>
</template>

<style lang="scss">
.demo {
  position: relative;
  width: 100%;

  &-row {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    &--with-title {
      padding-top: 32px;
    }
  }

  &-row__title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  &-block {
    position: relative;
    width: fit-content;
    max-height: 400px;
    margin-bottom: 16px;
    overflow-y: auto;

    &--with-title {
      padding-top: 32px;
    }
  }

  &-info {
    position: relative;
    width: 120px;
    height: 30px;
    font-size: 14px;
    line-height: 1;
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid green;
  }
}
</style>
