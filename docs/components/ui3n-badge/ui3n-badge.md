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

const badgeMeta = data.find(c => c.name === 'ui3n-badge');
</script>

# Ui3nBadge

<ComponentDoc
  :props="badgeMeta.props"
  :events="badgeMeta.events"
  :slots="badgeMeta.slots"
  :exposes="badgeMeta.exposes"
/>

### Simple use

<DemoBlock
  title="Simple use"
  description="Dot mode, position 'right-top', default color'"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Value display

<DemoBlock
  title="Value display"
  description="Display text/numbers inside the badge"
  :code="Example02Raw"
  only-template-content
>
  <Example02></Example02>
</DemoBlock>

### Color customization

<DemoBlock
  title="Color customization"
  description="Custom background and text color"
  :code="Example03Raw"
  only-template-content
>
  <Example03></Example03>
</DemoBlock>

### Position variations

<DemoBlock
  title="Position variations"
  description="All 4 positioning options"
  :code="Example04Raw"
  only-template-content
>
  <Example04></Example04>
</DemoBlock>
