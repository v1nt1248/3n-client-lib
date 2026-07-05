<script setup lang="ts">
  import { data } from '../component.data.ts';

  import MenuExample01 from './Example01.vue';
  import MenuExample01Raw from './Example01.vue?raw';
  import MenuExample02 from './Example02.vue';
  import MenuExample02Raw from './Example02.vue?raw';

  import ItemExample01 from './ItemExample01.vue';
  import ItemExample01Raw from './ItemExample01.vue?raw';
  import ItemExample02 from './ItemExample02.vue';
  import ItemExample02Raw from './ItemExample02.vue?raw';

  const mobileMenuMeta = data.find(c => c.name === 'ui3n-mobile-menu');
  const mobileMenuItemMeta = data.find(c => c.name === 'ui3n-mobile-menu-item');
</script>

# Ui3nMobileMenu & Ui3nMobileMenuItem

`Ui3nMobileMenu` is a full-screen drawer container designed for mobile device navigation, featuring custom slot layouts (`header`, `menuBody`, `footer`) and synchronized backdrop transitions. `Ui3nMobileMenuItem` is a sub-component with strict generic typing and smooth micro-interactions for links.

## Mobile Menu API
<ComponentDoc
  :props="mobileMenuMeta.props"
  :events="mobileMenuMeta.events"
  :slots="mobileMenuMeta.slots"
  :exposes="mobileMenuMeta.exposes"
/>

## Menu Item API
<ComponentDoc
  :props="mobileMenuItemMeta.props"
  :events="mobileMenuItemMeta.events"
  :slots="mobileMenuItemMeta.slots"
  :exposes="mobileMenuItemMeta.exposes"
/>

## Usage Examples

### Simple Mobile Menu
Demonstrates a complete menu lifecycle with full-screen slide-in animations and core navigation slots.

<DemoBlock
  title="Simple mobile menu"
  description="Basic mobile drawer implementation using core structured sections"
  :code="MenuExample01Raw"
>
  <MenuExample01></MenuExample01>
</DemoBlock>

### Custom Width & Backdrop Blur
Demonstrates container resizing using the `width` prop and activating an aesthetic frosted-glass look with `withBlur`.

<DemoBlock
  title="Mobile menu with custom width"
  description="Resized drawer framework utilizing full backdrop blur states"
  :code="MenuExample02Raw"
>
  <MenuExample02></MenuExample02>
</DemoBlock>

### Standalone Menu Items
Demonstrates static rendering of standalone item links inside a standard box wrapper.

<DemoBlock
  title="Standalone menu items"
  description="Basic item components mapped with a plain object configuration"
  :code="ItemExample01Raw"
>
  <ItemExample01></ItemExample01>
</DemoBlock>

### Interactive Navigation Group
Demonstrates dynamic active-state toggling using the `isActive` prop, highlighting the built-in icon physics animation (`bounceOnce`) upon element selection.

<DemoBlock
  title="Interactive navigation group"
  description="Synchronized list elements executing live active style swaps"
  :code="ItemExample02Raw"
>
  <ItemExample02></ItemExample02>
</DemoBlock>
