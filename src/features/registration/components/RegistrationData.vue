<template>
  <div id="registration-data">
    <div id="doctor-registration">
      <div class="form">
        <input-group>
          <input-wrapper>
            <input
              type="text"
              placeholder="CPF"
              class="flexible-input"
              v-model="cpf"
              v-mask="'###.###.###-##'"
            />
          </input-wrapper>
          <input-wrapper>
            <input
              type="password"
              placeholder="Senha inicial"
              class="flexible-input"
              v-model="password"
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
            <input
              type="text"
              placeholder="Nome"
              class="flexible-input"
              v-model="name"
            />
          </input-wrapper>
        </input-group>
        <input-group>
          <input-wrapper>
            <input
              type="email"
              placeholder="E-mail"
              class="flexible-input"
              v-model="email"
            />
          </input-wrapper>
          <input-wrapper>
            <input
              type="number"
              placeholder="Telefone"
              class="flexible-input"
              v-model="phone"
            />
          </input-wrapper>
        </input-group>
        <input-group>
          <input-wrapper>
            <input-group>
              <input-wrapper>
                <input
                  type="number"
                  placeholder="CRM"
                  class="flexible-input"
                  v-model="crm"
                />
              </input-wrapper>
              <input-wrapper>
                <input
                  type="text"
                  placeholder="UF"
                  class="flexible-input"
                  v-model="uf"
                />
              </input-wrapper>
            </input-group>
          </input-wrapper>
          <input-wrapper>
            <input
              type="password"
              placeholder="Nova senha"
              class="flexible-input"
              v-model="newPassword"
            />
          </input-wrapper>
        </input-group>
      </div>
      <div class="terms-agreement">
        <label>
          <input type="checkbox" id="termsCheckbox" v-model="termsAgreed" />
          Li e estou de acordo com o
          <span @click="openModal">Termo de Responsabilidade</span> sobre a
          Execução dos Serviços
        </label>
        <modal
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
        </modal>
        <div id="save">
          <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper'
import InputGroup from '@/components/inputGroup'
import Title from '@/components/title'
import Modal from '@/components/modal'

import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex'

export default {
  name: 'Registration Data',
  components: {
    InputWrapper,
    InputGroup,
    Modal,
    Title
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      titleComponent: 'Dados Cadastrais',
      modalTermsVisible: false,
      termsAgreed: false,
      newPassword: '',
      password: '',
      number: '',
      phone: '',
      email: '',
      city: '',
      name: '',
      crm: '',
      cpf: '',
      uf: ''
    }
  },
  computed: {
    isSaveDisabled() {
      return (
        !this.newPassword ||
        !this.password ||
        !this.email ||
        !this.phone ||
        !this.cpf ||
        !this.name ||
        !this.crm ||
        !this.uf ||
        !this.termsAgreed
      )
    }
  },
  methods: {
    ...mapActions('registration', ['createUser']),

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
        newPassword: this.newPassword,
        password: this.password,
        terms: this.termsAgreed,
        email: this.email,
        phone: this.phone,
        cpf: this.cpf,
        name: this.name,
        crm: this.crm,
        uf: this.uf
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
      this.termsAgreed = false
      this.newPassword = ''
      this.number = ''
      this.phone = ''
      this.email = ''
      this.name = ''
      this.crm = ''
      this.uf = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
