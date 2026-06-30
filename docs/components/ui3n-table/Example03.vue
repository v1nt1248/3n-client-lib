<template>
  <div>
    <Ui3nTable
      ref="tableRef"
      :config="config"
      :head="head"
      :body="body"
      @select:row="onRowSelect"
    >
      <template #group-actions="{ selectedRows }">
        <div class="group-actions">
          <span>Selected: {{ selectedRows.length }}</span>
          <Ui3nButton
            size="small"
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

interface Order {
  id: number;
  customer: string;
  amount: number;
  status: string;
}

const tableRef = ref();

const config: Ui3nTableConfig<Order> = {
  tableName: 'orders',
  selectable: 'multiple',
  fieldAsRowKey: 'id',
};

const head: Ui3nTableHeadProps<Order>[] = [
  { key: 'id', text: 'Order ID' },
  { key: 'customer', text: 'Customer' },
  { key: 'amount', text: 'Amount' },
  { key: 'status', text: 'Status' },
];

const body: Ui3nTableBodyProps<Order> = {
  content: [
    { id: 1001, customer: 'John Doe', amount: 150, status: 'Pending' },
    { id: 1002, customer: 'Jane Smith', amount: 280, status: 'Completed' },
    { id: 1003, customer: 'Bob Johnson', amount: 95, status: 'Shipped' },
    { id: 1004, customer: 'Alice Brown', amount: 420, status: 'Pending' },
  ],
};

const onRowSelect = (rows: Order[]) => {
  console.log('Selected rows:', rows);
};

const deleteSelected = (rows: Order[]) => {
  console.log('Deleting:', rows);
  tableRef.value?.clear();
};
</script>

<style scoped>
.group-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
}
</style>