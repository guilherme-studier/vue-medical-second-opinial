<template>
  <div id="clinical-cases-industry">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          {{ getName }} <span>possui</span> {{ getVouchers }} caso(s)
          clínicos(s)
        </h1>
      </div>
    </div>

    <custom-table
      :tableHeader="getTableHeader"
      :tableData="getFilteredTableData"
      :loading="isLoading"
    >
    </custom-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CustomTable from '@/components/customTable'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    CustomTable
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('clinicalCasesIndustry', [
      'getIcon',
      'getVouchers',
      'getTableData',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getTableHeader',
      'getModalSeemContent',
      'getFilteredTableData'
    ]),

    isLoading() {
      // concentrar loadings nesta propriedade computada
      return false
    }
  },
  methods: {
    ...mapActions('clinicalCasesIndustry', ['s'])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
