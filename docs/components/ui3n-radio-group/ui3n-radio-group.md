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

const radioMeta = data.find(c => c.name === 'ui3n-radio');
const radioGroupMeta = data.find(c => c.name === 'ui3n-radio-group');
</script>

# Ui3nRadioGroup

Radio button and radio group components for single selection from multiple options.

## Ui3nRadio

Single radio button component.

<ComponentDoc
  :props="radioMeta.props"
  :events="radioMeta.events"
  :slots="radioMeta.slots"
  :exposes="radioMeta.exposes"
/>

## Ui3nRadioGroup

Radio group component for managing multiple radio buttons.

<ComponentDoc
  :props="radioGroupMeta.props"
  :events="radioGroupMeta.events"
  :slots="radioGroupMeta.slots"
  :exposes="radioGroupMeta.exposes"
/>

## Usage Examples

### Simple radio

<DemoBlock
  title="Simple radio"
  description="Basic radio button usage"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Radio group

<DemoBlock
  title="Radio group"
  description="Radio buttons grouped together"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Horizontal radio group

<DemoBlock
  title="Horizontal radio group"
  description="Radio group with horizontal direction"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>

### Custom icons slot

<DemoBlock
  title="Custom icons slot"
  description="Radio buttons with custom icons for checked and unchecked states using slots"
  :code="Example04Raw"
  hide-style-block
>
  <Example04></Example04>
</DemoBlock>
