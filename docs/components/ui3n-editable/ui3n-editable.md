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

const editableMeta = data.find(c => c.name === 'ui3n-editable');
</script>

# Ui3nEditable

Inline editable text component. Click on the text to enter edit mode, press Enter or click the checkmark to confirm, press Escape or click the cross to cancel.

<ComponentDoc
  :props="editableMeta.props"
  :events="editableMeta.events"
  :slots="editableMeta.slots"
  :exposes="editableMeta.exposes"
  :css-variables="editableMeta.cssVariables"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Click on the text to enter edit mode. Press Enter to confirm or Escape to cancel."
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Disallow empty value

<DemoBlock
  title="Disallow empty value"
  description="Using disallowEmptyValue prop prevents saving an empty value. The input border turns red when the value is empty."
  :code="Example02Raw"
>
  <Example02></Example02>
</DemoBlock>

### Disabled state

<DemoBlock
  title="Disabled state"
  description="Disabled component does not allow entering edit mode."
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Validation and reverting a rejected value

<DemoBlock
  title="Validation and reverting a rejected value"
  description="The validator prop checks a changed value on completion. A rejected value is reverted and the invalid event is emitted instead of update:modelValue. When a value is rejected later (e.g. saving fails), call the exposed reset() to show the current modelValue again."
  :code="Example04Raw"
>
  <Example04></Example04>
</DemoBlock>