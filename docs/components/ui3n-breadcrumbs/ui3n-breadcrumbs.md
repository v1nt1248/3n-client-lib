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

const breadcrumbsMeta = data.find(c => c.name === 'ui3n-breadcrumbs');
const breadcrumbMeta = data.find(c => c.name === 'ui3n-breadcrumb');
</script>

# Ui3nBreadcrumbs

Breadcrumbs navigation component for displaying hierarchical paths and navigation trails.

## Ui3nBreadcrumbs

Container component for breadcrumb items.

<ComponentDoc
  :props="breadcrumbsMeta.props"
  :events="breadcrumbsMeta.events"
  :slots="breadcrumbsMeta.slots"
  :exposes="breadcrumbsMeta.exposes"
/>

## Ui3nBreadcrumb

Individual breadcrumb item component.

<ComponentDoc
  :props="breadcrumbMeta.props"
  :events="breadcrumbMeta.events"
  :slots="breadcrumbMeta.slots"
  :exposes="breadcrumbMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Simple breadcrumbs with multiple navigation levels"
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Custom separator

<DemoBlock
  title="Custom separator"
  description="Using different separator characters like arrow, chevron or pipe"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Click handling

<DemoBlock
  title="Click handling"
  description="Active breadcrumbs with click event handling for navigation"
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Disabled state

<DemoBlock
  title="Disabled state"
  description="Disabled breadcrumbs - entire container or individual items"
  :code="Example04Raw"
  hide-script-block
  hide-style-block
>
  <Example04></Example04>
</DemoBlock>

### Custom separator slot

<DemoBlock
  title="Custom separator slot"
  description="Using the separator slot for custom icons or complex separators"
  :code="Example05Raw"
  hide-script-block
  hide-style-block
>
  <Example05></Example05>
</DemoBlock>