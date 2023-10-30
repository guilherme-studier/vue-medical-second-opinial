<template>
  <div id="allocation-clinical-cases" :class="{ 'form-loading': isLoading }">
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

    isLoading() {
      return this.getLoadingAllocationClinicalCase
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
