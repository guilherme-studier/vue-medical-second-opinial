<template>
  <div class="data-box">
    <div class="data-title">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="data-quantity">
      <p class="quantity">{{ quantity }}</p>
    </div>
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
$data-box-max-width: 350.31px;
$data-title-height: 3.83rem;
$data-quantity-height: 5.02rem;
$data-quantity-font-size: 50.11px;

.data-box {
  grid-template-rows: $data-title-height 1fr $data-quantity-height;
  max-width: $data-box-max-width;
  text-align: center;
  display: grid;
  width: 100%;
  grid-gap: 0;

  .data-title {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    justify-content: center;
    align-items: center;
    color: $white;
    display: flex;
    background: $green-500;
    height: $data-title-height;
  }

  .data-quantity {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    background: $gray-500;
    color: $green-500;
    font-size: $data-quantity-font-size;
    height: $data-quantity-height;
  }
}
</style>
