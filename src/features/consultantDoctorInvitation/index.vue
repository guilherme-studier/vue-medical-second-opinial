<template>
  <div id="consultant-doctor-invitation" :class="{ 'form-loading': isLoading }">
    <consultant-doctor-invitation-form />
    <loader-spinner v-if="isLoading" />
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
