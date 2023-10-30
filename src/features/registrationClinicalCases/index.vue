<template>
  <div id="registration-clinical-cases" :class="{ 'form-loading': isLoading }">
    <registration-clinical-cases-data />
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RegistrationClinicalCasesData from '../registrationClinicalCases/components/RegistrationClinicalCasesData.vue'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'RegistrationClinicalCases',
  components: {
    RegistrationClinicalCasesData,
    LoaderSpinner
  },
  computed: {
    ...mapGetters('registrationClinicalCases', ['getLoading']),
    ...mapGetters('specialty', ['getLoadingSpecialtys']),
    ...mapGetters('industry', ['getLoadingIndustry']),
    ...mapGetters('disease', ['getLoadingDiseases']),

    isLoading() {
      return (
        this.getLoading ||
        this.getLoadingSpecialtys ||
        this.getLoadingDiseases ||
        this.getLoadingIndustry
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
