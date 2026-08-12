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
- Every **visible** column must define an **absolute** width in `config.columnStyle[key].width` (`px`, `rem`, `em`, …). Values like `%`, `fr`, `auto`, or missing width disable the mode and emit a `console.warn`.
- In sticky mode the table content width is the **sum of column widths** (not stretched with `fr`/`%`).
- Custom `#row` slot: render **one direct child node per column**. Apply sticky yourself for the first `stickyColumnsCount` children using `stickyColumnLefts[i]` as `left`.
- Slot scope includes `stickyColumnsCount` and `stickyColumnLefts` (after validation/clamp).

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
