<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
