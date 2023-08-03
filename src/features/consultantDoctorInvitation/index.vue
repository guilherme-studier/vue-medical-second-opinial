<template>
  <div id="consultant-doctor-invitation">
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Adicionar CPF"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Adicionar Nome"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="email"
            placeholder="Adicionar E-mail"
            class="flexible-input"
            v-model="email"
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
  name: 'ConsultantDoctorInvitation',
  components: {
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      cpf: '',
      name: '',
      email: ''
    }
  },
  methods: {
    imprimirValores() {
      console.log('CPF:', this.cpf)
      console.log('Nome:', this.name)
      console.log('E-mail:', this.email)

      this.limparDados()
    },
    limparDados() {
      this.cpf = ''
      this.name = ''
      this.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#consultant-doctor-invitation {
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
