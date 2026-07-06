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

### Country Selection (Flat Value Mode)
Demonstrates the standard single dropdown selection where the component tracks and returns a primitive identifier (`id`) string.

<DemoBlock
  title="Country Selection"
  description="Standard selector with flat string items and primitive model tracking"
  :code="Example01Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Fruit Selection (Clearable Mode)
Demonstrates a dropdown list with fruit options where the component returns the complete entity object and provides an integrated close button to quickly reset the selected value.

<DemoBlock
  title="Fruit Selection"
  description="Clearable selector returning the full data object with an integrated quick-reset button"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Custom Layout (Item & Selection Slots)
Demonstrates utilizing template slots to override both the dropdown menu rows and the field trigger displaying view with customized avatar elements.

<DemoBlock
  title="Custom Item & Selection Layout"
  description="Selector component overriding default rows and placeholder text with complex markup slots"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>
