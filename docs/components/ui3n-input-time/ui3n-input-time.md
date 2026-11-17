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

const inputTimeMeta = data.find(c => c.name === 'ui3n-input-time') || {
  props: [],
  events: [],
  slots: [],
  exposes: [],
  cssVariables: []
};
</script>

# Ui3nInputTime

Text input with a popover time picker. The `calendar-clock` icon in the append slot opens
`Ui3nTimePicker`; the input itself supports masked typing.

`v-model` is a `string | null` in the format produced by `config`: `22:30`, `22:30:15` or
`07:33 PM`. The value is masked by default (`masked`), and `mask` can override the IMask
options. `leadingZeros: false` disables the fixed mask, so the field accepts free-form
values. `maskValueMode` controls whether `v-model`, `input`, `change` and validation rules
receive the padded string (`masked`, default) or digits without separators (`unmasked`).

Typed values are not normalized on every keystroke. When the panel opens, the time picker
aligns the current value to `minuteStep` / `secondStep` once (the same behavior as the
standalone picker), so start with a value that already matches the configured steps when
that matters.

The panel stays open after a selection and closes on an outside click. `rules` validate the
value shown in the input, while `input` and `change` emit strings. The mask works only for
`type="text"`; `maxlength` and `minlength` are ignored while a mask is active.

<ComponentDoc
  :props="inputTimeMeta.props"
  :events="inputTimeMeta.events"
  :slots="inputTimeMeta.slots"
  :exposes="inputTimeMeta.exposes"
  :css-variables="inputTimeMeta.cssVariables"
/>

## Usage Examples

### Basic usage
A 24-hour masked time input bound to an `HH:mm` string.

<DemoBlock
  title="Basic usage"
  description="Default 24-hour format with five-minute steps"
  :code="Example01Raw"
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### 12-hour format with seconds
Switches the field and the picker to the 12-hour format with AM/PM and seconds.

<DemoBlock
  title="12-hour format with seconds"
  description="12-hour format with seconds and a large input"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Custom steps and size
Uses one-minute and five-second steps with the `large` size. The initial value is aligned
to both steps.

<DemoBlock
  title="Custom steps and size"
  description="Large input with custom minute and second steps"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>

### Mask and free input
The left field uses the default mask. The right one sets `leadingZeros: false`, which
disables the fixed mask and allows single-digit hours, minutes and seconds.

<DemoBlock
  title="Mask and free input"
  description="Masked typing versus free input without leading zeros"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Validation and clearable
Passes `rules` to the underlying input and validates the working-hours range. Use the clear
button to see the required rule.

<DemoBlock
  title="Validation and clearable"
  description="Rules validating the displayed time and a clear button"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### States and sizes
Shows the regular, large, disabled and readonly states side by side.

<DemoBlock
  title="States and sizes"
  description="Regular, large, disabled and readonly time inputs"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>
