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

const dialogMeta = data.find(c => c.name === 'ui3n-dialog');
</script>

# Ui3nDialog

Dialog component for displaying modal windows with customizable header, body, actions, and loading states. Dialogs are managed through the `DialogsPlugin` using `$openDialog` / `$closeDialog` methods.

<ComponentDoc
  :props="dialogMeta.props"
  :events="dialogMeta.events"
  :slots="dialogMeta.slots"
  :exposes="dialogMeta.exposes"
/>

## Usage Examples

### Simple dialog

<DemoBlock
  title="Simple dialog"
  description="Basic dialog with title, body content and default action buttons"
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Custom buttons

<DemoBlock
  title="Custom buttons"
  description="Customize button text, colors and visibility"
  :code="Example02Raw"
>
  <Example02></Example02>
</DemoBlock>

### Dialog with icon

<DemoBlock
  title="Dialog with icon"
  description="Dialog with icon in the title using the icon prop"
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Draggable dialog

<DemoBlock
  title="Draggable dialog"
  description="Dialog that can be dragged by the user"
  :code="Example04Raw"
>
  <Example04></Example04>
</DemoBlock>

### Custom slots

<DemoBlock
  title="Custom slots"
  description="Using header, body, actions and loading slots for full customization"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>

### Dialog with data

<DemoBlock
  title="Dialog with data"
  description="Passing data to dialog and receiving it back on action events"
  :code="Example06Raw"
>
  <Example06></Example06>
</DemoBlock>