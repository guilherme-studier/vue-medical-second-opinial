<template>
  <div class="app-container" v-loading="isLoading">
    <!-- MENU LATERAL -->
    <sidebar-menu v-if="shouldDisplaySidebar" />

    <!-- ROTAS -->
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SidebarMenu from './features/menu/sidebar'

import '@/assets/scss/global.scss'

export default {
  name: 'App',

  components: {
    SidebarMenu
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
        this.handleActiveVoucher()
      }
    }
  },

  computed: {
    ...mapGetters(['getIsTokenExpired', 'getLoading']),
    ...mapGetters('clinicalCasesEvaluation', [
      'getIsActiveVoucher',
      'getLoadingActiveVoucher'
    ]),

    isLoading() {
      return this.getLoading || this.getLoadingActiveVoucher
    },

    shouldDisplaySidebar() {
      const excludedRoutes = ['Login', 'Médico Cliente - Login']
      return !excludedRoutes.includes(this.$route.name)
    }
  },

  created() {
    if (this.$store.getters.isLoggedIn) this.fetchTokenStatus()

    if (
      this.getIsActiveVoucher &&
      this.$route.path !== '/active-clinical-case'
    ) {
      this.handleActiveVoucher()
    }
  },

  methods: {
    ...mapActions(['validateToken']),
    ...mapActions('clinicalCasesEvaluation', ['handleActiveVoucher']),

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
