<script setup lang="ts">
  import Ui3nLongPress from '@/directives/ui3n-long-press';
  import Ui3nButton from '@/components/ui3n-button/ui3n-button.vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';

  const vUi3nLongPress = Ui3nLongPress;

  function handlerFoo(delay: number) {
    console.log(`You have done a long press with duration ${delay} ms!`);
  }

  function onClick() {
    console.log('You have done click!');
  }
</script>

<template>
  <demo-layout title="Ui3nLongPress">
    <div class="demo__body-grid">
      <demo-layout-cell label="Press long (500 ms)">
        <ui3n-button
          v-ui3n-long-press.prevent="{ handler: () => handlerFoo(500) }"
        >
          Press long (500 ms)
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Press long (2000 ms)">
        <ui3n-button
          v-ui3n-long-press="{ handler: () => handlerFoo(2000), delay: 2000 }"
        >
          Press long (2000 ms)
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Press long (2000 ms) or click">
        <ui3n-button
          v-ui3n-long-press="{
            handler: () => handlerFoo(2000),
            delay: 2000,
            onMouseUpCb: onClick
          }"
        >
          Press long (2000 ms)
        </ui3n-button>
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>
