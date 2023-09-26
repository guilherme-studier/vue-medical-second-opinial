<template>
  <div :class="{ 'form-loading': isLoading }">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ clinicalCases }} casos clínicos ativos</h1>
    </div>
    <InputGroup>
      <InputWrapper>
        <v-select
          v-model="selectedInduster"
          :options="getIndustries"
          :reduce="(item) => item.id"
          placeholder="Indústria"
          label="name"
        ></v-select>
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedSpecialty"
          :options="getSpecialties"
          :reduce="(item) => item.id"
          placeholder="Especialidade"
          label="name"
        />
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedIllness"
          :options="getDiseases"
          :reduce="(item) => item.id"
          placeholder="Doença"
          label="name"
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

    <custom-table :tableHeader="tableHeader" :tableData="tableData" />

    <div v-if="isLoading">
      <loader-spinner />
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'

import iconVoucher from '@/assets/icons/icon-voucher.svg'
import CustomTable from '@/components/customTable'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'Consulta Casos Clínicos',
  components: {
    InputWrapper,
    LoaderSpinner,
    CustomTable,
    InputGroup,
    vSelect
  },
  data() {
    return {
      clinicalCases: 3,
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
      tableData: [
        {
          voucher: '542132486',
          industry: 'Ind. Farmacêutica',
          specialty: 'Pneumologia',
          illness: 'Doença 1',
          doctor: 'Paulo Pitrez',
          date: '2016-05-03',
          status: 'Avaliação'
        },
        {
          voucher: '542132486',
          industry: 'Ind. Farmacêutica 2',
          specialty: 'Pneumologia',
          illness: 'Doença 1',
          doctor: 'Paulo Pitrez',
          date: '2016-05-03',
          status: 'Avaliação'
        },
        {
          voucher: '542132486',
          industry: 'Ind. Farmacêutica 3',
          specialty: 'Pneumologia',
          illness: 'Doença 1',
          doctor: 'Paulo Pitrez',
          date: '2016-05-03',
          status: 'Avaliação'
        },
        {
          voucher: '542132486',
          industry: 'Ind. Farmacêutica 4',
          specialty: 'Pneumologia',
          illness: 'Doença 1',
          doctor: 'Paulo Pitrez',
          date: '2016-05-03',
          status: 'Avaliação'
        }
      ]
    }
  },
  mounted() {
    this.fetchSpecialties()
    this.fetchIndustries()
    this.fetchDiseases()
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    isLoading() {
      return (
        this.getLoadingSpecialtys ||
        this.getLoadingDiseases ||
        this.getLoadingIndustry
      )
    },

    filteredTableData() {
      const filters = [
        {
          field: 'industry',
          selectedValue: this.selectedInduster
        },
        {
          field: 'specialty',
          selectedValue: this.selectedSpecialty
        },
        {
          field: 'illness',
          selectedValue: this.selectedIllness
        },
        {
          field: 'doctor',
          selectedValue: this.selectedDoctor
        }
      ]

      let filteredData = this.tableData

      filters.forEach((filter) => {
        const { field, selectedValue } = filter
        if (selectedValue) {
          // Use === para comparações estritas
          filteredData = filteredData.filter(
            (item) => item[field] === selectedValue
          )
        }
      })

      return filteredData
    }
  },
  methods: {
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('disease', ['fetchDiseases'])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
