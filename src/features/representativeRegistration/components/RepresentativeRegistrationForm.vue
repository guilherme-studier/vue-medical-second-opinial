<template>
  <div id="representative-registration">
    <Title :title="tituloComponente" />
    <div class="form" :class="{ 'form-loading': getLoadingForm }">
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
    <div v-if="getLoadingForm">
      <loader-spinner />
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import LoaderSpinner from '@/components/loaderSpinner'
import Title from '@/components/title'

export default {
  name: 'RepresentativeRegistration',
  components: {
    Title,
    InputGroup,
    InputWrapper,
    LoaderSpinner
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
      cpf: null
    }
  },
  computed: {
    ...mapGetters('user', ['getLoadingUser']),
    ...mapGetters('representativeRegistration', ['getLoadingRepresentative']),

    getLoadingForm() {
      return this.getLoadingUser || this.getLoadingRepresentative
    },

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
    ...mapActions('representativeRegistration', [
      'updateRepresentativeIndustry'
    ]),

    ...mapActions('user', ['getUser']),

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
