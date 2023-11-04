<template>
  <div class="container">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ clinicalCases ? clinicalCases : '0' }} casos clínicos ativos</h1>
    </div>
    <InputGroup>
      <InputWrapper>
        <el-select
          v-model="selectedIndustry"
          placeholder="Indústrias"
          size="large"
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
          v-model="selectedSpecialty"
          placeholder="Especialidade"
          size="large"
          clearable
        >
          <el-option
            v-for="item in getSpecialties"
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
          size="large"
          clearable
        >
          <el-option
            v-for="item in getDiseases"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </InputWrapper>
      <InputWrapper>
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
      </InputWrapper>
    </InputGroup>
    <el-table
      class="consultation-table"
      v-loading="isLoading"
      style="width: 100%"
      :data="tableData"
      :height="300"
      border
    >
      <el-table-column
        label="Caso clínico/ID"
        prop="voucher"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Indústria"
        prop="industry"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Especialidade"
        prop="specialty"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Doença"
        prop="illness"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Data"
        prop="date"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Status"
        prop="status"
        align="center"
      ></el-table-column>
    </el-table>
    <!-- <el-pagination
      :page-size="3"
      :pager-count="11"
      layout="prev, pager, next"
      :total="21"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import iconVoucher from '@/assets/icons/icon-voucher.svg'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import { formatDate } from '@/helpers/date'
import { formatStatus } from '@/helpers/status'

export default {
  name: 'Consulta Casos Clínicos',
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
        'Caso clínico/ID',
        'Indústria',
        'Especialidade',
        'Doença',
        'Médico Consultor',
        'Data',
        'Status'
      ],
      tableData: [],
      pageSize: 10
    }
  },
  mounted() {
    this.fetchSpecialties()
    this.fetchIndustries()
    this.fetchContracts()
    this.fetchDiseases()
    this.fetchConsultantDoctors()

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
      'getCurrentPage',
      'getTotalPages'
    ]),
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

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
      'setPage'
    ]),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('disease', ['fetchDiseases']),

    updatePageData({ currentPage }) {
      this.setPage(currentPage)
    },
    handleCurrentChange(newPage) {
      this.setPage(newPage)
    }
  },
  watch: {
    getContracts: {
      handler(newContracts) {
        this.tableData = newContracts?.map((contract) => ({
          voucher: contract.contractId,
          industry: contract.industryName,
          specialty: contract.specialtyName,
          illness: contract.diseaseName,
          doctor: contract.consultantDoctorId,
          date: formatDate(contract.startDate),
          status: formatStatus(contract.status)
        }))
      },
      deep: true
    },
    getCurrentPage: 'fetchContracts',
    getIndustry: 'fetchContracts',
    getSpecialty: 'fetchContracts',
    getIllness: 'fetchContracts',
    getDoctor: 'fetchContracts',

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
