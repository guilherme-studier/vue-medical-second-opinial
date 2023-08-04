<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/scss/global.scss'
import { mapActions, mapGetters, mapState } from 'vuex'
import { getCurrentUserAccess } from '@/helpers/auth'

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
    /** Pega do cookie o token de autenticação */
    const token = getCurrentUserAccess()
    if (token) {
      this.setAuthToken(token)
      this.requestUserData()
    }
  },
  methods: {
    ...mapActions(['setAuthToken']),
    ...mapActions('user', ['requestUserData'])
  }
}
</script>
