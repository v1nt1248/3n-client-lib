/* eslint-disable @typescript-eslint/no-explicit-any */
import 'pinia'
import type { CbFunction, Ui3nNotificationProps, VueEventBus } from './constants'
import type { DialogInstance } from './plugins/dialogs'
import type Ui3nButton from './components/ui3n-button.vue'
import type Ui3nChip from './components/ui3n-chip.vue'
import type Ui3nCheckbox from './components/ui3n-checkbox.vue'
import type Ui3nDialog from './components/ui3n-dialog.vue'
import type { Ui3nDialogComponentProps } from './components/ui3n-dialog.vue'
import type Ui3nDropFiles from './components/ui3n-drop-files.vue'
import type Ui3nEmoji from './components/ui3n-emoji.vue'
import type Ui3nIcon from './components/ui3n-icon.vue'
import type Ui3nInput from './components/ui3n-input.vue'
import type Ui3nList from './components/ui3n-list.vue'
import type Ui3nMenu from './components/ui3n-menu.vue'
import type Ui3nNotification from './components/ui3n-notification.vue'
import type Ui3nTableSortIcon from './components/ui3n-table-sort-icon.vue'
import type Ui3nTable from './components/ui3n-table.vue'
import type Ui3nText from './components/ui3n-text.vue'
import type Ui3nVirtualScroll from './components/ui3n-virtual-scroll.vue'
import type Ui3nTabs from './components/ui3n-tabs.vue'
import type Ui3nBadge from './components/ui3n-badge.vue'
import type Ui3nBreadcrumd from './components/ui3n-breadcrumb.vue'
import type Ui3nBreadcrumds from './components/ui3n-breadcrumbs.vue'
import type Ui3nHtml from './directives/ui3n-html'
import type Ui3nClickOutside from './directives/ui3n-click-outside'

export * from './constants'
export * from './tools'
export * from './plugins'
export * from './directives'
export * from './components'

declare module 'vue' {
  interface ComponentCustomProperties {
    $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: VueEventBus;
  }

  interface GlobalComponents {
    Ui3nBadge: typeof Ui3nBadge;
    Ui3nBreadcrumd: typeof Ui3nBreadcrumd;
    Ui3nBreadcrumds: typeof Ui3nBreadcrumds,
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
    Ui3nTableSortIcon: typeof Ui3nTableSortIcon;
    Ui3nTable: typeof Ui3nTable;
    Ui3nText: typeof Ui3nText;
    Ui3nVirtualScroll: typeof Ui3nVirtualScroll;
    Ui3nTabs: typeof Ui3nTabs;
  }

  interface GlobalDirectives {
    Ui3nHtml: typeof Ui3nHtml;
    Ui3nClickOutside: typeof Ui3nClickOutside;
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $openDialog: (params: Ui3nDialogComponentProps) => DialogInstance | undefined;
    $createNotice: (params: Ui3nNotificationProps) => void;
    $emitter: {
      on: (type: string|symbol, handler: CbFunction) => void;
      off: (type: string|symbol, handler?: CbFunction) => void;
      emit:(type: string|symbol, arguments?: any) => void;
      once: (type: string|symbol, handler: CbFunction) => void;
      clear: () => void;
    }
    $i18n: {
      locale: string;
      changeLocale: (lang: string) => void;
      tr: (key: string, placeholders?: Record<string, string>) => string;
    }
  }
}
