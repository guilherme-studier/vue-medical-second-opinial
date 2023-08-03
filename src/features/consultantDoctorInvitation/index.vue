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
@import '../consultantDoctorInvitation/styles';
</style>
