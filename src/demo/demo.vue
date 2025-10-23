<script setup lang="ts">
  import { defineAsyncComponent, inject, ref, watch } from 'vue';
  import { DIALOGS_KEY, type DialogsPlugin } from '@/plugins/dialogs/types';
  import Ui3nInputDemo from './ui3n-input-demo.vue';
  import Ui3nEditableDemo from './ui3n-editable-demo.vue';
  import Ui3nDropFilesDemo from './ui3n-drop-files-demo.vue';
  import Ui3nTitleDemo from './ui3n-title-demo.vue';
  import Ui3nAutocompleteDemo from './ui3n-autocomplete-demo.vue';
  import Ui3nLongPressDemo from './ui3n-long-press-demo.vue';
  import Ui3nSliderDemo from './ui3n-slider-demo.vue';
  import Ui3nIconDemo from './ui3n-icon-demo.vue';
  // import Ui3nButtonDemo from './ui3n-button-demo.vue';

  import Ui3nBadge from '../components/ui3n-badge/ui3n-badge.vue';
  import Ui3nButton from '../components/ui3n-button/ui3n-button.vue';
  import Ui3nSwitch from '../components/ui3n-switch/ui3n-switch.vue';
  import Ui3nBreadcrumb from '../components/ui3n-breadcrumbs/ui3n-breadcrumb.vue';
  import Ui3nIcon from '../components/ui3n-icon/ui3n-icon.vue';
  import Ui3nBreadcrumbs from '../components/ui3n-breadcrumbs/ui3n-breadcrumbs.vue';
  import Ui3nCheckbox from '../components/ui3n-checkbox/ui3n-checkbox.vue';
  import Ui3nChip from '../components/ui3n-chip/ui3n-chip.vue';
  import Ui3nStepLineBar from '../components/ui3n-step-line-bar/ui3n-step-line-bar.vue';
  import Ui3nList from '../components/ui3n-list/ui3n-list.vue';
  import Ui3nMenu from '../components/ui3n-menu/ui3n-menu.vue';
  import Ui3nNotification from '../components/ui3n-notification/ui3n-notification.vue';
  import Ui3nTabs from '../components/ui3n-tabs/ui3n-tabs.vue';
  import Ui3nText from '../components/ui3n-text/ui3n-text.vue';
  import Ui3nProgressLinear from '../components/ui3n-progress/ui3n-progress-linear.vue';
  import Ui3nVirtualScroll from '../components/ui3n-virtual-scroll/ui3n-virtual-scroll.vue';
  import Ui3nProgressCircular from '../components/ui3n-progress/ui3n-progress-circular.vue';
  import Ui3nTable from '../components/ui3n-table/ui3n-table.vue';
  import Ui3nTooltip from '../components/ui3n-tooltip/ui3n-tooltip.vue';
  import Ui3nRadio from '../components/ui3n-radio-group/ui3n-radio.vue';
  import Ui3nRadioGroup from '../components/ui3n-radio-group/ui3n-radio-group.vue';
  import Ui3nResize, { type Ui3nResizeCbArg } from '../directives/ui3n-resize';
  import type { Ui3nTableBodyBaseItem, Ui3nTableProps } from '@/components/ui3n-table/types';

  const vUi3nResize = Ui3nResize;
  const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)!;

  const darkTheme = ref(false);
  const checkValue = ref([true, false, false]);
  const switchValue = ref([true, false]);
  const stepValue = ref(1);
  const textValue = ref('');
  const list = ref<
    {
      id: string;
      title: string;
      children: {
        id: string;
        title: string;
      }[];
    }[]
  >(prepareList());
  const listV = ref<
    {
      id: string;
      title: string;
    }[]
  >(prepareVList());
  const tabsValue = ref(0);
  const radioValue1 = ref(false);
  const radioValue2 = ref(0);
  const radioGroupValue = ref(0);

  const timerId = ref();
  const progressValue = ref(0);

  const tooltipDisable = ref(false);

  const menuOffset = ref({ x: 0, y: 0 });

  interface TableDemoItem extends Ui3nTableBodyBaseItem {
    name: string;
    type: string;
    size?: string;
    date: string;
  }

  const tableValue = ref<Ui3nTableProps<TableDemoItem>>({
    config: {
      tableName: 'test',
      sortOrder: {
        field: 'name',
        direction: 'desc',
      },
      fieldAsRowKey: 'name',
      selectable: 'multiple',
      columnStyle: {
        name: { width: '60%' },
        type: { width: '10%' },
        size: { width: '10%' },
        date: { width: '20%' },
      },
      showNoDataMessage: true,
    },
    head: [
      { key: 'name', text: 'Name', sortable: true },
      { key: 'type', text: 'Type' },
      { key: 'size', text: 'Size' },
      { key: 'date', text: 'Date', sortable: true },
    ],
    body: {
      content: [
        { name: 'Documents', type: 'folder', date: '2024-07-20' },
        { name: 'Downloads', type: 'folder', date: '2022-07-20' },
        { name: 'Images', type: 'folder', date: '2022-07-20' },
        { name: 'Video', type: 'folder', date: '2022-07-20' },
        { name: 'Dump', type: 'folder', date: '2022-07-20' },
        { name: 'calendar.docx', type: 'docx', size: '84 KB', date: '2022-07-22' },
        { name: 'cars.xlsx', type: 'xlsx', size: '26 KB', date: '2022-07-22' },
        { name: 'nature.jpg', type: 'jpg', size: '176 KB', date: '2022-07-22' },
        { name: 'rocket.jpg', type: 'jpg', size: '14 KB', date: '2022-07-22' },
        { name: 'стич.jpg', type: 'jpg', size: '76 KB', date: '2022-07-22' },
        { name: 'favicon.png', type: 'png', size: '690 B', date: '2022-07-22' },
        { name: 'asmail.d.ts', type: 'd.ts', size: '840 B', date: '2024-08-11' },
        { name: 'common-caps.d.ts', type: 'd.ts', size: '2 KB', date: '2024-08-11' },
        { name: 'files.d.ts', type: 'd.ts', size: '38 KB', date: '2024-08-11' },
        { name: 'storage.d.ts', type: 'd.ts', size: '2 KB', date: '2024-08-11' },
      ],
    },
  });

  watch(
    () => tabsValue.value,
    (val, oldValue) => {
      console.log(`CHANGE TAB FROM ${oldValue} TO ${val} INDEX`);
    },
    { immediate: true },
  );

  watch(
    () => progressValue.value,
    val => {
      if (val >= 100) {
        clearInterval(timerId.value);
        setTimeout(() => {
          progressValue.value = 0;
          changeProgressValue();
        }, 2000);
      }
    },
  );

  const notificationsExamples = {
    warning: `Warning message with short Description for on or two lines and default view.`,
    error: `Error message with short Description for on or two lines and default view.`,
    success: `Successes message with short Description for on or two lines and default view.`,
    info: `Info message with short Description for on or two lines and default view.`,
  };

  function changeColorTheme(val: boolean) {
    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;

    htmlEl.classList.remove(val ? 'default-theme' : 'dark-theme');
    htmlEl.classList.add(val ? 'dark-theme' : 'default-theme');
  }

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  function changeProgressValue() {
    timerId.value = setInterval(() => {
      const increment = getRandomInt(8);
      progressValue.value = progressValue.value + increment > 100 ? 100 : progressValue.value + increment;
    }, 500);
  }

  function prepareList() {
    const res: unknown[] = [];
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);
      res.push({
        id: char,
        title: `${char}`,
        children: [
          { id: `${char}-01`, title: `01 ${char} item` },
          { id: `${char}-02`, title: `02 ${char} item` },
          { id: `${char}-03`, title: `03 ${char} item` },
        ],
      });
    }

    return res;
  }

  function prepareVList() {
    return Array.from({ length: 5000 }, (_, i) => ({
      id: `${i}i`,
      title: `Item ${i}`,
    }));
  }

  function openDialog() {
    const component = defineAsyncComponent(() => import('./test-dialog-1.vue'));
    dialogs.$openDialog<typeof component>({
      component,
      componentProps: {
        text: 'This is the place for any text!',
      },
      dialogProps: {
        title: 'THE TEST DIALOG-1 TITLE',
        icon: 'round-info',
        closeOnClickOverlay: false,
        closeOnEsc: true,
      },
    });
  }

  changeProgressValue();

  function onResize(val: Ui3nResizeCbArg) {
    console.log('ON_RESIZE', val);
  }
