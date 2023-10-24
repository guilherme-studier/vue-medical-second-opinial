<template>
  <div id="industry-representant-man" :class="{ 'form-loading': isLoading }">
    <authorized-distribute-clinical-case-form />
    <industry-representant-man-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AuthorizedDistributeClinicalCaseForm from './components/AuthorizedDistributeClinicalCaseForm.vue'
import IndustryRepresentantManForm from './components/IndustryRepresentantManForm.vue'

export default {
  name: 'IndustryRepresentantMan',
  components: {
    AuthorizedDistributeClinicalCaseForm,
    IndustryRepresentantManForm
  },
  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),
    ...mapGetters('industryRepresentantMan', [
      'getLoadingRepresentantIndustry'
    ]),
    isLoading() {
      return this.getLoadingIndustry || this.getLoadingRepresentantIndustry
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
