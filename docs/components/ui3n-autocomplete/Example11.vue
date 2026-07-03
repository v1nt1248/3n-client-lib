<script setup lang="ts">
  import { ref } from 'vue';

  interface Skill {
    id: string;
    name: string;
    level: string;
  }

  const items: Skill[] = [
    { id: 'ts', name: 'TypeScript', level: 'Advanced' },
    { id: 'vue', name: 'Vue.js', level: 'Expert' },
    { id: 'node', name: 'Node.js', level: 'Intermediate' },
    { id: 'docker', name: 'Docker', level: 'Beginner' },
  ];

  const preselectedValueIds = ref(['ts', 'node']);

  const preselectedObjects = ref([{ id: 'vue', name: 'Vue.js', level: 'Expert' }]);
</script>

<template>
  <div class="demo-container">
    <div class="sub-case">
      <div class="case-title">Case A: Flat IDs Mode (default)</div>
      <ui3n-autocomplete
        v-model="preselectedValueIds"
        :items="items"
        placeholder="Select skills"
        multiple
        chips
      />

      <div class="value-display">Current ref value: {{ preselectedValueIds }}</div>
    </div>

    <div class="sub-case">
      <div class="case-title">Case B: Return Object Mode</div>

      <ui3n-autocomplete
        v-model="preselectedObjects"
        :items="items"
        placeholder="Select skills"
        multiple
        chips
        return-object
      />

      <div class="value-display">
        Current ref value:
        <pre>{{ JSON.stringify(preselectedObjects, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sub-case {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .case-title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--color-text-table-primary-default);
  }

  .value-display {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: oklch(0.65 0.17 140);
  }

  .value-display pre {
    margin: 4px 0 0;
    padding: 6px;
    background-color: var(--color-bg-block-darkery-default);
    border-radius: 4px;
    font-size: 11px;
    overflow-x: auto;
  }
</style>
