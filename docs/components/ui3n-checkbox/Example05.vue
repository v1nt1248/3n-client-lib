<script setup lang="ts">
  import { ref, computed } from 'vue';

  /**
   * Indeterminate state
   * Checkbox in indeterminate (partial) state - useful for select all scenarios
   */

  const items = ref([
    { id: 1, name: 'Item 1', checked: true },
    { id: 2, name: 'Item 2', checked: true },
    { id: 3, name: 'Item 3', checked: false },
    { id: 4, name: 'Item 4', checked: false },
  ]);

  const allChecked = computed(() => items.value.every(item => item.checked));
  const someChecked = computed(() => items.value.some(item => item.checked));
  const indeterminate = computed(() => someChecked.value && !allChecked.value);

  const selectAll = computed({
    get() {
      return allChecked.value;
    },

    set(newValue) {
      items.value.forEach(item => {
        item.checked = newValue;
      });
    },
  });
</script>

<template>
  <div class="example-container">
    <ui3n-checkbox
      v-model="selectAll"
      :indeterminate="indeterminate"
    >
      Select All
    </ui3n-checkbox>

    <div class="items-list">
      <ui3n-checkbox
        v-for="item in items"
        :key="item.id"
        v-model="item.checked"
        class="item-checkbox"
      >
        {{ item.name }}
      </ui3n-checkbox>
    </div>

    <div class="status">
      Selected: <strong>{{ items.filter(i => i.checked).length }}</strong> of {{ items.length }}
    </div>
  </div>
</template>

<style scoped>
  .example-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 24px;
  }

  .item-checkbox {
    font-size: 14px;
  }

  .status {
    font-size: 12px;
    color: oklch(0.65 0.17 140);
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 4px;
    margin-top: 8px;
  }
</style>
