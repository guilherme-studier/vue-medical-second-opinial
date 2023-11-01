<template>
  <div>
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <el-input
            v-model="cpf"
            placeholder="Adicionar CPF"
            class="flexible-input"
            v-mask="'###.###.###-##'"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="name"
            placeholder="Adicionar Nome"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="email"
            type="email"
            placeholder="Adicionar E-mail"
            class="flexible-input"
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
    ...mapActions('consultantDoctorInvitation', ['consultantDoctor']),

    async handleSave() {
      const userData = {
        email: this.email,
        name: this.name,
        cpf: this.cpf
      }

      try {
        await this.consultantDoctor(userData)
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
