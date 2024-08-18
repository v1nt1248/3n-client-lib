# Ui3nBreadcrumbs / Ui3nBreadcrumb

## Intro

Used to display information hierarchically.

## API
### Props (Breadcrumbs)
| Props | Requiared | Description                                                                    |  Type  | Default |
| ----- | :-------: |--------------------------------------------------------------------------------|:------:|:-------:|
| separator | No | Separator                                                                      | string |    /    |
| disabled | No | Whether to disable all children breadcrumbs even if they has the active status | boolean | false |

### Props (Breadcrumb)
| Props | Requiared | Description                                                        |        Type         |  Default  |
| ----- | :-------: |--------------------------------------------------------------------|:-------------------:|:---------:|
| separator | No | Separator | string \| undefined | undefined |
| isActive | No | Whether to set the breadcrumb active | boolean | false |
| disabled | No | Whether to disable the breadcrumb even if it has the active status | boolean | false |

### Events (Breadcrumb)
| Event |                Description                 |  Arguments   |
|:-----:|:------------------------------------------:|:------------:|
| click | Triggered when a breadcrumb is clicked | event: Event |

### Slots (Breadcrumbs)
| Name | Description             | Slot props |
| ---- |-------------------------| ---------- |
| default | The breadcrumbs content | - |

### Slots (Breadcrumb)
| Name | Description                                | Slot props |
| ---- |--------------------------------------------| ---------- |
| default | The breadcrumbs content                    | - |
| separator | Customize the breadcrumb separator content | - |

## Examples
### *The basic usage*
###
<script setup>
  import Ui3nBreadcrumb from '../../src/components/ui3n-breadcrumbs/ui3n-breadcrumb.vue';
  import Ui3nBreadcrumbs from '../../src/components/ui3n-breadcrumbs/ui3n-breadcrumbs.vue';
  import Ui3nIcon from '../../src/components/ui3n-icon/ui3n-icon.vue';


  const onClick = (link) => {
    alert(link);
  };
</script>

<div>
  <ui3n-breadcrumbs>
    <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active>Link 1</ui3n-breadcrumb>
    <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</div>

###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBreadcrumb, Ui3nBreadcrumbs } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <div>
    <ui3n-breadcrumbs>
      <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active>Link 1</ui3n-breadcrumb>
      <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  </div>
</template>
```
:::

---  
### *Using common separator*
###
<div>
  <ui3n-breadcrumbs separator="~">
    <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active>Link 1</ui3n-breadcrumb>
    <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</div>

###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBreadcrumb, Ui3nBreadcrumbs } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <div>
    <ui3n-breadcrumbs separator="~">
      <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active>Link 1</ui3n-breadcrumb>
      <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  </div>
</template>
```
:::

---  
### *Using different separators in children*
###
<div>
  <ui3n-breadcrumbs>
    <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active separator="~">Link 1</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active separator="*">Link 2</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active>Link 3</ui3n-breadcrumb>
    <ui3n-breadcrumb>Link 4</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</div>

###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBreadcrumb, Ui3nBreadcrumbs } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <div>
    <ui3n-breadcrumbs>
      <ui3n-breadcrumb is-active>Home</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active separator="~">Link 1</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active separator="*">Link 2</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active>Link 3</ui3n-breadcrumb>
      <ui3n-breadcrumb>Link 4</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  </div>
</template>
```
:::

--- 
### *Using the separator slot*
###
<div>
  <ui3n-breadcrumbs>
    <ui3n-breadcrumb is-active>
      Home
      <template #separator>
        <ui3n-icon icon="bookmark"></ui3n-icon>
      </template>
    </ui3n-breadcrumb>
    <ui3n-breadcrumb is-active>
      Link 1
      <template #separator>
        <ui3n-icon icon="emoticon"></ui3n-icon>
      </template>
    </ui3n-breadcrumb>
    <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</div>

###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBreadcrumb, Ui3nBreadcrumbs, Ui3nIcon } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <div>
    <ui3n-breadcrumbs>
      <ui3n-breadcrumb is-active>
        Home
        <template #separator>
          <ui3n-icon icon="bookmark"></ui3n-icon>
        </template>
      </ui3n-breadcrumb>
      <ui3n-breadcrumb is-active>
        Link 1
        <template #separator>
          <ui3n-icon icon="emoticon"></ui3n-icon>
        </template>
      </ui3n-breadcrumb>
      <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  </div>
</template>
```
:::

--- 
### *Click event*
###

<div>
  <ui3n-breadcrumbs>
    <ui3n-breadcrumb is-active @click="onClick('Home')">Home</ui3n-breadcrumb>
    <ui3n-breadcrumb is-active @click="onClick('Link1')">Link 1</ui3n-breadcrumb>
    <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</div>

###
::: details Click me to view the code
```vue
<script lang="ts" setup>
  import { Ui3nBreadcrumb, Ui3nBreadcrumbs } from '@v1nt1248/3nclient-lib'

  const onClick = (link: string) => {
    alert(link)
  }
</script>


<template>
  <div>
    <ui3n-breadcrumbs>
      <ui3n-breadcrumb is-active @click="onClick('Home')">Home</ui3n-breadcrumb>
      <ui3n-breadcrumb is-active @click="onClick('Link1')">Link 1</ui3n-breadcrumb>
      <ui3n-breadcrumb>Link 2</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  </div>
</template>
```
:::

--- 
