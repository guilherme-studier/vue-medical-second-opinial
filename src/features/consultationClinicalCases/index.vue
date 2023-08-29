<template>
  <div id="consultation-clinical-cases">
    <consultation-clinical-cases-table />
  </div>
</template>

<script>
import ConsultationClinicalCasesTable from './components/ConsultationClinicalCasesTable.vue'

export default {
  name: 'Consulta Casos Clínicos',
  components: {
    ConsultationClinicalCasesTable
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
