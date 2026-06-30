<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const mobileMenuMeta = data.find(c => c.name === 'ui3n-mobile-menu');
</script>

# Ui3nMobileMenu

Mobile menu component with slide-in animation and customizable sections.

<ComponentDoc
  :props="mobileMenuMeta.props"
  :events="mobileMenuMeta.events"
  :slots="mobileMenuMeta.slots"
  :exposes="mobileMenuMeta.exposes"
/>

## Usage Examples

### Simple mobile menu

<DemoBlock
  title="Simple mobile menu"
  description="Basic mobile menu with header, body and footer"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Mobile menu with custom width

<DemoBlock
  title="Mobile menu with custom width"
  description="Mobile menu with custom width and blur effect"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>