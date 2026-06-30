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

const progressLinearMeta = data.find(c => c.name === 'ui3n-progress-linear');
const progressCircularMeta = data.find(c => c.name === 'ui3n-progress-circular');
</script>

# Ui3nProgress

Progress components for displaying loading and completion states.

## Ui3nProgressLinear

Linear progress bar component.

<ComponentDoc
  :props="progressLinearMeta.props"
  :events="progressLinearMeta.events"
  :slots="progressLinearMeta.slots"
  :exposes="progressLinearMeta.exposes"
/>

## Ui3nProgressCircular

Circular progress indicator component.

<ComponentDoc
  :props="progressCircularMeta.props"
  :events="progressCircularMeta.events"
  :slots="progressCircularMeta.slots"
  :exposes="progressCircularMeta.exposes"
/>

## Usage Examples

### Linear progress

<DemoBlock
  title="Linear progress"
  description="Basic linear progress bar with value"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Linear progress indeterminate

<DemoBlock
  title="Linear progress indeterminate"
  description="Indeterminate linear progress for unknown duration"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Circular progress

<DemoBlock
  title="Circular progress"
  description="Circular progress indicator with value"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>

### Circular progress indeterminate

<DemoBlock
  title="Circular progress indeterminate"
  description="Indeterminate circular progress for unknown duration"
  :code="Example04Raw"
  hide-script-block
  hide-style-block
>
  <Example04></Example04>
</DemoBlock>