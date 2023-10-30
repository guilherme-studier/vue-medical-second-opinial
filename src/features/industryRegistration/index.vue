<template>
  <div id="industry-registration" :class="{ 'form-loading': isLoading }">
    <industry-registration-form />
    <loader-spinner v-if="getLoadingIndustry" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import IndustryRegistrationForm from '../industryRegistration/components/IndustryRegistrationForm'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'Industry Registration',
  components: {
    IndustryRegistrationForm,
    LoaderSpinner
  },
  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),

    isLoading() {
      return this.getLoadingIndustry
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
