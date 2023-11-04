<template>
  <div id="container">
    <div class="form">
      <input-group>
        <input-wrapper>
          <el-input
            v-model="cpf"
            placeholder="CPF"
            class="flexible-input"
            v-mask="'###.###.###-##'"
            @input="validatePassword"
            type="text"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="password"
            placeholder="Senha inicial"
            class="flexible-input"
            @input="validatePassword"
            type="password"
          />
        </input-wrapper>
      </input-group>
    </div>
    <div class="form" :class="{ 'content-block': !isFormEnabled }">
      <Title :title="tituloComponente" />
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="name"
            placeholder="Nome completo"
            class="flexible-input"
            type="text"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="email"
            placeholder="E-mail"
            class="flexible-input"
            type="text"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="phone"
            placeholder="Telefone"
            class="flexible-input"
            v-mask="['(##) ####-####', '(##) # ####-####']"
            type="text"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="newPassword"
            placeholder="Nova senha"
            class="flexible-input"
            type="password"
          />
        </InputWrapper>
      </InputGroup>

      <div class="save">
        <el-button type="primary" @click="handleSave" :disabled="isSaveDisabled"
          >Salvar</el-button
        >
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
