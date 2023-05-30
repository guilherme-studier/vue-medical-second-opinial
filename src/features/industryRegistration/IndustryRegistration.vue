<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="number"
            placeholder="CNPJ"
            class="flexible-input"
            v-model="cnpj"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Razão Social"
            class="flexible-input"
            v-model="razaoSocial"
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
        <input
          type="text"
          placeholder="Contato"
          class="full-width"
          v-model="contato"
        />
      </InputGroup>
      <InputGroup>
        <textarea
          placeholder="Observação"
          class="full-width"
          v-model="observacao"
        ></textarea>
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

export default {
  name: 'IndustryRegistration',
  components: {
    Title,
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      cnpj: '',
      razaoSocial: '',
      email: '',
      telefone: '',
      contato: '',
      observacao: ''
    }
  },
  methods: {
    imprimirValores() {
      console.log('CNPJ:', this.cnpj)
      console.log('Razão Social:', this.razaoSocial)
      console.log('E-mail:', this.email)
      console.log('Telefone:', this.telefone)
      console.log('Contato:', this.contato)
      console.log('Observação:', this.observacao)

      this.limparDados()
    },
    limparDados() {
      this.cnpj = ''
      this.razaoSocial = ''
      this.email = ''
      this.telefone = ''
      this.contato = ''
      this.observacao = ''
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
