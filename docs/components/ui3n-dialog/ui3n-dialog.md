<script setup lang="ts">
import { data } from '../component.data.ts';

// Импортируем кнопки вызова для интерактивного демо
import Example01Call from './Example01Call.vue';
import Example01Raw from './Example01.vue?raw';

import Example02Call from './Example02Call.vue';
import Example02Raw from './Example02.vue?raw';

import Example03Call from './Example03Call.vue';
import Example03Raw from './Example03.vue?raw';

import Example04Call from './Example04Call.vue';
import Example04Raw from './Example04.vue?raw';

const dialogMeta = data.find(c => c.name === 'ui3n-dialog');
</script>

# Ui3nDialog

`Ui3nDialog` acts as a structural layout skeleton for building modal windows. Developers define the body content and specific modal logic within an independent component file using the framework slots, and then imperatively open it from anywhere in the codebase using the queue manager `$openDialog`.

<ComponentDoc
:props="dialogMeta.props"
:events="dialogMeta.events"
:slots="dialogMeta.slots"
:exposes="dialogMeta.exposes"
/>

## Core Concepts

To successfully use dialog windows in your application, ensure that:
1. The `dialogs` plugin is registered during application initialization (`app.use(dialogs)`).
2. The `<ui3n-dialog-provider />` component is embedded into the root Layout of your application structure.

## Usage Examples

### 1. Simple Dialog

To build a dialog, create a component using the `<ui3n-dialog>` framework wrapper.

**Dialog Template (`Example01.vue`):**
```vue
<template>
  <ui3n-dialog
    v-bind="dialogProps"
    @action="emits('action', $event)"
  >
    <template #body>
      <div class="dialog-body">{{ text }}</div>
    </template>
  </ui3n-dialog>
</template>
```

**Live Demo & Calling Code:**
<DemoBlock
title="Opening a Simple Dialog"
description="How to open the configured dialog component using the imperial plugin"
:code="Example01Raw"
>
<Example01Call></Example01Call>
</DemoBlock>

---

### 2. Button Customization & Behavior

You can completely control button text, styling, and structural states (like `draggable`) from your calling environment configuration without touching the dialog file template.

**Dialog Template (`Example02.vue`):**
```vue
<template>
  <ui3n-dialog
    v-bind="dialogProps"
    @action="emits('action', $event)"
  >
    <template #body>
      <div class="dialog-body">{{ message }}</div>
    </template>
  </ui3n-dialog>
</template>
```

**Live Demo & Calling Code:**
<DemoBlock
title="Opening a Customized Dialog"
description="Passing color overrides, header icons, and enabling draggable features"
:code="Example02Raw"
>
<Example02Call></Example02Call>
</DemoBlock>

---

### 3. Custom Slots Override

Components can completely replace the predefined sections of the layout structure by using internal template slots.

**Dialog Template (`Example03.vue`):**
```vue
<template>
  <ui3n-dialog
    v-bind="dialogProps"
    @action="emits('action', $event)"
  >
    <template #header>
      <h3>Custom Title Status</h3>
    </template>
    
    <template #body>
      <p>Custom body text area...</p>
    </template>
    
    <template #actions>
      <ui3n-button
        @click="emits('action', { event: 'confirm' })"
      >
        Apply
      </ui3n-button>
    </template>
  </ui3n-dialog>
</template>
```

**Live Demo & Calling Code:**
<DemoBlock
title="Opening a Custom Slots Dialog"
description="Rendering advanced slot workflows from an imperatively mounted template"
:code="Example03Raw"
>
<Example03Call></Example03Call>
</DemoBlock>

---

### 4. Form Data & Promise Exchange

You can supply initial form values into the container and receive the modified entity state straight back into your reactive state once the user clicks submit.

**Dialog Template (`Example04.vue`):**
```vue
<template>
  <ui3n-dialog
    v-bind="dialogProps"
    :is-valid="isValid"
    @action="handleAction"
  >
    <template #body>
      <ui3n-input
        v-model="localForm.name"
        @input="onInput"
      />
    </template>
  </ui3n-dialog>
</template>
```

**Live Demo & Calling Code:**
<DemoBlock
title="Opening an Interactive Form Dialog"
description="Handling two-way form synchronization and fetching data via Promise returns"
:code="Example04Raw"
>
<Example04Call></Example04Call>
</DemoBlock>
