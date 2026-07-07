<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const tooltipMeta = data.find(c => c.name === 'ui3n-tooltip') || {
  props: [],
  events: [],
  slots: [],
  exposes: []
};
</script>

# Ui3nTooltip

Tooltip component for displaying additional information on hover or click.

<ComponentDoc
  :props="tooltipMeta.props"
  :events="tooltipMeta.events"
  :slots="tooltipMeta.slots"
  :exposes="tooltipMeta.exposes"
/>

## Usage Examples

### Simple tooltip

<DemoBlock
  title="Simple tooltip"
  description="Basic tooltip on hover"
  :code="Example01Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Tooltip placements

<DemoBlock
  title="Tooltip placements"
  description="Tooltips with different placements"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Custom tooltip content

<DemoBlock
  title="Custom tooltip content"
  description="Tooltip with custom content slot"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>
