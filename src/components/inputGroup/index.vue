<template>
  <div class="input-group">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  margin: 5px 0;

  .input-wrapper {
    max-height: 50px !important;
  }
}
</style>