</script>
Ï
<template>
  <section
    v-ui3n-resize="onResize"
    class="demo"
  >
    <h3>Components</h3>
    <div class="theme">
      <span>Default theme</span>
      <ui3n-switch
        size="24"
        :model-value="darkTheme"
        @change="changeColorTheme"
      />
      <span>Dark theme</span>
    </div>

    <ui3n-slider-demo />

    <ui3n-title-demo />

    <ui3n-long-press-demo />

    <ui3n-icon-demo />

    <ui3n-input-demo />

    <ui3n-autocomplete-demo />

    <ui3n-editable-demo />

    <ui3n-drop-files-demo />
    <!-- <ui3n-button-demo /> -->

    <!-- BADGE -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- BADGE ---</div>
      <ui3n-badge value="5">
        <div class="demo-info">SOME TEXT</div>
      </ui3n-badge>
    </div>

    <!-- BREADCRUMBS -->
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
        <ui3n-breadcrumb> Folder</ui3n-breadcrumb>
      </ui3n-breadcrumbs>
    </div>

    <!-- BUTTON -->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- BUTTON ---</div>
        <ui3n-button>Primary</ui3n-button>
        <ui3n-button disabled>Disabled</ui3n-button>
        <ui3n-button size="small">Primary</ui3n-button>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-button block>Primary</ui3n-button>
        </div>
      </div>
      <div class="demo-row">
        <ui3n-button type="secondary">Secondary</ui3n-button>
        <ui3n-button
          type="secondary"
          disabled
        >Secondary
        </ui3n-button
        >
        <ui3n-button
          type="secondary"
          size="small"
        >Secondary
        </ui3n-button
        >
      </div>
      <div class="demo-row">
        <ui3n-button type="tertiary">Tertiary</ui3n-button>
        <ui3n-button
          type="tertiary"
          disabled
        >Tertiary
        </ui3n-button
        >
        <ui3n-button
          type="tertiary"
          size="small"
        >Tertiary
        </ui3n-button
        >
      </div>
      <div class="demo-row">
        <ui3n-button
          type="custom"
          color="#2ca089"
          text-color="#e3f4f1"
        >Custom
        </ui3n-button
        >
        <ui3n-button
          type="custom"
          color="#2ca089"
          text-color="#e3f4f1"
          disabled
        >
          Custom
        </ui3n-button>
        <ui3n-button
          type="custom"
          color="var(--warning-content-default)"
          text-color="#ffefe9"
          size="small"
        >Custom
        </ui3n-button
        >
      </div>
      <div class="demo-row">
        <ui3n-button icon="round-logout">Primary</ui3n-button>
        <ui3n-button
          icon="round-logout"
          disabled
        >Primary
        </ui3n-button
        >
        <ui3n-button
          icon="round-logout"
          size="small"
        >Primary
        </ui3n-button
        >
      </div>
      <div class="demo-row">
        <ui3n-button
          icon="round-home"
          icon-position="left"
        >Primary
        </ui3n-button
        >
        <ui3n-button
          icon="round-home"
          icon-position="left"
          disabled
        >Primary
        </ui3n-button
        >
        <ui3n-button
          icon="round-home"
          icon-position="left"
          size="small"
        >Primary
        </ui3n-button
        >
      </div>
      <div class="demo-row">
        <ui3n-button
          type="icon"
          icon="round-check"
        />
        <ui3n-button
          type="icon"
          icon="round-check"
          disabled
        />
        <ui3n-button
          type="icon"
          icon="round-check"
          size="small"
        />
      </div>
    </div>

    <!-- CHECKBOX -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- CHECKBOX ---</div>
      <ui3n-checkbox
        v-model="checkValue[0]"
        size="20"
      />
      <ui3n-checkbox
        v-model="checkValue[0]"
        size="20"
      >
        Checked
      </ui3n-checkbox>
      <ui3n-checkbox
        v-model="checkValue[0]"
        size="20"
        disabled
      >
        Checked (disabled)
      </ui3n-checkbox>
      <ui3n-checkbox
        v-model="checkValue[1]"
        size="20"
      >
        Unchecked
      </ui3n-checkbox>
      <ui3n-checkbox
        v-model="checkValue[2]"
        size="20"
        indeterminate
      >
        Indeterminate
      </ui3n-checkbox>
    </div>

    <!-- SWITCH -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- SWITCH ---</div>
      <ui3n-switch
        v-model="switchValue[0]"
        size="24"
      />
      <ui3n-switch
        v-model="switchValue[0]"
        size="24"
        disabled
      />
      <ui3n-switch
        v-model="switchValue[1]"
        size="24"
      />
      <ui3n-switch
        v-model="switchValue[1]"
        size="24"
      >
        With label
      </ui3n-switch>
    </div>

    <!-- STEP LINE BAR -->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- STEP LINE BAR ---</div>
        <div class="demo-row">
          <div class="demo-row__cell-long">
            <ui3n-step-line-bar
              :label="`Step ${stepValue} of 5`"
              :steps="5"
              :current="stepValue"
            />
          </div>
        </div>
      </div>
      <div class="demo-row">
        <ui3n-button
          :disabled="stepValue === 5"
          @click="stepValue++"
        >Next step
        </ui3n-button
        >
        <ui3n-button
          type="secondary"
          :disabled="stepValue === 1"
          @click="stepValue = 1"
        >
          To 1 step
        </ui3n-button>
      </div>
    </div>

    <!-- PROGRESS LINEAR -->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- PROGRESS LINEAR ---</div>
        <div class="demo-row__cell-long">
          <ui3n-progress-linear indeterminate />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-progress-linear
            height="5"
            :value="progressValue"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-progress-linear
            height="5"
            with-text
            :value="progressValue"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-progress-linear
            height="12"
            with-text
            :value="progressValue"
          />
        </div>
      </div>
    </div>

    <!-- PROGRESS CIRCULAR -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- PROGRESS CIRCULAR ---</div>
      <ui3n-progress-circular
        indeterminate
        size="80"
      />
      <ui3n-progress-circular
        size="80"
        :value="progressValue"
      />
      <ui3n-progress-circular
        size="80"
        with-text
        :value="progressValue"
      />
      <ui3n-progress-circular
        size="48"
        with-text
        :value="progressValue"
      />
    </div>

    <!-- CHIP -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- CHIP ---</div>
      <ui3n-chip
        closeable
        max-width="150"
      >
        simpleuser@test.com
        <template #left="{ size, color }">
          <ui3n-icon
            icon="round-person"
            :width="size"
            :height="size"
            :color="color"
          />
        </template>
      </ui3n-chip>
      <ui3n-chip
        max-width="150"
        color="var(--blue-10)"
      >
        simpleuser@test.com
        <template #left="{ size, color }">
          <ui3n-icon
            icon="round-person"
            :width="size"
            :height="size"
            :color="color"
          />
        </template>
      </ui3n-chip>
      <ui3n-chip
        :round="false"
        height="16"
        max-width="150"
        color="var(--color-icon-table-accent-default)"
        text-color="var(--white-100)"
        text-size="9"
      >
        DOCX
      </ui3n-chip>
    </div>

    <!-- DIALOG -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- DIALOG ---</div>
      <ui3n-button @click="openDialog">OPEN DIALOG</ui3n-button>
    </div>

    <!-- LIST -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- LIST ---</div>
      <div class="demo-row__list">
        <ui3n-list
          :sticky="false"
          :items="list"
        >
          <template #item="{ item }">
            <ui3n-list :items="item.children">
              <template #title>
                <div class="list-title">{{ item.title }}</div>
              </template>

              <template #item="{ item: children }">
                <div class="list-item">{{ children.title }}</div>
              </template>
            </ui3n-list>
          </template>
        </ui3n-list>
      </div>
    </div>

    <!-- VIRTUAL LIST -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- VIRTUAL LIST ---</div>
      <div class="demo-row__list">
        <ui3n-virtual-scroll
          :items="listV"
          :min-child-height="32"
        >
          <template #item="{ value, index }">
            <div class="demo-row__virtual-scroll-item">
              {{ `(${index}) ${value.id}_${value.title}` }}
            </div>
          </template>
        </ui3n-virtual-scroll>
      </div>
    </div>

    <!-- MENU -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- MENU ---</div>
      <div class="demo-row__cell">
        <ui3n-menu :disabled="true">
          <ui3n-button>Menu</ui3n-button>
          <template #menu>
            <div
              v-for="idx in [1, 2, 3]"
              :key="idx"
              class="demo-menu__item"
              @click="() => console.log(`Click on the ${idx} menu item`)"
            >
              Menu option {{ idx }}
            </div>
          </template>
        </ui3n-menu>
      </div>
      <div class="demo-row__cell">
        <ui3n-menu
          position-strategy="fixed"
          :offset-x="menuOffset.x"
          :offset-y="menuOffset.y"
        >
          <ui3n-button>Menu (offset)</ui3n-button>
          <template #menu>
            <div
              v-for="idx in [1, 2, 3]"
              :key="idx"
              class="demo-menu__item"
              @click="() => console.log(`Click on the ${idx} menu item`)"
            >
              Menu option {{ idx }}
            </div>
          </template>
        </ui3n-menu>
      </div>
      <div class="demo-row__cell">
        <ui3n-button
          @click.stop.prevent="() => menuOffset = { x: menuOffset.x + 10, y: menuOffset.y + 10 }"
        >
          {{ menuOffset.x }} | {{ menuOffset.y }}
        </ui3n-button>
      </div>
    </div>

    <!-- TABS -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- TABS ---</div>
      <div class="demo-row__cell">
        <ui3n-tabs
          v-model="tabsValue"
          item-direction="vertical"
          indicator-position="reverse"
        >
          <div class="tabs__item">Option 1</div>
          <div class="tabs__item">Option 2</div>
          <div class="tabs__item">Option 3</div>
          <ui3n-button
            type="secondary"
            class="tabs__item"
          >Option 4
          </ui3n-button
          >
        </ui3n-tabs>
      </div>
      <div class="demo-row__cell-long">
        <ui3n-tabs v-model="tabsValue">
          <div
            class="tabs__item"
            disabled
          >
            Option 1
          </div>
          <div class="tabs__item">Option 2</div>
          <div class="tabs__item">Option 3</div>
          <div class="tabs__item">Option 4</div>
        </ui3n-tabs>
      </div>
    </div>

    <!-- TEXT FIELD -->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- TEXT FIELD ---</div>
        <div class="demo-row__cell">
          <ui3n-text
            v-model:text="textValue"
            :rows="1"
            :max-rows="3"
            placeholder="Enter any text"
            @keydown="(ev) => console.log('# KEYDOWN => ', ev)"
            @enter="(ev) => console.log('# ENTER EVENT => ', ev)"
          />
        </div>
        <div class="demo-row__cell-text">
          <span>text:</span>
          <div style="white-space: pre-wrap">{{ textValue }}</div>
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell">
          <ui3n-text
            v-model:text="textValue"
            :rows="1"
            :max-rows="3"
            placeholder="Enter any text"
            :disabled="true"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell">
          <ui3n-text
            v-model:text="textValue"
            label="Some label"
            :rows="1"
            :max-rows="3"
            placeholder="Enter any text"
            @keydown="(ev) => console.log('# KEYDOWN => ', ev)"
            @enter="(ev) => console.log('# ENTER EVENT => ', ev)"
          />
        </div>
      </div>
    </div>

    <!-- TOOLTIP-->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- TOOLTIP ---</div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell">
          <ui3n-tooltip
            content="Tooltip text"
            placement="right"
            trigger="manual"
            :model-value="true"
          >
            <ui3n-button>Tooltip RIGHT</ui3n-button>
          </ui3n-tooltip>
        </div>
        <div class="demo-row__cell">
          <ui3n-tooltip
            content="Tooltip text (top, hover)"
            placement="top"
            trigger="hover"
            :disabled="tooltipDisable"
          >
            <ui3n-button>Tooltip TOP (Hover)</ui3n-button>
          </ui3n-tooltip>
        </div>
        <div class="demo-row__cell">
          <ui3n-tooltip
            content="Tooltip text"
            placement="bottom"
            trigger="click"
          >
            <ui3n-button>Tooltip BOTTOM (Click)</ui3n-button>
          </ui3n-tooltip>
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell">
          <ui3n-tooltip
            content="Tooltip text"
            placement="bottom-end"
            trigger="hover"
            color="#0d3029"
            text-color="#fff"
          >
            <ui3n-button>Tooltip BOTTOM-END (Hover)</ui3n-button>
          </ui3n-tooltip>
        </div>
        <div class="demo-row__cell" />
        <div class="demo-row__cell">
          <ui3n-tooltip
            placement="left"
            trigger="click"
          >
            <ui3n-button>Tooltip LEFT, 'content' slot (Click)</ui3n-button>
            <template #content>
              <ui3n-icon icon="round-person" />
            </template>
          </ui3n-tooltip>
        </div>
      </div>
    </div>

    <!-- TABLE -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- TABLE ---</div>
      <div class="demo-row__table">
        <ui3n-table
          :config="tableValue.config"
          :head="tableValue.head"
          :body="tableValue.body"
        >
          <template #no-data>
            <h4>No data yet!</h4>
          </template>
        </ui3n-table>
      </div>
    </div>

    <!-- NOTIFICATION -->
    <div>
      <div class="demo-row demo-row--with-title">
        <div class="demo-row__title">--- NOTIFICATION ---</div>
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="info"
            :content="notificationsExamples.info"
            :duration="2000"
            :on-close="() => console.log('CLOSE NOTIFICATION!!!')"
          />
        </div>
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="info"
            :with-icon="false"
            :content="notificationsExamples.info"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="success"
            :content="notificationsExamples.success"
            :duration="2000"
          />
        </div>
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="success"
            :with-icon="false"
            :content="notificationsExamples.success"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="warning"
            :content="notificationsExamples.warning"
            :duration="2000"
          />
        </div>
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="warning"
            :with-icon="false"
            :content="notificationsExamples.warning"
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="error"
            :content="notificationsExamples.error"
            :duration="2000"
          />
        </div>
        <div class="demo-row__cell-long">
          <ui3n-notification
            type="error"
            :with-icon="false"
            :content="notificationsExamples.error"
          />
        </div>
      </div>
    </div>

    <!-- RADIO -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- RADIO ---</div>
      <ui3n-radio
        v-model="radioValue1"
        size="40"
      >
        Current value: {{ radioValue1 }}
      </ui3n-radio>

      <ui3n-radio
        v-model="radioValue1"
        size="40"
        color="#ff8800"
      >
        Current value: {{ radioValue1 }}
      </ui3n-radio>

      <ui3n-radio
        v-model="radioValue1"
        size="40"
      >
        <template #checkedIcon>
          <ui3n-icon
            icon="round-done-all"
            width="32"
            height="32"
            color="green"
          />
        </template>

        <template #uncheckedIcon>
          <ui3n-icon
            icon="round-done"
            width="32"
            height="32"
            color="orange"
          />
        </template>

        Current value: {{ radioValue1 }}
      </ui3n-radio>

      <ui3n-radio
        v-model="radioValue1"
        size="40"
        :disabled="true"
      >
        <template #checkedIcon>
          <ui3n-icon
            icon="round-done-all"
            width="32"
            height="32"
            color="green"
          />
        </template>

        <template #uncheckedIcon>
          <ui3n-icon
            icon="round-done"
            width="32"
            height="32"
            color="orange"
          />
        </template>

        Current value: {{ radioValue1 }}
      </ui3n-radio>

      <ui3n-radio
        v-model="radioValue2"
        size="40"
        :unchecked-value="0"
        :checked-value="1"
      >
        Current value: {{ radioValue2 }}
      </ui3n-radio>

      <ui3n-radio
        v-model="radioValue2"
        size="40"
        :unchecked-value="0"
        :checked-value="1"
        :disabled="true"
      >
        Disabled (current value: {{ radioValue2 }})
      </ui3n-radio>
    </div>

    <!-- RADIO GROUP -->
    <div class="demo-row demo-row--with-title">
      <div class="demo-row__title">--- RADIO GROUP ---</div>
      <ui3n-radio-group v-model="radioGroupValue" name="test">
        <ui3n-radio size="32" :checked-value="0">AAAAA</ui3n-radio>
        <ui3n-radio size="32" :checked-value="2">BBBBB</ui3n-radio>
      </ui3n-radio-group>
      <p>Current value: {{ radioGroupValue }}</p>
    </div>
  </section>
