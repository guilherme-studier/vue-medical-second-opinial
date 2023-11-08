<template>
  <div id="active-clinical-case">
    <div class="active-clinical-case-form">
      <div class="side-by-side">
        <div class="half-width">
          <el-input v-model="getVoucher.voucherId" disabled>
            <template #prepend>Caso Clínico nº</template>
          </el-input>
        </div>
        <div class="half-width with-margin">
          <el-input v-model="getVoucher.diseaseName" disabled>
            <template #prepend>Doença</template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="form" :class="{ 'form-loading': isLoading }">
      <input-group>
        <input-wrapper>
          <el-input
            type="number"
            placeholder="Idade"
            class="flexible-input"
            v-model="age"
          />
        </input-wrapper>
        <input-wrapper>
          <el-select v-model="gender" placeholder="Sexo" size="large" clearable>
            <el-option
              v-for="item in genderOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </input-wrapper>
        <input-wrapper>
          <el-select v-model="color" placeholder="Cor" size="large" clearable>
            <el-option
              v-for="item in colorOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">{{ titleAsthma }}</h1>
        <span class="line"></span>
      </div>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="asthma"
            placeholder="O paciente tem diagnóstico de asma?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in asthmaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="lungDiseases"
            placeholder="Foram excluídas outras doenças pulmonares crônicas? (DPOC, bronquiectasias, fibrose cística, insuficiência cardáiaca, etc.) ?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in lungDiseasesOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="asthmaTreatment"
            placeholder="A adesão ao tratamento está adequada? (Checar idealmente com contagem de doses do dispositivo entre as consultas.)"
            size="large"
            clearable
          >
            <el-option
              v-for="item in asthmaTreatmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="inhalation"
            placeholder="A técnica inalatória está adequada? (Ideal checagem em 2-3 consultas.)"
            size="large"
            clearable
          >
            <el-option
              v-for="item in inhalationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">{{ titleComorbidities }}</h1>
        <span class="line"></span>
      </div>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="comorbidities"
            placeholder="Quais o paciente apresenta?"
            size="large"
            multiple
            clearable
          >
            <el-option
              v-for="item in comorbiditiesOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="otherComorbidities"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Outras comorbdades"
            :disabled="isOtherComorbiditiesDisabled"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="comorbiditiesInfo"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Todas aquelas manejáveis estão adequadamente tratadas? Descreva:"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="laba"
            placeholder="O paciente usa dose elevada de corticoide associado a LABA?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in labaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="asthmaMedications"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Quais medicações para asma o paciente utiliza? (Incluir medicamentos, apresentação e posologia.)"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="immunobiological"
            placeholder="O paciente fez/faz uso de imunobiológico(s)?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in immunobiologicalOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="immunobiologicalDescription"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Em caso positivo, descreva o medicamento e tempo de uso"
            :disabled="immunobiological !== 1"
          />
        </input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">{{ titleExams }}</h1>
        <span class="line"></span>
      </div>
      <div class="content-subtitle">
        <h2 class="title">{{ subtitleEspiro }}</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            type="text"
            placeholder="Data _/_/__"
            class="flexible-input"
            v-model="espiroDate"
            v-mask="'##/##/####'"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Pré-BD</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input v-model="preCvf" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input v-model="preVef" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preVefCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input v-model="preFef" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend><span v-html="fef"/></template>
          </el-input>
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Pós-BD</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input v-model="posCvf" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input v-model="posVef" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posVefCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input v-model="posFef" placeholder="__%" v-mask="['###%', '##%']">
            <template #prepend><span v-html="fef"/></template>
          </el-input>
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            type="text"
            placeholder="Resposta ao BD: __%"
            class="flexible-input"
            v-model="bd"
            v-mask="['###%', '##%']"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="report"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Laudo: Texto da conclusão do laudo."
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="eosinophilsBlood"
            type="text"
            :placeholder="`Eosinófilos no sangue: __céls/mm&sup3;`"
            v-mask="['##céls/mm&sup3', '###céls/mm&sup3']"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="eosinophilsSputum"
            type="text"
            :placeholder="`Eosinófilos no escarro: __%`"
            v-mask="['##%', '###%']"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Sensibilização a alérgenos:</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="skinTest"
            placeholder="Teste cutâneo?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in skinOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="ige"
            placeholder="IgE específica no sangue"
            size="large"
            clearable
          >
            <el-option
              v-for="item in igeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="allergens"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Quais alérgenos foram testados e quais deram positivos?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="igeTotal"
            type="text"
            placeholder="IgE total: __ UI/ml"
            v-mask="['##UI/ml', '###UI/ml']"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="FeNO"
            type="text"
            placeholder="FeNO: __ ppm"
            v-mask="['##ppm', '###ppm']"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="plethysmography"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Pletismografia (se realizado):"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="dlco"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Difusão de monóxido de carbono (DLCO) (se realizado):"
          />
        </input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">Outras informações</h1>
        <span class="line"></span>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="ageStart"
            type="number"
            placeholder="Início da doença com que idade: __"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Controle ambiental</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="dust"
            placeholder="Tem muita poeira doméstica em casa?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in dustOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="pet"
            placeholder="Animais em casa?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in petOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="petDescription"
            type="number"
            :disabled="pet !== 1"
            placeholder="Quantos?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="mold"
            placeholder="Mofo no domicílio?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in moldOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="exhibition"
            placeholder="Exposição ocupacional"
            size="large"
            clearable
          >
            <el-option
              v-for="item in exhibitionOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="exhibitionDescription"
            type="number"
            :disabled="exhibition !== 1"
            placeholder="Quais?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="activeSmoking"
            placeholder="Fumante ativo?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in activeSmokingOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-select
            v-model="passiveSmoking"
            placeholder="Fumante passivo?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in passiveSmokingOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="corticosteroid"
            placeholder="Exacerbação com uso de corticoide oral nos últimos 12 meses?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in corticosteroidOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="corticosteroidTimes"
            type="number"
            :disabled="corticosteroid !== 1"
            placeholder="Quantas vezes?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="hospitalization"
            placeholder="Hospitalização nos últimos 12 meses?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in hospitalizationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="hospitalizationTimes"
            type="number"
            :disabled="hospitalization !== 1"
            placeholder="Quantas vezes?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="uti"
            placeholder="Histórico de internação em UTI?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in utiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="utiTimes"
            type="number"
            :disabled="uti !== 1"
            placeholder="Quantas vezes?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="ventilation"
            placeholder="Histórico de necessidade de Ventilação Mecânica?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in ventilationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="ventilationTimes"
            type="number"
            :disabled="ventilation !== 1"
            placeholder="Quantas vezes?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="pcr"
            placeholder="Histórico de PCR?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in pcrOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
        <input-wrapper>
          <el-input
            v-model="pcrTimes"
            type="number"
            :disabled="pcr !== 1"
            placeholder="Quantas vezes?"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-select
            v-model="medications"
            placeholder="Uso de outras medicações?"
            size="large"
            clearable
          >
            <el-option
              v-for="item in medicationsOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="medicationsDescription"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            :disabled="medications !== 1"
            placeholder="Descreva..."
          />
        </input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">Observações adicionais</h1>
        <span class="line"></span>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="observations"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Descreva..."
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="save">
      <el-button type="primary" @click="handleSave">Salvar</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  components: {
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      titleAsthma: 'Diagnóstico de Asma Grave',
      asthma: null,
      asthmaOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      lungDiseases: null,
      lungDiseasesOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      asthmaTreatment: null,
      asthmaTreatmentOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      inhalation: null,
      inhalationOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      titleComorbidities: 'Em relação à potenciais comorbidades',
      comorbidities: null,
      comorbiditiesOptions: [
        {
          id: 1,
          name: 'Nenhuma'
        },
        {
          id: 2,
          name: 'Rinite alérgica'
        },
        {
          id: 3,
          name: 'Dermatite atópica'
        },
        {
          id: 4,
          name: 'Sinusopatia crônica com polipose nasal'
        },
        {
          id: 6,
          name: 'Obesidade'
        },
        {
          id: 6,
          name: 'Obesidade'
        },
        {
          id: 7,
          name: 'Apneia obstrutiva do sono'
        },
        {
          id: 8,
          name: 'Refluxo gastroesofágico'
        },
        {
          id: 9,
          name: 'Hipertensão arterial sistêmica'
        },
        {
          id: 10,
          name: 'Diabetes'
        },
        {
          id: 11,
          name: 'Outra'
        }
      ],
      otherComorbidities: null,
      comorbiditiesInfo: null,
      laba: null,
      labaOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      asthmaMedications: null,
      immunobiological: null,
      immunobiologicalOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      immunobiologicalDescription: null,
      titleExams: 'Exames adicionais',
      subtitleEspiro: 'Espirometria (último exame realizado)',
      espiroDate: null,
      preCvf: null,
      preVef: null,
      preVefCvf: null,
      preFef: null,
      posCvf: null,
      posVef: null,
      posVefCvf: null,
      posFef: null,
      bd: null,
      report: null,
      eosinophilsBlood: null,
      eosinophilsSputum: null,
      skinTest: null,
      skinOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      ige: null,
      igeOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      allergens: null,
      igeTotal: null,
      FeNO: null,
      plethysmography: null,
      dlco: null,
      ageStart: null,
      dust: null,
      dustOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      pet: null,
      petOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      petDescription: null,
      mold: null,
      moldOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      exhibition: null,
      exhibitionOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      exhibitionDescription: null,
      activeSmoking: null,
      activeSmokingOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      passiveSmoking: null,
      passiveSmokingOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      corticosteroid: null,
      corticosteroidOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      corticosteroidTimes: null,
      hospitalization: null,
      hospitalizationOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      hospitalizationTimes: null,
      uti: null,
      utiOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      utiTimes: null,
      ventilation: null,
      ventilationOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      ventilationTimes: null,
      pcr: null,
      pcrOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      pcrTimes: null,
      medications: null,
      medicationsOptions: [
        {
          id: 1,
          name: 'Sim'
        },
        {
          id: 2,
          name: 'Não'
        }
      ],
      medicationsDescription: null,
      observations: null,

      age: null,
      gender: null,
      genderOptions: [
        {
          id: 1,
          name: 'Masculino'
        },
        {
          id: 2,
          name: 'Feminino'
        }
      ],
      color: null,
      colorOptions: [
        {
          id: 1,
          name: 'Branco'
        },
        {
          id: 2,
          name: 'Preto'
        },
        {
          id: 3,
          name: 'Pardo'
        },
        {
          id: 4,
          name: 'Amarelo'
        },
        {
          id: 5,
          name: 'Indígena'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getVoucher']),

    isOtherComorbiditiesDisabled() {
      return !this.comorbidities.includes(10)
    },

    vef() {
      return 'VEF <sub style="vertical-align: sub;font-size: 70%">1</sub>'
    },

    vefCvf() {
      return 'VEF <sub style="vertical-align: sub;font-size: 70%">1</sub>/CVF'
    },

    fef() {
      return 'FEF <sub style="vertical-align: sub;font-size: 70%">25% - 75%</sub>'
    },

    isLoading() {
      return false
    }
  },
  methods: {
    ...mapActions('activeClinicalCases', ['editVoucher']),

    handleSave() {
      const userData = {
        data: {
          teste: 'aqui'
        },
        voucherId: this.getVoucher.voucherId
      }
      this.editVoucher(userData)
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

.content-subtitle {
  flex-direction: column;
  align-items: left;
  text-align: left;
  display: flex;
  padding: 10px 20px;
  .title {
    color: $green-500;
  }
}

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

.save {
  padding: 10px 0 20px 0;
  display: flex;
  place-content: end;

  button {
    width: 150px;
  }
}
</style>
