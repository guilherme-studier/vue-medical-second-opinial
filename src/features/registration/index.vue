<template>
  <div id="registration" v-loading="isLoading">
    <registration-data />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RegistrationData from '../registration/components/RegistrationData'

export default {
  name: 'Registration',
  components: {
    RegistrationData
  },
  computed: {
    ...mapGetters('registration', ['getLoadingRegistration']),
    ...mapGetters('user', ['getLoadingUser']),

    isLoading() {
      return this.getLoadingRegistration || this.getLoadingUser
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
