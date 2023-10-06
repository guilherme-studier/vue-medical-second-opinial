<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form" :class="{ 'form-loading': getLoadingIndustry }">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="CNPJ"
            class="flexible-input"
            v-model="cnpj"
            v-mask="'##.###.###/####-##'"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Razão Social"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="email"
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
        <input
          type="text"
          placeholder="Contato"
          class="full-width"
          v-model="contact"
        />
      </InputGroup>
      <InputGroup>
        <textarea
          placeholder="Observação"
          class="full-width"
          v-model="observation"
        ></textarea>
      </InputGroup>

      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
    <div v-if="getLoadingIndustry">
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
  name: 'IndustryRegistration',
  components: {
    Title,
    LoaderSpinner,
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
      cnpj: null,
      email: null,
      phone: null,
      contact: null,
      observation: null
    }
  },
  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),
    isSaveDisabled() {
      return (
        !this.name ||
        !this.cnpj ||
        !this.email ||
        !this.phone ||
        !this.contact ||
        !this.observation
      )
    }
  },
  methods: {
    ...mapActions('industry', ['createIndustry']),
    async handleSave() {
      const userData = {
        name: this.name,
        cnpj: this.cnpj,
        email: this.email,
        phone: this.phone,
        contact: this.contact,
        observation: this.observation
      }

      await this.createIndustry(userData)
      this.clearForm()
    },
    clearForm() {
      this.name = null
      this.cnpj = null
      this.email = null
      this.phone = null
      this.contact = null
      this.observation = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
