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

const buttonMeta = data.find(c => c.name === 'ui3n-button');
</script>

# Ui3nButton

Button component with various styles and capabilities.

<ComponentDoc
  :props="buttonMeta.props"
  :events="buttonMeta.events"
  :slots="buttonMeta.slots"
  :exposes="buttonMeta.exposes"
/>

## Usage Examples

### Simple button

<DemoBlock
  title="Simple button"
  description="Simple button usage"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Button types

<DemoBlock
  title="Button types"
  description="Different button types: primary, secondary, tertiary, icon, custom"
  :code="Example02Raw"
  only-template-content
>
  <Example02></Example02>
</DemoBlock>

### Button sizes

<DemoBlock
  title="Button sizes"
  description="Regular and small button sizes"
  :code="Example03Raw"
  only-template-content
>
  <Example03></Example03>
</DemoBlock>

### Buttons with icons

<DemoBlock
  title="Buttons with icons"
  description="Buttons with icons on the left or right side"
  :code="Example04Raw"
  only-template-content
>
  <Example04></Example04>
</DemoBlock>

### Button states

<DemoBlock
  title="Button states"
  description="Disabled, block and elevated buttons"
  :code="Example05Raw"
  only-template-content
>
  <Example05></Example05>
</DemoBlock>
