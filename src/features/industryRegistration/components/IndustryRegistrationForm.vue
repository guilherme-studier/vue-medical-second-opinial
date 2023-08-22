<template>
  <div id="industry">
    <Title :title="tituloComponente" />
    <div class="form">
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
            v-model="corporateName"
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
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper'
import InputGroup from '@/components/inputGroup'
import Title from '@/components/title'

import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex'

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
      corporateName: null,
      observacao: null,
      contato: null,
      email: null,
      phone: null,
      cnpj: null
    }
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.corporateName ||
        !this.observacao ||
        !this.contato ||
        !this.email ||
        !this.phone ||
        !this.cnpj
      )
    }
  },
  methods: {
    ...mapActions('industryRegistration', ['createUser']),
    async handleSave() {
      const userData = {
        corporateName: this.corporateName,
        observacao: this.observacao,
        contato: this.contato,
        email: this.email,
        phone: this.phone,
        cnpj: this.cnpj
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
      this.corporateName = null
      this.observacao = null
      this.contato = null
      this.phone = null
      this.email = null
      this.phone = null
      this.cnpj = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
