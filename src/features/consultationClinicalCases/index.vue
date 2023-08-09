<template>
  <div id="designated-vouchers">
    <div class="title">
      <img class="icon-voucher" :src="icon" />
      <h1>{{ clinicalCases }} casos clínicos ativos</h1>
    </div>
    <InputGroup>
      <InputWrapper>
        <v-select
          v-model="selectedInduster"
          :options="industerOptions"
          placeholder="Indústria"
        ></v-select>
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedSpecialty"
          :options="specialtyOptions"
          placeholder="Especialidade"
        ></v-select>
      </InputWrapper>
      <InputWrapper>
        <v-select
          v-model="selectedIllness"
          :options="illnessOptions"
          placeholder="Doença"
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
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper'
import iconVoucher from '../../assets/icons/icon-voucher.svg'
import InputGroup from '@/components/inputGroup'
import CustomTable from '@/components/customTable'
import vSelect from 'vue-select'

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
      clinicalCases: 3,
      icon: iconVoucher,
      selectedInduster: null,
      industerOptions: [
        { label: 'Ind. Farmacêutica', value: 'Ind. Farmacêutica' },
        { label: 'Ind. Farmacêutica 2', value: 'Ind. Farmacêutica 2' },
        { label: 'Ind. Farmacêutica 3', value: 'Ind. Farmacêutica 3' }
      ],
      selectedSpecialty: null,
      specialtyOptions: [
        { label: 'Pneumologia', value: 'Pneumologia' },
        { label: 'Pneumologia', value: 'Pneumologia' },
        { label: 'Pneumologia', value: 'Pneumologia' }
      ],
      selectedIllness: null,
      illnessOptions: [
        { label: 'Doença 1', value: 'Doença 1' },
        { label: 'Doença 1', value: 'Doença 1' },
        { label: 'Doença 1', value: 'Doença 1' }
      ],
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
      ],
      dateOptions: [
        { label: '2016-05-03', value: '2016-05-03' },
        { label: '2016-05-04', value: '2016-05-04' },
        { label: '2016-05-05', value: '2016-05-05' },
        { label: '2016-05-06', value: '2016-05-06' }
      ]
    }
  },
  computed: {
    filteredTableData() {
      const filters = [
        {
          property: 'industry',
          selectedValue: this.selectedInduster
        },
        {
          property: 'specialty',
          selectedValue: this.selectedSpecialty
        },
        {
          property: 'illness',
          selectedValue: this.selectedIllness
        },
        {
          property: 'doctor',
          selectedValue: this.selectedDoctor
        }
      ]

      let filteredData = this.tableData

      filters.forEach((filter) => {
        const { property, selectedValue } = filter
        if (selectedValue) {
          filteredData = filteredData.filter(
            (item) => item[property] === selectedValue.value
          )
        }
      })

      return filteredData
    }
  }
}
</script>

<style lang="scss" scoped>
#designated-vouchers {
  justify-content: center;
  height: fit-content;
  flex-wrap: wrap;
  display: flex;
  width: 100%;

  .title {
    display: flex;
    place-items: end;
    text-align: left;
    color: $green-500;
    width: 100%;
    margin-bottom: 20px;

    h1 {
      margin-left: 10px;
    }
  }

  .input-group {
    height: fit-content;
  }
}

.custom-th {
  text-transform: uppercase;
  border: 1px solid $white;
  background: $green-500;
  padding: 20px;
  text-align: center;
  color: white;

  &.custom-th-top-left {
    border-top-left-radius: 10px;
  }

  &.custom-th-top-right {
    border-top-right-radius: 10px;
  }
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tbody td {
    border: 1px solid $gray-400;
    text-align: center;
    color: $gray-600;
    padding: 20px;
  }
}
</style>
