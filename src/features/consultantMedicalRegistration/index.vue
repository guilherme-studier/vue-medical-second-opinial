<template>
  <div id="medical-registration" :class="{ 'form-loading': isLoading }">
    <consultant-medical-registration-form />
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ConsultantMedicalRegistrationForm from '../consultantMedicalRegistration/components/ConsultantMedicalRegistrationForm'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'ConsultantMedicalRegistration',
  components: {
    ConsultantMedicalRegistrationForm,
    LoaderSpinner
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
