<script setup lang="ts">
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nButton from '../components/ui3n-button/ui3n-button.vue';
</script>

<template>
  <demo-layout title="Ui3nButton">
    <div class="ui3n-button-demo__body">
      <!-- PRIMARY  -->
      <demo-layout-cell label="Primary, small">
        <ui3n-button
          size="small"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, regular">
        <ui3n-button @enter="ev => console.log('ENTER ON BUTTON: ', ev)"> Primary </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, regular, square">
        <ui3n-button
          square
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, regular, with icon left">
        <ui3n-button
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
          icon="outline-wb-sunny"
          icon-position="left"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, regular, block">
        <ui3n-button
          block
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, regular, disabled">
        <ui3n-button
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, large">
        <ui3n-button
          size="large"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <!-- SECONDARY -->
      <demo-layout-cell label="Secondary, small">
        <ui3n-button
          type="secondary"
          size="small"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, regular">
        <ui3n-button
          type="secondary"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, regular, square">
        <ui3n-button
          type="secondary"
          square
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, regular, with icon left">
        <ui3n-button
          type="secondary"
          icon="outline-wb-sunny"
          icon-position="left"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, regular, block">
        <ui3n-button
          type="secondary"
          block
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, regular, disabled">
        <ui3n-button
          type="secondary"
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, large">
        <ui3n-button
          type="secondary"
          size="large"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <!-- TERTIARY -->
      <demo-layout-cell label="Tertiary, small">
        <ui3n-button
          type="tertiary"
          size="small"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, regular">
        <ui3n-button
          type="tertiary"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, regular, square">
        <ui3n-button
          type="tertiary"
          square
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, regular, with icon right">
        <ui3n-button
          type="tertiary"
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, regular, block">
        <ui3n-button
          type="tertiary"
          block
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, regular, disabled">
        <ui3n-button
          type="tertiary"
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, large">
        <ui3n-button
          type="tertiary"
          size="large"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <!-- OUTLINE -->
      <demo-layout-cell label="Outline, small">
        <ui3n-button
          type="outline"
          size="small"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, regular">
        <ui3n-button
          type="outline"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, regular, square">
        <ui3n-button
          type="outline"
          square
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, regular, with icon left">
        <ui3n-button
          type="outline"
          icon="outline-wb-sunny"
          icon-position="left"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, regular, block">
        <ui3n-button
          type="outline"
          block
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, regular, disabled">
        <ui3n-button
          type="outline"
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Outline, large">
        <ui3n-button
          type="outline"
          size="large"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Outline
        </ui3n-button>
      </demo-layout-cell>

      <!-- ICON -->
      <demo-layout-cell label="Icon, small">
        <ui3n-button
          type="icon"
          size="small"
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, regular">
        <ui3n-button
          type="icon"
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, regular, square">
        <ui3n-button
          type="icon"
          square
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, regular, disabled">
        <ui3n-button
          type="icon"
          icon="outline-wb-sunny"
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, large">
        <ui3n-button
          type="icon"
          size="large"
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, large, not default background color">
        <ui3n-button
          type="icon"
          size="large"
          color="#ff8800"
          icon="outline-wb-sunny"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <demo-layout-cell label="Icon, large, not default background and icon colors">
        <ui3n-button
          type="icon"
          size="large"
          color="#ffc000"
          icon="outline-wb-sunny"
          icon-color="#006400"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        />
      </demo-layout-cell>

      <!-- CUSTOM -->
      <demo-layout-cell label="Custom, small">
        <ui3n-button
          type="custom"
          size="small"
          color="darkblue"
          text-color="#ffc000"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, regular">
        <ui3n-button
          type="custom"
          color="darkblue"
          text-color="#ffc000"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, regular, square">
        <ui3n-button
          type="custom"
          square
          color="darkblue"
          text-color="#ffc000"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, regular, with icon left">
        <ui3n-button
          type="custom"
          icon="outline-wb-sunny"
          icon-position="left"
          color="blue"
          text-color="#ffc000"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, regular, block">
        <ui3n-button
          type="custom"
          block
          color="blue"
          text-color="#ffc000"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, regular, disabled">
        <ui3n-button
          type="custom"
          color="blue"
          text-color="#ffc000"
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Custom, large">
        <ui3n-button
          type="custom"
          size="large"
          color="red"
          text-color="yellow"
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Custom
        </ui3n-button>
      </demo-layout-cell>

      <div class="ui3n-button-demo__body-row">--- BUTTONS WITH ELEVATION (new design) ---</div>

      <demo-layout-cell label="Primary, large, elevation">
        <ui3n-button
          size="large"
          elevation
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Primary, large, elevation, disabled">
        <ui3n-button
          size="large"
          elevation
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Primary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, large, elevation">
        <ui3n-button
          type="secondary"
          size="large"
          elevation
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Secondary, large, elevation, disabled">
        <ui3n-button
          type="secondary"
          size="large"
          elevation
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Secondary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, large, elevation">
        <ui3n-button
          type="tertiary"
          size="large"
          elevation
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>

      <demo-layout-cell label="Tertiary, large, elevation, disabled">
        <ui3n-button
          type="tertiary"
          size="large"
          elevation
          disabled
          @enter="ev => console.log('ENTER ON BUTTON: ', ev)"
        >
          Tertiary
        </ui3n-button>
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss">
  .ui3n-button-demo__body {
    display: grid;
    grid-template-columns: repeat(7, 150px);
    gap: 16px 8px;
  }

  .ui3n-button-demo__body-row {
    grid-column: 1 / -1;
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
  }
</style>
