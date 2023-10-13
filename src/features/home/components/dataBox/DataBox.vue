<template>
  <div class="data-box">
    <div class="data-title">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="data-quantity">{{ quantity }}</div>
  </div>
</template>

<script>
export default {
  name: 'DataBox',
  props: {
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
</style>