</template>

<style lang="scss">
  .demo {
    position: relative;
    width: 100%;
    padding: 16px 16px 400px;

    .theme {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      font-size: 14px;
      font-weight: 500;
    }

    &__body-grid {
      display: grid;
      grid-template-columns: repeat(3, 300px);
      gap: 16px 8px;
    }

    &-row {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
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

    &-row__cell {
      position: relative;
      width: 300px;
    }

    &-row__cell-text {
      display: flex;
      width: 500px;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
    }

    &-row__cell-long {
      position: relative;
      width: 500px;
    }

    &-row__list {
      position: relative;
      width: 300px;
      height: 360px;
      overflow-y: auto;
      background-color: var(--grey-5);

      .list {
        &-title {
          font-size: 14px;
          font-weight: 600;
          z-index: 10;
          position: relative;
          width: 24px;
        }

        &-item {
          padding-left: 24px;
          cursor: pointer;
        }
      }
    }

    &-row__virtual-scroll-item {
      position: relative;
      display: flex;
      height: 32px;
      justify-content: flex-start;
      align-items: center;
    }

    &-row__table {
      position: relative;
      width: 720px;
      height: 360px;
      background-color: var(--white-100);
      overflow-y: hidden;
    }

    &-menu {
      &__item {
        position: relative;
        width: max-content;
        height: 24px;
        padding: 0 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;

        &:hover {
          cursor: pointer;
          opacity: 0.75;
        }
      }
    }

    .tabs {
      &__item {
        display: flex;
        width: 100px;
        justify-content: center;
        align-items: center;
        min-height: 32px;
      }
    }
  }
</style>
