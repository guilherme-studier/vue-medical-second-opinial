<template>
  <div class="app-container" :class="{ 'reduced-opacity': getLoading }">
    <!-- MENU LATERAL -->
    <sidebar-menu v-if="$route.name !== 'Login'" />

    <!-- ROTAS -->
    <router-view />
    <loader-spinner v-if="getLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SidebarMenu from './features/menu/sidebar'

import LoaderSpinner from '@/components/loaderSpinner'

import '@/assets/scss/global.scss'

export default {
  name: 'App',

  components: {
    SidebarMenu,
    LoaderSpinner
  },

  metaInfo: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      }
    ]
  },

  watch: {
    $route(to) {
      if (this.getIsActiveVoucher && to.path !== '/active-clinical-case') {
        this.handlePageActiveVoucher()
      }
    }
  },

  computed: {
    ...mapGetters(['getIsTokenExpired', 'getLoading']),
    ...mapGetters('clinicalCasesEvaluation', ['getIsActiveVoucher'])
  },

  created() {
    if (this.$store.getters.isLoggedIn) this.fetchTokenStatus()

    if (
      this.getIsActiveVoucher &&
      this.$route.path !== '/active-clinical-case'
    ) {
      this.handlePageActiveVoucher()
    }
  },

  methods: {
    ...mapActions(['validateToken', 'setAuthToken']),
    ...mapActions('clinicalCasesEvaluation', ['handlePageActiveVoucher']),

    fetchTokenStatus() {
      this.validateToken()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.reduced-opacity {
  opacity: 0.6;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
