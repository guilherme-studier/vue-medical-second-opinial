<template>
  <div class="contract-clinical-case" v-loading="isLoading">
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
    </InputGroup>
    <div class="content-contract">
      <InputGroup>
        <InputWrapper>
          <div class="content-clinical-case">
            <h2>
              <span>Doença: </span>{{ contract ? contract?.diseaseName : '-' }}
            </h2>
          </div>
          <div class="content-clinical-case">
            <h2>
              <span>Especialidade: </span
              >{{ contract ? contract?.specialtyName : '-' }}
            </h2>
          </div>
        </InputWrapper>
      </InputGroup>
      <Title :title="tituloComponente" />
      <el-table
        :data="tableData"
        style="width: 100%"
        empty-text="Não há dados para serem listados"
        border
        v-loading="isLoading"
      >
        <el-table-column
          prop="category"
          label="Papel"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="doctorName"
          label="Médico Consultor"
          align="center"
        ></el-table-column>
      </el-table>

      <el-checkbox
        v-model="newConfigurationEnabled"
        label="Criar Nova Configuração"
        size="large"
      />

      <el-table
        v-if="newConfigurationEnabled"
        :data="tableData"
        style="width: 100%"
        empty-text="Não há dados para serem listados"
        border
        v-loading="isLoading"
      >
        <el-table-column
          prop="category"
          label="Papel"
          align="center"
        ></el-table-column>
        <el-table-column label="Médico Consultor" align="center">
          <template v-slot="scope">
            <el-select
              v-model="scope.row.selectedDoctor"
              placeholder="Selecione o Médico Consultor"
              size="large"
              no-match-text="Nenhum médico consultor encontrado"
              filterable
              clearable
            >
              <el-option
                v-for="doctor in getDoctors"
                :key="doctor.id"
                :label="doctor.name"
                :value="doctor.id"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'
import { formatCategory } from '@/helpers/category'

export default {
  name: 'Contrato de Casos Clínicos',
  components: {
    Title,
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      selectedIndustry: null,
      selectContract: null,
      contract: null,
      tituloComponente: 'Configuração Atual',
      newConfigurationEnabled: false
    }
  },
  mounted() {
    this.clearContractsByIndustryId()
    this.fetchIndustries(50)
  },
  computed: {
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('contractClinicalCases', [
      'getContractsByIndustryId',
      'getContractLoading',
      'getContract',
      'getDoctors'
    ]),

    isLoading() {
      return this.getLoadingIndustry || this.getContractLoading
    }
  },
  watch: {
    getDoctors: {
      handler(doctors) {
        this.tableData = doctors?.map((doctor) => ({
          doctorName: doctor?.doctorName,
          category: formatCategory(doctor?.category)
        }))
      }
    },
    selectedIndustry() {
      this.contract = null
      this.selectContract = null
      this.clearContractsByIndustryId()
      this.clearDoctors()

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

      this.fetchDoctorsByContractId(this.contract.contractId)
    }
  },
  methods: {
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('contractClinicalCases', [
      'fetchContractByIndustryId',
      'clearContractsByIndustryId',
      'fetchDoctorsByContractId',
      'fetchContract',
      'clearDoctors'
    ]),

    formatPapel(row) {
      // Função para formatar a coluna "Papel"
      switch (row.paper) {
        case 'titular':
          return 'Titular'
        case 'suplente1':
          return 'Suplente 1'
        case 'suplente2':
          return 'Suplente 2'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-clinical-case {
  width: 100%;
  display: block;
  height: fit-content;

  .content-contract {
    .content-clinical-case {
      padding: 20px;
      border-bottom: 1px solid $gray-400;

      span {
        font-weight: 600;
      }
      h2 {
        font-weight: 400;
      }
    }

    .content-title {
      padding: 30px 0 15px 0;
    }

    .el-checkbox {
      padding: 30px;
    }
  }
}
</style>
