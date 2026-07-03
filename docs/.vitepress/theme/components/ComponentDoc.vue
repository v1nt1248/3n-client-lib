<script setup lang="ts">
  import { computed } from 'vue';

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

  const propsData = defineProps<{
    props?: ComponentPropInfo[];
    events?: ComponentEventInfo[];
    slots?: ComponentSlotInfo[];
    exposes?: ComponentExposeInfo[];
  }>();

  const filteredExposes = computed(() => {
    if (!propsData.exposes) {
      return [];
    }

    return propsData.exposes.filter(ex => !ex.name.startsWith('$') && !ex.name.startsWith('_'));
  });

  function formatType(typeStr: string): string {
    if (!typeStr) return '';
    return typeStr.replace(/\s\|\s/g, ' | ');
  }
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
              <th>Default</th>
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
                  title="Required property"
                  >*</span
                >
              </td>

              <td class="type complex-type">
                <code>{{ formatType(prop.type) }}</code>
              </td>

              <td class="default-value">
                <code v-if="prop.default && prop.default !== 'undefined'">
                  {{ prop.default }}
                </code>

                <span
                  v-else
                  class="empty-value"
                >
                  —
                </span>
              </td>

              <td class="description">
                <p
                  v-if="prop.description"
                  class="desc-text"
                >
                  {{ prop.description }}
                </p>

                <span
                  v-else
                  class="empty-value"
                >
                  No description provided
                </span>
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
              <th>Event Name</th>
              <th>Arguments / Value Type</th>
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

              <td class="type complex-type">
                <code>{{ event.value.replace(/^\[|\]$/g, '') }}</code>
              </td>

              <td class="description">
                <p
                  v-if="event.description"
                  class="desc-text"
                >
                  {{ event.description }}
                </p>

                <span
                  v-else
                  class="empty-value"
                >
                  —
                </span>
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
              <th>Slot Name</th>
              <th>Scope Props (v-slot)</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="slot in slots"
              :key="slot.name"
            >
              <td class="name">
                <code>#{{ slot.name }}</code>
              </td>

              <td class="type complex-type">
                <code v-if="slot.props && slot.props !== 'any' && slot.props !== '{}'">
                  {{ slot.props }}
                </code>

                <span
                  v-else
                  class="empty-value"
                >
                  —
                </span>
              </td>

              <td class="description">
                <p
                  v-if="slot.description"
                  class="desc-text"
                >
                  {{ slot.description }}
                </p>

                <span
                  v-else
                  class="empty-value"
                >
                  —
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="filteredExposes.length"
      class="section"
    >
      <h3 class="section-title">Public Methods & Exposes</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Method Name</th>
              <th>Signature / Type</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="expose in filteredExposes"
              :key="expose.name"
            >
              <td class="name">
                <code>{{ expose.name }}()</code>
              </td>

              <td class="type complex-type">
                <code>{{ expose.props }}</code>
              </td>

              <td class="description">
                <p
                  v-if="expose.description"
                  class="desc-text"
                >
                  {{ expose.description }}
                </p>

                <span
                  v-else
                  class="empty-value"
                >
                  —
                </span>
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
    padding: 16px 0;
  }

  .section {
    position: relative;
    width: 100%;
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    color: var(--color-text-block-accent-default);
    margin: 0 0 16px 0;
    border-bottom: 1px solid var(--color-border-table-primary-default);
    padding-bottom: 8px;
  }

  .table-wrapper {
    position: relative;
    width: 100%;
    overflow-x: auto;
    border-radius: 6px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
  }

  th {
    height: 48px;
    padding: 10px 12px;
    background-color: var(--color-bg-table-header-default);
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: var(--color-text-table-primary-default);
    border: 1px solid var(--color-border-table-primary-default);
  }

  td {
    padding: 12px;
    vertical-align: top;
    border: 1px solid var(--color-border-table-primary-default);
    font-size: 13px;
    line-height: 1.6;
    color: var(--color-text-table-primary-default);
  }

  tr {
    background-color: var(--color-bg-block-primary-default);
  }

  tr:nth-child(even) {
    background-color: var(--color-bg-control-secondary-default);
  }

  code {
    font-family: ui-monospace, 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 12px !important;
    font-weight: 500;
    line-height: 1.4 !important;
  }

  .name {
    width: 15%;
    font-weight: 500;
  }

  .name code {
    color: var(--color-text-table-primary-default) !important;
    background-color: var(--color-bg-table-cell-selected) !important;
  }

  .complex-type {
    width: 30%;
  }

  .complex-type code {
    white-space: pre-wrap;
    word-break: normal;
    overflow-wrap: break-word;
    background-color: transparent;
    color: var(--color-text-table-primary-default);
    font-weight: 600;
  }

  .default-value {
    width: 15%;
  }

  .default-value code {
    color: var(--color-text-chat-bubble-user-quote-selected) !important;
    background-color: var(--color-bg-chat-bubble-user-quote-selected) !important;
  }

  .description {
    width: 40%;
  }

  .desc-text {
    margin: 0;
    white-space: pre-wrap;
  }

  .required-badge {
    color: var(--error-content-default);
    margin-left: 4px;
    cursor: help;
    font-weight: 600;
  }

  .empty-value {
    color: var(--color-text-control-secondary-default);
    font-style: italic;
    font-size: 12px;
  }
</style>
