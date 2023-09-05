<template>
  <div>
    <div class="form" :class="{ 'form-loading': getLoading }">
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
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
    <div v-if="getLoading">
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

export default {
  name: 'ConsultantDoctorInvitationForm',
  components: {
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
      cpf: null,
      name: null,
      email: null
    }
  },
  computed: {
    ...mapGetters('consultantDoctorInvitation', ['getLoading']),

    isSaveDisabled() {
      return !this.cpf || !this.name || !this.email
    }
  },
  methods: {
    ...mapActions('consultantDoctorInvitation', ['createUser']),

    async handleSave() {
      const userData = {
        email: this.email,
        name: this.name,
        cpf: this.cpf
      }

      try {
        await this.createUser(userData)
        this.toast.success(
          'Geração de convite para médico consultor efetuada com sucesso',
          { timeout: 5000 }
        )
      } catch (error) {
        this.toast.warning(
          'Erro ao realizar a geração de convite para médico consultor',
          { timeout: 5000 }
        )
      }
      this.clearForm()
    },
    clearForm() {
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
