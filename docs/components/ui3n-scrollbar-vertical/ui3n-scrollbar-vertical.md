<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const scrollbarVerticalMeta = data.find(c => c.name === 'ui3n-scrollbar-vertical') || {
  props: [],
  events: [],
  slots: [],
  exposes: []
};
</script>

# Ui3nScrollbarVertical

Vertical scrollbar component with customizable appearance and behavior.

<ComponentDoc
  :props="scrollbarVerticalMeta.props"
  :events="scrollbarVerticalMeta.events"
  :slots="scrollbarVerticalMeta.slots"
  :exposes="scrollbarVerticalMeta.exposes"
/>

## Usage Examples

### Simple vertical scrollbar

<DemoBlock
  title="Simple vertical scrollbar"
  description="Basic vertical scrollbar with content"
  :code="Example01Raw"
  only-template-content
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Custom styled scrollbar

<DemoBlock
  title="Custom styled scrollbar"
  description="Scrollbar with custom colors and dimensions"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>
