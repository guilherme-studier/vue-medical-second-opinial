<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="cnpj"
            placeholder="CNPJ"
            class="flexible-input"
            v-mask="'##.###.###/####-##'"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            type="text"
            placeholder="Razão Social"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <el-input
            type="email"
            placeholder="E-mail"
            class="flexible-input"
            v-model="email"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            type="text"
            placeholder="Telefone"
            class="flexible-input"
            v-mask="['(##) ####-####', '(##) # ####-####']"
            v-model="phone"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <el-input
          type="text"
          placeholder="Ponto Focal"
          class="full-width"
          v-model="contact"
        />
      </InputGroup>
      <InputGroup>
        <el-input
          v-model="observation"
          :autosize="{ minRows: 4, maxRows: 4 }"
          type="textarea"
          placeholder="Observação"
          class="full-width"
        />
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
import { mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

export default {
  name: 'IndustryRegistration',
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
      cnpj: null,
      email: null,
      phone: null,
      contact: null,
      observation: null
    }
  },
  computed: {
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
