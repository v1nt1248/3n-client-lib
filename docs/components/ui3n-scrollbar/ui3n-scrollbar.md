<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const scrollbarMeta = data.find(c => c.name === 'ui3n-scrollbar');
</script>

# Ui3nScrollbar

Dual-axis custom scrollbar component. Renders one bi-directional scrollport with overlay vertical and/or horizontal tracks.

<ComponentDoc
  :props="scrollbarMeta.props"
  :events="scrollbarMeta.events"
  :slots="scrollbarMeta.slots"
  :exposes="scrollbarMeta.exposes"
/>

## Scroll events

The component emits axis-scoped scroll events in addition to a general `scroll` event:

- `scroll` — any scroll movement with `{ event, scrollTop, scrollLeft }`.
- `scroll:vertical` — emitted when `scrollTop` changed.
- `scroll:horizontal` — emitted when `scrollLeft` changed.

A diagonal gesture can emit both axis events in the same native tick.

## Usage Examples

### Both axes (default)

Horizontal + vertical tracks over a wide content area.

<DemoBlock
  title="Both axes"
  description="Default dual-axis scrollbar"
  :code="Example01Raw"
  hide-style-block
>
  <Example01></Example01>
</DemoBlock>

### Vertical only

<DemoBlock
  title="Vertical only"
  description="Single vertical track"
  :code="Example02Raw"
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Horizontal only

<DemoBlock
  title="Horizontal only"
  description="Single horizontal track with custom styles"
  :code="Example03Raw"
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>
