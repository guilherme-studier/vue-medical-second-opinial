<template>
  <div id="designated-vouchers">
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

    <table class="custom-table">
      <thead>
        <tr>
          <th class="custom-th custom-th-top-left">Voucher</th>
          <th class="custom-th">Indústria</th>
          <th class="custom-th">Especialidade</th>
          <th class="custom-th">Doença</th>
          <th class="custom-th">Médico Consultor</th>
          <th class="custom-th">Data</th>
          <th class="custom-th custom-th-top-right">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredTableData" :key="index">
          <td>{{ item.voucher }}</td>
          <td>{{ item.industry }}</td>
          <td>{{ item.specialty }}</td>
          <td>{{ item.illness }}</td>
          <td>{{ item.doctor }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper/InputWrapper'
import InputGroup from '@/components/inputGroup/InputGroup'
import vSelect from 'vue-select'

export default {
  components: {
    InputWrapper,
    InputGroup,
    vSelect
  },
  data() {
    return {
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
      let filteredData = this.tableData
      if (this.selectedInduster) {
        filteredData = filteredData.filter((item) => {
          return item.industry === this.selectedInduster.value
        })
      }
      if (this.selectedSpecialty) {
        filteredData = filteredData.filter((item) => {
          return item.specialty === this.selectedSpecialty.value
        })
      }
      if (this.selectedIllness) {
        filteredData = filteredData.filter((item) => {
          return item.illness === this.selectedIllness.value
        })
      }
      if (this.selectedDoctor) {
        filteredData = filteredData.filter((item) => {
          return item.doctor === this.selectedDoctor.value
        })
      }
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

  .input-group {
    height: fit-content;
  }
}

.custom-th {
  text-transform: uppercase;
  border: 1px solid $white;
  background: $green-500;
  padding: 10px 20px;
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
