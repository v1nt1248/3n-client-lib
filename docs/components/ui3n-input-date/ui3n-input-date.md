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

const inputDateMeta = data.find(c => c.name === 'ui3n-input-date') || {
  props: [],
  events: [],
  slots: [],
  exposes: [],
  cssVariables: []
};
</script>

# Ui3nInputDate

Text input with a popover date picker. The `outline-calendar-month` icon in the append slot
opens `Ui3nDatePicker`; the input displays and accepts a masked ISO date.

`v-model` is a `Date | null`. The input shows `YYYY-MM-DD`; with `show-timepicker` the value
becomes `YYYY-MM-DD HH:mm[:ss]` (`YYYY-MM-DD hh:mm[:ss] A` for the 12-hour format) and the
panel renders the time block below the calendar.

`input` and `change` emit the displayed string, while `update:modelValue` emits only a valid
`Date` or `null` when the field is cleared. Partial or non-existent dates (for example
`2026-02-30`) stay in the field without changing the model; use `rules` to report them. On
blur, single-digit date and time parts are accepted.

The mask covers years 1900–9999. `masked: false` disables it, and
`timepickerConfig.leadingZeros: false` disables the combined date-time mask because the
format is no longer fixed. The panel stays open after a selection, preserves the time when a
new date is chosen, and closes on an outside click.

<ComponentDoc
  :props="inputDateMeta.props"
  :events="inputDateMeta.events"
  :slots="inputDateMeta.slots"
  :exposes="inputDateMeta.exposes"
  :css-variables="inputDateMeta.cssVariables"
/>

## Usage Examples

### Basic usage
Binds a `Date | null` value and shows the masked ISO date in the input.

<DemoBlock
  title="Basic usage"
  description="Date input bound to a Date value"
  :code="Example01Raw"
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Date and time
Enables the time picker below the calendar. The input switches to the date-time format and
displays the selected time as well.

<DemoBlock
  title="Date and time"
  description="Date-time input with a seconds-precision time picker"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### 12-hour date-time
Uses the 12-hour format with AM/PM for both the input mask and the time picker.

<DemoBlock
  title="12-hour date-time"
  description="Date-time input with a 12-hour time format"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>

### Validation and clearable
Passes `rules` to the input. Invalid text remains visible but does not update `v-model`; the
rule reports the problem. Clearing emits `null`.

<DemoBlock
  title="Validation and clearable"
  description="Rules validating the displayed date and a clear button"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Localization, disabled days and weekends
Overrides weekday and month labels, starts the week on Monday, highlights weekends and
disables selected ISO dates.

<DemoBlock
  title="Localization, disabled days and weekends"
  description="Russian labels with disabled days and highlighted weekends"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### States and sizes
Shows the regular, large and disabled date inputs.

<DemoBlock
  title="States and sizes"
  description="Regular, large and disabled date inputs"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>
