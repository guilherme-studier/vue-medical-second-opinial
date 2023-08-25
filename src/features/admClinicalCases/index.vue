<template>
  <div>
    <adm-clinical-cases-table />
  </div>
</template>

<script>
import AdmClinicalCasesTable from './components/AdmClinicalCasesTable.vue'

export default {
  name: 'AdmClinicalCases',
  components: {
    AdmClinicalCasesTable
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
