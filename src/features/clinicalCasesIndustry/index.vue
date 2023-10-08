<template>
  <div>
    <template v-if="!getLoading && !getError">
      <clinical-cases-industry-table />
    </template>
    <loader-spinner v-if="getLoading" />
    <base-error v-if="getError" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesIndustryTable from './components/ClinicalCasesIndustry.vue'

import BaseError from '@/components/baseError'
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'ClinicalCasesIndustry',
  components: {
    ClinicalCasesIndustryTable,
    LoaderSpinner,
    BaseError
  },
  computed: {
    ...mapGetters('clinicalCasesIndustry', ['getError', 'getLoading'])
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
