<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';

  const value = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Ui3nInput
      v-model="value"
      label="With prepend icon"
      placeholder="Search..."
    >
      <template #prepend-icon>
        <Ui3nIcon
          icon="round-search"
          :size="16"
        />
      </template>
    </Ui3nInput>

    <Ui3nInput
      v-model="value"
      label="With append icon"
      placeholder="Email..."
    >
      <template #append-icon>
        <Ui3nIcon
          icon="round-mail"
          :size="16"
        />
      </template>
    </Ui3nInput>

    <Ui3nInput
      v-model="value"
      label="With both icons"
      placeholder="Search..."
    >
      <template #prepend-icon>
        <Ui3nIcon
          icon="round-search"
          :size="16"
        />
      </template>
      <template #append-icon>
        <Ui3nIcon
          icon="grid-view-line"
          :size="16"
        />
      </template>
    </Ui3nInput>
  </div>
</template>
