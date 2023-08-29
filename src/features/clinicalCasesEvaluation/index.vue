<template>
  <div>
    <template v-if="!getLoading && !getError">
      <clinical-cases-evaluation-table />
      <clinical-cases-evaluation-subtitle />
    </template>
    <loader-spinner v-if="getLoading" />
    <base-error v-if="getError" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesEvaluationTable from './components/ClinicalCasesEvaluation.vue'
import ClinicalCasesEvaluationSubtitle from './components/ClinicalCasesEvaluationSubtitle.vue'

import BaseError from '@/components/baseError'
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    ClinicalCasesEvaluationSubtitle,
    ClinicalCasesEvaluationTable,
    LoaderSpinner,
    BaseError
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getError', 'getLoading'])
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
