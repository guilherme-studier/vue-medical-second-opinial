<template>
  <div id="medical-registration">
    <doctor-registration />
    <registration-data />
    <specialty />
    <data-payments />
    <save />
  </div>
</template>

<script>
// components
import DoctorRegistration from '../consultantMedicalRegistration/components/DoctorRegistration'
import RegistrationData from '../consultantMedicalRegistration/components/RegistrationData'
import DataPayments from '../consultantMedicalRegistration/components/DataPayments'
import Specialty from '../consultantMedicalRegistration/components/Specialty'
import Save from '../consultantMedicalRegistration/components/Save'

export default {
  name: 'IndustryRegistration',
  components: {
    DoctorRegistration,
    RegistrationData,
    DataPayments,
    Specialty,
    Save
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
