<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nTitle from '@/directives/ui3n-title';
  import Ui3nButton from '@/components/ui3n-button/ui3n-button.vue';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';

  const vUi3nTitle = Ui3nTitle;

  const content = ref('Pinia is the undisputed state management champion in the Vue 3 world. It provides a more powerful and scalable architecture with an elegant code style following the composition API syntax.')
</script>

<template>
  <demo-layout title="Ui3nTitle">
    <div class="demo__body-grid">
      <demo-layout-cell label="Default use">
        <ui3n-button
          v-ui3n-title="{
            text: content,
            maxWidth: 300,
            bgColor: '#770044',
            color: '#fff',
            placement: 'right-start',
        }"
          class="btn"
        >
          <span class="content">{{ content }}</span>
        </ui3n-button>
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss" scoped>
  @use '../assets/styles/mixins' as mixins;

  .item {
    position: relative;
    width: 100%;
    padding: 6px 8px;
    font-size: 14px;
    line-height: 20px;

    span {
      display: block;
      @include mixins.text-overflow-ellipsis();
    }
  }

  .btn {
    max-width: 100%;
  }

  .content {
    display: block;
    @include mixins.text-overflow-ellipsis();
  }
</style>
