<template>
  <div>
    <template v-if="!getLoading && !getError">
      <clinical-cases-consultation-doctor-table />
    </template>
    <loader-spinner v-if="getLoading" />
    <base-error v-if="getError" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClinicalCasesConsultationDoctorTable from './components/ClinicalCasesConsultationDoctor.vue'

import BaseError from '@/components/baseError'
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    ClinicalCasesConsultationDoctorTable,
    LoaderSpinner,
    BaseError
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', ['getError', 'getLoading'])
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
