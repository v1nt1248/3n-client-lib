<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const selectorMeta = data.find(c => c.name === 'ui3n-selector');
</script>

# Ui3nSelector

Selector component for choosing items from a dropdown list with search and customization options.

<ComponentDoc
  :props="selectorMeta.props"
  :events="selectorMeta.events"
  :slots="selectorMeta.slots"
  :exposes="selectorMeta.exposes"
/>

## Usage Examples

### Simple selector

<DemoBlock
  title="Simple selector"
  description="Basic selector with items"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Selector with search

<DemoBlock
  title="Selector with search"
  description="Selector with search input for filtering items"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Selector with custom item slot

<DemoBlock
  title="Selector with custom item slot"
  description="Selector with custom item rendering"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>