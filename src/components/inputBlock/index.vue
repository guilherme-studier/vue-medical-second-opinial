<template>
  <div class="input-block">
    <p class="input-block-title">{{ title }}</p>
    <p class="input-block-content">{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  }
}
</script>

<style lang="scss" scoped>
.input-block {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  box-sizing: border-box;

  p {
    padding: 10px 20px;
  }
}

.input-block-title {
  font-weight: bold;
  color: $white;
  background-color: $green-500;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid $green-500;
  display: flex;
  white-space: nowrap;
}

.input-block-content {
  border-top-right-radius: 8px;
  border: 1px solid $green-500;
  border-bottom-right-radius: 8px;
  background-color: $gray-500;
  font-weight: 500;
  width: 100%;
}
</style>
