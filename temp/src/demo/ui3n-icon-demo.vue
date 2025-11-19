<script setup lang="ts">
  import { computed, ref } from 'vue';
  import DemoLayout from './demo-layout.vue';
  import Ui3nIcon from '../components/ui3n-icon/ui3n-icon.vue';
  import Ui3nButton from '../components/ui3n-button/ui3n-button.vue';
  import { iconList } from '@/demo/constants';

  const randomIcon = ref('');
  const iconListSize = computed(() => iconList.length);

  function showRandomButton() {
    const iconIndex = Math.round(Math.random() * iconListSize.value);
    randomIcon.value = iconList[iconIndex];
    console.log('NEW RANDOM ICON = ', randomIcon.value);
  }
</script>

<template>
  <demo-layout title="Ui3nIcon">
    <div>
      <div class="ui3n-icon-demo">
        <div
          v-for="icon in iconList.sort()"
          :key="icon"
          class="ui3n-icon-demo__item"
        >
          <ui3n-icon
            :icon="icon"
            width="64"
            height="64"
          />
          <span>{{ icon }}</span>
        </div>
      </div>

      <div :class="$style.block">
        <ui3n-button @click="showRandomButton">
          Show random icon
        </ui3n-button>

        <ui3n-icon
          v-if="randomIcon"
          :icon="randomIcon"
          size="48"
        />
      </div>
    </div>
  </demo-layout>
</template>

<style lang="scss">
  .ui3n-icon-demo {
    position: relative;
    padding-top: 32px;
    display: grid;
    gap: var(--spacing-m);
    grid-template-columns: repeat(8, 96px);
    margin-bottom: 32px;

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: var(--spacing-s);
      font-size: var(--font-12);
      color: var(--color-icon-control-secondary-default);

      span {
        text-align: center;
      }
    }
  }
</style>

<style lang="scss" module>
  .block {
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: flex-start;
    align-items: center;
    column-gap: 24px;
  }
</style>
