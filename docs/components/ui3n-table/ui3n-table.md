<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const tableMeta = data.find(c => c.name === 'ui3n-table');
const tableSortIconMeta = data.find(c => c.name === 'ui3n-table-sort-icon');
</script>

# Ui3nTable

Table component with sorting, selection, and customizable slots.

<ComponentDoc
  :props="tableMeta.props"
  :events="tableMeta.events"
  :slots="tableMeta.slots"
  :exposes="tableMeta.exposes"
/>

## Ui3nTableSortIcon

Sort icon component for table headers.

<ComponentDoc
  :props="tableSortIconMeta.props"
  :events="tableSortIconMeta.events"
  :slots="tableSortIconMeta.slots"
  :exposes="tableSortIconMeta.exposes"
/>

## Usage Examples

### Simple table

<DemoBlock
  title="Simple table"
  description="Basic table with data"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Table with sorting

<DemoBlock
  title="Table with sorting"
  description="Table with sortable columns"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Table with selection

<DemoBlock
  title="Table with selection"
  description="Table with row selection"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>