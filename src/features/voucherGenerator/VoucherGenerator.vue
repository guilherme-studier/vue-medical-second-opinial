<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <VueSelect
            v-model="industry"
            :options="industryOptions"
            placeholder="Indústria"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Especialidade"
            class="flexible-input"
            v-model="specialty"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Doença"
            class="flexible-input"
            v-model="illness"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Quantidade de Vouchers"
            class="flexible-input"
            v-model="quantity"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Data de Validade"
            class="flexible-input"
            v-model="date"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Honorários Médico Consultor"
            class="flexible-input"
            v-model="fees"
          />
        </InputWrapper>
      </InputGroup>
      <div class="save">
        <button @click="imprimirValores">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title/Title'
import InputGroup from '@/components/inputGroup/InputGroup'
import InputWrapper from '@/components/inputWrapper/InputWrapper'
import { VueSelect } from 'vue-select'

export default {
  name: 'VoucherGenerator',
  components: {
    Title,
    InputGroup,
    InputWrapper,
    VueSelect
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      quantity: '',
      specialty: '',
      industry: '',
      illness: '',
      date: '',
      fees: '',
      industryOptions: ['Astrazeneca', 'GlaxoSmithKline', 'Pfizer']
    }
  },
  methods: {
    imprimirValores() {
      console.log('Indústria:', this.industry)
      console.log('Especialidade:', this.specialty)
      console.log('Doença:', this.illness)
      console.log('Quantidade de Vouchers:', this.quantity)
      console.log('Data de Validade:', this.date)
      console.log('Honorários Médico Consultor:', this.fees)

      this.limparDados()
    },
    limparDados() {
      this.industry = ''
      this.specialty = ''
      this.illness = ''
      this.quantity = ''
      this.date = ''
      this.fees = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#industry {
  justify-content: center;
  flex-wrap: wrap;
  display: block;
  width: 100%;
}

.form {
  flex-direction: column;
  margin-top: 20px;
  display: flex;
  width: 100%;

  .save {
    place-self: end;
    display: flex;
    width: 150px;
  }
}

.full-width {
  grid-column: 1 / -1;
}

.vs--open {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
