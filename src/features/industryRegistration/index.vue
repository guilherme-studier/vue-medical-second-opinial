<template>
  <div id="industry-registration" v-loading="isLoading">
    <industry-registration-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import IndustryRegistrationForm from '../industryRegistration/components/IndustryRegistrationForm'

export default {
  name: 'Industry Registration',
  components: {
    IndustryRegistrationForm
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
