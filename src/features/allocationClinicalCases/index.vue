<template>
  <div id="allocation-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="number"
            placeholder="CPF do médico"
            class="flexible-input"
            v-model="doctorCpf"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="E-mail"
            class="flexible-input"
            v-model="email"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            type="number"
            placeholder="Quantidade de vouchers"
            class="flexible-input"
            v-model="quantity"
          />
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
        <InputWrapper> </InputWrapper>
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

export default {
  name: 'AllocationClinicalCases',
  components: {
    FontAwesomeIcon,
    InputWrapper,
    RadioContent,
    InputGroup,
    Title,
    Modal
  },
  data() {
    return {
      toggleIcon: faCirclePlus,
      tituloComponente: 'Dados Cadastrais',
      doctorCpf: '',
      email: '',
      quantity: '',
      specialty: '',
      illness: '',
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

      this.limparDados()
    },
    limparDados() {
      this.industry = ''
      this.specialty = ''
      this.illness = ''
      this.quantity = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#allocation-clinical-cases {
  justify-content: center;
  flex-wrap: wrap;
  display: block;
  width: 100%;
}

.form {
  flex-direction: column;
  margin-top: 20px;
  display: flex;
  width: 100%;
  .save {
    place-self: end;
    display: flex;
    width: 150px;
  }
}

.vs--open {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.radio-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .btn-save {
    text-align: left;
    grid-column: 1 / -1;
    width: 150px;
    place-self: end;
    display: flex;
    margin-top: 15px;
  }
}

.input-with-icon {
  display: flex;
  align-items: center;
  position: relative;
}

.input-with-icon input {
  padding-right: 30px;
  cursor: pointer;
}

.input-with-icon .icon {
  position: absolute;
  right: 10px;
  top: 13px;
  pointer-events: none;
  color: $green-500;
  font-size: 25px;
}
</style>
