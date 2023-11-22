<template>
  <div id="registration-data">
    <div id="doctor-registration">
      <div class="form">
        <input-group>
          <input-wrapper>
            <el-input
              v-model="cpf"
              placeholder="CPF"
              class="flexible-input"
              type="text"
              :v-mask="'###.###.###-##'"
              :disabled="!isRegistrationForm"
            />
          </input-wrapper>
          <input-wrapper>
            <el-input
              v-model="password"
              placeholder="Senha atual"
              class="flexible-input"
              type="password"
            />
          </input-wrapper>
        </input-group>
      </div>
    </div>
    <div class="form">
      <Title :title="titleComponent" />
      <div class="form">
        <input-group>
          <input-wrapper>
            <el-input
              v-model="name"
              placeholder="Nome"
              class="flexible-input"
              :disabled="!isRegistrationForm"
              type="text"
            />
          </input-wrapper>
        </input-group>
        <input-group>
          <input-wrapper>
            <el-input
              v-model="email"
              placeholder="E-mail"
              class="flexible-input"
              disabled
              type="email"
            />
          </input-wrapper>
          <input-wrapper>
            <el-input
              v-model="phone"
              placeholder="Telefone"
              class="flexible-input"
              v-mask="['(##) ####-####', '(##) # ####-####']"
              type="text"
            />
          </input-wrapper>
        </input-group>
        <input-group>
          <input-wrapper>
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="crm"
                  placeholder="CRM"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="uf"
                  placeholder="UF"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
            </input-group>
          </input-wrapper>
          <input-wrapper>
            <el-input
              v-model="newPassword"
              placeholder="Nova senha"
              class="flexible-input"
              type="password"
              :disabled="isNewPassword"
            />
          </input-wrapper>
        </input-group>
      </div>
      <div class="terms-agreement">
        <label v-show="isRegistrationForm">
          <input type="checkbox" id="termsCheckbox" v-model="termsAgreed" />
          Li e estou de acordo com o
          <span @click="openModal">Termo de Responsabilidade</span> sobre a
          Execução dos Serviços
        </label>
        <el-dialog
          v-if="modalTermsVisible"
          @close="closeModal"
          title="Termo de Responsabilidade"
        >
          <div class="modal-content">
            <div class="modal-text">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock.
              </p>
            </div>

            <button class="modal-btn" @click="handleTerms">De acordo</button>
          </div>
        </el-dialog>
        <div id="save">
          <el-button
            type="primary"
            @click="handleSave"
            :disabled="isSaveDisabled"
            >Salvar</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

export default {
  name: 'Registration Data',
  components: {
    InputWrapper,
    InputGroup,
    Title
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      titleComponent: 'Dados Cadastrais',
      isRegistrationForm: false,
      modalTermsVisible: false,
      termsAgreed: false,
      newPassword: null,
      password: null,
      number: null,
      phone: null,
      email: null,
      city: null,
      name: null,
      crm: null,
      cpf: null,
      uf: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'getEmail',
      'getName',
      'getPhone',
      'getCrm',
      'getState',
      'getCpf',
      'isRegistred'
    ]),

    isNewPassword() {
      return !this.password
    },

    isSaveDisabled() {
      return (
        !this.email ||
        !this.phone ||
        !this.cpf ||
        !this.name ||
        !this.uf ||
        !this.termsAgreed
      )
    }
  },
  watch: {
    isRegistred: 'isRegistration'
  },
  mounted() {
    this.getUser()
    this.isRegistration()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('registration', ['updateClientDoctor']),
    ...mapActions(['loginUser']),

    openModal() {
      this.modalTermsVisible = true
    },
    closeModal() {
      this.modalTermsVisible = false
    },
    handleTerms() {
      this.termsAgreed = true
      this.closeModal()
    },
    async handleSave() {
      const userData = {
        type: 'client_doctor',
        username: this.name?.replace(/\s/g, '').toLowerCase(),
        newPassword: this.newPassword,
        password: this.password,
        term: this.termsAgreed,
        email: this.email,
        phone: this.phone,
        name: this.name,
        crm: this.crm,
        uf: this.uf
      }

      if (this.isRegistrationForm) {
        userData.cpf = this.cpf
      }

      await this.updateClientDoctor(userData)
      await this.getUser()
      this.isRegistration()

      this.password = null
      this.newPassword = null
    },

    isRegistration() {
      if (this.isRegistred) {
        this.isRegistrationForm = false
        this.termsAgreed = true
        this.email = this.getEmail
        this.cpf = this.getCpf
        this.name = this.getName
        this.phone = this.getPhone
        this.crm = this.getCrm
        this.uf = this.getState
      } else {
        this.isRegistrationForm = true
        this.termsAgreed = false
        this.cpf = this.getCpf ?? null
        this.name = this.getName ?? null
        this.email = this.getEmail ?? null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
