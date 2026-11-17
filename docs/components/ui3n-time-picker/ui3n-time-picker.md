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
import Example06 from './Example06.vue';
import Example06Raw from './Example06.vue?raw';

const timePickerMeta = data.find(c => c.name === 'ui3n-time-picker') || {
  props: [],
  events: [],
  slots: [],
  exposes: [],
  cssVariables: []
};
</script>

# Ui3nTimePicker

Inline time picker panel with configurable hour, minute and second fields. The component
is not a popover input: the fields are always rendered, while the `open` model controls
the dropdown of the active field.

`v-model` is a `string | null` in the format produced by `config`, for example `22:30`,
`22:30:15` or `07:33 PM`. `minuteStep` and `secondStep` align the displayed value and may
emit a normalized value on mount, so use values that already match the configured steps.

`v-model:open` controls the active field dropdown: setting it to `true` opens the hours
dropdown, and `false` closes all dropdowns. When opening a dropdown from an external
control, stop the click from bubbling to `window` (`.stop`); otherwise the menu's
outside-click handler can close it during the same click event.

<ComponentDoc
  :props="timePickerMeta.props"
  :events="timePickerMeta.events"
  :slots="timePickerMeta.slots"
  :exposes="timePickerMeta.exposes"
  :css-variables="timePickerMeta.cssVariables"
/>

## Usage Examples

### Basic usage
A 24-hour time picker bound to an `HH:mm` string.

<DemoBlock
  title="Basic usage"
  description="Default 24-hour format with five-minute steps"
  :code="Example01Raw"
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### 12-hour format with seconds
Switches to the 12-hour format with AM/PM and displays the seconds field.

<DemoBlock
  title="12-hour format with seconds"
  description="12-hour format with seconds and leading zeros"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Custom steps and size
Uses ten-minute and five-second steps together with the `large` size. The initial value is
aligned to both steps.

<DemoBlock
  title="Custom steps and size"
  description="Large time picker with custom minute and second steps"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>

### Minutes and seconds only
Hides the hours field and renders only the minute and second selectors.

<DemoBlock
  title="Minutes and seconds only"
  description="Time picker without an hours field"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Leading zeros and disabled state
Shows values without leading zeros next to a fully disabled picker.

<DemoBlock
  title="Leading zeros and disabled state"
  description="Single-digit values and a disabled time picker"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### Controlled open state
Binds `v-model:open` to a local ref and opens or closes the active field dropdown with
buttons. This does not hide the inline fields.

<DemoBlock
  title="Controlled open state"
  description="Programmatically opening and closing the active field dropdown"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>
