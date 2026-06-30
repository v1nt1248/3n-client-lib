<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const emojiMeta = data.find(c => c.name === 'ui3n-emoji');
</script>

# Ui3nEmoji

Component for displaying emoticons from the built-in emoticons set. Supports different sizes and click events.

<ComponentDoc
  :props="emojiMeta.props"
  :events="emojiMeta.events"
  :slots="emojiMeta.slots"
  :exposes="emojiMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Display different emojis by passing the emoji name prop."
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Different sizes

<DemoBlock
  title="Different sizes"
  description="Use the size prop to control the emoji size (in pixels)."
  :code="Example02Raw"
  only-template-content
>
  <Example02></Example02>
</DemoBlock>

### Click handling

<DemoBlock
  title="Click handling"
  description="Emojis are clickable by default. Use the click event to handle interactions."
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>