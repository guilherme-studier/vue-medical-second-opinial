<template>
  <div id="adm-clinical-cases">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="icon" />
        <h1>
          {{ getName }} <span>possui</span> {{ getVouchers }} casos clínicos
          ativos
        </h1>
      </div>
      <div class="voucher-search">
        <input type="text" v-model="searchTerm" placeholder="Buscar" />
        <img class="search-icon" :src="iconSearch" alt="" />
      </div>
    </div>

    <custom-table
      :tableData="filteredTableData"
      :tableHeader="getTableHeader"
      :loading="getLoading"
      :error="getError"
    >
      <template v-slot:action="{ item }">
        <font-awesome-icon :icon="icon" @click="value.action(item)" />
      </template>
    </custom-table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex'

import iconSearch from '@/assets/icons/icon-search.svg'
import iconVoucher from '@/assets/icons/icon-voucher.svg'
import CustomTable from '@/components/customTable'

export default {
  name: 'AdmClinicalCasesTable',
  components: {
    CustomTable,
    FontAwesomeIcon
  },
  data() {
    return {
      iconSearch: iconSearch,
      icon: iconVoucher,
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('admClinicalCases', [
      'getTableHeader',
      'getTableData',
      'getVouchers',
      'getDoctor',
      'getLoading',
      'getError'
    ]),

    filteredTableData() {
      if (!this.searchTerm) {
        return this.getTableData
      }

      const searchTerm = this.searchTerm.toLowerCase()
      return this.getTableData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
