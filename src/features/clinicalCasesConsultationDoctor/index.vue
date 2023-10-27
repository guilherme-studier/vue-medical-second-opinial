<template>
  <div>
    <template v-if="!getLoadingClinicalCases && !getError">
      <clinical-cases-consultation-doctor-table />
    </template>
    <base-error v-if="getError" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesConsultationDoctorTable from './components/ClinicalCasesConsultationDoctor.vue'

import BaseError from '@/components/baseError'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    ClinicalCasesConsultationDoctorTable,
    BaseError
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
