<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';
import Example04 from './Example04.vue';
import Example04Raw from './Example04.vue?raw';
import Example05 from './Example05.vue';
import Example05Raw from './Example05.vue?raw';
import Example06 from './Example06.vue';
import Example06Raw from './Example06.vue?raw';
import Example07 from './Example07.vue';
import Example07Raw from './Example07.vue?raw';
import Example08 from './Example08.vue';
import Example08Raw from './Example08.vue?raw';
import Example09 from './Example09.vue';
import Example09Raw from './Example09.vue?raw';
import Example10 from './Example10.vue';
import Example10Raw from './Example10.vue?raw';
import Example11 from './Example11.vue';
import Example11Raw from './Example11.vue?raw';

const tableMeta = data.find(c => c.name === 'ui3n-table') || {
  props: [], events: [], slots: [], exposes: []
};
const tableSortIconMeta = data.find(c => c.name === 'ui3n-table-sort-icon') || {
  props: [], events: [], slots: [], exposes: []
};
</script>

# Ui3nTable

`Ui3nTable` is a high-performance tabular data grid built on top of CSS Grid, supporting dynamic column templates, declarative sorting states, and context-aware row selection layers.

## Sticky columns

Set `config.stickyColumns` to pin leading **visible** columns while the rest scroll horizontally.

```ts
stickyColumns: 2 // pin first two visible columns; 0 / omit = off
```

Requirements:

- Value is clamped to `[0, visibleColumns.length - 1]` (at least one column remains scrollable).
- At most **10** leading columns can be pinned.
- Every **visible** column must define an **absolute** width in `config.columnStyle[key].width` (`px`, `rem`, `em`, …). Values like `%`, `fr`, `auto`, or missing width disable the mode and emit a `console.warn`.
- In sticky mode the table content width is the **sum of column widths** (not stretched with `fr`/`%`).
- Custom `#row` slot: render **one direct child node per column**. The component pins the first `stickyColumnsCount` children automatically (background, hover and selected states included), so no manual `stickyColumnLefts` wiring is needed.
- Custom cell content: use `row-cell-${field}` slots instead. They render inside the default row, so grid layout, the selection checkbox and sticky columns keep working with no extra code (works both with and without `stickyColumns`).
- Slot scope still includes `stickyColumnsCount` and `stickyColumnLefts` (after validation/clamp) for custom layouts.

## Custom scrollbar

Set `config.scrollbar` to replace native browser overflow with `Ui3nScrollbar`.

```ts
config: Ui3nTableConfig<Row> = {
  scrollbar: {
    axes: 'both', // 'vertical' | 'horizontal' | 'both'
    vertical: { thumbColor: '#4caf50', trackWidth: 8 },
    horizontal: { thumbColor: '#2196f3', trackHeight: 12 },
  },
};
```

- Omit `config.scrollbar` to keep native overflow.
- When custom scrollbar is enabled, the table is wrapped in a single `Ui3nScrollbar` scrollport.
- Sticky header and `stickyColumns` work with custom scrollbar (one shared scroll ancestor).
- The component emits axis-scoped scroll events (`scroll:vertical`, `scroll:horizontal`) from the internal scrollbar.

<ComponentDoc
  :props="tableMeta.props"
  :events="tableMeta.events"
  :slots="tableMeta.slots"
  :exposes="tableMeta.exposes"
  :css-variables="tableMeta.cssVariables"
/>

## Ui3nTableSortIcon

Internal presentation control used within table headers to visualize directional column sorting transitions.

<ComponentDoc
  :props="tableSortIconMeta.props"
  :events="tableSortIconMeta.events"
  :slots="tableSortIconMeta.slots"
  :exposes="tableSortIconMeta.exposes"
/>

## Usage Examples

### Simple table
Basic read-only layout displaying flat structured dataset objects.

<DemoBlock
  title="Simple table"
  description="Basic table with data"
  :code="Example01Raw"
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Table with sorting
Demonstrates intercepting header clicks and rendering automated direction sort icon indicators.

<DemoBlock
  title="Table with sorting"
  description="Table with sortable columns"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Table with selection
Demonstrates enabling row checkboxes, batch operations triggering, and managing global form selection arrays.

<DemoBlock
  title="Table with selection"
  description="Table with row selection"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>

### Sticky first column
Wide table with absolute column widths; first column stays fixed during horizontal scroll.

<DemoBlock
  title="Sticky first column"
  description="Horizontal scroll with one pinned leading column"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Sticky two columns
Wide table with the first two leading columns pinned.

<DemoBlock
  title="Sticky two columns"
  description="Horizontal scroll with two pinned leading columns"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>

### Custom scrollbar
Wide table with sticky header, one sticky column, and custom `Ui3nScrollbar` tracks.

<DemoBlock
  title="Custom scrollbar"
  description="Sticky header + first column with custom dual-axis scrollbar"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### Custom row with sticky columns
Custom `#row` slot rendering one node per column; the first two columns are pinned automatically.

<DemoBlock
  title="Custom row with sticky columns"
  description="Sticky columns applied automatically inside a custom #row slot"
  :code="Example07Raw"
  hide-style-block
>
  <ClientOnly><Example07></Example07></ClientOnly>
</DemoBlock>

### Sticky column with group actions
Sticky first column combined with multi-row selection. Select a row to reveal the `group-actions` bar, then scroll horizontally — the bar stays pinned to the visible area while columns scroll beneath it.

<DemoBlock
  title="Sticky column with group actions"
  description="Pinned first column and a pinned group-actions bar during horizontal scroll"
  :code="Example08Raw"
  hide-style-block
>
  <ClientOnly><Example08></Example08></ClientOnly>
</DemoBlock>

### Custom row cells with sticky columns
Per-cell customization via `row-cell-${field}` slots; the default row skeleton keeps sticky columns, alignment and selection working automatically.

<DemoBlock
  title="Custom row cells with sticky columns"
  description="Custom cell content via row-cell-* slots; sticky first column works automatically"
  :code="Example09Raw"
  hide-style-block
>
  <ClientOnly><Example09></Example09></ClientOnly>
</DemoBlock>

### Sticky `no-data` block
Empty table with sticky columns. The `#no-data` block is pinned to the visible area: scroll horizontally and it stays put while the header columns move beneath it.

<DemoBlock
  title="Sticky no-data block"
  description="Custom #no-data content stays pinned during horizontal scroll"
  :code="Example10Raw"
  hide-style-block
>
  <ClientOnly><Example10></Example10></ClientOnly>
</DemoBlock>

### Sticky `unused-place` block
Table with a few rows and free space below them. The `#unused-place` block is pinned to the visible area during horizontal scroll, just like `#no-data`.

<DemoBlock
  title="Sticky unused-place block"
  description="Custom #unused-place content stays pinned during horizontal scroll"
  :code="Example11Raw"
  hide-style-block
>
  <ClientOnly><Example11></Example11></ClientOnly>
</DemoBlock>
