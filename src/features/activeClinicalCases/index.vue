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
            :disabled="!isEdit"
            min="0"
          />
        </input-wrapper>
        <input-wrapper>
          <el-select
            v-model="gender"
            placeholder="Sexo"
            size="large"
            clearable
            :disabled="!isEdit"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </input-wrapper>
        <input-wrapper>
          <el-select
            v-model="color"
            placeholder="Cor"
            size="large"
            clearable
            :disabled="!isEdit"
          >
            <el-option
              v-for="item in colorOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            placeholder="Outras comorbidades"
            :disabled="isOtherComorbiditiesDisabled || !isEdit"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="comorbiditiesInfo"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="immunobiological !== 1 || !isEdit"
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
            :disabled="!isEdit"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Pré-BD</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="preCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preVef"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preVefCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preFef"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend><span v-html="fef"/></template>
          </el-input>
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Pós-BD</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="posCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posVef"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posVefCvf"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posFef"
            placeholder="__%"
            v-mask="['###%', '##%']"
            :disabled="!isEdit"
          >
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
            :disabled="!isEdit"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="report"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
            v-mask="['##céls/mm&sup3', '###céls/mm&sup3']"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="eosinophilsSputum"
            type="text"
            :placeholder="`Eosinófilos no escarro: __%`"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
            v-mask="['##UI/ml', '###UI/ml']"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="FeNO"
            type="text"
            placeholder="FeNO: __ ppm"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
            placeholder="Difusão de monóxido de carbono (DLCO) (se realizado):"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <form @submit.prevent="submit" enctype="multipart/form-data">
            <input id="file" type="file" ref="fileInput" @change="handleFile" />
            <button type="submit">Enviar Arquivo</button>
          </form>
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
            min="0"
            placeholder="Início da doença com que idade: __"
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="pet !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            type="text"
            min="0"
            :disabled="exhibition !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="corticosteroid !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="hospitalization !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="uti !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="ventilation !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            min="0"
            :disabled="pcr !== 1 || !isEdit"
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
            :disabled="!isEdit"
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
            :disabled="medications !== 1 || !isEdit"
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
            :disabled="!isEdit"
            placeholder="Descreva..."
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="btn" v-if="isEdit">
      <el-button class="save" type="primary" @click="handleSave"
        >Salvar</el-button
      >
      <el-button class="send" type="primary" @click="handleActiveVoucher"
        >Submeter para avaliação</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import router from '@/router'

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
      file: null, // Aqui é onde você armazenará o arquivo
      error: null,
      isModalDashedErroVisible: false,
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
      age: null,
      color: null,
      colorOptions: [
        {
          id: 1,
          name: 'Branca'
        },
        {
          id: 2,
          name: 'Preta'
        },
        {
          id: 3,
          name: 'Parda'
        },
        {
          id: 4,
          name: 'Amarela'
        },
        {
          id: 5,
          name: 'Indígena'
        }
      ]
    }
  },
  created() {
    if (!this.getVoucher.id) return router.push('/')
  },
  mounted() {
    this.offActiveVoucherPage()
    this.fetchVoucher(this.getVoucher.id)
    this.verifyIsEdit(this.getVoucherInfos)
  },
  watch: {
    getVoucherInfos() {
      this.verifyIsEdit(this.getVoucherInfos)
      this.handleData()
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', ['getVoucher']),
    ...mapGetters('activeClinicalCases', ['getLoading', 'getVoucherInfos']),

    isConsultant() {
      // Recuperar o tipo do localStorage
      const type = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).type
        : null

      // Retornar o tipo, ou uma string padrão se não estiver definido
      return type || 'Tipo não definido'
    },

    isOtherComorbiditiesDisabled() {
      return !this.comorbidities?.includes(11)
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
      return this.getLoading
    },

    isEdit() {
      if (this.isConsultant === 'consultant_doctor') return false
      if (
        this.getVoucherInfos.length !== 0 &&
        this.getVoucherInfos?.status !== 'aloc'
      )
        return false
      return true
    }
  },
  methods: {
    ...mapActions('activeClinicalCases', [
      'saveEditVoucher',
      'activeVoucher',
      'fetchVoucher'
    ]),
    ...mapActions('clinicalCasesEvaluation', ['offActiveVoucherPage']),

    handleSave() {
      const userData = {
        data: JSON.stringify({
          age: this.age,
          gender: this.gender,
          color: this.color,
          asthma: this.asthma,
          lungDiseases: this.lungDiseases,
          asthmaTreatment: this.asthmaTreatment,
          inhalation: this.inhalation,
          comorbidities: this.comorbidities,
          otherComorbidities: this.otherComorbidities,
          comorbiditiesInfo: this.comorbiditiesInfo,
          laba: this.laba,
          asthmaMedications: this.asthmaMedications,
          immunobiological: this.immunobiological,
          immunobiologicalDescription: this.immunobiologicalDescription,
          espiroDate: this.espiroDate,
          preCvf: this.preCvf,
          preVef: this.preVef,
          preVefCvf: this.preVefCvf,
          preFef: this.preFef,
          posCvf: this.posCvf,
          posVef: this.posVef,
          posVefCvf: this.posVefCvf,
          posFef: this.posFef,
          bd: this.bd,
          report: this.report,
          eosinophilsBlood: this.eosinophilsBlood,
          eosinophilsSputum: this.eosinophilsSputum,
          skinTest: this.skinTest,
          ige: this.ige,
          allergens: this.allergens,
          igeTotal: this.igeTotal,
          FeNO: this.FeNO,
          plethysmography: this.plethysmography,
          dlco: this.dlco,
          ageStart: this.ageStart,
          dust: this.dust,
          pet: this.pet,
          petDescription: this.petDescription,
          mold: this.mold,
          exhibition: this.exhibition,
          exhibitionDescription: this.exhibitionDescription,
          activeSmoking: this.activeSmoking,
          passiveSmoking: this.passiveSmoking,
          corticosteroid: this.corticosteroid,
          corticosteroidTimes: this.corticosteroidTimes,
          hospitalization: this.hospitalization,
          hospitalizationTimes: this.hospitalizationTimes,
          uti: this.uti,
          utiTimes: this.utiTimes,
          ventilation: this.ventilation,
          ventilationTimes: this.ventilationTimes,
          pcr: this.pcr,
          pcrTimes: this.pcrTimes,
          medications: this.medications,
          medicationsDescription: this.medicationsDescription,
          observations: this.observations
        }),
        voucherId: this.getVoucher.id
      }
      this.saveEditVoucher(userData)
    },

    handleActiveVoucher() {
      const userData = {
        data: JSON.stringify({
          age: this.age,
          gender: this.gender,
          color: this.color,
          asthma: this.asthma,
          lungDiseases: this.lungDiseases,
          asthmaTreatment: this.asthmaTreatment,
          inhalation: this.inhalation,
          comorbidities: this.comorbidities,
          otherComorbidities: this.otherComorbidities,
          comorbiditiesInfo: this.comorbiditiesInfo,
          laba: this.laba,
          asthmaMedications: this.asthmaMedications,
          immunobiological: this.immunobiological,
          immunobiologicalDescription: this.immunobiologicalDescription,
          espiroDate: this.espiroDate,
          preCvf: this.preCvf,
          preVef: this.preVef,
          preVefCvf: this.preVefCvf,
          preFef: this.preFef,
          posCvf: this.posCvf,
          posVef: this.posVef,
          posVefCvf: this.posVefCvf,
          posFef: this.posFef,
          bd: this.bd,
          report: this.report,
          eosinophilsBlood: this.eosinophilsBlood,
          eosinophilsSputum: this.eosinophilsSputum,
          skinTest: this.skinTest,
          ige: this.ige,
          allergens: this.allergens,
          igeTotal: this.igeTotal,
          FeNO: this.FeNO,
          plethysmography: this.plethysmography,
          dlco: this.dlco,
          ageStart: this.ageStart,
          dust: this.dust,
          pet: this.pet,
          petDescription: this.petDescription,
          mold: this.mold,
          exhibition: this.exhibition,
          exhibitionDescription: this.exhibitionDescription,
          activeSmoking: this.activeSmoking,
          passiveSmoking: this.passiveSmoking,
          corticosteroid: this.corticosteroid,
          corticosteroidTimes: this.corticosteroidTimes,
          hospitalization: this.hospitalization,
          hospitalizationTimes: this.hospitalizationTimes,
          uti: this.uti,
          utiTimes: this.utiTimes,
          ventilation: this.ventilation,
          ventilationTimes: this.ventilationTimes,
          pcr: this.pcr,
          pcrTimes: this.pcrTimes,
          medications: this.medications,
          medicationsDescription: this.medicationsDescription,
          observations: this.observations
        }),
        voucherId: this.getVoucher.id
      }
      this.activeVoucher(userData)
      this.fetchVoucher(this.getVoucher.id)
      this.verifyIsEdit(this.getVoucherInfos)
    },

    handleFile() {
      this.selectedFile = this.$refs.fileInput.files[0]
    },

    submit() {
      const voucherId = this.getVoucher.voucherId
      const formData = new FormData()
      formData.append('file', this.selectedFile)

      axios
        .post(
          `https://meso.poatech.com.br:450/clinical-case/api/1.0/voucher/${voucherId}/document`,
          formData
        )
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    verifyIsEdit(getVoucherInfos) {
      if (getVoucherInfos?.status === 'ativ') return

      return (this.isEdit = true)
    },

    handleData() {
      const questionnaire = this.getVoucherInfos.questionnaire
      if (!questionnaire) return

      const jsonString = questionnaire
      const jsonObject = JSON.parse(jsonString.replace(/'/g, '"'))

      this.age = jsonObject?.age
      this.gender = jsonObject?.gender
      this.color = jsonObject?.color
      this.asthma = jsonObject?.asthma
      this.lungDiseases = jsonObject?.lungDiseases
      this.asthmaTreatment = jsonObject?.asthmaTreatment
      this.inhalation = jsonObject?.inhalation
      this.comorbidities = jsonObject?.comorbidities
      this.otherComorbidities = jsonObject?.otherComorbidities
      this.comorbiditiesInfo = jsonObject?.comorbiditiesInfo
      this.laba = jsonObject?.laba
      this.asthmaMedications = jsonObject?.asthmaMedications
      this.immunobiological = jsonObject?.immunobiological
      this.immunobiologicalDescription = jsonObject?.immunobiologicalDescription
      this.espiroDate = jsonObject?.espiroDate
      this.preCvf = jsonObject?.preCvf
      this.preVef = jsonObject?.preVef
      this.preVefCvf = jsonObject?.preVefCvf
      this.preFef = jsonObject?.preFef
      this.posCvf = jsonObject?.posCvf
      this.posVef = jsonObject?.posVef
      this.posVefCvf = jsonObject?.posVefCvf
      this.posFef = jsonObject?.posFef
      this.bd = jsonObject?.bd
      this.report = jsonObject?.report
      this.eosinophilsBlood = jsonObject?.eosinophilsBlood
      this.eosinophilsSputum = jsonObject?.eosinophilsSputum
      this.skinTest = jsonObject?.skinTest
      this.ige = jsonObject?.ige
      this.allergens = jsonObject?.allergens
      this.igeTotal = jsonObject?.igeTotal
      this.FeNO = jsonObject?.FeNO
      this.plethysmography = jsonObject?.plethysmography
      this.dlco = jsonObject?.dlco
      this.ageStart = jsonObject?.ageStart
      this.dust = jsonObject?.dust
      this.pet = jsonObject?.pet
      this.petDescription = jsonObject?.petDescription
      this.mold = jsonObject?.mold
      this.exhibition = jsonObject?.exhibition
      this.exhibitionDescription = jsonObject?.exhibitionDescription
      this.activeSmoking = jsonObject?.activeSmoking
      this.passiveSmoking = jsonObject?.passiveSmoking
      this.corticosteroid = jsonObject?.corticosteroid
      this.corticosteroidTimes = jsonObject?.corticosteroidTimes
      this.hospitalization = jsonObject?.hospitalization
      this.hospitalizationTimes = jsonObject?.hospitalizationTimes
      this.uti = jsonObject?.uti
      this.utiTimes = jsonObject?.utiTimes
      this.ventilation = jsonObject?.ventilation
      this.ventilationTimes = jsonObject?.ventilationTimes
      this.pcr = jsonObject?.pcr
      this.pcrTimes = jsonObject?.pcrTimes
      this.medications = jsonObject?.medications
      this.medicationsDescription = jsonObject?.medicationsDescription
      this.observations = jsonObject?.observations
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

.btn {
  padding: 10px 0 20px 0;
  display: flex;
  place-content: end;

  .save {
    width: 150px;
  }

  .send {
    width: 250px;
  }
}
</style>
