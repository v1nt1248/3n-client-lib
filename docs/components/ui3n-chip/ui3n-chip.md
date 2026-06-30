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

const chipMeta = data.find(c => c.name === 'ui3n-chip');
</script>

# Ui3nChip

Chip component for displaying tags, labels, and compact information elements.

<ComponentDoc
  :props="chipMeta.props"
  :events="chipMeta.events"
  :slots="chipMeta.slots"
  :exposes="chipMeta.exposes"
/>

## Usage Examples

### Simple chip

<DemoBlock
  title="Simple chip"
  description="Basic chip usage with default settings"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Chip sizes

<DemoBlock
  title="Chip sizes"
  description="Different chip heights: 20px, 24px (default), 32px, 40px"
  :code="Example02Raw"
  only-template-content
>
  <Example02></Example02>
</DemoBlock>

### Chip with left slot

<DemoBlock
  title="Chip with left slot"
  description="Chip with icon or avatar in the left slot"
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Closeable chips

<DemoBlock
  title="Closeable chips"
  description="Chips with close button using the closeable prop"
  :code="Example04Raw"
>
  <Example04></Example04>
</DemoBlock>

### Color customization

<DemoBlock
  title="Color customization"
  description="Custom background color, text color and text size"
  :code="Example05Raw"
  only-template-content
>
  <Example05></Example05>
</DemoBlock>

### Plain style

<DemoBlock
  title="Plain style"
  description="Chip with border outline using the plain prop"
  :code="Example06Raw"
  only-template-content
>
  <Example06></Example06>
</DemoBlock>