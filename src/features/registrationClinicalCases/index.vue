<template>
  <div id="registration-clinical-cases">
    <registration-clinical-cases-data />
  </div>
</template>

<script>
import RegistrationClinicalCasesData from '../registrationClinicalCases/components/RegistrationClinicalCasesData.vue'

export default {
  name: 'RegistrationClinicalCases',
  components: {
    RegistrationClinicalCasesData
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
