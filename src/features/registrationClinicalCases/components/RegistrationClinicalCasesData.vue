<template>
  <div class="container">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <el-select
            v-model="industry"
            placeholder="Patrocinador"
            no-match-text="Nenhuma indústria encontrada"
            filterable
            size="large"
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
            v-model="disease"
            placeholder="Doenças"
            no-match-text="Nenhuma doença encontrada"
            filterable
            size="large"
            clearable
          >
            <el-option
              v-for="item in getDiseases"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper>
          <el-select
            v-model="specialty"
            placeholder="Especialidades"
            no-match-text="Nenhuma especialidade encontrada"
            filterable
            size="large"
            clearable
          >
            <el-option
              v-for="item in getSpecialties"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>
        <!-- <InputWrapper>
          <div class="input-with-icon">
            <input
              type="text"
              v-model="specialtyName"
              placeholder="Especialidade"
              class="flexible-input"
              @click="openSpecialtyModal"
              readonly
            />
            <span class="icon" aria-hidden="true">
              <font-awesome-icon
                :icon="toggleIcon"
                :style="{ color: iconColor }"
              />
            </span>
          </div>
        </InputWrapper> -->
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="name"
            placeholder="Denominação Casos Clínicos"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="quantity"
            type="number"
            min="0"
            placeholder="Quantidade de Casos Clínicos"
            class="flexible-input"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="Data de Início"
            format="DD/MM/YYYY"
            size="large"
            @change="handleStartDateChange"
          />
        </InputWrapper>

        <InputWrapper>
          <el-date-picker
            v-model="expirationDate"
            type="date"
            placeholder="Data de Validade"
            format="DD/MM/YYYY"
            size="large"
            :disabledDate="disableExpirationDate"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="fees"
            type="number"
            min="0"
            placeholder="Honorários Médico Consultor"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper></InputWrapper>
      </InputGroup>
      <div class="save">
        <el-button type="primary" @click="handleSave" :disabled="isSaveDisabled"
          >Salvar</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'
import { convertDateToISOFormat } from '@/helpers/date'

export default {
  name: 'RegistrationClinicalCasesData',
  components: {
    InputWrapper,
    InputGroup,
    Title
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      toggleIcon: faCirclePlus,
      name: null,
      quantity: null,
      specialty: null,
      iconColor: '$green-500',
      disease: null,
      industry: null,
      startDate: '',
      expirationDate: '',
      fees: null,
      specialtyModalVisible: false,
      diseaseModalVisible: false
    }
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties']),
    ...mapGetters('industry', ['getIndustries']),
    ...mapGetters('disease', ['getDiseases']),

    isSaveDisabled() {
      return (
        !this.name ||
        !this.quantity ||
        !this.specialty ||
        !this.disease ||
        !this.industry ||
        !this.startDate ||
        !this.expirationDate ||
        !this.fees
      )
    }

    // expirationDateOptions() {
    //   return {
    //     disabledDate(time) {
    //       // Desativa datas anteriores à startDate
    //       return time.getTime() < this.startDate.getTime()
    //     }
    //   }
    // }
  },
  mounted() {
    this.fetchSpecialties(50)
    this.fetchIndustries(50)
    this.fetchDiseases(50)
  },
  methods: {
    ...mapActions('registrationClinicalCases', ['createClinicalCase']),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('disease', ['fetchDiseases']),

    disableExpirationDate(date) {
      if (this.startDate) {
        return date < new Date(this.startDate)
      }
      return false
    },
    handleStartDateChange() {
      this.expirationDate = null
    },
    formatDateToString(date) {
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    },

    async handleSave() {
      const formattedStartDate = this.formatDateToString(this.startDate)
      const formattedExpirationDate = this.formatDateToString(
        this.expirationDate
      )
      const userData = {
        vouchersQuantity: parseInt(this.quantity),
        specialtyId: this.specialty,
        diseaseId: this.disease,
        industryId: this.industry,
        startDate: convertDateToISOFormat(formattedStartDate),
        endDate: convertDateToISOFormat(formattedExpirationDate),
        consultantDoctorFees: this.fees,
        contractName: this.name
      }

      try {
        await this.createClinicalCase(userData)
        this.toast.success('Cadastro efetuado criado com sucesso', {
          timeout: 8000
        })
      } catch (error) {
        this.toast.warning(
          'Não foi possível realizar o Registro de Caso Clínico',
          {
            timeout: 8000
          }
        )
      }
      this.clearForm()
    },
    clearForm() {
      this.name = null
      this.quantity = null
      this.industry = null
      this.specialty = null
      this.disease = null
      this.startDate = null
      this.expirationDate = null
      this.fees = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
