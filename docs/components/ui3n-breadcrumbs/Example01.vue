<script setup lang="ts">
/**
 * Basic breadcrumbs usage
 * Demonstrates a simple navigation path with default separator '/'
 */
</script>

<template>
  <ui3n-breadcrumbs>
    <ui3n-breadcrumb :is-active="true">Home</ui3n-breadcrumb>
    <ui3n-breadcrumb :is-active="true">Products</ui3n-breadcrumb>
    <ui3n-breadcrumb :is-active="true">Category</ui3n-breadcrumb>
    <ui3n-breadcrumb>Current Page</ui3n-breadcrumb>
  </ui3n-breadcrumbs>
</template>