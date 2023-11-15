<template>
  <div class="container">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          {{ getName }} <span>possui</span> {{ tableData?.length }} casos
          clínicos ativos
        </h1>
      </div>
    </div>

    <el-table
      :data="tableData"
      :height="450"
      style="width: 100%"
      border
      v-loading="isLoading"
    >
      <el-table-column
        prop="voucher"
        label="Casos Clínicos"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        style="max-width: 50%"
      ></el-table-column>
      <el-table-column
        prop="illness"
        label="Doença"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="doctor"
        label="Médico"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        align="center"
      ></el-table-column>
      <el-table-column label="Ação" width="150" align="center">
        <template v-slot="scope">
          <div class="actions">
            <el-tooltip
              class="box-item"
              effect="light"
              content="Consultar caso clínico"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconReader"
                @click="handleCheck(scope.row)"
                :class="{
                  'filed-null':
                    scope.row.status === 'Disponível' ||
                    scope.row.status === 'Alocado' ||
                    scope.row.status === 'Reservado'
                }"
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              content="Adicionar/Verificar parecer de caso clínico"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconFile"
                @click="handleFile(scope.row)"
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              content="Enviar mensagem"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconMessage"
                @click="handleComment(scope.row)"
            /></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- parecer modal -->
    <el-dialog
      title="Registrar Parecer"
      v-model="getIsModalSeem"
      @close="closeModalSeem"
    >
      <seem-modal
        :voucher="selectedContract?.voucher"
        :opinion="selectedContract?.opinion"
      />
    </el-dialog>

    <!-- message modal -->
    <el-dialog
      title="Mensagens"
      v-model="getIsModalMessage"
      @close="closeModalMessage"
    >
      <message-modal
        :id="selectedContract?.id"
        :voucher="selectedContract?.voucher"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  faSquareCheck,
  faFile,
  faComment,
  faBookOpenReader
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters, mapActions } from 'vuex'

import MessageModal from './MessageModal.vue'
import SeemModal from './SeemModal.vue'

import { formatDate } from '@/helpers/date'
import { formatStatus } from '@/helpers/status'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    MessageModal,
    SeemModal,
    FontAwesomeIcon
  },
  data() {
    return {
      tableData: [],
      selectedContract: {},
      iconCheck: faSquareCheck,
      iconReader: faBookOpenReader,
      iconFile: faFile,
      iconMessage: faComment
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getIcon',
      'getIconSearch',
      'getSearchTerm',
      'getIsModalSeem',
      'getIsModalMessage',
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
        this.tableData = newContracts?.map((contract) => ({
          voucher: contract?.contractName,
          contractId: contract?.contractId,
          id: contract?.id,
          illness: contract?.diseaseName,
          doctor: contract?.clientDoctorName,
          voucherId: contract?.voucherId,
          opinion: contract?.opinion,
          date: formatDate(contract?.createdAt),
          status: formatStatus(contract?.status)
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
    ...mapActions('clinicalCasesEvaluation', [
      'onActiveVoucherPage',
      'handleActiveVoucher'
    ]),
    async handleCheck(row) {
      await this.onActiveVoucherPage()
      this.handleActiveVoucher(row)
    },
    handleFile(row) {
      if (row.opinion === null) {
        this.selectedContract = {
          voucher: row.id,
          opinion: null
        }
      } else {
        this.selectedContract = {
          voucher: row.id,
          opinion: row.opinion || ''
        }
      }
      this.handleModalSeem(this.selectedContract.opinion)
    },
    handleComment(row) {
      this.selectedContract = {
        id: row?.id,
        voucher: row?.voucherId
      }
      this.handleModalMessage(this.selectedContract?.id)
    },
    closeModalSeem() {
      this.handleModalSeem(false)
      this.selectedContract = {}
    },
    closeModalMessage() {
      this.handleModalMessage()
      this.selectedContract = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 19px;
  margin: 2px;

  .filed-null {
    cursor: not-allowed;
    pointer-events: none;
    color: lightgray;
  }

  svg:hover {
    cursor: pointer;
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
