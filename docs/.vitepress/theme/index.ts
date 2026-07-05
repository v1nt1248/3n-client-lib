// https://vitepress.dev/guide/custom-theme
import '../../../src/assets/styles/variables.css';
import '../../../src/assets/styles/icons.css';
import './style.css';
import DefaultTheme from 'vitepress/theme';
import { createPinia } from 'pinia';

import Layout from './Layout.vue';
import ComponentDoc from './components/ComponentDoc.vue';
import DemoBlock from './components/DemoBlock.vue';

import { dialogs, notifications } from '../../../src/plugins/index';

import Ui3nClickOutside from '../../../src/directives/ui3n-click-outside';
import Ui3nHtml from '../../../src/directives/ui3n-html';
import Ui3nLongPress from '../../../src/directives/ui3n-long-press';
import Ui3nResize from '../../../src/directives/ui3n-resize';
import Ui3nRipple from '../../../src/directives/ui3n-ripple';
import Ui3nTitle from '../../../src/directives/ui3n-title';

import Ui3nAutocomplete from '../../../src/components/ui3n-autocomplete/ui3n-autocomplete.vue';
import Ui3nBudgeSimple from '../../../src/components/ui3n-badge/ui3n-badge-simple.vue';
import Ui3nBadge from '../../../src/components/ui3n-badge/ui3n-badge.vue';
import Ui3nBreadcrumb from '../../../src/components/ui3n-breadcrumbs/ui3n-breadcrumb.vue';
import Ui3nBreadcrumbs from '../../../src/components/ui3n-breadcrumbs/ui3n-breadcrumbs.vue';
import Ui3nButton from '../../../src/components/ui3n-button/ui3n-button.vue';
import Ui3nCheckbox from '../../../src/components/ui3n-checkbox/ui3n-checkbox.vue';
import Ui3nChip from '../../../src/components/ui3n-chip/ui3n-chip.vue';
import Ui3nDialogProvider from '../../../src/components/ui3n-dialog/ui3n-dialog-provider.vue';
import Ui3nDialog from '../../../src/components/ui3n-dialog/ui3n-dialog.vue';
import Ui3nDropFiles from '../../../src/components/ui3n-drop-files/ui3n-drop-files.vue';
import Ui3nEditable from '../../../src/components/ui3n-editable/ui3n-editable.vue';
import Ui3nContentEditable from '../../../src/components/ui3n-editable/ui3n-content-editable.vue';
import Ui3nEmoji from '../../../src/components/ui3n-emoji/ui3n-emoji.vue';
import Ui3nIcon from '../../../src/components/ui3n-icon/ui3n-icon.vue';
import Ui3nInput from '../../../src/components/ui3n-input/ui3n-input.vue';
import Ui3nInputFile from '../../../src/components/ui3n-input-file/ui3n-input-file.vue';
import Ui3nList from '../../../src/components/ui3n-list/ui3n-list.vue';
import Ui3nMenu from '../../../src/components/ui3n-menu/ui3n-menu.vue';
import Ui3nNotification from '../../../src/components/ui3n-notification/ui3n-notification.vue';
import Ui3nProgressCircular from '../../../src/components/ui3n-progress/ui3n-progress-circular.vue';
import Ui3nProgressLinear from '../../../src/components/ui3n-progress/ui3n-progress-linear.vue';
import Ui3nRadio from '../../../src/components/ui3n-radio-group/ui3n-radio.vue';
import Ui3nRadioGroup from '../../../src/components/ui3n-radio-group/ui3n-radio-group.vue';
import Ui3nSelector from '../../../src/components/ui3n-selector/ui3n-selector.vue';
import Ui3nSlider from '../../../src/components/ui3n-slider/ui3n-slider.vue';
import Ui3nStepLineBar from '../../../src/components/ui3n-step-line-bar/ui3n-step-line-bar.vue';
import Ui3nSwitch from '../../../src/components/ui3n-switch/ui3n-switch.vue';
import Ui3nTableSortIcon from '../../../src/components/ui3n-table/ui3n-table-sort-icon.vue';
import Ui3nTable from '../../../src/components/ui3n-table/ui3n-table.vue';
import Ui3nTabs from '../../../src/components/ui3n-tabs/ui3n-tabs.vue';
import Ui3nText from '../../../src/components/ui3n-text/ui3n-text.vue';
import Ui3nTooltip from '../../../src/components/ui3n-tooltip/ui3n-tooltip.vue';
import Ui3nScrollbarVertical from '../../../src/components/ui3n-scrollbar-vertical/ui3n-scrollbar-vertical.vue';
import Ui3nScrollbarHorizontal from '../../../src/components/ui3n-scrollbar-horizontal/ui3n-scroolbar-horizontal.vue';
import Ui3nVirtualScroll from '../../../src/components/ui3n-virtual-scroll/ui3n-virtual-scroll.vue';
import Ui3nMobileMenu from '../../../src/components/ui3n-mobile-menu/ui3n-mobile-menu.vue';
import Ui3nMobileMenuItem from '../../../src/components/ui3n-mobile-menu-item/ui3n-mobile-menu-item.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    const pinia = createPinia();

    app.use(pinia);
    app.use(dialogs);
    app.use(notifications);

    app.directive('Ui3nClickOutside', Ui3nClickOutside);
    app.directive('Ui3nHtml', Ui3nHtml);
    app.directive('Ui3nLongPress', Ui3nLongPress);
    app.directive('Ui3nResize', Ui3nResize);
    app.directive('Ui3nRipple', Ui3nRipple);
    app.directive('Ui3nTitle', Ui3nTitle);

    app.component('ComponentDoc', ComponentDoc);
    app.component('DemoBlock', DemoBlock);

    app.component('Ui3nAutocomplete', Ui3nAutocomplete);
    app.component('Ui3nBudgeSimple', Ui3nBudgeSimple);
    app.component('Ui3nBadge', Ui3nBadge);
    app.component('Ui3nBreadcrumb', Ui3nBreadcrumb);
    app.component('Ui3nBreadcrumbs', Ui3nBreadcrumbs);
    app.component('Ui3nButton', Ui3nButton);
    app.component('Ui3nCheckbox', Ui3nCheckbox);
    app.component('Ui3nChip', Ui3nChip);
    app.component('Ui3nDialogProvider', Ui3nDialogProvider);
    app.component('Ui3nDialog', Ui3nDialog);
    app.component('Ui3nDropFiles', Ui3nDropFiles);
    app.component('Ui3nEditable', Ui3nEditable);
    app.component('Ui3nContentEditable', Ui3nContentEditable);
    app.component('Ui3nEmoji', Ui3nEmoji);
    app.component('Ui3nIcon', Ui3nIcon);
    app.component('Ui3nInput', Ui3nInput);
    app.component('Ui3nInputFile', Ui3nInputFile);
    app.component('Ui3nList', Ui3nList);
    app.component('Ui3nMenu', Ui3nMenu);
    app.component('Ui3nNotification', Ui3nNotification);
    app.component('Ui3nProgressCircular', Ui3nProgressCircular);
    app.component('Ui3nProgressLinear', Ui3nProgressLinear);
    app.component('Ui3nRadio', Ui3nRadio);
    app.component('Ui3nRadioGroup', Ui3nRadioGroup);
    app.component('Ui3nSelector', Ui3nSelector);
    app.component('Ui3nSlider', Ui3nSlider);
    app.component('Ui3nStepLineBar', Ui3nStepLineBar);
    app.component('Ui3nSwitch', Ui3nSwitch);
    app.component('Ui3nTableSortIcon', Ui3nTableSortIcon);
    app.component('Ui3nTable', Ui3nTable);
    app.component('Ui3nTabs', Ui3nTabs);
    app.component('Ui3nText', Ui3nText);
    app.component('Ui3nTooltip', Ui3nTooltip);
    app.component('Ui3nScrollbarVertical', Ui3nScrollbarVertical);
    app.component('Ui3nScrollbarHorizontal', Ui3nScrollbarHorizontal);
    app.component('Ui3nVirtualScroll', Ui3nVirtualScroll);
    app.component('Ui3nMobileMenu', Ui3nMobileMenu);
    app.component('Ui3nMobileMenuItem', Ui3nMobileMenuItem);
  },
};
