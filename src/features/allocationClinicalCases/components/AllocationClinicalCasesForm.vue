<template>
  <div id="allocation-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome do médico"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="E-mail"
            class="flexible-input"
            v-model="email"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="number"
            placeholder="Quantidade de vouchers"
            class="flexible-input"
            v-model="quantity"
          />
        </InputWrapper>
        <InputWrapper>
          <v-select
            v-model="contract"
            :options="getContracts"
            label="contractName"
            placeholder="Casos Clínicos"
          />
        </InputWrapper>
      </InputGroup>
      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
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
    Title,
    vSelect
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
  mounted() {
    this.fetchContracts()
  },
  methods: {
    ...mapActions('allocationClinicalCases', ['addClientDoctor']),
    ...mapActions('consultationClinicalCases', ['fetchContracts']),
    async handleSave() {
      const userData = {
        doctorName: this.name,
        doctorEmail: this.email,
        numberOfClinicalCases: this.quantity,
        contractId: this.contract?.contractId
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
