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

const datePickerMeta = data.find(c => c.name === 'ui3n-date-picker') || {
  props: [],
  events: [],
  slots: [],
  exposes: [],
  cssVariables: []
};
</script>

# Ui3nDatePicker

Inline date picker panel with year and month selectors, a calendar grid, and an optional
time picker. Use `v-model` with a `Date | null`. When `show-timepicker` is off, the
emitted value is reset to the start of the day; when it is on, the selected time is
preserved.

`without-year` hides the year selector and the weekdays (the calendar renders only the days of
the month) and keeps the `UI3N_NO_YEAR_REFERENCE` year (2000) in the emitted value.
`allow-without-year` renders a switch that emits `update:withoutYear` and converts the current
value. The switch label comes from `localeConfig.withoutYear`. The mode is ignored together
with `show-timepicker`.

<ComponentDoc
  :props="datePickerMeta.props"
  :events="datePickerMeta.events"
  :slots="datePickerMeta.slots"
  :exposes="datePickerMeta.exposes"
  :css-variables="datePickerMeta.cssVariables"
/>

## Usage Examples

### Basic usage
Binds a `Date | null` value and renders the year/month selectors and calendar inline.

<DemoBlock
  title="Basic usage"
  description="Date picker bound to a Date value"
  :code="Example01Raw"
  hide-style-block
>
  <ClientOnly><Example01></Example01></ClientOnly>
</DemoBlock>

### Date and time
Enables the time picker below the calendar and configures it to show seconds. The selected
time is preserved when a new date is chosen.

<DemoBlock
  title="Date and time"
  description="Date picker with an optional seconds-precision time picker"
  :code="Example02Raw"
  hide-style-block
>
  <ClientOnly><Example02></Example02></ClientOnly>
</DemoBlock>

### Localization
Overrides weekday, month and time-unit labels, and starts the week on Monday.

<DemoBlock
  title="Localization"
  description="Russian labels with Monday as the first day of the week"
  :code="Example03Raw"
  hide-style-block
>
  <ClientOnly><Example03></Example03></ClientOnly>
</DemoBlock>

### Disabled days and weekends
Marks selected ISO dates as unavailable, highlights weekends, and starts the week on
Sunday. Disabled days cannot be selected.

<DemoBlock
  title="Disabled days and weekends"
  description="Disabled dates with weekend highlighting and Sunday-first week"
  :code="Example04Raw"
  hide-style-block
>
  <ClientOnly><Example04></Example04></ClientOnly>
</DemoBlock>

### Sizes and disabled state
Shows the `regular` and `large` sizes together with a fully disabled picker.

<DemoBlock
  title="Sizes and disabled state"
  description="Regular, large and disabled date pickers"
  :code="Example05Raw"
  hide-style-block
>
  <ClientOnly><Example05></Example05></ClientOnly>
</DemoBlock>

### Without year
The switch at the top toggles the year-less mode; the calendar then shows only the days of the
selected month.

<DemoBlock
  title="Without year"
  description="Date picker with the without-year switch"
  :code="Example06Raw"
  hide-style-block
>
  <ClientOnly><Example06></Example06></ClientOnly>
</DemoBlock>
