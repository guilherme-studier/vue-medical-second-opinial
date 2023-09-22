<template>
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
      <div id="registration-data">
        <Title :title="titleRegistration" />
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
                type="text"
                placeholder="Telefone"
                class="flexible-input"
                v-model="phone"
                v-mask="['(##) ####-####', '(##) # ####-####']"
              />
            </input-wrapper>
          </input-group>
          <input-group>
            <input-wrapper>
              <input-group>
                <input-wrapper>
                  <input
                    type="text"
                    placeholder="CRM"
                    class="flexible-input"
                    v-mask="'####-###'"
                    v-model="crm"
                  />
                </input-wrapper>
                <input-wrapper>
                  <input
                    type="text"
                    placeholder="UF CRM"
                    class="flexible-input"
                    v-model="ufCrm"
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
          <input-group>
            <input-wrapper>
              <input
                type="text"
                placeholder="CEP"
                v-mask="'#####-###'"
                class="flexible-input"
                v-model="cep"
              />
            </input-wrapper>
            <input-wrapper>
              <input
                type="text"
                placeholder="Lagradouro"
                class="flexible-input"
                v-model="street"
              />
            </input-wrapper>
          </input-group>
          <input-group>
            <input-wrapper>
              <input
                type="number"
                placeholder="Número"
                class="flexible-input"
                v-model="number"
              />
            </input-wrapper>
            <input-wrapper>
              <input
                type="text"
                placeholder="Complemento"
                class="flexible-input"
                v-model="complement"
              />
            </input-wrapper>
          </input-group>
          <input-group>
            <input-wrapper>
              <input
                type="text"
                placeholder="Cidade"
                class="flexible-input"
                v-model="city"
              />
            </input-wrapper>
            <input-wrapper>
              <input
                type="text"
                placeholder="UF"
                class="flexible-input"
                v-model="state"
              />
            </input-wrapper>
          </input-group>
        </div>
        <div class="terms-agreement">
          <input type="checkbox" id="termsCheckbox" v-model="termsAgreed" />
          <label>
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock.
                </p>
              </div>

              <button class="modal-btn" @click="handleTerms">De acordo</button>
            </div>
          </modal>
        </div>
      </div>
      <div id="specialty">
        <Title :title="titleSpecialty" />
        <input-group>
          <input-wrapper>
            <v-select
              v-model="specialty"
              :options="getSpecialties"
              :reduce="(item) => item.id"
              label="name"
              placeholder="Selecione uma especialidade"
            />
          </input-wrapper>
        </input-group>
      </div>
      <div id="data-payments">
        <Title :title="titlePayments" />
        <input-group>
          <input-wrapper>
            <input
              type="text"
              placeholder="CNPJ"
              class="flexible-input"
              v-model="cnpj"
              v-mask="'##.###.###/####-##'"
            />
          </input-wrapper>
          <input-wrapper>
            <input
              type="text"
              placeholder="Razão Social"
              class="flexible-input"
              v-model="corporateName"
            />
          </input-wrapper>
        </input-group>
      </div>
      <div id="save">
        <button @click="handleSave">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Modal from '@/components/modal'
import Title from '@/components/title'

export default {
  name: 'ConsultantMedicalRegistrationForm',
  components: {
    InputGroup,
    InputWrapper,
    Title,
    Modal,
    vSelect
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
      type: 'consultant_doctor'
    }
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties']),

    isSaveDisabled() {
      return (
        !this.termsAgreed ||
        !this.newPassword ||
        !this.complement ||
        !this.specialty ||
        !this.password ||
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
    }
  },
  mounted() {
    this.fetchSpecialties()
  },
  methods: {
    ...mapActions('consultantMedicalRegistration', ['updateConsultantMedical']),
    ...mapActions('specialty', ['fetchSpecialties']),
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
        camplement: this.complement,
        specialty: this.specialty,
        password: this.password,
        number: this.number,
        email: this.email,
        phone: this.phone,
        street: this.street,
        name: this.name,
        city: this.city,
        cpf: this.cpf,
        crm: this.crm,
        // eslint-disable-next-line camelcase
        uf_crm: this.ufCrm,
        cep: this.cep,
        state: this.state,
        cnpj: this.cnpj,
        corporateName: this.corporateName
      }

      try {
        await this.updateConsultantMedical(userData)
        this.toast.success(
          'Geração de convite para médico consultor efetuada com sucesso',
          {
            timeout: 5000
          }
        )
        this.clearForm()
      } catch (error) {
        this.toast.warning(
          'Erro ao realizar a geração de convite para médico consultor',
          { timeout: 5000 }
        )
      }
    },
    clearForm() {
      ;(this.termsAgreed = null),
        (this.newPassword = null),
        (this.complement = null),
        (this.specialty = null),
        (this.password = null),
        (this.number = null),
        (this.email = null),
        (this.phone = null),
        (this.street = null),
        (this.name = null),
        (this.city = null),
        (this.cpf = null),
        (this.crm = null),
        (this.ufCrm = null),
        (this.cep = null),
        (this.state = null),
        (this.cnpj = null),
        (this.corporateName = null)
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
</style>
