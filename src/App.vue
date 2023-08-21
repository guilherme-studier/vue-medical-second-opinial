<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/scss/global.scss'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
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
