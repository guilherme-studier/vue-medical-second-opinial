<template>
  <div id="allocation-clinical-cases">
    <Title :title="tituloComponente" />
    <div class="form">
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome do médico"
            class="flexible-input"
            v-model="name"
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
          <v-select
            v-model="gender"
            :options="getContracts"
            :reduce="(item) => item.id"
            label="name"
            placeholder="Casos Clínicos"
          />
        </InputWrapper>
      </InputGroup>
      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import Title from '@/components/title'

export default {
  name: 'AllocationClinicalCasesForm',
  components: {
    InputWrapper,
    InputGroup,
    Title,
    vSelect
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
      iconColor: '$green-500',
      name: null,
      specialtyName: null,
      specialtyId: null,
      diseaseName: null,
      diseaseId: null,
      quantity: null,
      email: null
    }
  },
  computed: {
    ...mapGetters('consultationClinicalCases', ['getContracts']),

    isSaveDisabled() {
      return (
        !this.name ||
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
    this.fetchConsultantDoctors()
  },
  methods: {
    ...mapActions('allocationClinicalCases', ['createUser']),
    ...mapActions('consultationClinicalCases', ['fetchConsultantDoctors']),

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
        name: this.name,
        email: this.email,
        quantity: this.quantity,
        specialty: this.specialtyId,
        disease: this.diseaseId
      }

      try {
        await this.createUser(userData)
        this.toast.success('Atribuição de caso clínico efetuado com sucesso', {
          timeout: 5000
        })
      } catch (error) {
        this.toast.warning(
          'Não foi possível efetuar a atribuição de caso clínico',
          { timeout: 5000 }
        )
      }
      this.clearForm()
    },
    clearForm() {
      this.name = null
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
