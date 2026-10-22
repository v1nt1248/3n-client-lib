<template>
  <div class="wrapper">
    <Ui3nTable
      :config="config"
      :head="head"
      :body="body"
    >
      <template #no-data>
        <div class="pinned-block">
          No data — scroll horizontally, this block stays pinned
        </div>
      </template>
    </Ui3nTable>
  </div>
</template>

<script setup lang="ts">
  import type { Ui3nTableConfig, Ui3nTableHeadProps, Ui3nTableBodyProps } from '@/components';

  interface FileRow {
    id: number;
    name: string;
    type: string;
    size: string;
    owner: string;
    modified: string;
    status: string;
  }

  const config: Ui3nTableConfig<FileRow> = {
    tableName: 'files-sticky-no-data',
    stickyColumns: 1,
    showNoDataMessage: true,
    columnStyle: {
      name: { width: '180px' },
      type: { width: '100px' },
      size: { width: '90px' },
      owner: { width: '140px' },
      modified: { width: '160px' },
      status: { width: '110px' },
    },
  };

  const head: Ui3nTableHeadProps<FileRow>[] = [
    { key: 'name', text: 'Name', sortable: true },
    { key: 'type', text: 'Type' },
    { key: 'size', text: 'Size' },
    { key: 'owner', text: 'Owner' },
    { key: 'modified', text: 'Modified' },
    { key: 'status', text: 'Status' },
  ];

  const body: Ui3nTableBodyProps<FileRow> = {
    content: [],
  };
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 560px;
    height: 220px;
    border: 1px solid var(--color-border-block-primary-default, #ddd);
    overflow: hidden;
  }

  .pinned-block {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-height: 120px;
    padding: 16px;
    border: 1px dashed var(--color-border-table-primary-default, #bbb);
    background-color: var(--color-bg-table-cell-default, #fafafa);
    color: var(--color-text-control-secondary-default, #666);
    font-size: 12px;
    text-align: center;
  }
</style>
