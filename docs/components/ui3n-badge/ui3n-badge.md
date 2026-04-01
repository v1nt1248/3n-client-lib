<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';

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
