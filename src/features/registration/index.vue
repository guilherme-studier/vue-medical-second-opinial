<template>
  <div id="registration" :class="{ 'form-loading': isLoading }">
    <registration-data />
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RegistrationData from '../registration/components/RegistrationData'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'Registration',
  components: {
    RegistrationData,
    LoaderSpinner
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
