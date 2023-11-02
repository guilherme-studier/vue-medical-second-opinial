<template>
  <div id="medical-registration" v-loading="isLoading">
    <consultant-medical-registration-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ConsultantMedicalRegistrationForm from '../consultantMedicalRegistration/components/ConsultantMedicalRegistrationForm'

export default {
  name: 'ConsultantMedicalRegistration',
  components: {
    ConsultantMedicalRegistrationForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('specialty', ['getLoadingSpecialtys']),
    ...mapGetters('consultantMedicalRegistration', ['getLoadingConsultant']),

    isLoading() {
      return this.getLoadingConsultant || this.getLoadingSpecialtys
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
