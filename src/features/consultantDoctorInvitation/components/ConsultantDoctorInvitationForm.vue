<template>
  <div>
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

export default {
  name: 'ConsultantDoctorInvitationForm',
  components: {
    InputGroup,
    InputWrapper
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
          'Geração de convite para médico consultor efetuada com sucesso'
        )
      } catch (error) {
        this.toast.warning(
          'Erro ao realizar a geração de convite para médico consultor'
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
