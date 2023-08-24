<template>
  <div id="layout">
    <Header />
    <main class="container">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/features/menu/footer/Footer'
import Header from '@/features/menu/header/Header'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
