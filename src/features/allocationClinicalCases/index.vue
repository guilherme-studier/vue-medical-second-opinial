<template>
  <div id="allocation-clinical-cases" v-loading="isLoading">
    <allocation-clinical-cases-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AllocationClinicalCasesForm from './components/AllocationClinicalCasesForm.vue'

export default {
  name: 'AllocationClinicalCases',
  components: {
    AllocationClinicalCasesForm
  },
  computed: {
    ...mapGetters('allocationClinicalCases', [
      'getLoadingAllocationClinicalCase'
    ]),
    ...mapGetters('consultationClinicalCases', ['getLoadingContracts']),

    isLoading() {
      return this.getLoadingAllocationClinicalCase || this.getLoadingContracts
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
