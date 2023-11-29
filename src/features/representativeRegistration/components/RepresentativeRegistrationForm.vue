<template>
  <div id="container">
    <div class="form">
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
            v-model="cpf"
            placeholder="CPF"
            class="flexible-input"
            v-mask="'###.###.###-##'"
            :disabled="!isRegistrationForm"
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
            v-model="email"
            placeholder="E-mail"
            class="flexible-input"
            :disabled="!isRegistrationForm"
            type="text"
          />
        </InputWrapper>
      </InputGroup>
      <Title title="Troca de senha" />
      <input-group>
        <input-wrapper>
          <el-input
            v-model="password"
            placeholder="Senha atual"
            class="flexible-input"
            type="password"
          />
        </input-wrapper>
        <input-wrapper>
          <el-input
            v-model="newPassword"
            placeholder="Nova senha"
            class="flexible-input"
            type="password"
          />
        </input-wrapper>
      </input-group>

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
      isRegistrationForm: false,
      name: null,
      newPassword: null,
      phone: null,
      email: null,
      cpf: null,
      password: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'getEmail',
      'getName',
      'getPhone',
      'getCpf',
      'isRegistred',
      'getId',
      'getIndustry'
    ]),

    isSaveDisabled() {
      return !this.phone || !this.email || !this.name || !this.cpf
    }
  },
  watch: {
    isRegistred: 'isRegistration'
  },
  async mounted() {
    await this.getUser()
    this.isRegistration()
  },
  methods: {
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
        industryId: this.getIndustry
      }

      if (this.isRegistrationForm) {
        // Se não se tratar de um registro, não quero enviar cpf
        userData.cpf = this.cpf
      }

      await this.updateRepresentativeIndustry(userData)
      await this.getUser()
      this.isRegistration()
      //this.clearForm()

      this.password = null
      this.newPassword = null
    },
    isRegistration() {
      if (this.isRegistred) {
        this.isRegistrationForm = false
        this.email = this.getEmail
        this.cpf = this.getCpf
        this.name = this.getName
        this.phone = this.getPhone
      } else {
        this.isRegistrationForm = true
        this.email = this.getEmail ?? null
        this.cpf = this.getCpf ?? null
        this.name = this.getName ?? null
        this.phone = this.getPhone ?? null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.content-title {
  display: flex;
  place-items: flex-start;
  margin: 10px 0;
}
</style>
