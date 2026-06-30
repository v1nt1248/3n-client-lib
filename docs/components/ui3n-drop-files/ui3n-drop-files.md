<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const dropFilesMeta = data.find(c => c.name === 'ui3n-drop-files');
</script>

# Ui3nDropFiles

Component for drag & drop file uploading. Displays a drop zone that appears when files are dragged over the container.

<ComponentDoc
  :props="dropFilesMeta.props"
  :events="dropFilesMeta.events"
  :slots="dropFilesMeta.slots"
  :exposes="dropFilesMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Simple drop zone that appears on drag enter. Drop files to trigger the select event."
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Permanent display with additional text slot

<DemoBlock
  title="Permanent display"
  description="Drop zone is always visible using the permanentDisplay prop. Additional text can be provided via the additional-text slot."
  :code="Example02Raw"
>
  <Example02></Example02>
</DemoBlock>