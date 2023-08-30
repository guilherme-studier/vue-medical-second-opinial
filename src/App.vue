<template>
  <div class="app-container" :class="{ 'reduced-opacity': getLoading }">
    <div :class="{ 'reduced-opacity': getLoading }">
      <!-- Your content here -->
    </div>
    <!-- MENU LATERAL -->
    <sidebar-menu v-if="$route.name !== 'Login'" />

    <!-- ROTAS -->
    <router-view />

    <div v-if="getLoading">
      <loader-spinner />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

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

  computed: {
    ...mapGetters(['getIsTokenExpired', 'getLoading']),
    ...mapState('consultantDoctorInvitation', ['cpf'])
  },

  created() {
    if (this.$store.getters.isLoggedIn) this.fetchTokenStatus()
  },

  methods: {
    ...mapActions('user', ['requestUserData']),
    ...mapActions(['validateToken', 'setAuthToken']),

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
</style>
