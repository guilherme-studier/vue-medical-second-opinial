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
      <div class="container-modal-seem">
        <h2>
          Caso clínico: <span>{{ getModalSeemContent.voucher }}</span>
        </h2>
        <div class="seem-text">
          <p>{{ getModalSeemContent.seem }}</p>
        </div>
        <div class="seem-send">
          <div class="seem-print-out">
            <h3>Imprimir Parecer</h3>
          </div>
          <div class="seem-button">
            <button @click="sendSeem">Enviar</button>
          </div>
        </div>
      </div>
    </modal>

    <!-- mensagens modal -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CustomTable from '@/components/customTable'
import Modal from '@/components/modal'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    CustomTable,
    Modal
  },
  data() {
    return {
      titleModalSeem: 'Registrar Parecer'
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
    ...mapActions('clinicalCasesEvaluation', ['handleModalSeem']),

    closeModalSeem() {
      this.handleModalSeem()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
