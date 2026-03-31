<script setup lang="ts">
  interface ComponentPropInfo {
    name: string;
    description: string;
    type: string;
    default?: string;
    required?: boolean;
  }

  interface ComponentEventInfo {
    name: string;
    description: string;
    value: string;
    signature: string;
  }

  interface ComponentSlotInfo {
    name: string;
    description: string;
    props: string;
  }

  interface ComponentExposeInfo {
    name: string;
    description: string;
    props: string;
  }

  defineProps<{
    props?: ComponentPropInfo[];
    events?: ComponentEventInfo[];
    slots?: ComponentSlotInfo[];
    exposes?: ComponentExposeInfo[];
  }>();
</script>

<template>
  <section class="component-doc">
    <div
      v-if="props && props.length"
      class="section"
    >
      <h3 class="section-title">Props</h3>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default value</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="prop in props"
              :key="prop.name"
            >
              <td class="name">
                <code>{{ prop.name }}</code>
                <span
                  v-if="prop.required"
                  class="required-badge"
                  title="Required"
                >
                  *
                </span>
              </td>

              <td class="type">
                <code>{{ prop.type }}</code>
              </td>

              <td class="default-value">
                <code v-if="prop.default">{{ prop.default }}</code>
              </td>

              <td class="description">
                <span>{{ prop.description }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="events && events.length"
      class="section"
    >
      <h3 class="section-title">Events</h3>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Value type</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="event in events"
              :key="event.name"
            >
              <td class="name">
                <code>{{ event.name }}</code>
              </td>

              <td class="type">
                <code>{{ event.value.replace(/^\[|\]$/g, '') }}</code>
              </td>

              <td class="description">
                <span>{{ event.description }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="slots && slots.length"
      class="section"
    >
      <h3 class="section-title">Slots</h3>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Props</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="slot in slots"
              :key="slot.name"
            >
              <td class="name">
                <code>{{ slot.name }}</code>
              </td>

              <td class="type">
                <code v-if="slot.props !== 'any'">{{ slot.props }}</code>
              </td>

              <td class="description">
                <span>{{ slot.description }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="exposes && exposes.length"
      class="section"
    >
      <h3 class="section-title">Exposes</h3>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Props</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="expose in exposes"
              :key="expose.name"
            >
              <td class="name">
                <code>{{ expose.name }}</code>
              </td>

              <td class="type">
                <code>{{ expose.props }}</code>
              </td>

              <td class="description">
                <span>{{ expose.description }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .component-doc {
    padding: 24px 0;
  }

  .section {
    position: relative;
    width: 100%;
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    color: var(--color-text-block-accent-default);
    margin: 0 0 16px 0;
  }

  .table-wrapper {
    position: relative;
    width: 100%;
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    padding-bottom: 16px;
  }

  th {
    height: 48px;
    padding: 0 8px;
    background-color: var(--color-bg-table-header-default);
    vertical-align: central;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: var(--color-text-table-primary-default);
    border: 1px solid var(--color-border-table-primary-default);
  }

  td {
    padding: 8px;
    vertical-align: top;
    background-color: transparent;
    border: 1px solid var(--color-border-table-primary-default);
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: var(--color-text-table-primary-default);
  }

  tr {
    background-color: var(--color-bg-block-primary-default);
  }

  tr:nth-child(even) {
    background-color: var(--color-bg-control-secondary-default);
  }

  code {
    display: inline-block;
    font-family: ui-monospace, 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 1 !important;
  }

  .name {
    min-width: 120px;
    white-space: nowrap;
    font-weight: 500;
  }

  .name code {
    color: var(--color-text-table-primary-default) !important;
    background-color: var(--color-bg-table-cell-selected) !important;
  }

  .required-badge {
    color: var(--error-content-default);
    margin-left: 4px;
    cursor: help;
    font-weight: 600;
  }

  .type {
    white-space: nowrap;
    min-width: 120px;
  }

  .type code {
    color: var(--color-text-chat-bubble-user-quote-selected) !important;
    background-color: var(--color-bg-chat-bubble-user-quote-selected) !important;
  }

  .default-value {
    white-space: nowrap;
    min-width: 120px;
  }

  .default-value code {
    color: var(--color-text-chat-bubble-user-quote-selected) !important;
    background-color: var(--color-bg-chat-bubble-user-quote-selected) !important;
  }

  .description {
    min-width: 200px;
  }
</style>
