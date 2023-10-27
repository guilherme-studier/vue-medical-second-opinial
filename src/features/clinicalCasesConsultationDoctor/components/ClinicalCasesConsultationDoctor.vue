<template>
  <div
    id="clinical-cases-consultation-doctor"
    :class="{ 'form-loading': isLoading }"
  >
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
      :tableHeader="tableHeader"
      :tableData="tableData"
      :loading="getLoadingClinicalCases"
    >
      <template v-slot:action="{ item }">
        <font-awesome-icon :icon="icon" @click="value.handler(item)" />
      </template>
    </custom-table>
    <!-- parecer modal -->
    <modal
      :title="titleModalSeem"
      @close="closeModalSeem"
      v-if="getIsModalSeem"
    >
      <seem-modal
        :voucher="selectedContract.id"
        :opinion="selectedContract.opinion"
      />
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
import { faFile, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    FontAwesomeIcon,
    SeemModal,
    Modal
  },
  data() {
    return {
      titleModalSeem: 'Registrar Parecer',
      titleModalMessage: 'Mensagens',
      tableHeader: ['Casos Clínicos', 'ID', 'Doença', 'Médico', 'Ação'],
      tableData: [],
      selectedContract: {}
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getIcon',
      'getDoctor',
      'getVouchers',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getIsModalMessage',
      'getTableHeader',
      'getModalSeemContent',
      'getModalMessageContent',
      'getClinicalCases',
      'getLoadingClinicalCases'
    ]),

    isLoading() {
      return this.getLoadingClinicalCases
    }
  },
  mounted() {
    this.fetchClinicalCases()
  },
  watch: {
    getClinicalCases: {
      handler(newContracts) {
        this.tableData = newContracts.map((contract) => ({
          voucher: contract?.opinion,
          id: contract?.opinion,
          illness: contract?.opinion,
          doctor: contract?.opinion,
          action: [
            {
              icon: faFile,
              handler: () => {
                this.selectedContract = {
                  id: contract?.voucherId,
                  opinion: contract?.opinion
                }
                this.handleModalSeem()
              }
            },
            {
              icon: faComment,
              handler: () => {
                this.selectedContract = {
                  id: contract?.voucherId
                }
                this.handleModalMessage()
              }
            }
          ]
        }))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', [
      'handleModalSeem',
      'handleModalMessage',
      'sendSeem',
      'fetchClinicalCases'
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
