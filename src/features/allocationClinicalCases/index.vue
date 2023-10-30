<template>
  <div id="allocation-clinical-cases" :class="{ 'form-loading': isLoading }">
    <allocation-clinical-cases-form />
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AllocationClinicalCasesForm from './components/AllocationClinicalCasesForm.vue'

import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'AllocationClinicalCases',
  components: {
    AllocationClinicalCasesForm,
    LoaderSpinner
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
