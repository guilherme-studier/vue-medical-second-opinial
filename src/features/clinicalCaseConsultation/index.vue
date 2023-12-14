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
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
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
  </div>
</template>

<script>
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
    InputWrapper
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
      tableData: null
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
      'getStatus'
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
        id: voucher?.id,
        status: formatStatus(voucher?.status),
        date: formatDate(voucher?.createdAt),
        consultantDoctor: voucher?.consultantDoctorName,
        clientDoctorName: voucher?.clientDoctorName
      }))
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
    ...mapActions('clinicalCaseConsultation', [
      'fetchVoucherAll',
      'updatePage',
      'setIndustryId',
      'setContractId',
      'setConsultantDoctorId',
      'setStatusId'
    ]),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('contractClinicalCases', [
      'fetchContractByIndustryId',
      'clearContractsByIndustryId',
      'fetchContract'
    ]),
    ...mapActions('consultationClinicalCases', ['fetchConsultantDoctors']),

    resolveDate(date) {
      return formatDate(date)
    },

    resolveCurrency(value) {
      return formatCurrency(value)
    },

    handlePageChange(newPage) {
      this.updatePage(newPage)
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
</style>
