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
  border-radius: 5px;
  display: flex;
  background-color: $gray-500;
  align-items: center;
  text-align: left;
  border: 1px solid $green-500;
  box-sizing: border-box;

  p {
    padding: 10px 20px;
  }
}

.input-block-title {
  font-weight: bold;
  color: $white;
  background-color: $green-500;
}

.input-block-content {
  font-weight: 500;
}
</style>
