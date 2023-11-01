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

    <custom-table
      :tableHeader="tableHeader"
      :tableData="tableData"
      :loading="isLoading"
      :currentPage="getCurrentPage"
      :totalPages="getTotalPages"
      @page-change="updatePageData"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import iconVoucher from '@/assets/icons/icon-voucher.svg'
import CustomTable from '@/components/customTable'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import { formatDate } from '@/helpers/date'
import { formatStatus } from '@/helpers/status'

export default {
  name: 'Consulta Casos Clínicos',
  components: {
    InputWrapper,
    CustomTable,
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
      tableData: []
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
    }
  },
  watch: {
    getContracts: {
      handler(newContracts) {
        this.tableData = newContracts.map((contract) => ({
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
</style>
