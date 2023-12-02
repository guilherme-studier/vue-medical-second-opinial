<template>
  <div id="allocation-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="name"
            placeholder="Nome do médico"
            class="flexible-input"
            type="text"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="email"
            placeholder="E-mail"
            class="flexible-input"
            type="email"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="quantity"
            placeholder="Quantidade de casos clínicos"
            class="flexible-input"
            type="number"
            min="0"
          />
        </InputWrapper>
        <InputWrapper>
          <el-select
            v-model="contract"
            placeholder="Casos Clínicos"
            no-match-text="Nenhuma caso clínico encontrado"
            filterable
            size="large"
            clearable
          >
            <el-option
              v-for="item in getContracts"
              :key="item?.contractId"
              :label="item?.contractName"
              :value="item?.contractId"
            />
          </el-select>
        </InputWrapper>
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
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

export default {
  name: 'AllocationClinicalCasesForm',
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
      name: null,
      quantity: null,
      email: null,
      contract: null
    }
  },
  computed: {
    ...mapGetters('consultationClinicalCases', ['getContracts']),
    isSaveDisabled() {
      return !this.name || !this.email || !this.quantity
    }
  },
  async mounted() {
    await this.getUser()
    const industryId = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).industryId
      : null

    await this.setIndustryId(industryId)
    await this.fetchContracts()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('allocationClinicalCases', ['addClientDoctor']),
    ...mapActions('consultationClinicalCases', [
      'fetchContracts',
      'setIndustryId'
    ]),
    async handleSave() {
      const userData = {
        doctorName: this.name,
        doctorEmail: this.email,
        numberOfClinicalCases: Number(this.quantity),
        contractId: this.contract
      }

      await this.addClientDoctor(userData)
      this.clearForm()
    },
    clearForm() {
      this.name = null
      this.email = null
      this.quantity = null
      this.contract = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
