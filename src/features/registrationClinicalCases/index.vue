<template>
  <div id="registration-clinical-cases" v-loading="isLoading">
    <registration-clinical-cases-data />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RegistrationClinicalCasesData from '../registrationClinicalCases/components/RegistrationClinicalCasesData.vue'

export default {
  name: 'RegistrationClinicalCases',
  components: {
    RegistrationClinicalCasesData
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
