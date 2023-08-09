<template>
  <div id="registration-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <v-select
            v-model="industry"
            :options="industryOptions"
            placeholder="Indústria"
          />
        </InputWrapper>
        <InputWrapper>
          <div class="input-with-icon">
            <input
              type="text"
              v-model="illness"
              placeholder="Doença"
              class="flexible-input"
              @click="openIllnessModal"
              readonly
            />
            <span class="icon" aria-hidden="true">
              <font-awesome-icon
                :icon="toggleIcon"
                :style="{ color: iconColor }"
              />
            </span>
          </div>
        </InputWrapper>
        <InputWrapper>
          <div class="input-with-icon">
            <input
              type="text"
              v-model="specialty"
              placeholder="Especialidade"
              class="flexible-input"
              @click="openSpecialtyModal"
              readonly
            />
            <span class="icon" aria-hidden="true">
              <font-awesome-icon
                :icon="toggleIcon"
                :style="{ color: iconColor }"
              />
            </span>
          </div>
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Denominação Casos Clínicos"
            class="flexible-input"
            v-model="name"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Quantidade de Casos Clínicos"
            class="flexible-input"
            v-model="quantity"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Data de Início"
            class="flexible-input"
            v-model="startDate"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Data de Validade"
            class="flexible-input"
            v-model="expirationDate"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Honorários Médico Consultor"
            class="flexible-input"
            v-model="fees"
          />
        </InputWrapper>
        <InputWrapper></InputWrapper>
      </InputGroup>
      <div class="save">
        <button @click="imprimirValores">Salvar</button>
      </div>
    </div>
    <Modal
      v-if="specialtyModalVisible"
      @close="closeSpecialtyModal"
      title="Especialidade"
    >
      <RadioContent
        :items="specialities"
        @item-selected="handleSpecialtySelected"
      />
    </Modal>
    <Modal v-if="illnessModalVisible" @close="closeIllnessModal" title="Doença">
      <RadioContent
        :items="illnessOptions"
        @item-selected="handleIllnessSelected"
      />
    </Modal>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import RadioContent from '@/components/radioContent'
import InputWrapper from '@/components/inputWrapper'
import InputGroup from '@/components/inputGroup'
import Title from '@/components/title'
import Modal from '@/components/modal'

import vSelect from 'vue-select'

export default {
  name: 'RegistrationClinicalCases',
  components: {
    FontAwesomeIcon,
    InputWrapper,
    RadioContent,
    InputGroup,
    vSelect,
    Title,
    Modal
  },
  data() {
    return {
      toggleIcon: faCirclePlus,
      tituloComponente: 'Dados Cadastrais',
      name: '',
      quantity: '',
      specialty: '',
      industry: '',
      illness: '',
      startDate: '',
      expirationDate: '',
      fees: '',
      industryOptions: ['Astrazeneca', 'GlaxoSmithKline', 'Pfizer'],
      specialtyModalVisible: false,
      illnessModalVisible: false,
      specialities: [
        {
          name: 'Alergia e Imunologia',
          value: '1'
        },
        {
          name: 'Cardiologia',
          value: '2'
        },
        {
          name: 'Dermatologia',
          value: '3'
        },
        {
          name: 'Gastroenterologia',
          value: '4'
        }
      ],
      illnessOptions: [
        {
          name: 'Option 1',
          value: '1'
        },
        {
          name: 'Option 2',
          value: '2'
        }
      ]
    }
  },
  methods: {
    handleIllnessSelected(item) {
      this.illness = item?.name
      this.closeIllnessModal()
    },
    handleSpecialtySelected(item) {
      this.specialty = item?.name
      this.closeSpecialtyModal()
    },
    openSpecialtyModal() {
      this.specialtyModalVisible = true
    },

    closeSpecialtyModal() {
      this.specialtyModalVisible = false
    },

    openIllnessModal() {
      this.illnessModalVisible = true
    },

    closeIllnessModal() {
      this.illnessModalVisible = false
    },
    imprimirValores() {
      console.log('Indústria:', this.industry)
      console.log('Especialidade:', this.specialty)
      console.log('Doença:', this.illness)
      console.log('Quantidade de Vouchers:', this.quantity)
      console.log('Data de Início:', this.startDate)
      console.log('Honorários Médico Consultor:', this.fees)

      this.limparDados()
    },
    limparDados() {
      this.industry = ''
      this.specialty = ''
      this.illness = ''
      this.quantity = ''
      this.startDate = ''
      this.fees = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
