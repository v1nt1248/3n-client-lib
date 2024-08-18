import type Ui3nButton from './components/ui3n-button/ui3n-button.vue';
import type Ui3nChip from './components/ui3n-chip/ui3n-chip.vue';
import type Ui3nCheckbox from './components/ui3n-checkbox/ui3n-checkbox.vue';
import type Ui3nDialog from './components/ui3n-dialog/ui3n-dialog.vue';
import type Ui3nDropFiles from './components/ui3n-drop-files/ui3n-drop-files.vue';
import type Ui3nEmoji from './components/ui3n-emoji/ui3n-emoji.vue';
import type Ui3nIcon from './components/ui3n-icon/ui3n-icon.vue';
import type Ui3nInput from './components/ui3n-input/ui3n-input.vue';
import type Ui3nList from './components/ui3n-list/ui3n-list.vue';
import type Ui3nMenu from './components/ui3n-menu/ui3n-menu.vue';
import type Ui3nNotification from './components/ui3n-notification/ui3n-notification.vue';
import type Ui3nTableSortIcon from './components/ui3n-table/ui3n-table-sort-icon.vue';
import type Ui3nTable from './components/ui3n-table/ui3n-table.vue';
import type Ui3nTabs from './components/ui3n-tabs/ui3n-tabs.vue';
import type Ui3nText from './components/ui3n-text/ui3n-text.vue';
import type Ui3nVirtualScroll from './components/ui3n-virtual-scroll/ui3n-virtual-scroll.vue';
import type Ui3nBadge from './components/ui3n-badge/ui3n-badge.vue';
import type Ui3nBreadcrumb from './components/ui3n-breadcrumbs/ui3n-breadcrumb.vue';
import type Ui3nBreadcrumbs from './components/ui3n-breadcrumbs/ui3n-breadcrumbs.vue';
import type Ui3nSwitch from './components/ui3n-switch/ui3n-switch.vue';
import type Ui3nStepLineBar from './components/ui3n-step-line-bar/ui3n-step-line-bar.vue';
import type Ui3nProgressLinear from './components/ui3n-progress/ui3n-progress-linear.vue';
import type Ui3nProgressCircular from './components/ui3n-progress/ui3n-progress-circular.vue';
import type Ui3nTooltip from './components/ui3n-tooltip/ui3n-tooltip.vue';
import type Ui3nHtml from './directives/ui3n-html';
import type Ui3nClickOutside from './directives/ui3n-click-outside';
import type Ui3nResize from './directives/ui3n-resize';

export * from './directives';
export * from './components';

declare module 'vue' {
  interface GlobalComponents {
    Ui3nBadge: typeof Ui3nBadge;
    Ui3nBreadcrumb: typeof Ui3nBreadcrumb;
    Ui3nBreadcrumbs: typeof Ui3nBreadcrumbs;
    Ui3nButton: typeof Ui3nButton;
    Ui3nCheckbox: typeof Ui3nCheckbox;
    Ui3nChip: typeof Ui3nChip;
    Ui3nDialog: typeof Ui3nDialog;
    Ui3nDropFiles: typeof Ui3nDropFiles;
    Ui3nEmoji: typeof Ui3nEmoji;
    Ui3nIcon: typeof Ui3nIcon;
    Ui3nInput: typeof Ui3nInput;
    Ui3nList: typeof Ui3nList;
    Ui3nMenu: typeof Ui3nMenu;
    Ui3nNotification: typeof Ui3nNotification;
    Ui3nSwitch: typeof Ui3nSwitch;
    Ui3nStepLineBar: typeof Ui3nStepLineBar;
    Ui3nProgressLinear: typeof Ui3nProgressLinear;
    Ui3nProgressCircular: typeof Ui3nProgressCircular;
    Ui3nTableSortIcon: typeof Ui3nTableSortIcon;
    Ui3nTable: typeof Ui3nTable;
    Ui3nTabs: typeof Ui3nTabs;
    Ui3nText: typeof Ui3nText;
    Ui3nVirtualScroll: typeof Ui3nVirtualScroll;
    Ui3nTooltip: typeof Ui3nTooltip;
  }

  interface GlobalDirectives {
    Ui3nHtml: typeof Ui3nHtml;
    Ui3nClickOutside: typeof Ui3nClickOutside;
    Ui3nResize: typeof Ui3nResize;
  }
}
