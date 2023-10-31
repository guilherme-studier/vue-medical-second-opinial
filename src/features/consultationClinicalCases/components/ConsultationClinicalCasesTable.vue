<template>
  <div class="container">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ clinicalCases ? clinicalCases : '0' }} casos clínicos ativos</h1>
    </div>
    <InputGroup>
      <InputWrapper>
        <v-select
          v-model="selectedIndustry"
          :options="getIndustries"
          :reduce="(item) => item.id"
          placeholder="Indústria"
          label="name"
          @option:selected="selectIndustryId"
        ></v-select>
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedSpecialty"
          :options="getSpecialties"
          :reduce="(item) => item.id"
          placeholder="Especialidade"
          label="name"
          @option:selected="selectedSpecialtyId"
        />
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedIllness"
          :options="getDiseases"
          :reduce="(item) => item.id"
          placeholder="Doença"
          label="name"
          @option:selected="selectedIllnessId"
        ></v-select>
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedDoctor"
          :options="getDoctors"
          placeholder="Médico Consultor"
          :reduce="(item) => item.id"
          label="name"
          @option:selected="selectedDoctorId"
        ></v-select>
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
import vSelect from 'vue-select'
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
    InputGroup,
    vSelect
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
    selectIndustryId(industry) {
      if (industry) this.setIndustryId(industry.id)
      else this.setIndustryId()
    },

    selectedSpecialtyId(specialty) {
      if (specialty) this.setSpecialtyId(specialty.id)
      else this.setSpecialtyId()
    },

    selectedIllnessId(illness) {
      if (illness) {
        this.setIllnessId(illness.id)
      } else this.setIllnessId()
    },

    selectedDoctorId(doctor) {
      if (doctor) {
        this.setDoctorId(doctor.id)
      } else this.setDoctorId()
    },

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
      if (!this.selectedIndustry) this.setIndustryId()
    },
    selectedSpecialty() {
      if (!this.selectedSpecialty) this.setSpecialtyId()
    },
    selectedIllness() {
      if (!this.selectedIllness) this.setIllnessId()
    },
    selectedDoctor() {
      if (!this.selectedDoctor) this.selectedDoctorId()
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
