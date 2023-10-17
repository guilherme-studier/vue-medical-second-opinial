<template>
  <div :class="{ 'form-loading': isLoading }">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ clinicalCases ? clinicalCases : '0' }} casos clínicos ativos</h1>
    </div>
    <InputGroup>
      <InputWrapper>
        <v-select
          v-model="selectedInduster"
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
          :options="doctorOptions"
          placeholder="Médico Consultor"
        ></v-select>
      </InputWrapper>
    </InputGroup>

    <custom-table
      :tableHeader="tableHeader"
      :tableData="tableData"
      :loading="isLoading"
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
      selectedInduster: null,
      selectedSpecialty: null,
      selectedIllness: null,
      selectedDoctor: null,
      doctorOptions: [
        { label: 'Paulo Pitrez', value: 'Paulo Pitrez' },
        { label: 'Paulo Pitrez', value: 'Paulo Pitrez' },
        { label: 'Paulo Pitrez', value: 'Paulo Pitrez' }
      ],
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
    this.setIndustryId()
    this.setSpecialtyId()
    this.setIllnessId()
  },
  computed: {
    ...mapGetters('consultationClinicalCases', [
      'getContracts',
      'getLoadingContracts',
      'getIndustry',
      'getSpecialty',
      'getIllness'
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
      'setIllnessId'
    ]),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('disease', ['fetchDiseases']),

    selectIndustryId(industry) {
      if (industry) this.setIndustryId(industry.id)
    },

    selectedSpecialtyId(specialty) {
      if (specialty) this.setSpecialtyId(specialty.id)
    },

    selectedIllnessId(illness) {
      if (illness) this.setIllnessId(illness.id)
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
    getIndustry: 'fetchContracts',
    getSpecialty: 'fetchContracts',
    getIllness: 'fetchContracts'
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
