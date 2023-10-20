<template>
  <div id="clinical-cases-evaluation">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          Você <span>possui</span> {{ getTableData?.length }} casos clínicos
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
        <font-awesome-icon
          :icon="icon"
          style="color: #008B8F;"
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
        :voucher="getModalSeemContent?.voucher"
        :seem="getModalSeemContent?.seem"
      />
    </modal>
    <!-- message modal -->
    <modal
      :title="titleModalMessage"
      @close="closeModalMessage"
      v-if="getIsModalMessage"
    >
      <message-modal
        :voucher="getModalMessageContent?.voucher"
        :messages="getModalMessageContent?.messages"
      />
    </modal>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters, mapActions } from 'vuex'

import MessageModal from './MessageModal.vue'
import SeemModal from './SeemModal.vue'

import CustomTable from '@/components/customTable'
import Modal from '@/components/modal'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    FontAwesomeIcon,
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
    ...mapGetters('clinicalCasesEvaluation', [
      'getIcon',
      'getVouchers',
      'getTableData',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getTableHeader',
      'getIsModalMessage',
      'getModalSeemContent',
      'getFilteredTableData',
      'getModalMessageContent',
      'getIsActiveVoucher'
    ])
  },
  methods: {
    ...mapActions('clinicalCasesEvaluation', [
      'handleModalSeem',
      'handleModalMessage',
      'handlePageActiveVoucher'
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
