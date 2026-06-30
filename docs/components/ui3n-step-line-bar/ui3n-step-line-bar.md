<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const stepLineBarMeta = data.find(c => c.name === 'ui3n-step-line-bar');
</script>

# Ui3nStepLineBar

Step line bar component for displaying progress through a series of steps.

<ComponentDoc
  :props="stepLineBarMeta.props"
  :events="stepLineBarMeta.events"
  :slots="stepLineBarMeta.slots"
  :exposes="stepLineBarMeta.exposes"
/>

## Usage Examples

### Simple step line bar

<DemoBlock
  title="Simple step line bar"
  description="Basic step line bar with current step"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Interactive step line bar

<DemoBlock
  title="Interactive step line bar"
  description="Step line bar with navigation controls"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>