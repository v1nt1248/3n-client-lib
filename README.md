# Library (Vue3 + Typescript + Vite)

Components, directives and plugins for Vue3 projects and some helpers methods (utils).  
[The library on npm](https://www.npmjs.com/package/@v1nt1248/3nclient-lib)  
  
You can run the project as `pnpm dev` or `npm run dev`.

### Components [`@v1nt1248/3nclient-lib`]
  - Ui3nAutocomplete,
  - Ui3nBadge,
  - Ui3nBreadcrumb
  - Ui3nBreadcrumbs
  - Ui3nButton
  - Ui3nCheckbox
  - Ui3nChip
  - Ui3nDialog
  - Ui3nDroopFiles
  - Ui3nEditable,
  - Ui3nEmoji
  - Ui3nIcon
  - Ui3nInput
  - Ui3nInputFile
  - Ui3nList
  - Ui3nMenu
  - Ui3nMobileMenu
  - Ui3nMobileMenuItem
  - Ui3nNotification
  - Ui3nProgressCircular
  - Ui3nProgressLinear
  - Ui3nRadio
  - Ui3nRadioGroup
  - Ui3nSelector
  - Ui3nScrollbarVertical
  - Ui3nScrollbarHorizontal
  - Ui3nScrollbar
  - Ui3nStepLineBar
  - Ui3nSwitch
  - Ui3nSlider
  - Ui3nTableSortIcon
  - Ui3nTable
  - Ui3nTabs
  - Ui3nText
  - Ui3nTooltip
  - Ui3nVirtualScroll  

### Directives [`@v1nt1248/3nclient-lib`]
  - Ui3nHtml
  - Ui3nClickOutside
  - Ui3nResize
  - Ui3nRipple
  - Ui3nTitle
  - Ui3nLongPress

### Plugins [`@v1nt1248/3nclient-lib/plugins`]
  - dialogs
  - notifications
  - vue-bus
  - theme

### Store plugins [`@v1nt1248/3nclient-lib/plugins`]
  - store-dialogs
  - store-notifications
  - store-vue-bus
  - store-theme

### Constants
  - emoticons
  - mailReg

### Composables [`@v1nt1248/3nclient-lib`]
  - useDblClickHandler

### Utils [`@v1nt1248/3nclient-lib/utils`]
  - sqliteOn3nstorage
  - round
  - getRandomId
  - textareaMaxRows
  - copyToClipboard
  - executeFunc
  - removeWhitespaceInString
  - debounce
  - selection [UI]
  - markSearch [UI]
  - html2text [UI]
  - prepareDareAsString [UI]
  - capitalize [UI]
  - formatFileSize [FILES]
  - getFileExtension [FILES]
  - isFileImage [FILES]
  - isFileVideo [FILES]
  - isFileAudio [FILES]
  - isFileArchive [FILES]
  - blobToB64 [FILES]
  - b64ToBlob [FILES]
  - blobFromDataUrl [FILES]
  - uint8ToDataUrl [FILES]
  - resizeImage [FILES]
  - createVideoThumbnail [FILES]
  - mimeTypes [FILES]
  - schedulerYield [PROCESS]
  - TaskRunner [PROCESS]
  - SingleProc [PROCESS]
  - NamedProcs [PROCESS]

## Installation  
  
### npm
`npm i @v1nt1248/3nclient-lib`
### yarn
`yarn add @v1nt1248/3nclient-lib`  
### pnpm
`pnpm add @v1nt1248/3nclient-lib`

  
You also need to import the required CSS files into your `main.ts`:
```ts
import '@v1nt1248/3nclient-lib/variables.css';
import '@v1nt1248/3nclient-lib/style.css';
```

`variables.css` contains design tokens only (palette, theme semantics, `--color-*` mapping). Light tokens and the color mapping are applied on `:root`, so `<html>` classes are **not** required for the default (light) look.

`.default-theme` is a deprecated alias of `.light-theme`.

To start with another theme or switch at runtime:

```ts
import { createApp, inject } from 'vue';
import { theme, THEME_KEY } from '@v1nt1248/3nclient-lib/plugins';

const app = createApp(App);
app.use(theme, { theme: 'light' }); // omit or `'light'` → light; `'dark'` | `'dark2'` also valid
app.mount('#app');

const { setTheme } = inject(THEME_KEY)!;
setTheme('dark');
```

With Pinia store:

```ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { theme, storeTheme } from '@v1nt1248/3nclient-lib/plugins';

const app = createApp(App);
const pinia = createPinia();

app.use(theme, { theme: 'light' });
pinia.use(storeTheme);
app.use(pinia);
app.mount('#app');

// Inside any Pinia store action:
// this.$theme.setTheme('dark');
// this.$theme.theme.value; // 'dark'
```

Without the plugin you can still switch manually: `document.documentElement.classList.add('dark-theme', 'colors')`.
  
