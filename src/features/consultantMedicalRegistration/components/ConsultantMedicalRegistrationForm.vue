<template>
  <div id="doctor-registration">
    <div class="form">
      <input-group>
        <input-wrapper>
          <el-input
            v-model="cpf"
            placeholder="CPF"
            class="flexible-input"
            type="text"
            :v-mask="isRegistrationForm ? '###.###.###-##' : null"
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
      <div>
        <div id="registration-data">
          <Title :title="titleRegistration" />
          <div class="form">
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="name"
                  placeholder="Nome"
                  class="flexible-input"
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
                      v-mask="'####-###'"
                      type="text"
                    />
                  </input-wrapper>
                  <input-wrapper>
                    <el-input
                      v-model="ufCrm"
                      placeholder="UF CRM"
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
                  :disabled="isNewPassword"
                  type="password"
                />
              </input-wrapper>
            </input-group>
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="cep"
                  placeholder="CEP"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="street"
                  placeholder="Lagradouro"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
            </input-group>
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="number"
                  placeholder="Número"
                  class="flexible-input"
                  type="number"
                  min="0"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="complement"
                  placeholder="Complemento"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
            </input-group>
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="city"
                  placeholder="Cidade"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="state"
                  placeholder="UF"
                  class="flexible-input"
                  type="text"
                />
              </input-wrapper>
            </input-group>
          </div>
          <div class="terms-agreement" v-show="isRegistrationForm">
            <input type="checkbox" id="termsCheckbox" v-model="termsAgreed" />
            <label>
              Li e estou de acordo com o
              <span @click="openModal">Termo de Responsabilidade</span> sobre a
              Execução dos Serviços
            </label>
            <el-dialog
              v-model="modalTermsVisible"
              @close="closeModal"
              title="Termo de Responsabilidade"
            >
              <div class="">
                <div class="modal-text">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock.
                  </p>
                </div>

                <el-button class="modal-btn" type="primary" @click="handleTerms"
                  >De acordo</el-button
                >
              </div>
            </el-dialog>
          </div>
        </div>
        <div id="specialty">
          <Title :title="titleSpecialty" />
          <input-group>
            <input-wrapper>
              <el-select
                v-model="specialty"
                placeholder="Selecione uma especialidade"
                size="large"
                clearable
              >
                <el-option
                  v-for="item in getSpecialties"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </input-wrapper>
          </input-group>
        </div>
        <div id="data-payments">
          <Title :title="titlePayments" />
          <input-group>
            <input-wrapper>
              <el-input
                v-model="cnpj"
                placeholder="CNPJ"
                class="flexible-input"
                v-mask="'##.###.###/####-##'"
                type="text"
              />
            </input-wrapper>
            <input-wrapper>
              <el-input
                v-model="corporateName"
                placeholder="Razão Social"
                class="flexible-input"
                type="text"
              />
            </input-wrapper>
          </input-group>
        </div>
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
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

export default {
  name: 'ConsultantMedicalRegistrationForm',
  components: {
    InputGroup,
    InputWrapper,
    Title
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      titlePayments: 'Dados para pagamentos de honorários',
      titleRegistration: 'Dados Cadastrais',
      titleSpecialty: 'Especialidade',
      modalTermsVisible: false,
      corporateName: null,
      termsAgreed: false,
      newPassword: null,
      complement: null,
      specialty: null,
      password: null,
      number: null,
      email: null,
      phone: null,
      street: null,
      name: null,
      city: null,
      cnpj: null,
      cpf: null,
      crm: null,
      ufCrm: null,
      cep: null,
      state: null,
      type: 'consultant_doctor',
      isRegistrationForm: false
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
      'isRegistred',
      'getCorporateName',
      'getComplement',
      'getSpecialty',
      'getNumber',
      'getStreet',
      'getCity',
      'getCnpj',
      'getUfCrm',
      'getCep'
    ]),
    ...mapGetters('specialty', ['getSpecialties']),

    isSaveDisabled() {
      return (
        !this.termsAgreed ||
        !this.complement ||
        !this.specialty ||
        !this.number ||
        !this.email ||
        !this.phone ||
        !this.street ||
        !this.name ||
        !this.city ||
        !this.cpf ||
        !this.crm ||
        !this.ufCrm ||
        !this.state ||
        !this.cep ||
        !this.cnpj ||
        !this.corporateName
      )
    },

    isNewPassword() {
      return !this.password
    }
  },
  watch: {
    isRegistred: 'isRegistration'
  },
  async created() {
    this.getUser()
  },
  mounted() {
    this.fetchSpecialties()
    this.isRegistration()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('consultantMedicalRegistration', ['updateConsultantMedical']),

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
        type: this.type,
        username: this.name?.replace(/\s/g, '')?.toLowerCase(),
        term: this.termsAgreed,
        newPassword: this.newPassword,
        complement: this.complement,
        specialty: this.specialty,
        password: this.password,
        number: this.number,
        email: this.email,
        phone: this.phone,
        street: this.street,
        name: this.name,
        city: this.city,
        crm: this.crm,
        // eslint-disable-next-line camelcase
        uf_crm: this.ufCrm,
        cep: this.cep,
        state: this.state,
        cnpj: this.cnpj,
        // eslint-disable-next-line camelcase
        corporate_name: this.corporateName
      }
      if (this.isRegistrationForm) {
        // Se não se tratar de um registro, não quero enviar cpf
        userData.cpf = this.cpf
      }

      await this.updateConsultantMedical(userData)
      await this.getUser()
      this.isRegistration()

      this.password = null
      this.newPassword = null
    },
    isRegistration() {
      // caso se tratar de um formulário de atualização de cadastro, os campos serão auto preenchidos
      if (this.isRegistred) {
        this.isRegistrationForm = false
        this.termsAgreed = true
        this.email = this.getEmail
        this.cpf = this.getCpf
        this.name = this.getName
        this.phone = this.getPhone
        this.crm = this.getCrm
        this.state = this.getState
        this.corporateName = this.getCorporateName
        this.complement = this.getComplement
        this.specialty = this.getSpecialty
        this.number = this.getNumber
        this.street = this.getStreet
        this.city = this.getCity
        this.cnpj = this.getCnpj
        this.ufCrm = this.getUfCrm
        this.cep = this.getCep
      } else {
        this.isRegistrationForm = true
        this.termsAgreed = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

#doctor-registration {
  .v-select {
    .vs__search {
      background: red !important;
    }
  }
}

.content {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
