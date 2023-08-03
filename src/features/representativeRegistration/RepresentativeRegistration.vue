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
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome completo"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="E-mail"
            class="flexible-input"
            v-model="email"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="number"
            placeholder="Telefone"
            class="flexible-input"
            v-model="telefone"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="password"
            placeholder="Nova senha"
            class="flexible-input"
            v-model="newPassword"
          />
        </InputWrapper>
        <InputWrapper> </InputWrapper>
      </InputGroup>

      <div class="save">
        <button @click="imprimirValores">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  name: 'RepresentativeRegistration',
  components: {
    Title,
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      cpf: '',
      name: '',
      email: '',
      telefone: '',
      newPassword: ''
    }
  },
  methods: {
    imprimirValores() {
      console.log('CNPJ:', this.cpf)
      console.log('Razão Social:', this.name)
      console.log('E-mail:', this.email)
      console.log('Telefone:', this.telefone)
      console.log('Contato:', this.newPassword)

      this.limparDados()
    },
    limparDados() {
      this.cpf = ''
      this.name = ''
      this.email = ''
      this.telefone = ''
      this.newPassword = ''
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
