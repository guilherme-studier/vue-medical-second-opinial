<template>
  <div id="consultant-doctor-invitation">
    <consultant-doctor-invitation-form />
  </div>
</template>

<script>
import ConsultantDoctorInvitationForm from './components/ConsultantDoctorInvitationForm.vue'

export default {
  name: 'ConsultantDoctorInvitation',
  components: {
    ConsultantDoctorInvitationForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
