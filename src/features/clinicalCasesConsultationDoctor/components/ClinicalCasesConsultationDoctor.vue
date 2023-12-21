<template>
  <div class="container">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          Você <span>possui</span> {{ getTotalContent }} caso(s) clínico(s)
          designado(s)
        </h1>
      </div>
    </div>

    <el-table
      :data="tableData"
      :height="450"
      style="width: 100%"
      empty-text="Não há dados para serem listados"
      border
      v-loading="isLoading"
    >
      <el-table-column
        prop="voucher"
        label="Casos Clínicos"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="voucherId"
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
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              :content="
                scope.row?.status === 'Em avaliação'
                  ? 'Adicionar parecer de caso clínico'
                  : 'Consultar parecer'
              "
              placement="top-start"
              ><font-awesome-icon
                :icon="iconFile"
                @click="
                  handleFile(scope.row, scope.row?.status === 'Em avaliação')
                "
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              :content="
                scope.row?.status === 'Em avaliação'
                  ? 'Enviar mensagem'
                  : 'Consultar mensagens'
              "
              placement="top-start"
              ><font-awesome-icon
                :icon="iconMessage"
                @click="handleComment(scope.row, true)"
            /></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-if="getTotalPages > 1"
        layout="prev, pager, next"
        :total="getTotalContent"
        :current-page="getPage"
        @current-change="handlePageChange"
      />
    </div>

    <!-- parecer modal -->
    <el-dialog
      title="Registrar Parecer"
      v-model="getIsModalSeem"
      @close="closeModalSeem"
    >
      <seem-modal
        :voucher="selectedContract?.voucher"
        :voucherId="selectedContract?.voucherId"
        :opinion="selectedContract?.opinion"
        :edit="selectedContract?.edit"
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
        :edit="selectedContract?.edit"
        :voucherId="selectedContract?.voucherId"
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
      iconMessage: faComment,
      currentPage: 1,
      pageSize: 10
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
      'getLoadingClinicalCases',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),
    isLoading() {
      return this.getLoadingClinicalCases
    }
  },
  async mounted() {
    await this.getUser()
    this.fetchClinicalCases()
  },
  watch: {
    getClinicalCases: {
      handler(contracts) {
        this.tableData = contracts?.map((contract) => ({
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
    },
    getPage() {
      this.fetchClinicalCases()
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('clinicalCasesConsultationDoctor', [
      'handleModalSeem',
      'handleModalMessage',
      'sendSeem',
      'fetchClinicalCases',
      'updatePage'
    ]),
    ...mapActions('clinicalCasesEvaluation', [
      'onActiveVoucherPage',
      'handleActiveVoucher'
    ]),
    async handleCheck(row) {
      await this.onActiveVoucherPage()
      this.handleActiveVoucher(row)
    },
    handleFile(row, edit) {
      if (row.opinion === null) {
        this.selectedContract = {
          voucherId: row.voucherId,
          voucher: row.id,
          opinion: null,
          edit: edit
        }
      } else {
        this.selectedContract = {
          voucherId: row.voucherId,
          voucher: row.id,
          opinion: row.opinion || ''
        }
      }
      this.handleModalSeem(this.selectedContract.opinion)
    },
    handleComment(row, edit) {
      this.selectedContract = {
        voucherId: row?.voucherId,
        id: row?.id,
        voucher: row?.id,
        edit: edit
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
    },
    handlePageChange(newPage) {
      this.updatePage(newPage)
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
