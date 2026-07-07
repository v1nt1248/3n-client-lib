<template>
  <Ui3nTable
    :config="config"
    :head="head"
    :body="body"
  />
</template>

<script setup lang="ts">
  import type { Ui3nTableConfig, Ui3nTableHeadProps, Ui3nTableBodyProps } from '@/components';

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const config: Ui3nTableConfig<User> = {
    tableName: 'users',
  };

  const head: Ui3nTableHeadProps<User>[] = [
    { key: 'id', text: 'ID' },
    { key: 'name', text: 'Name' },
    { key: 'email', text: 'Email' },
    { key: 'role', text: 'Role' },
  ];

  const body: Ui3nTableBodyProps<User> = {
    content: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator' },
    ],
  };
</script>
