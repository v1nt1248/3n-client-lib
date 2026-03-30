<script setup lang="ts">
  interface ApiItem {
    name: string;
    type?: { name: string };
    defaultValue?: { value: string };
    description?: string;
    required?: boolean;
  }

  const props = defineProps<{
    items?: ApiItem[]; // Для Props
    events?: any[]; // Для Events
    slots?: any[]; // Для Slots
    type?: 'props' | 'events' | 'slots';
  }>();
</script>

<template>
  <div class="api-table-wrapper vp-doc">
    <table v-if="items && items.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default value</th>
          <th>Description</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>
            <code class="name">{{ item.name }}</code>
            <span
              v-if="item.required"
              class="required"
              >*</span
            >
          </td>
          <td>
            <code
              class="type"
              v-if="item.type"
              >{{ item.type.name }}</code
            >
          </td>
          <td>
            <code
              class="default"
              v-if="item.defaultValue"
              >{{ item.defaultValue.value }}</code
            >
            <span v-else>-</span>
          </td>
          <td class="description">{{ item.description || '-' }}</td>
          <td class="required">{{ item.required || 'No' }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Аналогичные таблицы для Events и Slots можно добавить ниже или сделать универсальными -->
    <p
      v-else-if="!items?.length"
      class="empty-api"
    >
      No data
    </p>
  </div>
</template>

<style scoped>
  .api-table-wrapper {
    margin: 16px 0;
    overflow-x: auto;
  }

  .name {
    color: var(--vp-c-brand-1);
    font-weight: bold;
  }

  .required {
    color: var(--vp-c-danger-1);
    margin-left: 4px;
  }

  .type {
    color: var(--vp-c-text-2);
    white-space: pre-wrap;
  }

  .default {
    color: var(--vp-c-important-1);
  }

  .description {
    font-size: 0.9em;
  }

  .empty-api {
    font-style: italic;
    color: var(--vp-c-text-3);
  }
</style>
