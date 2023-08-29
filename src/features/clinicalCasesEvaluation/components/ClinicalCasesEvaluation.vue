<template>
  <div id="clinical-cases-evaluation">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>{{ getDoctor }} <span>possui</span> {{ getVouchers }} ativos</h1>
      </div>
      <div class="voucher-search">
        <input type="text" v-model="getSearchTerm" placeholder="Buscar" />
        <img class="search-icon" :src="getIconSearch" alt="" />
      </div>
    </div>

    <custom-table
      :tableHeader="getTableHeader"
      :tableData="getFilteredTableData"
      @action="handleCustomTableAction"
    >
      <template v-slot:action="{ item }">
        <img
          :src="value.icon"
          alt="Ícone de Ação"
          @click="value.handler(item)"
        />
      </template>
    </custom-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CustomTable from '@/components/customTable'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    CustomTable
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', [
      'getIcon',
      'getDoctor',
      'getVouchers',
      'getTableData',
      'getSearchTerm',
      'getIconSearch',
      'getTableHeader',
      'getFilteredTableData'
    ])
  },
  methods: {
    handleCustomTableAction(item) {
      alert('Ação do item:', item)
      // Realize a lógica desejada com o item
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
