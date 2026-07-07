<template>
  <div class="tooltip-container">
    <div class="row">
      <Ui3nTooltip
        content="Top tooltip"
        placement="top"
      >
        <Ui3nButton>Top</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Bottom tooltip"
        placement="bottom"
      >
        <Ui3nButton>Bottom</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Left tooltip"
        placement="left"
      >
        <Ui3nButton>Left</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Right tooltip"
        placement="right"
      >
        <Ui3nButton>Right</Ui3nButton>
      </Ui3nTooltip>
    </div>

    <div class="row">
      <Ui3nTooltip
        content="Top start"
        placement="top-start"
      >
        <Ui3nButton>Top Start</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Top end"
        placement="top-end"
      >
        <Ui3nButton>Top End</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Bottom start"
        placement="bottom-start"
      >
        <Ui3nButton>Bottom Start</Ui3nButton>
      </Ui3nTooltip>

      <Ui3nTooltip
        content="Bottom end"
        placement="bottom-end"
      >
        <Ui3nButton>Bottom End</Ui3nButton>
      </Ui3nTooltip>
    </div>
  </div>
</template>

<style scoped>
  .tooltip-container {
    padding: 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .row {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
</style>
