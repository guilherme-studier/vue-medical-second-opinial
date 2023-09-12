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
    >
      <template v-slot:action="{ item }">
        <img
          :src="value.icon"
          alt="Ícone de Ação"
          @click="value.handler(item)"
        />
      </template>
    </custom-table>
    <!-- parecer modal -->
    <modal
      :title="titleModalSeem"
      @close="closeModalSeem"
      v-if="getIsModalSeem"
    >
      <seem-modal
        :voucher="getModalSeemContent.voucher"
        :seem="getModalSeemContent.seem"
      />
    </modal>
    <!-- <modal :title="titleModalMessage" @close="closeModalMessage"> </modal> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SeemModal from './SeemModal.vue'

import CustomTable from '@/components/customTable'
import Modal from '@/components/modal'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    CustomTable,
    SeemModal,
    Modal
  },
  data() {
    return {
      titleModalSeem: 'Registrar Parecer',
      titleModalMessage: 'Mensagens'
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', [
      'getIcon',
      'getDoctor',
      'getVouchers',
      'getTableData',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getTableHeader',
      'getModalSeemContent',
      'getFilteredTableData'
    ])
  },
  methods: {
    ...mapActions('clinicalCasesEvaluation', ['s']),

    closeModalSeem() {
      this.handleModalSeem()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
