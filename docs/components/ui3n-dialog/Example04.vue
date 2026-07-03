<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
  import type { Ui3nDialogEvent, Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

  interface UserForm {
    name: string;
    email: string;
  }

  const props = defineProps<{
    data: UserForm;
    dialogProps?: Ui3nDialogComponentProps<UserForm>;
  }>();

  const emits = defineEmits<{
    (event: 'action', value: { event: Ui3nDialogEvent; data?: UserForm }): void;
  }>();

  const localForm = ref<UserForm>({ ...props.data });
  const isValid = ref(false);

  function onInput() {
    isValid.value = localForm.value.name.trim().length > 0 && localForm.value.email.trim().length > 0;
  }
</script>

<template>
  <ui3n-dialog
    v-bind="dialogProps"
    :is-valid="isValid"
    @action="
      eventDetail => {
        if (eventDetail.event === 'confirm') {
          emits('action', { event: 'confirm', data: localForm });
        } else {
          emits('action', { event: eventDetail.event });
        }
      }
    "
  >
    <template #body>
      <div class="dialog-body">
        <p>The submit button is disabled until both fields are filled.</p>

        <div class="form-field">
          <label>Profile Name</label>
          <ui3n-input
            v-model="localForm.name"
            placeholder="Enter name"
            @input="onInput"
          />
        </div>

        <div class="form-field">
          <label>Email Address</label>
          <ui3n-input
            v-model="localForm.email"
            placeholder="Enter email"
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
