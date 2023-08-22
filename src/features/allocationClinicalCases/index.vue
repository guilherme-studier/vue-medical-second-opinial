<template>
  <div id="allocation-clinical-cases">
    <allocation-clinical-cases-form />
  </div>
</template>

<script>
import AllocationClinicalCasesForm from './components/AllocationClinicalCasesForm.vue'

export default {
  name: 'AllocationClinicalCases',
  components: {
    AllocationClinicalCasesForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
