<template>
  <div id="active-clinical-case">
    <div @click="goBack" class="go-back">
      <el-icon :size="15">
        <DArrowLeft />
      </el-icon>
      <span>Voltar</span>
    </div>
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
          <label>Idade. *</label>
          <el-input
            type="number"
            placeholder="Idade."
            class="flexible-input"
            v-model="age"
            :disabled="!isEdit"
            min="0"
          />
        </input-wrapper>
        <input-wrapper>
          <label>Sexo. *</label>
          <el-select
            v-model="gender"
            placeholder="Sexo."
            size="large"
            filterable
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
          <label>Raça. *</label>
          <el-select
            v-model="color"
            placeholder="Cor."
            size="large"
            filterable
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
          <label>O paciente tem diagnóstico de asma? *</label>
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
          <label
            >Foram excluídas outras doenças pulmonares crônicas? (DPOC,
            bronquiectasias, fibrose cística, insuficiência cardáiaca, etc.) ?
            *</label
          >
          <el-select
            v-model="lungDiseases"
            placeholder="Foram excluídas outras doenças pulmonares crônicas? (DPOC, bronquiectasias, fibrose cística, insuficiência cardáiaca, etc.)?"
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
          <label
            >A adesão ao tratamento está adequada? (Checar idealmente com
            contagem de doses do dispositivo entre as consultas). *</label
          >
          <el-select
            v-model="asthmaTreatment"
            placeholder="A adesão ao tratamento está adequada? (Checar idealmente com contagem de doses do dispositivo entre as consultas)."
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
          <label
            >A técnica inalatória está adequada? (Ideal checagem em 2-3
            consultas). *</label
          >
          <el-select
            v-model="inhalation"
            :disabled="!isEdit"
            placeholder="A técnica inalatória está adequada? (Ideal checagem em 2-3 consultas)."
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
          <label>Quais o paciente apresenta? *</label>
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
          <label>Outras comorbidades:</label>
          <el-input
            v-model="otherComorbidities"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Outras comorbidades."
            :disabled="isOtherComorbiditiesDisabled || !isEdit"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <label
            >Todas aquelas manejáveis estão adequadamente tratadas? Descreva:.
            *</label
          >
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
          <label
            >O paciente usa dose elevada de corticoide associado a LABA?
            *</label
          >
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
          <label
            >Quais medicações para asma o paciente utiliza? (Incluir
            medicamentos, apresentação e posologia). *</label
          >
          <el-input
            v-model="asthmaMedications"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            :disabled="!isEdit"
            placeholder="Quais medicações para asma o paciente utiliza? (Incluir medicamentos, apresentação e posologia)."
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <label>O paciente fez/faz uso de imunobiológico(s)? *</label>
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
          <label
            >Em caso positivo, descreva o medicamento e tempo de uso.</label
          >
          <el-input
            v-model="immunobiologicalDescription"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            placeholder="Em caso positivo, descreva o medicamento e tempo de uso."
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
        <h2 class="title">Pré-BD.</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="preCvf"
            placeholder="__%"
            :disabled="!isEdit"
            @keydown="handleKeyDown"
            @blur="verifyPreCvf"
          >
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preVef"
            placeholder="__%"
            :disabled="!isEdit"
            @keydown="handleKeyDown"
            @blur="verifyPreVef"
          >
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preVefCvf"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPreVefCvf"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="preFef"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPreFef"
          >
            <template #prepend><span v-html="fef"/></template>
          </el-input>
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Pós-BD.</h2>
      </div>
      <input-group>
        <input-wrapper>
          <el-input
            v-model="posCvf"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPosCvf"
          >
            <template #prepend>CVF</template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posVef"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPosVef"
          >
            <template #prepend><span v-html="vef"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posVefCvf"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPosVefCvf"
          >
            <template #prepend><span v-html="vefCvf"/></template>
          </el-input>
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="posFef"
            placeholder="__%"
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyPosFef"
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
            @keydown="handleKeyDown"
            :disabled="!isEdit"
            @blur="verifyBd"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <label>Laudo: Texto da conclusão do laudo. *</label>
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
          <label>Eosinófilos no sangue: __céls/mm&sup3;. *</label>
          <el-input
            v-model="eosinophilsBlood"
            type="text"
            :placeholder="`Eosinófilos no sangue: __céls/mm&sup3;`"
            :disabled="!isEdit"
            v-mask="['#céls/mm&sup3', '##céls/mm&sup3', '###céls/mm&sup3']"
          />
        </input-wrapper>
        <input-wrapper>
          <label>Eosinófilos no escarro: __% *</label>
          <el-input
            v-model="eosinophilsSputum"
            type="text"
            :placeholder="`Eosinófilos no escarro: __%`"
            :disabled="!isEdit"
            @keydown="handleKeyDown"
            @blur="verifyEosinophilsSputum"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Sensibilização a alérgenos:</h2>
      </div>
      <input-group>
        <input-wrapper>
          <label>Teste cutâneo? *</label>
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
          <label>IgE específica no sangue. *</label>
          <el-select
            v-model="ige"
            placeholder="IgE específica no sangue."
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
          <label
            >Quais alérgenos foram testados e quais deram positivos? *</label
          >
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
          <label>IgE total: __ UI/ml *</label>
          <el-input
            v-model="igeTotal"
            type="text"
            placeholder="IgE total: __ UI/ml"
            :disabled="!isEdit"
            v-mask="['#UI/ml', '##UI/ml', '###UI/ml']"
          />
        </input-wrapper>
        <input-wrapper>
          <label>FeNO: __ ppm *</label>
          <el-input
            v-model="FeNO"
            type="text"
            placeholder="FeNO: __ ppm"
            :disabled="!isEdit"
            v-mask="['#ppm', '##ppm', '###ppm']"
          />
        </input-wrapper>
      </input-group>
      <input-group>
        <input-wrapper>
          <label>Pletismografia (se realizado):</label>
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
          <label>Difusão de monóxido de carbono (DLCO) (se realizado):</label>
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
        <!-- <input-wrapper>
          <form @submit.prevent="submit" enctype="multipart/form-data">
            <input
              id="actionsNewAsset"
              ref="file"
              type="file"
              name="file"
              class="att__search-input"
              accept="image/png, image/gif, image/jpg, image/jpeg, .pdf"
              @change="handleFile"
            />
            <button type="submit">Enviar Arquivo</button>
          </form>
        </input-wrapper> -->
        <input-wrapper class="clinical-case-upload">
          <label>TC de tórax (fazer upload de imagem e laudo). *</label>
          <el-upload
            v-model="fileList"
            class="upload-demo"
            :auto-upload="false"
            @change="handleFileImg"
            :disabled="!isEdit"
            :show-file-list="false"
          >
            <template #trigger>
              <el-input
                type="text"
                placeholder="TC de tórax (fazer upload de imagem e laudo)."
                :suffix-icon="iconImg"
              />
            </template>
          </el-upload>

          <div class="filepath" v-for="file in getFile" :key="file.id">
            <PictureFilled style="width: 1em; height: 1em; margin-right: 8px" />
            <p @click="handleDownload(file.id, file.fileName)" class="filename">
              {{ file.fileName }}
            </p>
          </div>
        </input-wrapper>
      </input-group>
      <div class="content-title">
        <h1 class="title">Outras informações</h1>
        <span class="line"></span>
      </div>
      <input-group>
        <input-wrapper>
          <label>Início da doença com que idade: *</label>
          <el-input
            v-model="ageStart"
            type="number"
            min="0"
            placeholder="Início da doença com que idade:"
            :disabled="!isEdit"
          />
        </input-wrapper>
      </input-group>
      <div class="content-subtitle">
        <h2 class="title">Controle ambiental.</h2>
      </div>
      <input-group>
        <input-wrapper>
          <label>Tem muita poeira doméstica em casa? *</label>
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
          <label>Animais em casa? *</label>
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
          <label>Quantos?</label>
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
          <label>Mofo no domicílio? *</label>
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
          <label>Exposição ocupacional. *</label>
          <el-select
            v-model="exhibition"
            placeholder="Exposição ocupacional."
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
          <label>Quais?</label>
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
          <label>Fumante ativo? *</label>
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
          <label>Fumante passivo? *</label>
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
          <label
            >Exacerbação com uso de corticoide oral nos últimos 12 meses?
            *</label
          >
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
          <label>Quantas vezes?</label>
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
          <label>Hospitalização nos últimos 12 meses? *</label>
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
          <label>Quantas vezes?</label>
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
          <label>Histórico de internação em UTI? *</label>
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
          <label>Quantas vezes?</label>
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
          <label>Histórico de necessidade de Ventilação Mecânica? *</label>
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
          <label>Quantas vezes?</label>
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
          <label>Histórico de PCR? *</label>
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
          <label>Quantas vezes?</label>
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
          <label>Uso de outras medicações? *</label>
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
          <label>Descreva...</label>
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
          <label>Descreva... *</label>
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
    <div v-if="!isEdit" class="exams">
      <div class="content-title">
        <h1 class="title">Exames e Laudos Adicionais</h1>
        <span class="line"></span>
      </div>
      <div class="filepath" v-for="file in getFile" :key="file.id">
        <PictureFilled style="width: 1em; height: 1em; margin-right: 8px" />
        <p @click="handleDownload(file.id, file.fileName)" class="filename">
          {{ file.fileName }}
        </p>
      </div>
    </div>
    <div class="btn" v-if="isEdit">
      <el-button
        :disabled="handleEnabledSave"
        class="save"
        type="primary"
        @click="handleSave"
        >Salvar</el-button
      >
      <el-button class="send" type="primary" @click="handleActiveVoucher"
        >Submeter para avaliação</el-button
      >
    </div>
  </div>
