<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';
import Example03 from './Example03.vue';
import Example03Raw from './Example03.vue?raw';

const sliderMeta = data.find(c => c.name === 'ui3n-slider');
</script>

# Ui3nSlider

Slider component for selecting numeric values with customizable appearance.

<ComponentDoc
  :props="sliderMeta.props"
  :events="sliderMeta.events"
  :slots="sliderMeta.slots"
  :exposes="sliderMeta.exposes"
/>

## Usage Examples

### Simple slider

<DemoBlock
  title="Simple slider"
  description="Basic slider with default settings"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Slider with custom range

<DemoBlock
  title="Slider with custom range"
  description="Slider with custom min, max and step values"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>

### Range slider

<DemoBlock
  title="Range slider"
  description="Slider with range mode for selecting two values"
  :code="Example03Raw"
  hide-script-block
  hide-style-block
>
  <Example03></Example03>
</DemoBlock>