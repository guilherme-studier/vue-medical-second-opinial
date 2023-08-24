<template>
  <div id="allocation-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="CPF do médico"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
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
              v-model="specialtyName"
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
              v-model="diseaseName"
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
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
    <Modal
      v-if="specialtyModalVisible"
      @close="closeSpecialtyModal"
      title="Especialidade"
    >
      <RadioContent
        :items="getSpecialties"
        @item-selected="handleSpecialtySelected"
      />
    </Modal>
    <Modal v-if="diseaseModalVisible" @close="closeIllnessModal" title="Doença">
      <RadioContent
        :items="getDiseases"
        @item-selected="handleIllnessSelected"
      />
    </Modal>
  </div>
</template>

<script>
// components
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Modal from '@/components/modal'
import RadioContent from '@/components/radioContent'
import Title from '@/components/title'

// fonts

// vuex

// plugins

export default {
  name: 'AllocationClinicalCasesForm',
  components: {
    FontAwesomeIcon,
    InputWrapper,
    RadioContent,
    InputGroup,
    Title,
    Modal
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      tituloComponente: 'Dados Cadastrais',
      specialtyModalVisible: false,
      diseaseModalVisible: false,
      toggleIcon: faCirclePlus,
      cpf: null,
      specialtyName: null,
      specialtyId: null,
      diseaseName: null,
      diseaseId: null,
      quantity: null,
      email: null
    }
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties']),
    ...mapGetters('disease', ['getDiseases']),

    isSaveDisabled() {
      return (
        !this.cpf ||
        !this.email ||
        !this.quantity ||
        !this.specialtyName ||
        !this.specialtyId ||
        !this.diseaseName ||
        !this.diseaseId
      )
    }
  },
  mounted() {
    this.fetchSpecialties()
    this.fetchDiseases()
  },
  methods: {
    ...mapActions('allocationClinicalCases', ['createUser']),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('disease', ['fetchDiseases']),

    handleIllnessSelected(item) {
      this.diseaseName = item?.name
      this.diseaseId = item?.id
      this.closeIllnessModal()
    },
    handleSpecialtySelected(item) {
      this.specialtyName = item?.name
      this.specialtyId = item?.id
      this.closeSpecialtyModal()
    },
    openSpecialtyModal() {
      this.specialtyModalVisible = true
    },

    closeSpecialtyModal() {
      this.specialtyModalVisible = false
    },

    openIllnessModal() {
      this.diseaseModalVisible = true
    },

    closeIllnessModal() {
      this.diseaseModalVisible = false
    },
    async handleSave() {
      const userData = {
        cpf: this.cpf,
        email: this.email,
        quantity: this.quantity,
        specialty: this.specialtyId,
        disease: this.diseaseId
      }

      try {
        await this.createUser(userData)
        this.toast.success('Atribuição de caso clínico efetuado com sucesso')
      } catch (error) {
        this.toast.warning(
          'Não foi possível efetuar a atribuição de caso clínico'
        )
      }
      this.clearForm()
    },
    clearForm() {
      this.cpf = null
      this.email = null
      this.quantity = null
      this.specialtyName = null
      this.specialtyId = null
      this.diseaseName = null
      this.diseaseId = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