</template>

<script>
import { PictureFilled, DArrowLeft } from '@element-plus/icons-vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import router from '@/router'

export default {
  components: {
    InputGroup,
    InputWrapper,
    DArrowLeft,
    PictureFilled
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      iconImg: PictureFilled,
      titleAsthma: 'Diagnóstico de Asma Grave',
      asthma: null,
      asthmaOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      lungDiseases: null,
      lungDiseasesOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      asthmaTreatment: null,
      asthmaTreatmentOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      inhalation: null,
      inhalationOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      error: null,
      isModalDashedErroVisible: false,
      titleComorbidities: 'Em relação a potenciais comorbidades.',
      comorbidities: null,
      comorbiditiesOptions: [
        {
          id: 1,
          name: 'Nenhuma.'
        },
        {
          id: 2,
          name: 'Rinite alérgica.'
        },
        {
          id: 3,
          name: 'Dermatite atópica.'
        },
        {
          id: 4,
          name: 'Sinusopatia crônica com polipose nasal.'
        },
        {
          id: 6,
          name: 'Obesidade.'
        },
        {
          id: 7,
          name: 'Apneia obstrutiva do sono.'
        },
        {
          id: 8,
          name: 'Refluxo gastroesofágico.'
        },
        {
          id: 9,
          name: 'Hipertensão arterial sistêmica.'
        },
        {
          id: 10,
          name: 'Diabetes.'
        },
        {
          id: 11,
          name: 'Outras.'
        }
      ],
      otherComorbidities: null,
      comorbiditiesInfo: null,
      laba: null,
      labaOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      asthmaMedications: null,
      immunobiological: null,
      immunobiologicalOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
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
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      ige: null,
      igeOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
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
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      pet: null,
      petOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      petDescription: null,
      mold: null,
      moldOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      exhibition: null,
      exhibitionOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      exhibitionDescription: null,
      activeSmoking: null,
      activeSmokingOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      passiveSmoking: null,
      passiveSmokingOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      corticosteroid: null,
      corticosteroidOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      corticosteroidTimes: null,
      hospitalization: null,
      hospitalizationOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      hospitalizationTimes: null,
      uti: null,
      utiOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      utiTimes: null,
      ventilation: null,
      ventilationOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      ventilationTimes: null,
      pcr: null,
      pcrOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      pcrTimes: null,
      medications: null,
      medicationsOptions: [
        {
          id: 1,
          name: 'Sim.'
        },
        {
          id: 2,
          name: 'Não.'
        }
      ],
      medicationsDescription: null,
      observations: null,
      gender: null,
      genderOptions: [
        {
          id: 2,
          name: 'Feminino.'
        },
        {
          id: 1,
          name: 'Masculino.'
        }
      ],
      age: null,
      color: null,
      colorOptions: [
        {
          id: 1,
          name: 'Branca.'
        },
        {
          id: 2,
          name: 'Preta.'
        },
        {
          id: 3,
          name: 'Parda.'
        },
        {
          id: 4,
          name: 'Amarela.'
        },
        {
          id: 5,
          name: 'Indígena.'
        }
      ],
      selectedFile: {},
      fileImg: null
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
    },
    comorbidities() {
      if (!this.comorbidities?.includes(11))
        return this.clearOtherComorbidities()
    },

    immunobiological() {
      if (this.immunobiological === 2)
        return this.clearImmunobiologicalDescription()
    },

    pet() {
      if (this.pet === 2) return this.clearPetDescription()
    },

    exhibition() {
      if (this.exhibition === 2) return this.clearExhibitionDescription()
    },

    corticosteroid() {
      if (this.corticosteroid === 2) return (this.corticosteroidTimes = null)
    },

    hospitalization() {
      if (this.hospitalization === 2) return (this.hospitalizationTimes = null)
    },

    uti() {
      if (this.uti === 2) return (this.utiTimes = null)
    },

    ventilation() {
      if (this.ventilation === 2) return (this.ventilationTimes = null)
    },

    pcr() {
      if (this.pcr === 2) return (this.pcrTimes = null)
    },

    medications() {
      if (this.medications === 2) return (this.medicationsDescription = null)
    }
  },
  computed: {
    ...mapGetters(['getUserToken']),
    ...mapGetters('clinicalCasesEvaluation', ['getVoucher']),
    ...mapGetters('activeClinicalCases', [
      'getLoading',
      'getVoucherInfos',
      'getFile'
    ]),

    isConsultant() {
      // Recuperar o tipo do localStorage
      const type = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).type
        : null

      // Retornar o tipo, ou uma string padrão se não. estiver definido
      return type || 'Tipo não. definido'
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
    },

    verifyOtherComorbidities() {
      if (this.isOtherComorbiditiesDisabled) return !this.otherComorbidities
      else return this.otherComorbidities
    },

    verifyImmunobiologicalDescription() {
      if (this.immunobiological === 2) return !this.immunobiologicalDescription
      else return this.immunobiologicalDescription
    },

    verifyPet() {
      if (this.pet === 2) return !this.petDescription
      else return this.petDescription
    },

    verifyExhibition() {
      if (this.exhibition === 2) return !this.exhibitionDescription
      else return this.exhibitionDescription
    },

    verifyCorticosteroid() {
      if (this.corticosteroid === 2) return !this.corticosteroidTimes
      else return this.corticosteroidTimes
    },

    verifyHospitalization() {
      if (this.hospitalization === 2) return !this.hospitalizationTimes
      else return this.hospitalizationTimes
    },

    verifyTimes() {
      if (this.uti === 2) return !this.utiTimes
      else return this.utiTimes
    },

    verifyVentilation() {
      if (this.ventilation === 2) return !this.ventilationTimes
      else return this.ventilationTimes
    },

    verifyPcr() {
      if (this.pcr === 2) return !this.pcrTimes
      else return this.pcrTimes
    },

    verifyMedications() {
      if (this.medications === 2) return !this.medicationsDescription
      else return this.medicationsDescription
    },

    handleEnabledSave() {
      return (
        !this.age ||
        !this.gender ||
        !this.color ||
        !this.asthma ||
        !this.lungDiseases ||
        !this.asthmaTreatment ||
        !this.inhalation ||
        !this.comorbidities ||
        !this.verifyOtherComorbidities ||
        !this.comorbiditiesInfo ||
        !this.laba ||
        !this.asthmaMedications ||
        !this.immunobiological ||
        !this.verifyImmunobiologicalDescription ||
        !this.espiroDate ||
        !this.preCvf ||
        !this.preVef ||
        !this.preVefCvf ||
        !this.preFef ||
        !this.posCvf ||
        !this.posVef ||
        !this.posVefCvf ||
        !this.posFef ||
        !this.bd ||
        !this.report ||
        !this.eosinophilsBlood ||
        !this.eosinophilsSputum ||
        !this.skinTest ||
        !this.ige ||
        !this.allergens ||
        !this.igeTotal ||
        !this.FeNO ||
        !this.plethysmography ||
        !this.dlco ||
        !this.ageStart ||
        !this.dust ||
        !this.pet ||
        !this.verifyPet ||
        !this.mold ||
        !this.exhibition ||
        !this.verifyExhibition ||
        !this.activeSmoking ||
        !this.passiveSmoking ||
        !this.corticosteroid ||
        !this.verifyCorticosteroid ||
        !this.hospitalization ||
        !this.verifyHospitalization ||
        !this.uti ||
        !this.verifyTimes ||
        !this.ventilation ||
        !this.verifyVentilation ||
        !this.pcr ||
        !this.verifyPcr ||
        !this.medications ||
        !this.verifyMedications ||
        !this.observations
      )
    }
  },
  methods: {
    ...mapActions('activeClinicalCases', [
      'fechVoucherDownload',
      'saveEditVoucher',
      'activeVoucher',
      'fetchVoucher',
      'fetchFile'
    ]),
    ...mapActions('clinicalCasesEvaluation', ['offActiveVoucherPage']),

    handleKeyDown(event) {
      // Permite apenas entrada numérica, a tecla Backspace, Tab e ações de cursor
      const isNumeric = /^[0-9]$/.test(event.key)
      const isBackspace = event.key === 'Backspace'
      const isTab = event.key === 'Tab'
      const isCursorAction =
        event.key.startsWith('Arrow') ||
        event.key.startsWith('Home') ||
        event.key.startsWith('End')

      if (!(isNumeric || isBackspace || isTab || isCursorAction)) {
        event.preventDefault()
      }
    },
    verifyPreCvf() {
      // Remove caracteres não numéricos e garante que o valor seja um número
      let numericValue = parseFloat(this.preCvf.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.preCvf = `${numericValue}%`
    },

    clearOtherComorbidities() {
      this.otherComorbidities = null
    },

    clearImmunobiologicalDescription() {
      this.immunobiologicalDescription = null
    },

    clearPetDescription() {
      this.petDescription = null
    },

    clearExhibitionDescription() {
      this.exhibitionDescription = null
    },

    // verifyPreCvf() {
    //   if (parseInt(this.preCvf) > 100) return (this.preCvf = '100%')
    // },

    verifyPreVef() {
      let numericValue = parseFloat(this.preVef.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.preVef = `${numericValue}%`
    },

    verifyPreVefCvf() {
      let numericValue = parseFloat(this.preVefCvf.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.preVefCvf = `${numericValue}%`
    },

    verifyPreFef() {
      let numericValue = parseFloat(this.preFef.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.preFef = `${numericValue}%`
    },

    verifyPosCvf() {
      let numericValue = parseFloat(this.posCvf.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.posCvf = `${numericValue}%`
    },

    verifyPosVef() {
      let numericValue = parseFloat(this.posVef.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.posVef = `${numericValue}%`
    },

    verifyPosVefCvf() {
      let numericValue = parseFloat(this.posVefCvf.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.posVefCvf = `${numericValue}%`
    },

    verifyPosFef() {
      let numericValue = parseFloat(this.posFef.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.posFef = `${numericValue}%`
    },

    verifyBd() {
      let numericValue = parseFloat(this.bd.replace(/[^0-9]/g, ''))

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.bd = `${numericValue}%`
    },

    verifyEosinophilsSputum() {
      let numericValue = parseFloat(
        this.eosinophilsSputum.replace(/[^0-9]/g, '')
      )

      // Garante que o valor não ultrapasse 100
      numericValue = Math.min(100, numericValue)

      // Atualiza o valor formatado
      this.eosinophilsSputum = `${numericValue}%`
    },

    handleDownload(id, name) {
      const fileData = {
        id: id,
        name: name
      }
      this.fechVoucherDownload(fileData)
    },

    goBack() {
      if (this.isConsultant === 'consultant_doctor')
        return router.push('/clinical-cases-consultation-doctor')
      else router.push('/clinical-cases-evaluation')
    },

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

    handleFile(event) {
      this.selectedFile = event.target.files[0]
    },

    async handleFileImg(file) {
      this.selectedFile = file.raw

      await this.submit()
    },

    async submit() {
      const url = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
      const voucherId = this.getVoucher.id
      const formData = new FormData()
      formData.append('body', this.selectedFile)

      await axios
        .post(`${url}/voucher/${voucherId}/document`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.getUserToken}`
          }
        })
        .then(() => {
          this.toast.success('Upload realizado com sucesso', {
            timeout: 8000
          })
        })
        .catch(() => {
          this.toast.warning('Não. foi possível realizar o upload do arquivo')
        })
        .finally(() => {
          this.fetchFile(voucherId)
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

  .go-back {
    position: fixed;
    bottom: 100px;
    right: 40px;
    cursor: pointer;
    color: $grayDark;
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
      transition: 0.5s;

      &:hover {
        text-decoration: underline;
        color: $grayDark;
      }
    }

    i {
      background: $green-500;
      color: white;
      border-radius: 19%;
      margin-left: 5px;
    }
  }
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
  padding: 30px 20px 0 20px;

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

label {
  margin: 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: $grayDark;
}

.filepath {
  display: flex;
  align-items: center;
  margin: 20px;

  .filename {
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border-bottom: 1px solid #000;
    }
  }
}
</style>
