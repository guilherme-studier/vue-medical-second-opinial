<template>
  <div id="clinical-cases-consultation-doctor">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          {{ getName }} <span>possui</span> {{ getVouchers }} casos clínicos
          ativos
        </h1>
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
      <seem-modal :voucher="getModalSeemContent.voucher" />
    </modal>
    <!-- message modal -->
    <modal
      :title="titleModalMessage"
      @close="closeModalMessage"
      v-if="getIsModalMessage"
    >
      <message-modal
        :voucher="getModalMessageContent.voucher"
        :messages="getModalMessageContent.messages"
      />
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MessageModal from './MessageModal.vue'
import SeemModal from './SeemModal.vue'

import CustomTable from '@/components/customTable'
import Modal from '@/components/modal'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    CustomTable,
    MessageModal,
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
    ...mapGetters('user', ['getName']),
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getIcon',
      'getDoctor',
      'getVouchers',
      'getTableData',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getIsModalMessage',
      'getTableHeader',
      'getModalSeemContent',
      'getModalMessageContent',
      'getFilteredTableData'
    ])
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', [
      'handleModalSeem',
      'handleModalMessage',
      'sendSeem'
    ]),

    closeModalSeem() {
      this.handleModalSeem()
    },

    closeModalMessage() {
      this.handleModalMessage()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
