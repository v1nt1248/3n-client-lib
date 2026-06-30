<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const scrollbarHorizontalMeta = data.find(c => c.name === 'ui3n-scroolbar-horizontal');
</script>

# Ui3nScrollbarHorizontal

Horizontal scrollbar component with customizable appearance and behavior.

<ComponentDoc
  :props="scrollbarHorizontalMeta.props"
  :events="scrollbarHorizontalMeta.events"
  :slots="scrollbarHorizontalMeta.slots"
  :exposes="scrollbarHorizontalMeta.exposes"
/>

## Usage Examples

### Simple horizontal scrollbar

<DemoBlock
  title="Simple horizontal scrollbar"
  description="Basic horizontal scrollbar with content"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Custom styled scrollbar

<DemoBlock
  title="Custom styled scrollbar"
  description="Scrollbar with custom colors and dimensions"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>