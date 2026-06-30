<script setup lang="ts">
import { data } from '../component.data.ts';
import Example01 from './Example01.vue';
import Example01Raw from './Example01.vue?raw';
import Example02 from './Example02.vue';
import Example02Raw from './Example02.vue?raw';

const mobileMenuItemMeta = data.find(c => c.name === 'ui3n-mobile-menu-item');
</script>

# Ui3nMobileMenuItem

Menu item component for mobile menu with icon and active state support.

<ComponentDoc
  :props="mobileMenuItemMeta.props"
  :events="mobileMenuItemMeta.events"
  :slots="mobileMenuItemMeta.slots"
  :exposes="mobileMenuItemMeta.exposes"
/>

## Usage Examples

### Simple menu item

<DemoBlock
  title="Simple menu item"
  description="Basic menu item with name"
  :code="Example01Raw"
  only-template-content
>
  <Example01></Example01>
</DemoBlock>

### Menu item with icon

<DemoBlock
  title="Menu item with icon"
  description="Menu item with icon and active state"
  :code="Example02Raw"
  hide-script-block
  hide-style-block
>
  <Example02></Example02>
</DemoBlock>