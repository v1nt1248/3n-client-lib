<script setup lang="ts">
  import Ui3nHtml from '@/directives/ui3n-html';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';

  const vUi3nHtml = Ui3nHtml

  const html1 = `
    <div class="demo-123">
      <h4 class="demo-123-title">
        This is title
      </h4>

      <a
        href="https://vuejs.org/guide/introduction.html"
        class="demo-123-link"
        data-item="single-file-components"
      >
        Vue3 documentation
      </a>
    </div>
  `;

</script>

<template>
  <demo-layout title="Ui3nHtml">
    <div class="demo__body-grid">
      <demo-layout-cell label="HTML without sanitize">
        <div v-ui3n-html="html1" />
      </demo-layout-cell>

      <demo-layout-cell label="HTML with sanitize (default options)">
        <div v-ui3n-html:sanitize="html1" />
      </demo-layout-cell>

      <demo-layout-cell label="HTML with sanitize (css classes include, data-item attr include)">
        <div v-ui3n-html:sanitize="{ dirty: html1, allowedAttributes: { '*': ['class', 'data-item'] } }" />
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss">
  .demo-123 {
    &-title {
      font-size: 16px;
      color: purple;
    }

    &-link {
      text-decoration: none;
      color: #ff8800;
      cursor: help;
    }
  }
</style>
