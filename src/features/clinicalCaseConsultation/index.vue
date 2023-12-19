<template>
  <div id="clinical-case-consultation" v-loading="isLoading">
    <div class="clinical-case-filters">
      <InputGroup>
        <InputWrapper>
          <el-select
            v-model="selectedIndustry"
            placeholder="Patrocinador"
            size="large"
            no-match-text="Nenhuma indústria encontrada"
            filterable
            clearable
          >
            <el-option
              v-for="item in getIndustries"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper>
          <el-select
            v-model="selectContract"
            placeholder="Contrato Caso Clínico"
            size="large"
            no-match-text="Nenhuma caso clínico encontrato"
            filterable
            clearable
            :disabled="
              !getContractsByIndustryId || getContractsByIndustryId.length === 0
            "
          >
            <el-option
              v-for="item in getContractsByIndustryId"
              :key="item.id"
              :label="item.contractName"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper>
          <el-select
            v-model="selectedDoctor"
            placeholder="Médico Consultor"
            size="large"
            no-match-text="Nenhum médico consultor encontrado"
            filterable
            clearable
          >
            <el-option
              v-for="item in getUsersDoctors"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper>
          <el-select
            v-model="selectedStatus"
            placeholder="Status"
            size="large"
            no-match-text="Nenhum status encontrado"
            clearable
          >
            <el-option
              v-for="option in statusOptions"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            />
          </el-select>
        </InputWrapper>
      </InputGroup>
    </div>
    <div
      class="clinical-case-content"
      :style="{ opacity: contract ? '1' : '0.3' }"
    >
      <InputGroup>
        <InputWrapper>
          <h2>
            <span>Doença: </span>{{ contract ? contract?.diseaseName : '-' }}
          </h2>
        </InputWrapper>
        <InputWrapper>
          <h2>
            <span>Data Início: </span
            >{{ contract ? resolveDate(contract?.startDate) : '-' }}
          </h2>
        </InputWrapper>
      </InputGroup>
    </div>
    <div
      class="clinical-case-content"
      :style="{ opacity: contract ? '1' : '0.3' }"
    >
      <InputGroup>
        <InputWrapper>
          <h2>
            <span>Especialidade: </span
            >{{ contract ? contract?.specialtyName : '-' }}
          </h2>
        </InputWrapper>
        <InputWrapper>
          <h2>
            <span>Data de Validade: </span
            >{{ contract ? resolveDate(contract?.endDate) : '-' }}
          </h2>
        </InputWrapper>
      </InputGroup>
    </div>
    <div
      class="clinical-case-content"
      :style="{ opacity: contract ? '1' : '0.3' }"
    >
      <InputGroup>
        <InputWrapper>
          <h2>
            <span>Casos Clínicos Disponíveis: </span
            >{{ contract ? contract?.specialtyName : '-' }}
          </h2>
        </InputWrapper>
        <InputWrapper>
          <h2>
            <span>Honorários do Médico Consultor: </span
            >{{
              contract ? resolveCurrency(contract?.consultantDoctorFees) : '-'
            }}
          </h2>
        </InputWrapper>
      </InputGroup>
    </div>
    <div class="clinical-case-table">
      <el-table
        :data="tableData"
        :height="450"
        style="width: 100%"
        empty-text="Não há dados para serem listados"
        border
        v-loading="isLoading"
      >
        <el-table-column prop="voucherId" label="ID" align="center">
          <template v-slot="scope">
            <span
              @click="viewHistory(scope.row.id, scope.row.voucherId)"
              style="cursor: pointer; text-decoration: underline;"
            >
              {{ scope.row.voucherId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="Data"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="consultantDoctor"
          label="Médico Consultor"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="clientDoctorName"
          label="Médico Cliente"
          align="center"
        ></el-table-column>
        <el-table-column label="Ação" width="150" align="center">
          <template v-slot="scope">
            <div class="actions">
              <el-tooltip
                class="box-item"
                effect="light"
                content="Declinar caso clínico"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconX"
                  @click="decline(scope.row)"
                  :class="{
                    'action-disabled': scope.row?.status !== 'Ativo'
                  }"
              /></el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="Cancelar caso clínico"
                placement="top-start"
                ><font-awesome-icon
                  :icon="iconTrash"
                  @click="cancel(scope.row)"
                  :class="{
                    'action-disabled': scope.row?.status !== 'Em avaliação'
                  }"
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
    </div>

    <el-dialog :title="modalHistoricTitle" v-model="isHistoryModalVisible">
      <div v-if="getVoucherHistory">
        <el-table
          :data="tableDataHistoric"
          :height="450"
          style="width: 100%"
          empty-text="Não há dados para serem listados"
          border
          v-loading="isLoading"
        >
          <el-table-column
            prop="status"
            label="Status"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="Data"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="consultantDoctor"
            label="Médico Consultor"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { faCheck, faX, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import { formatCurrency } from '@/helpers/currency'
import { formatDate } from '@/helpers/date'
import { formatStatus } from '@/helpers/status'

export default {
  name: 'Contrato de Casos Clínicos',
  components: {
    InputGroup,
    InputWrapper,
    FontAwesomeIcon
  },
  data() {
    return {
      selectedIndustry: null,
      selectContract: null,
      selectedDoctor: null,
      selectedStatus: null,
      statusOptions: [
        { id: 'emav', name: 'Em avaliação' },
        { id: 'aval', name: 'Avaliado' },
        { id: 'disp', name: 'Disponível' },
        { id: 'rese', name: 'Reservado' },
        { id: 'aloc', name: 'Alocado' },
        { id: 'ativ', name: 'Ativo' }
      ],
      contract: null,
      tableData: null,
      iconCheck: faCheck,
      iconX: faX,
      iconTrash: faTrash,
      isHistoryModalVisible: false,
      modalHistoricTitle: null
    }
  },
  mounted() {
    this.fetchVoucherAll()
    this.fetchIndustries(50)
    this.fetchConsultantDoctors()

    this.setIndustryId()
    this.setContractId()
    this.setConsultantDoctorId()
    this.setStatusId()
  },
  computed: {
    ...mapGetters('clinicalCaseConsultation', [
      'getVouchers',
      'getLoadingVouchers',
      'getTotalPages',
      'getTotalContent',
      'getPage',
      'getIndustry',
      'getContractVoucher',
      'getConsultantDoctor',
      'getStatus',
      'getVoucherHistory'
    ]),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('contractClinicalCases', [
      'getContractsByIndustryId',
      'getContractLoading',
      'getContract'
    ]),
    ...mapGetters('consultationClinicalCases', [
      'getUsersDoctors',
      'getLoadingContracts'
    ]),

    isLoading() {
      return (
        this.getLoadingIndustry ||
        this.getLoadingContracts ||
        this.getContractLoading ||
        this.getLoadingVouchers
      )
    }
  },
  watch: {
    getVouchers() {
      this.tableData = this.getVouchers?.map((voucher) => ({
        voucherId: voucher?.voucherId,
        id: voucher?.id,
        status: formatStatus(voucher?.status),
        date: formatDate(voucher?.createdAt),
        consultantDoctor: voucher?.consultantDoctorName,
        clientDoctorName: voucher?.clientDoctorName
      }))
    },
    getVoucherHistory() {
      this.tableDataHistoric = this.getVoucherHistory?.map(
        (voucherHistoric) => ({
          status: formatStatus(voucherHistoric?.status),
          date: formatDate(voucherHistoric?.createdAt),
          consultantDoctor: voucherHistoric?.name ?? '-'
        })
      )
    },
    getIndustry: 'fetchVoucherAll',
    getContractVoucher: 'fetchVoucherAll',
    getConsultantDoctor: 'fetchVoucherAll',
    getStatus: 'fetchVoucherAll',
    selectedIndustry() {
      this.setIndustryId(this.selectedIndustry)
      this.updatePage(1)

      this.selectContract = null
      this.clearContractsByIndustryId()

      if (!this.selectedIndustry) return

      this.fetchContractByIndustryId(this.selectedIndustry)
    },
    selectContract() {
      if (!this.selectContract) return (this.contract = null)

      this.fetchContract(this.selectContract)
    },
    getContract() {
      if (!this.getContract) return (this.contract = null)

      this.contract = this.getContract[0]
    },
    contract() {
      if (this.contract === null || this.contract === '')
        return this.setContractId()

      this.setContractId(this.contract.contractId)
      this.updatePage(1)
    },
    selectedDoctor() {
      this.setConsultantDoctorId(this.selectedDoctor)
      this.updatePage(1)
    },
    selectedStatus() {
      this.setStatusId(this.selectedStatus)
      this.updatePage(1)
    },
    getPage() {
      this.fetchVoucherAll()
    }
  },
  methods: {
    ...mapActions('admClinicalCases', [
      'acceptClinicalCase',
      'cancelClinicalCase'
    ]),
    ...mapActions('clinicalCaseConsultation', [
      'fetchVoucherAll',
      'updatePage',
      'setIndustryId',
      'setContractId',
      'setConsultantDoctorId',
      'setStatusId',
      'fetchVoucherHistory'
    ]),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('contractClinicalCases', [
      'fetchContractByIndustryId',
      'clearContractsByIndustryId',
      'fetchContract'
    ]),
    ...mapActions('consultationClinicalCases', ['fetchConsultantDoctors']),

    viewHistory(id, voucherId) {
      this.fetchVoucherHistory(id)
      this.modalHistoricTitle = `ID: ${voucherId}`
      this.isHistoryModalVisible = true
    },

    resolveDate(date) {
      return formatDate(date)
    },

    resolveCurrency(value) {
      return formatCurrency(value)
    },

    handlePageChange(newPage) {
      this.updatePage(newPage)
    },
    decline(row) {
      this.declineClinicalCase(row.id)
    },
    cancel(row) {
      this.cancelClinicalCase(row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
#clinical-case-consultation {
  width: 100%;
  display: block;
  height: fit-content;

  .clinical-case-content {
    padding: 12px;
    border-bottom: 1px solid $gray-500;

    h2 {
      font-weight: 400;

      span {
        font-weight: 600;
      }
    }
  }

  .clinical-case-table {
    padding: 20px 0;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 19px;
  margin: 2px;

  .action-disabled {
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
