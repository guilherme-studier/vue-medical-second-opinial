<template>
  <div class="header">
    <img :src="banner" alt="Imagem" class="header-image" />

    <div class="container">
      <h1>
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
import Banner from '../../../assets/ceos-header.png'

export default {
  name: 'Header',

  data() {
    return {
      banner: Banner
    }
  },

  computed: {
    title() {
      return this.$route?.meta?.title
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  .header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 250px;
    object-fit: cover;
    position: relative;
    z-index: inherit;
  }

  .container {
    h1 {
      position: absolute;
      bottom: 35px;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      color: $green-500;
    }

    @media (min-width: 700px) and (max-width: 1100px) {
      main {
        margin-left: 98px;
      }
    }
  }
}
</style>
