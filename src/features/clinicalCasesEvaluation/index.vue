<template>
  <div>
    <clinical-cases-evaluation-table />
    <clinical-cases-evaluation-subtitle />
  </div>
</template>

<script>
import ClinicalCasesEvaluationTable from './components/ClinicalCasesEvaluation.vue'
import ClinicalCasesEvaluationSubtitle from './components/ClinicalCasesEvaluationSubtitle.vue'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    ClinicalCasesEvaluationTable,
    ClinicalCasesEvaluationSubtitle
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
