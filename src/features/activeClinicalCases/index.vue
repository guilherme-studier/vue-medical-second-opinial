<template>
  <div id="active-clinical-case">
    <div class="active-clinical-case-form">
      <div class="full-width">
        <input-block title="Caso Clínico nº" content="231313131" />
      </div>
      <div class="side-by-side">
        <div class="half-width">
          <input-block title="Especialidade" content="231313131" />
        </div>
        <div class="half-width with-margin">
          <input-block title="Doença" content="231313131" />
        </div>
      </div>
    </div>
    <div class="form" :class="{ 'form-loading': isLoading }">
      <input-group>
        <input-wrapper>
          <input
            type="number"
            placeholder="Idade"
            class="flexible-input"
            v-model="age"
          />
        </input-wrapper>
        <input-wrapper>
          <v-select
            v-model="gender"
            :options="genderOptions"
            :reduce="(item) => item.id"
            label="name"
            placeholder="Gênero"
          />
        </input-wrapper>
        <input-wrapper>
          <v-select
            v-model="color"
            :options="colorOptions"
            :reduce="(item) => item.id"
            label="name"
            placeholder="Cor"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <input
            type="number"
            placeholder="Peso"
            class="flexible-input"
            v-model="weight"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="number"
            placeholder="Altura"
            class="flexible-input"
            v-model="height"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Dianóstico"
            class="flexible-input"
            v-model="diagnosis"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <input
            type="number"
            placeholder="Ano de início dos sintomas"
            class="flexible-input"
            v-model="yearSymptom"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="number"
            placeholder="Ano do dianóstico"
            class="flexible-input"
            v-model="yearDiagnosis"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Localização segundo Montreal*"
            class="flexible-input"
            v-model="montrealLocale"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <input
            type="text"
            placeholder="Comportamento segundo Montreal*"
            class="flexible-input"
            v-model="behavior"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Extensão*"
            class="flexible-input"
            v-model="extension"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Principais sintomas de apresentação"
            class="flexible-input"
            v-model="symptoms"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <input
            type="text"
            placeholder="Necessidade de corticoide ao diagnóstico"
            class="flexible-input"
            v-model="medicine"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Manifestações extra-intestinais? Quais?*"
            class="flexible-input"
            v-model="intestine"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Já necessitou cirurgia para a Doença de Crohn?"
            class="flexible-input"
            v-model="crohn"
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="treatment">
      <h1>Quais os tratamentos já realizados?</h1>
      <table>
        <thead>
          <tr>
            <th>Medicação</th>
            <th>Data de Início</th>
            <th>Data de Término</th>
            <th>Respondeu Inicialmente a Tratamento?</th>
            <th>Motivo da Interrupção</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in treatmentList" :key="index">
            <td>
              <input
                v-model="item.medication"
                type="text"
                @input="enableNextRow(index)"
                :disabled="!item.editableRow"
                :class="{ 'disabled-input': !item.editableRow }"
              />
            </td>
            <td>
              <input
                v-model="item.startDate"
                type="text"
                @input="enableNextRow(index)"
                :disabled="!item.editableRow"
                :class="{ 'disabled-input': !item.editableRow }"
              />
            </td>
            <td>
              <input
                v-model="item.endDate"
                type="text"
                @input="enableNextRow(index)"
                :disabled="!item.editableRow"
                :class="{ 'disabled-input': !item.editableRow }"
              />
            </td>
            <td>
              <input
                v-model="item.respondedToTreatment"
                type="text"
                @input="enableNextRow(index)"
                :disabled="!item.editableRow"
                :class="{ 'disabled-input': !item.editableRow }"
              />
            </td>
            <td>
              <input
                v-model="item.interruptionReason"
                type="text"
                @input="enableNextRow(index)"
                :disabled="!item.editableRow"
                :class="{ 'disabled-input': !item.editableRow }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form" :class="{ 'form-loading': isLoading }">
      <input-group>
        <input-wrapper>
          <input
            type="text"
            placeholder="Tratamento atual?"
            class="flexible-input"
            v-model="treatment"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Comorbidades? Quais?"
            class="flexible-input"
            v-model="comorbidities"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <input
            type="text"
            placeholder="Alergias medicamentosas?"
            class="flexible-input"
            v-model="allergy"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="text"
            placeholder="Qual o principal motivo da consulta?"
            class="flexible-input"
            v-model="reason"
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="exams">
      <h1>Exames complementares à avaliação atual e atuais</h1>
      <table class="exams-table">
        <tbody>
          <tr v-for="(item, index) in examList" :key="index">
            <td class="label-column">
              {{ item.label }}
            </td>
            <td>
              <input v-model="item.value" type="text" />
            </td>
            <td>
              <input v-model="item.value2" type="text" />
            </td>
            <td>
              <input v-model="item.value3" type="text" />
            </td>
            <td>
              <input v-model="item.value4" type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="obervations">
      <div class="content-title">
        <h1 class="title">{{ titleObservations }}</h1>
        <span class="line"></span>
      </div>
      <div class="observation-text">
        <textarea v-model="observations" placeholder="Descreva..."></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'

