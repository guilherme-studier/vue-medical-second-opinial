<template>
  <div id="representative-registration">
    <div class="form">
      <input-group>
        <input-wrapper>
          <input
            type="text"
            placeholder="CPF"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
            @input="validatePassword"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="password"
            placeholder="Senha inicial"
            class="flexible-input"
            v-model="password"
            @input="validatePassword"
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="form" :class="{ 'content-block': !isFormEnabled }">
      <Title :title="tituloComponente" />
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome completo"
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
            type="text"
            placeholder="Telefone"
            class="flexible-input"
            v-mask="['(##) ####-####', '(##) # ####-####']"
            v-model="phone"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="password"
            placeholder="Nova senha"
            class="flexible-input"
            v-model="newPassword"
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
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

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
      name: null,
      newPassword: null,
      phone: null,
      email: null,
      cpf: null,
      password: null
    }
  },
  computed: {
    ...mapGetters(['getValidatePassword']),
    ...mapGetters('user', ['getEmail']),

    isFormEnabled() {
      return this.getValidatePassword && this.cpf && this.password
    },

    isSaveDisabled() {
      return (
        !this.newPassword ||
        !this.phone ||
        !this.email ||
        !this.name ||
        !this.cpf ||
        !this.password
      )
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions(['loginUser']),
    ...mapActions('user', ['getUser']),
    ...mapActions('representativeRegistration', [
      'updateRepresentativeIndustry'
    ]),

    async handleSave() {
      const userData = {
        type: 'agent',
        username: this.name?.replace(/\s/g, '').toLowerCase(),
        newPassword: this.newPassword,
        email: this.email,
        phone: this.phone,
        name: this.name,
        cpf: this.cpf
      }

      await this.updateRepresentativeIndustry(userData)
      await this.getUser()
      this.clearForm()

      this.password = null
      this.cpf = null
    },
    clearForm() {
      this.newPassword = null
      this.phone = null
      this.email = null
      this.name = null
    },
    verifyPassword() {
      this.loginUser({
        username: this.getEmail,
        password: this.password
      })

      if (!this.getValidatePassword) return this.clearForm()
    },
    validatePassword() {
      clearTimeout(this.fieldTimeout)

      this.fieldTimeout = setTimeout(() => {
        if (this.cpf && this.password) this.verifyPassword()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
