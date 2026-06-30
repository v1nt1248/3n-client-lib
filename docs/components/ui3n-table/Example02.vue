<template>
  <Ui3nTable
    :config="config"
    :head="head"
    :body="body"
    @change:sort="onSortChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ui3nTableConfig, Ui3nTableHeadProps, Ui3nTableBodyProps, Ui3nTableSort } from '@/components';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const sort = ref<Ui3nTableSort<Product>>({
  field: 'name',
  direction: 'asc',
});

const config: Ui3nTableConfig<Product> = {
  tableName: 'products',
  sortOrder: sort.value,
};

const head: Ui3nTableHeadProps<Product>[] = [
  { key: 'id', text: 'ID', sortable: true },
  { key: 'name', text: 'Name', sortable: true },
  { key: 'price', text: 'Price', sortable: true },
  { key: 'stock', text: 'Stock', sortable: true },
];

const body: Ui3nTableBodyProps<Product> = {
  content: [
    { id: 1, name: 'Laptop', price: 999, stock: 50 },
    { id: 2, name: 'Mouse', price: 29, stock: 200 },
    { id: 3, name: 'Keyboard', price: 79, stock: 150 },
    { id: 4, name: 'Monitor', price: 399, stock: 30 },
  ],
};

const onSortChange = (newSort: Ui3nTableSort<Product>) => {
  console.log('Sort changed:', newSort);
};
</script>