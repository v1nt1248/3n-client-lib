# Ui3nBadge

## Intro

A dot, number, or text that appears in the upper corner of an icon or text indicates that there is new content or pending information.

## API
### Props
| Props | Requiared | Description | Type | Default |
| ----- | :-------: | ----------- | :--: | :-----: |
| dot | No | Is the badge a dot | boolean | false |
| value | No | The value shown in the badge (takes effect when dot is false) | string \| number | - |
| color | No | Custom badge color | string | #00090c |
| textColor | No | Custom value text color | string | #fff |
| position | No | Define the position of the logo on other labels when there are other labels in the logo tag | right-top \| right-bottom \| left-top \| left-bottom | right-top |
  
### Slots
| Name | Description | Slot props |
| ---- | ----------- | ---------- |
| default | The badge content | - |

## Style variables
| Variable | Default |
| -------- | ------- |
| --ui3n-badge-size | 20px |

## Examples
### *The simple badge (as a dot)*
###
<script setup>
  import Ui3nBadge from '../../src/components/ui3n-badge.vue'
</script>


<div>
  <ui3n-badge :dot="true" color="green" :class="$style.badge">
    <span :class="$style.block">The block with the badge (right-top)</span>
  </ui3n-badge>

  <ui3n-badge :dot="true" color="blue" position="left-top" :class="$style.badge">
    <span :class="$style.block">The block with the badge (left-top)</span>
  </ui3n-badge>

  <ui3n-badge :dot="true" color="red" position="right-bottom" :class="$style.badge">
    <span :class="$style.block">The block with the badge (right-bottom)</span>
  </ui3n-badge>

  <ui3n-badge :dot="true" color="yellow" position="left-bottom" :class="$style.badge">
    <span :class="$style.block">The block with the badge (left-bottom)</span>
  </ui3n-badge>
</div>


<style lang="scss" module>
.badge {
  margin-bottom: 8px;
}

.block {
  display: block;
  position: relative;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid #fff;
}
</style>
###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBadge } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <div>
    <ui3n-badge :dot="true" color="green" :class="$style.badge">
      <span :class="$style.block">The block with the badge (right-top)</span>
    </ui3n-badge>

    <ui3n-badge :dot="true" color="blue" position="left-top" :class="$style.badge">
      <span :class="$style.block">The block with the badge (left-top)</span>
    </ui3n-badge>

    <ui3n-badge :dot="true" color="red" position="right-bottom" :class="$style.badge">
      <span :class="$style.block">The block with the badge (right-bottom)</span>
    </ui3n-badge>

    <ui3n-badge :dot="true" color="yellow" position="left-bottom" :class="$style.badge">
      <span :class="$style.block">The block with the badge (left-bottom)</span>
    </ui3n-badge>
  </div>
</template>

<style lang="scss" module>
.badge {
  margin-bottom: 8px;
}

.block {
  display: block;
  position: relative;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid #fff;
}
</style>
```
:::  

---  
### *The badge with text*
###

<ui3n-badge value="99" :class="$style.badge">
  <span :class="$style.block">The block with the badge (right-top)</span>
</ui3n-badge>
<ui3n-badge value="99" text-color="yellow" color="black" :class="$style.badge">
  <span :class="$style.block">The block with the badge (right-top)</span>
</ui3n-badge>

###
::: details Click me to view the code
```vue
<script setup>
  import { Ui3nBadge } from '@v1nt1248/3nclient-lib'
</script>


<template>
  <ui3n-badge :color="green" value="99" :class="$style.badge">
    <span :class="$style.block">The block with the badge (right-top)</span>
  </ui3n-badge>

  <ui3n-badge value="99" text-color="yellow" color="black" :class="$style.badge">
    <span :class="$style.block">The block with the badge (right-top)</span>
  </ui3n-badge>
</template>

<style lang="scss" module>
.badge {
  margin-bottom: 8px;
}

.block {
  display: block;
  position: relative;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid #fff;
}
</style>
```
:::  

---  
