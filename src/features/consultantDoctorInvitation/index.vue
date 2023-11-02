<template>
  <div id="consultant-doctor-invitation" v-loading="isLoading">
    <consultant-doctor-invitation-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ConsultantDoctorInvitationForm from './components/ConsultantDoctorInvitationForm.vue'

export default {
  name: 'ConsultantDoctorInvitation',
  components: {
    ConsultantDoctorInvitationForm
  },
  computed: {
    ...mapGetters('consultantDoctorInvitation', ['getLoading']),

    isLoading() {
      return this.getLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
