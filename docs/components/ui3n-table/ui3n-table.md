<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const tableMeta = data.find(c => c.name === 'ui3n-table') || {
  props: [], events: [], slots: [], exposes: []
};
const tableSortIconMeta = data.find(c => c.name === 'ui3n-table-sort-icon') || {
  props: [], events: [], slots: [], exposes: []
};
</script>

# Ui3nTable

`Ui3nTable` is a high-performance tabular data grid built on top of CSS Grid, supporting dynamic column templates, declarative sorting states, and context-aware row selection layers.

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
  hide-script-block
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
  hide-script-block
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
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>
