<template>
  <div v-loading="isLoading">
    <template v-if="!isLoading && !getError">
      <clinical-cases-industry-table />
    </template>
    <base-error v-if="getError" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesIndustryTable from './components/ClinicalCasesIndustry.vue'

import BaseError from '@/components/baseError'

export default {
  name: 'ClinicalCasesIndustry',
  components: {
    ClinicalCasesIndustryTable,
    BaseError
  },
  computed: {
    ...mapGetters('clinicalCasesIndustry', ['getError', 'getLoading']),

    isLoading() {
      return this.getLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
