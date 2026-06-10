<script setup lang="ts">
  import { ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import Ui3nMobileMenu from '../components/ui3n-mobile-menu/ui3n-mobile-menu.vue';
  import Ui3nMobileMenuItem from '../components/ui3n-mobile-menu-item/ui3n-mobile-menu-item.vue';
  import type { Ui3nMobileMenuItemBase } from '../components/ui3n-mobile-menu-item/types';
  import Ui3nIcon from '../components/ui3n-icon/ui3n-icon.vue';

  const addMenu: Ui3nMobileMenuItemBase[] = Array.from({ length: 40 }, (_, i) => ({
    id: `${i}`,
    name: `Menu Item ${i}`,
    ...(Math.random() * 100 > 50 && { icon: 'app-store' }),
  }));

  const isMenuOpen = ref(false);
  const selectItem = ref<Ui3nMobileMenuItemBase>(addMenu[0]);

  function selectMenuItem(menuItem: Ui3nMobileMenuItemBase) {
    selectItem.value = menuItem;
    isMenuOpen.value = false;
    alert(`Selected menu : ${menuItem}`);
  }

  function checkSelectedMenu(selected: Ui3nMobileMenuItemBase) {
    return selectItem.value && selected.id === selectItem.value.id;
  }
</script>

<template>
  <demo-layout title="Ui3nMobileMenu">
    <ui3n-mobile-menu
      v-model="isMenuOpen"
      width="300px"
      with-blur
    >
      <template #header>
        <div class="userData">
          <ui3n-icon
            icon="round-person"
            color="var(--color-icon-control-accent-default)"
            size="32"
          />

          <div class="info">
            <div class="user">usertest@sample.com <br /></div>

            <div class="status">
              Status:
              <span class="ok">online</span>
            </div>
          </div>
        </div>
      </template>

      <template #menuBody>
        <div class="menuBody">
          <ui3n-mobile-menu-item
            v-for="item in addMenu"
            :key="item.id"
            :item="item"
            :isActive="checkSelectedMenu(item)"
            @select-item="selectMenuItem"
          />
        </div>
      </template>

      <template #footer>
        <div class="footer">-- Sample Footer Content --</div>
      </template>
    </ui3n-mobile-menu>
  </demo-layout>
</template>

<style scoped>
  .userData {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: var(--spacing-s);
    column-gap: var(--spacing-s);
    border-bottom: var(--color-border-block-primary-default) 1px solid;
  }

  .menuBody {
    display: flex;
    width: 100%;
    padding: var(--spacing-s);
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    row-gap: 2px;
  }

  .info {
    position: relative;
    width: calc(100% - 44px);
    color: var(--color-text-control-primary-default);
  }

  .user {
    font-size: var(--font-14);
    font-weight: 700;
    line-height: var(--font-16);
  }

  .status {
    font-size: var(--font-12);
    font-weight: 600;
    line-height: var(--font-14);
  }

  .ok {
    color: var(--success-content-default);
  }

  .footer {
    height: 56px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding: var(--spacing-s);
    border-top: var(--color-border-block-primary-default) 1px solid;
  }
</style>
