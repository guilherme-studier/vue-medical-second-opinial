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
          <input-group>
            <input-wrapper>
              <input
                type="number"
                placeholder="CEP"
                class="flexible-input"
                v-model="cep"
              />
            </input-wrapper>
            <input-wrapper>
              <input
                type="text"
                placeholder="Lagradouro"
                class="flexible-input"
                v-model="place"
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
                v-model="uf"
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
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
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
  name: 'Doctor Registration',
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
      termsAgreed: false,
      newPassword: null,
      complement: null,
      specialty: null,
      password: null,
      number: null,
      email: null,
      phone: null,
      place: null,
      name: null,
      city: null,
      cpf: null,
      crm: null,
      cep: null,
      uf: null
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
        !this.place ||
        !this.name ||
        !this.city ||
        !this.cpf ||
        !this.crm ||
        !this.cep ||
        !this.uf
      )
    }
  },
  mounted() {
    this.fetchSpecialties()
  },
  methods: {
    ...mapActions('consultantDoctorInvitation', ['createUser']),
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
        terms: this.termsAgreed,
        newPassword: this.newPassword,
        camplement: this.complement,
        specialty: this.specialty,
        password: this.password,
        number: this.number,
        email: this.email,
        phone: this.phone,
        place: this.place,
        username: this.name,
        city: this.city,
        cpf: this.cpf,
        crm: this.crm,
        cep: this.cep,
        uf: this.uf
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
      ;(this.termsAgreed = null),
        (this.newPassword = null),
        (this.complement = null),
        (this.specialty = null),
        (this.password = null),
        (this.number = null),
        (this.email = null),
        (this.phone = null),
        (this.place = null),
        (this.name = null),
        (this.city = null),
        (this.cpf = null),
        (this.crm = null),
        (this.cep = null),
        (this.uf = null)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
