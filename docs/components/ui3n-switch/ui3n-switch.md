<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const switchMeta = data.find(c => c.name === 'ui3n-switch');
</script>

# Ui3nSwitch

Switch component for toggling boolean values.

<ComponentDoc
  :props="switchMeta.props"
  :events="switchMeta.events"
  :slots="switchMeta.slots"
  :exposes="switchMeta.exposes"
/>

## Usage Examples

### Simple switch

<DemoBlock
  title="Simple switch"
  description="Basic switch toggle"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Switch with label

<DemoBlock
  title="Switch with label"
  description="Switch with label using default slot"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Customized switch

<DemoBlock
  title="Customized switch"
  description="Switch with custom size and color"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>