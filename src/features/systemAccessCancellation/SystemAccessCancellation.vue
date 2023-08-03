<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="number"
            placeholder="CPF"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome"
            class="flexible-input"
            v-model="name"
            :disabled="enabledInput"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Indústria"
            class="flexible-input"
            v-model="industry"
            :disabled="enabledInput"
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
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  name: 'Cancelamento de Acesso ao Sistema',
  components: {
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      cpf: '',
      name: '',
      industry: ''
    }
  },
  computed: {
    enabledInput() {
      return this.cpf === ''
    }
  },
  methods: {
    imprimirValores() {
      console.log('CPF:', this.cpf)
      console.log('Nome:', this.name)
      console.log('Indústria:', this.industry)

      this.limparDados()
    },
    limparDados() {
      this.cpf = ''
      this.name = ''
      this.industry = ''
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
</style>
