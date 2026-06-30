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

const iconMeta = data.find(c => c.name === 'ui3n-icon');
</script>

# Ui3nIcon

Icon component for rendering SVG icons with customizable size, color, and transformations.

<ComponentDoc
  :props="iconMeta.props"
  :events="iconMeta.events"
  :slots="iconMeta.slots"
  :exposes="iconMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Icon with different sizes using the size prop"
  :code="Example01Raw"
  hide-script-block
>
  <Example01></Example01>
</DemoBlock>

### Icon colors

<DemoBlock
  title="Icon colors"
  description="Customize icon color using the color prop"
  :code="Example02Raw"
  hide-script-block
>
  <Example02></Example02>
</DemoBlock>

### Custom width and height

<DemoBlock
  title="Custom width and height"
  description="Set separate width and height values instead of using size"
  :code="Example03Raw"
  hide-script-block
>
  <Example03></Example03>
</DemoBlock>

### Transformations

<DemoBlock
  title="Transformations"
  description="Flip and rotate icons using horizontalFlip, verticalFlip and rotate props"
  :code="Example04Raw"
  hide-script-block
>
  <Example04></Example04>
</DemoBlock>

### Click event

<DemoBlock
  title="Click event"
  description="Handle click events on the icon"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>