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
      ]
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getClinicalCaseContent']),

    isLoading() {
      return false
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
    padding: 5px;
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
</style>
