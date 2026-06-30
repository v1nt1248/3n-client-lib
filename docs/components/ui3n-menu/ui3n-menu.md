<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const menuMeta = data.find(c => c.name === 'ui3n-menu');
</script>

# Ui3nMenu

Context menu component with customizable positioning and behavior.

<ComponentDoc
  :props="menuMeta.props"
  :events="menuMeta.events"
  :slots="menuMeta.slots"
  :exposes="menuMeta.exposes"
/>

## Usage Examples

### Simple menu

<DemoBlock
  title="Simple menu"
  description="Basic menu with default trigger"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Menu with custom offset

<DemoBlock
  title="Menu with custom offset"
  description="Menu with custom X and Y offsets"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Controlled menu

<DemoBlock
  title="Controlled menu"
  description="Menu with v-model for open state control"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>