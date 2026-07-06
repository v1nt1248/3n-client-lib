<template>
  <Ui3nScrollbarVertical class="scrollbar-container">
    <div class="content">
      <p
        v-for="i in 25"
        :key="i"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus nulla quis blandit mattis.
        Phasellus eget mauris diam. Mauris dapibus dictum nibh vel facilisis. Suspendisse eget tristique metus.
        Aenean non leo odio. Nullam ut nisl tempor, tincidunt felis vitae, euismod mauris. Maecenas rutrum lacus id
        pellentesque sodales. Maecenas tempor est non ex auctor, quis luctus eros cursus. Duis id rutrum neque, ac
        venenatis quam.
      </p>
    </div>
  </Ui3nScrollbarVertical>
</template>

<style scoped>
  .scrollbar-container {
    height: 300px;
    width: 100%;
    background-color: var(--color-bg-block-primary-hover);
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: 6px;
  }

  .content {
    padding: 16px;
  }

  .content p {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: var(--color-text-block-primary-default);
    line-height: 1.5;
  }

  .content p:last-child {
    margin-bottom: 0;
  }
</style>
