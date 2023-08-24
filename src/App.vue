<template>
  <div class="app-container">
    <!-- MENU LATERAL -->
    <sidebar-menu v-if="$route.name !== 'Login'" />

    <!-- ROTAS -->
    <router-view />
  </div>
</template>

<script>
import SidebarMenu from './features/menu/sidebar'

import '@/assets/scss/global.scss'
import { mapActions, mapGetters, mapState } from 'vuex'

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

  computed: {
    ...mapState('consultantDoctorInvitation', ['cpf']),
    ...mapGetters(['getIsTokenExpired'])
  },

  created() {
    this.fetchTokenStatus()
  },

  methods: {
    ...mapActions('user', ['requestUserData']),
    ...mapActions(['validateToken', 'setAuthToken']),

    fetchTokenStatus() {
      const currentRoute = this.$route.path

      if (!currentRoute === '/login') this.validateToken()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}
</style>
