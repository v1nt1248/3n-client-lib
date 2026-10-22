<template>
  <div class="wrapper">
    <Ui3nTable
      ref="tableRef"
      :config="config"
      :head="head"
      :body="body"
    >
      <template #group-actions="{ selectedRows }">
        <div class="group-actions">
          <Ui3nButton
            size="small"
            @click="archiveSelected(selectedRows)"
          >
            Archive
          </Ui3nButton>
          <Ui3nButton
            size="small"
            type="secondary"
            @click="deleteSelected(selectedRows)"
          >
            Delete
          </Ui3nButton>
        </div>
      </template>
    </Ui3nTable>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ui3nTableConfig, Ui3nTableHeadProps, Ui3nTableBodyProps } from '@/components';

  interface FileRow {
    id: number;
    name: string;
    type: string;
    size: string;
    owner: string;
    modified: string;
    path: string;
    status: string;
  }

  const tableRef = ref();

  const types = ['PDF', 'Figma', 'CSV', 'Markdown', 'Text', 'JSON', 'Excel', 'PowerPoint'] as const;
  const owners = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown'] as const;
  const statuses = ['Ready', 'Draft', 'Review'] as const;

  const config: Ui3nTableConfig<FileRow> = {
    tableName: 'files-sticky-group-actions',
    stickyColumns: 1,
    selectable: 'multiple',
    columnStyle: {
      name: { width: '180px' },
      type: { width: '100px' },
      size: { width: '90px' },
      owner: { width: '140px' },
      modified: { width: '160px' },
      path: { width: '280px' },
      status: { width: '110px' },
    },
  };

  const head: Ui3nTableHeadProps<FileRow>[] = [
    { key: 'name', text: 'Name', sortable: true },
    { key: 'type', text: 'Type' },
    { key: 'size', text: 'Size' },
    { key: 'owner', text: 'Owner' },
    { key: 'modified', text: 'Modified' },
    { key: 'path', text: 'Path' },
    { key: 'status', text: 'Status' },
  ];

  const body: Ui3nTableBodyProps<FileRow> = {
    content: Array.from({ length: 40 }, (_, index) => {
      const id = index + 1;
      const type = types[index % types.length];
      const owner = owners[index % owners.length];
      const status = statuses[index % statuses.length];
      const name = `file-${String(id).padStart(2, '0')}.${type.toLowerCase()}`;

      return {
        id,
        name,
        type,
        size: `${((id * 37) % 900) + 12} KB`,
        owner,
        modified: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')} 10:00`,
        path: `/storage/${owner.toLowerCase().replace(' ', '-')}/${name}`,
        status,
      };
    }),
  };

  const archiveSelected = (rows: FileRow[]) => {
    console.log('Archive rows:', rows);
    tableRef.value?.clear();
  };

  const deleteSelected = (rows: FileRow[]) => {
    console.log('Delete rows:', rows);
    tableRef.value?.clear();
  };
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 560px;
    height: 280px;
    border: 1px solid var(--color-border-block-primary-default, #ddd);
    overflow: hidden;
  }

  .group-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;
  }
</style>
