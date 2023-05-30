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

  input {
    background: red;
  }
}
</style>
