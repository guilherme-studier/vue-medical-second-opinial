<template>
  <div class="container">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ getTotalContent }} caso(s) clínico(s) ativo(s)</h1>
    </div>
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
            v-for="item in industriesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </InputWrapper>
      <InputWrapper>
        <el-select
          v-model="selectedSpecialty"
          placeholder="Especialidade"
          size="large"
          no-match-text="Nenhuma especialidade encontrada"
          filterable
          clearable
        >
          <el-option
            v-for="item in specialtiesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </InputWrapper>
      <InputWrapper>
        <el-select
          v-model="selectedIllness"
          placeholder="Doença"
          no-match-text="Nenhuma doença encontrada"
          filterable
          size="large"
          clearable
        >
          <el-option
            v-for="item in diseasesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </InputWrapper>
      <!-- <InputWrapper>
        <el-select
          v-model="selectedDoctor"
          placeholder="Médico Consultor"
          size="large"
          clearable
        >
          <el-option
            v-for="item in getDoctors"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </InputWrapper> -->
    </InputGroup>
    <el-table
      class="consultation-table"
      v-loading="isLoading"
      style="width: 100%"
      :height="450"
      :data="tableData"
      empty-text="Não há dados para serem listados"
      border
    >
      <el-table-column
        header-align="center"
        label="Contrato"
        prop="voucher"
        align="left"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Indústria"
        prop="industry"
        align="left"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Especialidade"
        prop="specialty"
        align="left"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Doença"
        prop="illness"
        align="left"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Data de Início"
        width="120"
        prop="startDate"
        align="center"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Validade"
        width="110"
        prop="endDate"
        align="center"
      ></el-table-column>
      <el-table-column
        header-align="center"
        label="Honorários"
        prop="fees"
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import iconVoucher from '@/assets/icons/icon-voucher.svg'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import { formatCurrency } from '@/helpers/currency'
import { formatDate } from '@/helpers/date'

export default {
  name: 'Consulta Contratos Casos Clínicos',
  components: {
    InputWrapper,
    InputGroup
  },
  data() {
    return {
      icon: iconVoucher,
      selectedIndustry: null,
      selectedSpecialty: null,
      selectedIllness: null,
      selectedDoctor: null,
      tableHeader: [
        'Contrato',
        'Indústria',
        'Especialidade',
        'Doença',
        'Médico Consultor',
        'Data de Início',
        'Validade',
        'Qtd de Casos Clínicos'
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.fetchSpecialties(50)
    this.fetchIndustries(50)
    this.fetchDiseases(50)
    this.fetchConsultantDoctors()
    this.fetchContracts()

    this.setIndustryId()
    this.setSpecialtyId()
    this.setIllnessId()
    this.setDoctorId()
  },
  computed: {
    ...mapGetters('consultationClinicalCases', [
      'getContracts',
      'getLoadingContracts',
      'getIndustry',
      'getSpecialty',
      'getIllness',
      'getDoctors',
      'getDoctor',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    specialtiesOptions() {
      // Adicione a opção "Todos" no início da array
      return [{ id: '', name: 'Todas' }, ...this.getSpecialties]
    },

    industriesOptions() {
      return [{ id: '', name: 'Todas' }, ...this.getIndustries]
    },

    diseasesOptions() {
      return [{ id: '', name: 'Todas' }, ...this.getDiseases]
    },

    clinicalCases() {
      return this.getContracts.length
    },

    isLoading() {
      return (
        this.getLoadingSpecialtys ||
        this.getLoadingDiseases ||
        this.getLoadingIndustry ||
        this.getLoadingContracts
      )
    }
  },
  methods: {
    ...mapActions('consultationClinicalCases', [
      'fetchContracts',
      'setIndustryId',
      'setSpecialtyId',
      'setIllnessId',
      'fetchConsultantDoctors',
      'setDoctorId',
      'updatePage'
    ]),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('disease', ['fetchDiseases']),

    updatePageData({ currentPage }) {
      this.setPage(currentPage)
    },
    handleCurrentChange(newPage) {
      this.setPage(newPage)
    },
    handlePageChange(newPage) {
      this.updatePage(newPage)
    }
  },
  watch: {
    getContracts: {
      handler(newContracts) {
        this.tableData = newContracts?.map((contract) => ({
          voucher: contract?.contractName ?? '-',
          industry: contract?.industryName,
          specialty: contract?.specialtyName,
          illness: contract?.diseaseName,
          doctor: contract?.consultantDoctorId,
          startDate: formatDate(contract?.startDate),
          endDate: formatDate(contract?.startDate),
          fees: formatCurrency(contract?.consultantDoctorFees)
        }))
      },
      deep: true
    },
    getCurrentPage: 'fetchContracts',
    getIndustry: 'fetchContracts',
    getSpecialty: 'fetchContracts',
    getIllness: 'fetchContracts',
    getDoctor: 'fetchContracts',

    getPage() {
      this.fetchContracts()
    },
    selectedIndustry() {
      this.setIndustryId(this.selectedIndustry)
    },
    selectedSpecialty() {
      this.setSpecialtyId(this.selectedSpecialty)
    },
    selectedIllness() {
      this.setIllnessId(this.selectedIllness)
    },
    selectedDoctor() {
      this.setDoctorId(this.selectedDoctor)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/index.scss';
.content {
  position: absolute;
  top: -60px;
  left: 0;
}

.consultation-table {
  margin: 15px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
