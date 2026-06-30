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

const inputMeta = data.find(c => c.name === 'ui3n-input');
</script>

# Ui3nInput

Text input component with validation, icons, states, and various customization options.

<ComponentDoc
  :props="inputMeta.props"
  :events="inputMeta.events"
  :slots="inputMeta.slots"
  :exposes="inputMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Simple input with v-model and placeholder"
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Label and sizes

<DemoBlock
  title="Label and sizes"
  description="Input with label and different sizes: regular and large"
  :code="Example02Raw"
>
  <Example02></Example02>
</DemoBlock>

### Clearable input

<DemoBlock
  title="Clearable input"
  description="Input with clear button using the clearable prop"
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Icon slots

<DemoBlock
  title="Icon slots"
  description="Using prepend-icon and append-icon slots"
  :code="Example04Raw"
>
  <Example04></Example04>
</DemoBlock>

### Validation and states

<DemoBlock
  title="Validation and states"
  description="Input validation with rules and display states (success, error)"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>

### Disabled and readonly

<DemoBlock
  title="Disabled and readonly"
  description="Input in disabled and readonly states"
  :code="Example06Raw"
>
  <Example06></Example06>
</DemoBlock>

### Events

<DemoBlock
  title="Events"
  description="Input events: input, change, enter, focus, blur, clear, escape"
  :code="Example07Raw"
>
  <Example07></Example07>
</DemoBlock>