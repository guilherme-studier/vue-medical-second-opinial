<template>
  <div id="adm-clinical-cases">
    <adm-clinical-cases-table />
    <admClinical-cases-subtitle />
  </div>
</template>

<script>
import AdmClinicalCasesSubtitle from './components/AdmClinicalCasesSubtitle.vue'
import AdmClinicalCasesTable from './components/AdmClinicalCasesTable.vue'

export default {
  name: 'AdmClinicalCases',
  components: {
    AdmClinicalCasesTable,
    AdmClinicalCasesSubtitle
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
