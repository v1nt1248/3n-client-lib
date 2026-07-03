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

const componentMeta = data.find(c => c.name === 'ui3n-autocomplete');
</script>

# Ui3nAutocomplete

Autocomplete component with search, multi-select, chips, and custom filtering capabilities.

<ComponentDoc
  :props="componentMeta.props"
  :events="componentMeta.events"
  :slots="componentMeta.slots"
  :exposes="componentMeta.exposes"
/>

## Usage Examples

### Basic single select

<DemoBlock
  title="Basic single select"
  description="Simple autocomplete with single item selection"
  :code="Example01Raw"
  hide-script-block
  hide-style-block
>
  <Example01></Example01>
</DemoBlock>

### Multiple selection

<DemoBlock
  title="Multiple selection"
  description="Select multiple items from the list"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Chips mode

<DemoBlock
  title="Chips mode"
  description="Display selected items as removable chips"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>

### Custom filter

<DemoBlock
  title="Custom filter"
  description="Use custom filter function to search by multiple fields (name and email)"
  :code="Example04Raw"
  hide-style-block
>
  <Example04></Example04>
</DemoBlock>

### Custom item slot

<DemoBlock
  title="Custom item slot"
  description="Customize dropdown item rendering using the item slot"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>

### Return object mode

<DemoBlock
  title="Return object mode"
  description="Return the whole object instead of just the value"
  :code="Example06Raw"
  hide-script-block
  hide-style-block
>
  <Example06></Example06>
</DemoBlock>

### Add new value

<DemoBlock
  title="Add new value"
  description="Allow adding new values with validation. Type a new tag and press Enter"
  :code="Example07Raw"
  hide-style-block
>
  <Example07></Example07>
</DemoBlock>

### Disabled state

<DemoBlock
  title="Disabled state"
  description="Autocomplete in disabled mode"
  :code="Example08Raw"
  only-template-content
>
  <Example08></Example08>
</DemoBlock>

### Hide selected and no data text

<DemoBlock
  title="Hide selected and no data text"
  description="Hide already selected items from dropdown and show custom text when no items available"
  :code="Example09Raw"
  hide-script-block
  hide-style-block
>
  <Example09></Example09>
</DemoBlock>

### Remote async search

<DemoBlock
  title="Remote async search"
  description="Listen to search updates to fetch items from a remote server dynamically with loading status"
  :code="Example10Raw"
>
  <Example10></Example10>
</DemoBlock>

### Preselected initial values

<DemoBlock
  title="Preselected initial values"
  description="Demonstrates how the component automatically parses and renders pre-populated model values for both primitive IDs and objects"
  :code="Example11Raw"
>
  <Example11></Example11>
</DemoBlock>

