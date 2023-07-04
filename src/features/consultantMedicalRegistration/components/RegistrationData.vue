<template>
  <div id="registration-data">
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
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title/Title'
import InputGroup from '@/components/inputGroup/InputGroup'
import InputWrapper from '@/components/inputWrapper/InputWrapper'
import Modal from '@/components/modal/Modal'

export default {
  name: 'Registration Data',
  components: {
    Modal,
    Title,
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      titleComponent: 'Dados Cadastrais',
      name: '',
      email: '',
      phone: '',
      crm: '',
      uf: '',
      newPassword: '',
      cep: '',
      place: '',
      number: '',
      complement: '',
      city: '',
      termsAgreed: false,
      modalTermsVisible: false
    }
  },
  methods: {
    openModal() {
      this.modalTermsVisible = true
    },
    closeModal() {
      this.modalTermsVisible = false
    },
    handleTerms() {
      this.termsAgreed = true

      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
#registration-data {
  margin-top: 30px;

  .form {
    flex-direction: column;
    display: flex;
    width: 100%;

    .save {
      place-self: end;
      display: flex;
      width: 150px;
    }
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .terms-agreement {
    display: flex;
    align-items: center;
    margin-top: 10px;

    input[type='checkbox'] {
      cursor: pointer;
      margin-right: 10px;
    }

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .modal-text {
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 25px;
    p {
      font-size: 16px;
      color: $grayDark;
      line-height: 20px;
      margin: 0 20px 15px 0;
      text-align: justify;
    }
  }

  .modal-text::-webkit-scrollbar {
    width: 8px;
    background-color: $gray;
  }

  .modal-text::-webkit-scrollbar-thumb {
    background-color: $gray-400;
    border-radius: 5px;
  }

  .modal-text::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .modal-btn {
    width: 100%;
    max-width: 150px;
    place-self: end;
  }
}
</style>
