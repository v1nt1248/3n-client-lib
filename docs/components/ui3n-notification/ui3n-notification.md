<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const notificationMeta = data.find(c => c.name === 'ui3n-notification');
</script>

# Ui3nNotification

Notification component for displaying messages with different types and positions.

<ComponentDoc
  :props="notificationMeta.props"
  :events="notificationMeta.events"
  :slots="notificationMeta.slots"
  :exposes="notificationMeta.exposes"
/>

## Usage Examples

### Basic notification

<DemoBlock
  title="Basic notification"
  description="Simple notification with default settings"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Notification types

<DemoBlock
  title="Notification types"
  description="Different notification types: success, warning, info, error"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Auto-close notification

<DemoBlock
  title="Auto-close notification"
  description="Notification that closes automatically after specified duration"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>