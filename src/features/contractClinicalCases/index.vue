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
        v-if="contract"
        v-model="newConfigurationEnabled"
        label="Criar Nova Configuração"
        size="large"
      />

      <el-table
        v-if="newConfigurationEnabled"
        :data="tableDataUpdate"
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
                v-for="doctor in filteredDoctors"
                :key="doctor.id"
                :label="doctor.name"
                :value="doctor.id"
                :disabled="doctor.disabled"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="newConfigurationEnabled" class="icon-plus-container">
        <font-awesome-icon
          :icon="toggleIcon"
          style="color: #008B8F;"
          @click="addNewRow"
        />
      </div>
      <div v-if="newConfigurationEnabled" class="save">
        <el-button type="primary" @click="handleSave" :disabled="isSaveDisabled"
          >Salvar</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    InputWrapper,
    FontAwesomeIcon
  },
  data() {
    return {
      selectedIndustry: null,
      selectContract: null,
      contract: null,
      tituloComponente: 'Configuração Atual',
      toggleIcon: faCirclePlus,
      newConfigurationEnabled: false,
      tableData: null,
      tableDataUpdate: null,
      selectedDoctorsIds: []
    }
  },
  mounted() {
    this.clearContractsByIndustryId()
    this.fetchIndustries(50)
  },
  computed: {
    ...mapGetters('consultationClinicalCases', [
      'getUsersDoctors',
      'getLoadingContracts'
    ]),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('contractClinicalCases', [
      'getContractsByIndustryId',
      'getContractLoading',
      'getContract',
      'getDoctors'
    ]),

    filteredDoctors() {
      return this.getUsersDoctors.map((doctor) => ({
        ...doctor,
        disabled:
          this.selectedDoctorsIds.includes(doctor.id) ||
          this.tableDataUpdate.some((item) => item.selectedDoctor === doctor.id)
      }))
    },

    isLoading() {
      return (
        this.getLoadingIndustry ||
        this.getContractLoading ||
        this.getLoadingContracts
      )
    }
  },
  watch: {
    getDoctors: {
      handler(doctors) {
        this.tableData = doctors?.map((doctor) => ({
          doctorName: doctor?.doctorName,
          category: formatCategory(doctor?.category)
        }))

        if (!doctors?.length) {
          this.tableDataUpdate = [
            {
              category: formatCategory('tit'),
              selectedDoctor: null,
              categoryIndex: 0
            }
          ]
        } else {
          this.tableDataUpdate = doctors?.map((doctor, index) => ({
            category: formatCategory(doctor?.category),
            selectedDoctor: doctor?.doctorId,
            categoryIndex: index
          }))
        }
      }
    },
    selectedIndustry() {
      this.contract = null
      this.tableData = null
      this.tableDataUpdate = null
      this.newConfigurationEnabled = false
      this.selectContract = null
      this.clearContractsByIndustryId()
      this.clearDoctors()

      if (!this.selectedIndustry) return

      this.fetchContractByIndustryId(this.selectedIndustry)
    },
    selectContract() {
      this.tableDataUpdate = null
      this.newConfigurationEnabled = false

      if (!this.selectContract) {
        this.clearDoctors()
        this.contract = null
        this.tableData = null
        return
      }

      this.fetchContract(this.selectContract)
    },
    getContract() {
      if (!this.getContract) {
        this.contract = null
        this.tableData = null
        this.tableDataUpdate = null
        this.newConfigurationEnabled = false
        return
      }

      this.contract = this.getContract[0]

      this.fetchDoctorsByContractId(this.contract.contractId)
      this.fetchConsultantDoctors()
      this.clearDoctors()
    }
  },
  methods: {
    ...mapActions('consultationClinicalCases', ['fetchConsultantDoctors']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('contractClinicalCases', [
      'fetchContractByIndustryId',
      'postNewDoctorsToContract',
      'clearContractsByIndustryId',
      'fetchDoctorsByContractId',
      'fetchContract',
      'clearDoctors'
    ]),

    handleSave() {
      // Clonar o objeto para evitar mutações indesejadas
      const updatedTableData = JSON.parse(JSON.stringify(this.tableDataUpdate))

      // Iterar sobre cada item em tableDataUpdate e ajustar a propriedade 'category'
      updatedTableData.forEach((item) => {
        if (item.category === 'Titular') {
          item.category = 'tit'
        } else if (item.category === 'Suplente') {
          item.category = 'sup'
        }
        // Adicione mais condições conforme necessário
      })

      const contractToDoctorsData = {
        contractId: Number(this.contract?.contractId),
        doctors: updatedTableData
      }

      return this.postNewDoctorsToContract(contractToDoctorsData)
    },

    addNewRow() {
      const lastIndex = this.tableDataUpdate.length - 1

      if (lastIndex >= 0) {
        const newItem = {
          categoryIndex: this.tableDataUpdate[lastIndex].categoryIndex + 1,
          category: `${formatCategory('sup')} ${this.tableDataUpdate[lastIndex]
            .categoryIndex + 1}`,
          selectedDoctor: null,
          doctorName: null
        }

        this.tableDataUpdate.push(newItem)
      } else {
        const newItem = {
          category: formatCategory('sup') + 1,
          selectedDoctor: null,
          categoryIndex: 0,
          doctorName: null
        }

        this.tableDataUpdate.push(newItem)
      }
    },

    formatPapel(row) {
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

body .el-table td.el-table__cell div {
  .el-input__wrapper {
    box-shadow: none;
  }
}

.icon-plus-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
  left: 972px;
  top: -55px;

  .fa-circle-plus {
    font-size: 27px;
    margin-left: 10px;
  }
}

.save {
  padding: 10px 0 20px 0;
  display: flex;
  width: 150px;
  float: inline-end;
}
</style>
