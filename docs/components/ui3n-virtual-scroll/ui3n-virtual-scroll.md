<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const virtualScrollMeta = data.find(c => c.name === 'ui3n-virtual-scroll');
</script>

# Ui3nVirtualScroll

Virtual scroll component for efficiently rendering large lists by only rendering visible items.

<ComponentDoc
  :props="virtualScrollMeta.props"
  :events="virtualScrollMeta.events"
  :slots="virtualScrollMeta.slots"
  :exposes="virtualScrollMeta.exposes"
/>

## Usage Examples

### Simple virtual scroll

<DemoBlock
  title="Simple virtual scroll"
  description="Basic virtual scroll with large list"
  :code="Example01Raw"
  only-template-content
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Virtual scroll with custom rendering

<DemoBlock
  title="Virtual scroll with custom rendering"
  description="Virtual scroll with custom item template"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>
