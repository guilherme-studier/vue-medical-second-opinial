<template>
  <div id="clinical-cases-client-doctor" :class="{ 'form-loading': isLoading }">
    <clinical-cases-evaluation-table />
    <clinical-cases-evaluation-subtitle />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesEvaluationTable from './components/ClinicalCasesEvaluation.vue'
import ClinicalCasesEvaluationSubtitle from './components/ClinicalCasesEvaluationSubtitle.vue'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    ClinicalCasesEvaluationSubtitle,
    ClinicalCasesEvaluationTable
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getLoadingClinicalCases']),

    isLoading() {
      return this.getLoadingClinicalCases
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
