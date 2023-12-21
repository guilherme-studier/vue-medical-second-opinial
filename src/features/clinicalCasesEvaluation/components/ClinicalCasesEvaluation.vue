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
        prop="date"
        label="Data"
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
            <div
              v-if="
                scope.row.status === 'Ativo' ||
                  scope.row.status === 'Em avaliação' ||
                  scope.row.status === 'Avaliado'
              "
            >
              <el-tooltip
                class="box-item"
                effect="light"
                content="Consultar caso clínico"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconReader"
                  @click="handleCheck(scope.row)"
              /></el-tooltip>
            </div>
            <div
              v-else-if="
                scope.row.status === 'Alocado' &&
                  scope.row.questionnaire !== null
              "
            >
              <el-tooltip
                class="box-item"
                effect="light"
                content="Continuar editando caso clínico"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconEdit"
                  @click="handleCheck(scope.row)"
              /></el-tooltip>
            </div>
            <div v-else>
              <el-tooltip
                class="box-item"
                effect="light"
                content="Ativar caso clínico"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconCheck"
                  @click="handleCheck(scope.row)"
                  :class="{
                    'filed-null': scope.row.status === 'Em avaliação'
                  }"
              /></el-tooltip>
            </div>
            <el-tooltip
              class="box-item"
              effect="light"
              content="Consultar parecer"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconFile"
                @click="handleFile(scope.row)"
                :class="{
                  'filed-null': scope.row.status !== 'Avaliado'
                }"
            /></el-tooltip>
            <div v-if="scope.row.status === 'Em avaliação'">
              <!-- <el-tooltip
                class="box-item"
                effect="light"
                content="Enviar mensagens"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconMessage"
                  @click="handleComment(scope.row)"
                  :class="{
                    'filed-null': scope.row.status === 'Alocado'
                  }"
              /></el-tooltip> -->
              <el-tooltip
                class="box-item"
                effect="light"
                content="Enviar mensagens"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconMessage"
                  @click="handleComment(scope.row)"
              /></el-tooltip>
            </div>
            <div v-else>
              <!-- <el-tooltip
                class="box-item"
                effect="light"
                content="Consultar mensagens"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconMessage"
                  @click="handleComment(scope.row)"
                  :class="{
                    'filed-null': scope.row.status === 'Alocado'
                  }"
              /></el-tooltip> -->
              <el-tooltip
                class="box-item"
                effect="light"
                content="Consultar mensagens"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconMessage"
                  @click="handleComment(scope.row)"
              /></el-tooltip>
            </div>
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
    <el-dialog title="Parecer" v-model="getIsModalSeem" @close="closeModalSeem">
      <seem-modal
        :voucher="selectedContract?.voucher"
        :opinion="selectedContract?.opinion"
        :voucherId="selectedContract?.voucherId"
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
        :status="selectedContract?.status"
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
  faBookOpenReader,
  faPenToSquare
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
      iconEdit: faPenToSquare,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('clinicalCasesEvaluation', [
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
    },
    verifyActiveVoucher(status) {
      if (
        status === 'Ativo' ||
        status === 'Em avaliação' ||
        status === 'Avaliado'
      )
        return false
      else return true
    }
  },
  async mounted() {
    await this.getUser()
    this.fetchClinicalCases()
  },
  watch: {
    getClinicalCases: {
      handler(newContracts) {
        this.tableData = newContracts?.map((contract) => ({
          voucher: contract?.contractName,
          contractId: contract?.contractId,
          id: contract?.id,
          voucherId: contract?.voucherId,
          illness: contract?.diseaseName,
          date: formatDate(contract?.createdAt),
          status: formatStatus(contract?.status),
          opinion: contract?.opinion,
          diseaseName: contract?.diseaseName,
          questionnaire: contract?.questionnaire
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
    ...mapActions('clinicalCasesEvaluation', [
      'handleModalSeem',
      'handleModalMessage',
      'handleActiveVoucher',
      'sendSeem',
      'fetchClinicalCases',
      'onActiveVoucherPage',
      'updatePage'
    ]),

    async handleCheck(row) {
      await this.onActiveVoucherPage()
      this.handleActiveVoucher(row)
    },
    handleFile(row) {
      if (row.opinion === null) {
        this.selectedContract = {
          voucherId: row.voucherId,
          voucher: row.id,
          opinion: null
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
    handleComment(row) {
      this.selectedContract = {
        voucherId: row.voucherId,
        id: row?.id,
        voucher: row?.id,
        status: row?.status
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
