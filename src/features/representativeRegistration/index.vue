<template>
  <div id="representative-registration" v-loading="isLoading">
    <representative-registration-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RepresentativeRegistrationForm from './components/RepresentativeRegistrationForm.vue'

export default {
  name: 'RepresentativeRegistration',
  components: {
    RepresentativeRegistrationForm
  },
  computed: {
    ...mapGetters('user', ['getLoadingUser']),
    ...mapGetters('representativeRegistration', ['getLoadingRepresentative']),

    isLoading() {
      return this.getLoadingUser || this.getLoadingRepresentative
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
