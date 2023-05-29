<template>
  <div class="header">
    <img :src="banner" alt="Imagem" class="header-image" />
    <sidebar-menu />
    <div class="container">
      <h1>
        Titulo
      </h1>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '../sidebar/Sidebar.vue'
import Banner from '../../../assets/banner-header.png'

export default {
  name: 'Header',
  components: {
    SidebarMenu
  },
  data() {
    return {
      banner: Banner
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
