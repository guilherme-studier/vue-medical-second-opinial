<template>
  <div class="content-title">
    <h1 class="title">{{ title }}</h1>
    <span class="line"></span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.content-title {
  flex-direction: column;
  align-items: center;
  text-align: center;
  display: flex;

  .title {
    color: $green-500;
  }

  .line {
    background-color: $green-500;
    margin-top: 15px;
    bottom: -15px;
    width: 60px;
    height: 5px;
  }
}
</style>
