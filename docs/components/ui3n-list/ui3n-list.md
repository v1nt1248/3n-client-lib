<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const listMeta = data.find(c => c.name === 'ui3n-list');
</script>

# Ui3nList

List component for displaying a collection of items with optional title and custom item rendering.

<ComponentDoc
  :props="listMeta.props"
  :events="listMeta.events"
  :slots="listMeta.slots"
  :exposes="listMeta.exposes"
/>

## Usage Examples

### Simple list

<DemoBlock
  title="Simple list"
  description="Basic list with string items"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### List with title

<DemoBlock
  title="List with title"
  description="List with a sticky title"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Custom item slot

<DemoBlock
  title="Custom item slot"
  description="List with custom item rendering using the item slot"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>