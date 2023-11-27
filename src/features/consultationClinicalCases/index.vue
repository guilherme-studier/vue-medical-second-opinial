<template>
  <div id="consultation-clinical-cases" :class="{ 'form-loading': isLoading }">
    <consultation-clinical-cases-table />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ConsultationClinicalCasesTable from './components/ConsultationClinicalCasesTable.vue'

export default {
  name: 'Consulta Contratos Clínicos',
  components: {
    ConsultationClinicalCasesTable
  },
  computed: {
    ...mapGetters('consultationClinicalCases', ['getLoadingContracts']),
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    isLoading() {
      return (
        this.getLoadingSpecialtys ||
        this.getLoadingDiseases ||
        this.getLoadingIndustry ||
        this.getLoadingContracts
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
