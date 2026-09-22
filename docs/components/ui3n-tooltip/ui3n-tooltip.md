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
  :css-variables="tooltipMeta.cssVariables"
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

### External trigger element

<DemoBlock
  title="External trigger element"
  description="Tooltip positioned against a DOM node passed via triggerElement"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Manual tooltip on an external element

<DemoBlock
  title="Manual tooltip on an external element"
  description="Open and close a tooltip next to an external node with v-model"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### Programmatic plugin

Install the plugin with `app.use(tooltips)`, then call `$tooltip.show(el, options)` to open immediately or `$tooltip.attach(el, options)` to bind hover/click.

<DemoBlock
  title="Programmatic plugin"
  description="show() opens immediately; attach() binds hover on the target"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>
