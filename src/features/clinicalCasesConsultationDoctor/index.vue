<template>
  <div
    id="clinical-cases-consultation-doctor"
    :class="{ 'form-loading': getLoadingClinicalCases }"
  >
    <clinical-cases-consultation-doctor-table />
    <clinical-cases-consultation-doctor-subtitle />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesConsultationDoctorTable from './components/ClinicalCasesConsultationDoctor.vue'
import ClinicalCasesConsultationDoctorSubtitle from './components/ClinicalCasesConsultationDoctorSubtitle.vue'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    ClinicalCasesConsultationDoctorTable,
    ClinicalCasesConsultationDoctorSubtitle
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getError',
      'getLoadingClinicalCases'
    ]),

    isLoading() {
      return this.getLoadingClinicalCases
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
