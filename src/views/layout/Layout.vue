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
import Header from '@/components/menu/header/Header'
import Footer from '@/components/menu/footer/Footer'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding-top: 30px;
  flex-grow: 1;
  display: flex;
}

@media (min-width: 700px) and (max-width: 1100px) {
  main {
    margin-left: 98px;
  }
}
</style>
