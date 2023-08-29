<template>
  <div id="medical-registration">
    <consultant-medical-registration-form />
  </div>
</template>

<script>
import ConsultantMedicalRegistrationForm from '../consultantMedicalRegistration/components/ConsultantMedicalRegistrationForm'

export default {
  name: 'ConsultantMedicalRegistration',
  components: {
    ConsultantMedicalRegistrationForm
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
