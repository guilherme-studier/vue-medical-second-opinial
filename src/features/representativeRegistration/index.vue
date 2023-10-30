<template>
  <div id="representative-registration" :class="{ 'form-loading': isLoading }">
    <representative-registration-form />
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RepresentativeRegistrationForm from './components/RepresentativeRegistrationForm.vue'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'RepresentativeRegistration',
  components: {
    RepresentativeRegistrationForm,
    LoaderSpinner
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