import InputBlock from '@/components/inputBlock'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  components: {
    InputBlock,
    InputGroup,
    InputWrapper,
    vSelect
  },
  data() {
    return {
      age: null,
      gender: null,
      genderOptions: [
        {
          id: '1',
          name: 'Masculino'
        },
        {
          id: '2',
          name: 'Feminino'
        },
        {
          id: '3',
          name: 'Outro'
        }
      ],
      color: null,
      colorOptions: [
        {
          id: '1',
          name: 'Branco'
        },
        {
          id: '2',
          name: 'Preto'
        },
        {
          id: '3',
          name: 'Pardo'
        },
        {
          id: '4',
          name: 'Outro'
        }
      ],
      weight: null,
      height: null,
      diagnosis: null,
      yearSymptom: null,
      yearDiagnosis: null,
      montrealLocale: null,
      behavior: null,
      extension: null,
      symptoms: null,
      medicine: null,
      intestine: null,
      crohn: null,
      treatment: null,
      comorbidities: null,
      allergy: null,
      reason: null,
      treatmentList: [
        {
          medication: null,
          startDate: null,
          endDate: null,
          respondedToTreatment: null,
          interruptionReason: null,
          editableRow: true
        },
        {
          medication: null,
          startDate: null,
          endDate: null,
          respondedToTreatment: null,
          interruptionReason: null,
          editableRow: false
        },
        {
          medication: null,
          startDate: null,
          endDate: null,
          respondedToTreatment: null,
          interruptionReason: null,
          editableRow: false
        },
        {
          medication: null,
          startDate: null,
          endDate: null,
          respondedToTreatment: null,
          interruptionReason: null,
          editableRow: false
        }
      ],
      examList: [
        {
          label: 'Data',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        { label: 'Hb', value: null, value2: null, value3: null, value4: null },
        { label: 'VCM', value: null, value2: null, value3: null, value4: null },
        { label: 'RDW', value: null, value2: null, value3: null, value4: null },
        {
          label: 'Leucócitos',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Neutrófilos',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Linfócitos',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Eosinófilos',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Plaquetas',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Proteína C Reativa',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        { label: 'TGO', value: null, value2: null, value3: null, value4: null },
        { label: 'TGP', value: null, value2: null, value3: null, value4: null },
        { label: 'GGT', value: null, value2: null, value3: null, value4: null },
        {
          label: 'Calprotectína Fecal',
          value: null,
          value2: null,
          value3: null,
          value4: null
        },
        {
          label: 'Creatinina',
          value: null,
          value2: null,
          value3: null,
          value4: null
        }
      ],
      titleObservations: 'Observações adicionais',
      observations: null
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getClinicalCaseContent']),

    isLoading() {
      return false
    },

    itemPlaceholder() {
      return 'Valor'
    }
  },
  methods: {
    enableNextRow(index) {
      if (index < this.treatmentList.length - 1) {
        const currentRow = this.treatmentList[index]
        const nextRow = this.treatmentList[index + 1]

        // Verifica se a linha atual está completa
        if (
          currentRow.medication &&
          currentRow.startDate &&
          currentRow.endDate &&
          currentRow.respondedToTreatment &&
          currentRow.interruptionReason
        ) {
          // Habilita a próxima linha
          nextRow.editableRow = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#active-clinical-case {
  width: 100%;
}

.full-width {
  width: 100%;
  padding-bottom: 15px;
}

.side-by-side {
  display: flex;
  flex-wrap: wrap;
}

.half-width {
  flex: 1;
  margin-bottom: 10px;
}

.with-margin {
  margin-left: 20px;
}

.form {
  padding: 10px 0;
}

.treatment {
  h1 {
    font-size: 16px;
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
  }

  table th,
  table td {
    border: 1px solid $gray-500;
    text-align: center;
  }

  table th {
    background-color: #f5f5f5;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
    padding: 20px 0;
  }

  table input[type='text'] {
    width: 100%;
    border: none;
    border-radius: 8px;
    text-align: left;
    margin-bottom: 0;
  }

  table input[type='text']:focus {
    border: none;
    box-shadow: none;
  }

  .disabled-input {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }
}

.exams {
  h1 {
    font-size: 16px;
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;

    tbody {
      border-radius: 8px;
    }
  }

  table th,
  table td {
    border: 1px solid $gray-500;
    text-align: center;
  }

  table th {
    background-color: #f5f5f5;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
    padding: 20px 0;
  }

  table input[type='text'] {
    width: 100%;
    border: none;
    border-radius: 8px;
    text-align: left;
    margin-bottom: 0;
  }

  table input[type='text']:focus {
    border: none;
    box-shadow: none;
  }

  .disabled-input {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }

  .label-column {
    background-color: #f5f5f5;
    font-weight: bold;
  }
}

.obervations {
  .content-title {
    flex-direction: column;
    margin-bottom: 25px;
    align-items: left;
    text-align: left;
    display: flex;
    padding: 20px;

    .title {
      color: $green-500;
    }

    .line {
      background-color: $green-500;
      margin-top: 15px;
      bottom: -15px;
      width: 60px;
      height: 5px;
    }
  }

  .observation-text {
    border: 1px solid $gray-500;
    border-radius: 10px;
    padding: 15px;
    margin: 20px 0;
    textarea {
      resize: none;
      border: none;
      line-height: 23px;
      text-align: left;
      height: 100%;
      min-height: 50px;
      width: 100%;
      overflow: auto;
      position: relative;

      scrollbar-width: thin;
      scrollbar-color: $gray-400 $gray;

      &::-webkit-scrollbar {
        width: 8px;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $gray-400;
        border-radius: 5px;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      p {
        max-height: 300px;
        padding-right: 20px;
        overflow-x: auto;
      }
    }

    textarea:focus {
      box-shadow: none;
      border: none;
      outline: none;
    }

    .seem-text::placeholder {
      font-weight: normal;
    }
  }
}
</style>
