<template>
  <div id="subtitle">
    <img :src="icon" alt="icon" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Subtitle',
  props: {
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
#subtitle {
  background-color: #eee;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  padding: 10px;

  p {
    font-size: 12px;
  }

  img {
    margin-right: 10px;
    width: 15px;
  }
}
</style>
