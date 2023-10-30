<template>
  <div
    id="consultant-doctor-invitation"
    :class="{ 'form-loading': getLoading }"
  >
    <consultant-doctor-invitation-form />
    <loader-spinner v-if="getLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ConsultantDoctorInvitationForm from './components/ConsultantDoctorInvitationForm.vue'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'ConsultantDoctorInvitation',
  components: {
    ConsultantDoctorInvitationForm,
    LoaderSpinner
  },
  computed: {
    ...mapGetters('consultantDoctorInvitation', ['getLoading'])
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
