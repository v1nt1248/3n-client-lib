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

const inputFileMeta = data.find(c => c.name === 'ui3n-input-file');
</script>

# Ui3nInputFile

File input component for selecting files with validation for file type, size, and count.

<ComponentDoc
  :props="inputFileMeta.props"
  :events="inputFileMeta.events"
  :slots="inputFileMeta.slots"
  :exposes="inputFileMeta.exposes"
/>

## Usage Examples

### Basic usage

<DemoBlock
  title="Basic usage"
  description="Simple file input with default button text"
  :code="Example01Raw"
>
  <Example01></Example01>
</DemoBlock>

### Multiple file selection

<DemoBlock
  title="Multiple file selection"
  description="Select multiple files using the multiple prop and limit with maxNumberOfFiles"
  :code="Example02Raw"
>
  <Example02></Example02>
</DemoBlock>

### File restrictions

<DemoBlock
  title="File restrictions"
  description="Restrict file types with allowedFileTypes and limit file size with maxFileSize"
  :code="Example03Raw"
>
  <Example03></Example03>
</DemoBlock>

### Custom slot content

<DemoBlock
  title="Custom slot content"
  description="Use the default slot to customize the file selection trigger"
  :code="Example04Raw"
>
  <Example04></Example04>
</DemoBlock>

### Error handling

<DemoBlock
  title="Error handling"
  description="Handle validation errors using the error event"
  :code="Example05Raw"
>
  <Example05></Example05>
</DemoBlock>