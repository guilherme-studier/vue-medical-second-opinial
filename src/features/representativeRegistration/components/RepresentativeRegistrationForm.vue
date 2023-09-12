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
            type="text"
            placeholder="Telefone"
            class="flexible-input"
            v-mask="['(##) ####-####', '(##) # ####-####']"
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
import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

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
        type: 'agent',
        username: this.name.replace(/\s/g, '').toLowerCase(),
        newPassword: this.newPassword,
        email: this.email,
        phone: this.phone,
        name: this.name,
        cpf: this.cpf
      }

      try {
        await this.createUser(userData)
        this.toast.success('Cadastro efetuado criado com sucesso', {
          timeout: 5000
        })
      } catch (error) {
        this.toast.warning('Não foi possível realizar o cadastro', {
          timeout: 5000
        })
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
