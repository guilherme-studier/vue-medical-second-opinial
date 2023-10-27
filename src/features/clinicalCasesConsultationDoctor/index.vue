<template>
  <div :class="{ 'form-loading': getLoadingClinicalCases }">
    <clinical-cases-consultation-doctor-table />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesConsultationDoctorTable from './components/ClinicalCasesConsultationDoctor.vue'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    ClinicalCasesConsultationDoctorTable
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getError',
      'getLoadingClinicalCases'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
