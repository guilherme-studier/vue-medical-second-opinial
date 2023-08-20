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
  async created() {
    this.fetchTokenStatus()
  },
  watch: {
    $route() {
      this.fetchTokenStatus()
    }
  },
  methods: {
    ...mapActions(['setAuthToken']),
    ...mapActions('user', ['requestUserData']),
    ...mapActions('login', ['validateToken']),

    fetchTokenStatus() {
      this.validateToken()
    }
  }
}
</script>
