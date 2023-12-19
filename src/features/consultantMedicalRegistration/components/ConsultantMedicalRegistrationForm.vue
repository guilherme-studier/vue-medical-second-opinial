<template>
  <div id="doctor-registration">
    <div class="form">
      <!-- <input-group>
        <input-wrapper>
          <el-input
            v-model="cpf"
            placeholder="CPF"
            class="flexible-input"
            v-mask="'###.###.###-##'"
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
      </input-group> -->
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
                  :disabled="!isRegistrationForm"
                  type="text"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="cpf"
                  placeholder="CPF"
                  class="flexible-input"
                  v-mask="'###.###.###-##'"
                  :disabled="getCpf"
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
                </input-group>
              </input-wrapper>
              <input-wrapper>
                <el-select
                  v-model="ufCrm"
                  size="large"
                  filterable
                  clearable
                  placeholder="UF"
                >
                  <el-option
                    v-for="option in ufOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </input-wrapper>
            </input-group>
            <input-group>
              <input-wrapper>
                <el-input
                  v-model="cep"
                  placeholder="CEP"
                  class="flexible-input"
                  type="text"
                  v-mask="'#####-###'"
                  @input="searchCep"
                />
              </input-wrapper>
              <input-wrapper>
                <el-input
                  v-model="street"
                  placeholder="Logradouro"
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
                <el-select
                  v-model="state"
                  size="large"
                  filterable
                  clearable
                  placeholder="UF"
                >
                  <el-option
                    v-for="option in ufOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
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
          </div>
          <div class="terms-agreement" v-show="isRegistrationForm">
            <input
              type="checkbox"
              id="termsCheckbox"
              v-model="termsAgreed"
              :disabled="!isTermsAgree"
            />
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
                <div
                  ref="scrollbarRef"
                  class="modal-text"
                  @scroll="handleScroll"
                >
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

                <el-button
                  class="modal-btn"
                  type="primary"
                  @click="handleTerms"
                  :disabled="!isTermsAgree"
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
                no-match-text="Nenhuma especialidade encontrada"
                filterable
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
        <div id="data-payments">
          <Title title="Troca de senha" />
          <input-group>
            <input-wrapper>
              <el-input
                v-model="password"
                placeholder="Senha atual"
                class="flexible-input"
                type="password"
                show-password
              />
            </input-wrapper>
            <input-wrapper>
              <el-input
                v-model="newPassword"
                placeholder="Nova senha"
                class="flexible-input"
                :disabled="isNewPassword"
                type="password"
                show-password
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
      isTermsAgree: false,
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
      isRegistrationForm: false,
      ufOptions: [
        { label: 'AC', value: 'AC' },
        { label: 'AL', value: 'AL' },
        { label: 'AP', value: 'AP' },
        { label: 'AM', value: 'AM' },
        { label: 'BA', value: 'BA' },
        { label: 'CE', value: 'CE' },
        { label: 'DF', value: 'DF' },
        { label: 'ES', value: 'ES' },
        { label: 'GO', value: 'GO' },
        { label: 'MA', value: 'MA' },
        { label: 'MT', value: 'MT' },
        { label: 'MS', value: 'MS' },
        { label: 'MG', value: 'MG' },
        { label: 'PA', value: 'PA' },
        { label: 'PB', value: 'PB' },
        { label: 'PR', value: 'PR' },
        { label: 'PE', value: 'PE' },
        { label: 'PI', value: 'PI' },
        { label: 'RJ', value: 'RJ' },
        { label: 'RN', value: 'RN' },
        { label: 'RS', value: 'RS' },
        { label: 'RO', value: 'RO' },
        { label: 'RR', value: 'RR' },
        { label: 'SC', value: 'SC' },
        { label: 'SP', value: 'SP' },
        { label: 'SE', value: 'SE' },
        { label: 'TO', value: 'TO' }
      ]
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
      const isCnpjEmpty = !this.cnpj || this.cnpj.trim() === ''
      const isCorporateNameEmpty =
        !this.corporateName || this.corporateName.trim() === ''

      return (
        !this.termsAgreed ||
        !this.specialty ||
        !this.number ||
        !this.email ||
        !this.phone ||
        !this.street ||
        !this.name ||
        !this.city ||
        !this.cpf ||
        !this.state ||
        !this.cep ||
        (isCnpjEmpty && !isCorporateNameEmpty) ||
        (!isCnpjEmpty && isCorporateNameEmpty)
      )
    },
    isNewPassword() {
      return !this.password
    }
  },
  watch: {
    isRegistred: 'isRegistration'
  },
  async mounted() {
    await this.getUser()
    this.fetchSpecialties(50)
    this.isRegistration()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('consultantMedicalRegistration', ['updateConsultantMedical']),

    async searchCep() {
      if (this.cep && this.cep.length === 9) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${this.cep.replace('-', '')}/json/`
          )
          const data = await response.json()

          if (!data.erro) {
            this.state = data.uf
            this.city = data.localidade
            this.complement = data.complemento
            this.street = data.logradouro
          } else {
            this.state = ''
            this.city = ''
            this.toast.error(
              'CEP não encontrado, por favor preencha o restante dos dados do endereço'
            )
          }
        } catch (error) {
          this.toast.error(
            'CEP não encontrado, por favor preencha o restante dos dados do endereço'
          )
        }
      }
    },

    handleScroll() {
      const modalContent = this.$refs.scrollbarRef
      const isAtScrollEnd =
        modalContent.scrollHeight -
          modalContent.scrollTop -
          modalContent.clientHeight <
        1

      if (isAtScrollEnd) {
        this.isTermsAgree = true
      }
    },
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
      if (this.isRegistrationForm) userData.cpf = this.cpf

      await this.updateConsultantMedical(userData)
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
        this.state = this.getState
        this.corporateName = this.getCorporateName
        this.complement = this.getComplement
        this.specialty = Number(this.getSpecialty)
        this.number = this.getNumber
        this.street = this.getStreet
        this.city = this.getCity
        this.cnpj = this.getCnpj
        this.ufCrm = this.getUfCrm
        this.cep = this.getCep
      } else {
        this.isRegistrationForm = true
        this.termsAgreed = false
        this.cpf = this.getCpf
        this.name = this.getName
        this.email = this.getEmail
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

.content-title {
  display: flex;
  place-items: flex-start;
}
</style>
