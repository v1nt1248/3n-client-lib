<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const tabsMeta = data.find(c => c.name === 'ui3n-tabs') || {
  props: [],
  events: [],
  slots: [],
  exposes: []
};
</script>

# Ui3nTabs

Tabs component for organizing content into tabbed sections.

<ComponentDoc
  :props="tabsMeta.props"
  :events="tabsMeta.events"
  :slots="tabsMeta.slots"
  :exposes="tabsMeta.exposes"
/>

## Usage Examples

### Simple tabs

<DemoBlock
  title="Simple tabs"
  description="Basic horizontal tabs"
  :code="Example01Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Vertical tabs

<DemoBlock
  title="Vertical tabs"
  description="Tabs with vertical direction"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Customized tabs

<DemoBlock
  title="Customized tabs"
  description="Tabs with custom colors and indicator"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>
