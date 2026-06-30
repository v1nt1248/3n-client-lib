<script setup lang="ts">
import { ref } from 'vue';
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';

interface FormData {
  name: string;
  email: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
});

const isValid = ref(false);

function onInput() {
  isValid.value = formData.value.name.trim().length > 0 && formData.value.email.trim().length > 0;
}
</script>

<template>
  <ui3n-dialog
    title="Dialog with Data"
    confirm-button-text="Submit"
    cancel-button-text="Cancel"
    :data="formData"
    :is-valid="isValid"
    width="400"
    @action="(val) => console.log('Action:', val)"
  >
    <template #body>
      <div class="dialog-body">
        <p>Fill in the form below. The confirm button is disabled until both fields are filled.</p>

        <div class="form-field">
          <label>Name</label>
          <ui3n-input
            v-model="formData.name"
            placeholder="Enter your name"
            @input="onInput"
          />
        </div>

        <div class="form-field">
          <label>Email</label>
          <ui3n-input
            v-model="formData.email"
            placeholder="Enter your email"
            @input="onInput"
          />
        </div>
      </div>
    </template>
  </ui3n-dialog>
</template>

<style scoped>
  .dialog-body {
    padding: 24px 16px;
    font-size: 14px;
    color: var(--color-text-block-primary-default);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-field label {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-control-secondary-default);
  }
</style>