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

const checkboxMeta = data.find(c => c.name === 'ui3n-checkbox');
</script>

# Ui3nCheckbox

Checkbox component with support for custom values, indeterminate state, and various customization options.

<ComponentDoc
  :props="checkboxMeta.props"
  :events="checkboxMeta.events"
  :slots="checkboxMeta.slots"
  :exposes="checkboxMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Simple checkbox with v-model binding"
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### With label

<DemoBlock
  title="With label"
  description="Checkbox with text label using default slot"
  :code="Example02Raw"
  only-template-content
>
  <Example02></Example02>
</DemoBlock>

### Sizes

<DemoBlock
  title="Sizes"
  description="Different checkbox sizes: 12px, 16px, 24px, 32px"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>

### Colors

<DemoBlock
  title="Colors"
  description="Custom checkbox colors using the color prop"
  :code="Example04Raw"
  hide-script-block
  hide-style-block
>
  <Example04></Example04>
</DemoBlock>

### Indeterminate state

<DemoBlock
  title="Indeterminate state"
  description="Checkbox in indeterminate (partial) state - useful for select all scenarios"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>

### Disabled state

<DemoBlock
  title="Disabled state"
  description="Disabled checkbox that cannot be interacted with"
  :code="Example06Raw"
  hide-script-block
  hide-style-block
>
  <Example06></Example06>
</DemoBlock>

### Custom values

<DemoBlock
  title="Custom values"
  description="Using custom checkedValue and uncheckedValue instead of boolean"
  :code="Example07Raw"
>
  <Example07></Example07>
</DemoBlock>