<template>
  <div class="wrapper">
    <Ui3nTable
      :config="config"
      :head="head"
      :body="body"
    >
      <template #row-cell-name="{ row }">
        <span class="name-cell">{{ row.name }}</span>
      </template>
      <template #row-cell-status="{ cell }">
        <span :class="['status-badge', `status-${String(cell).toLowerCase()}`]">
          {{ cell }}
        </span>
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

  const types = ['PDF', 'Figma', 'CSV', 'Markdown', 'Text'] as const;
  const owners = ['John Doe', 'Jane Smith', 'Bob Johnson'] as const;
  const statuses = ['Ready', 'Draft', 'Review'] as const;

  const config: Ui3nTableConfig<FileRow> = {
    tableName: 'files-sticky-row-cell',
    stickyColumns: 1,
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
    content: Array.from({ length: 30 }, (_, index) => {
      const id = index + 1;
      const type = types[index % types.length];
      const owner = owners[index % owners.length];
      const status = statuses[index % statuses.length];

      return {
        id,
        name: `file-${String(id).padStart(2, '0')}.${type.toLowerCase()}`,
        type,
        size: `${((id * 37) % 900) + 12} KB`,
        owner,
        modified: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')} 10:00`,
        status,
      };
    }),
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

  .name-cell {
    display: block;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .status-badge {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
  }

  .status-ready {
    background-color: #e8f5e9;
  }

  .status-draft {
    background-color: #fff8e1;
  }

  .status-review {
    background-color: #e3f2fd;
  }
</style>
