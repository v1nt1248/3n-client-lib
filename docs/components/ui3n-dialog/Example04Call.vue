<script setup lang="ts">
  import { getCurrentInstance, ref } from 'vue';
  import Example04Dialog from './Example04.vue';

  const app = getCurrentInstance();
  const openDialog = app?.appContext.config.globalProperties.$dialog.$openDialog;

  const userProfile = ref({ name: '', email: '' });

  async function handleOpen() {
    if (!openDialog) {
      console.error('Plugin method $openDialog not found!');
      return;
    }

    const result = await openDialog(Example04Dialog, {
      data: { name: userProfile.value.name, email: userProfile.value.email },
      dialogProps: {
        title: 'Edit Profile Form',
        confirmButtonText: 'Save Changes',
        cancelButtonText: 'Cancel',
        width: 400,
      },
    });

    if (result.event === 'confirm' && result.data) {
      userProfile.value = result.data;
    }
  }
</script>

<template>
  <ClientOnly>
    <div class="demo-container">
      <Ui3nButton
        type="primary"
        @click="handleOpen"
      >
        Open Form Dialog (Promise Data)
      </Ui3nButton>

      <div
        v-if="userProfile.name"
        class="profile-preview"
      >
        Saved: <strong>{{ userProfile.name }}</strong> ({{ userProfile.email }})
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .profile-preview {
    font-size: 12px;
    padding: 8px 12px;
    background: var(--color-bg-block-darkery-default);
    border-radius: 4px;
    color: var(--color-text-block-secondary-default);
  }
</style>
