<template>
  <div id="representative-registration">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="CPF"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
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
            v-model="phone"
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
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
// components
import InputWrapper from '@/components/inputWrapper'
import InputGroup from '@/components/inputGroup'
import Title from '@/components/title'

// plugins
import { useToast } from 'vue-toastification'

// vuex
import { mapActions } from 'vuex'

export default {
  name: 'RepresentativeRegistration',
  components: {
    Title,
    InputGroup,
    InputWrapper
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      newPassword: null,
      phone: null,
      email: null,
      name: null,
      cpf: null
    }
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.newPassword ||
        !this.phone ||
        !this.email ||
        !this.name ||
        !this.cpf
      )
    }
  },
  methods: {
    ...mapActions('representativeRegistration', ['createUser']),

    async handleSave() {
      const userData = {
        newPassword: this.newPassword,
        email: this.email,
        phone: this.phone,
        name: this.name,
        cpf: this.cpf
      }

      try {
        await this.createUser(userData)
        this.toast.success('Cadastro efetuado criado com sucesso')
      } catch (error) {
        this.toast.warning('Não foi possível realizar o cadastro')
      }
      this.clearForm()
    },
    clearForm() {
      this.newPassword = null
      this.phone = null
      this.email = null
      this.name = null
      this.cpf = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
