<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const textMeta = data.find(c => c.name === 'ui3n-text');
</script>

# Ui3nText

Textarea component for multi-line text input with validation support.

<ComponentDoc
  :props="textMeta.props"
  :events="textMeta.events"
  :slots="textMeta.slots"
  :exposes="textMeta.exposes"
/>

## Usage Examples

### Simple text area

<DemoBlock
  title="Simple text area"
  description="Basic textarea with v-model"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Text area with label

<DemoBlock
  title="Text area with label"
  description="Textarea with label and placeholder"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Text area with validation

<DemoBlock
  title="Text area with validation"
  description="Textarea with validation rules"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>