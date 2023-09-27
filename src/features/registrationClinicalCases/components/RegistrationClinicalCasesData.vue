<template>
  <div>
    <Title :title="tituloComponente" />
    <div class="form" :class="{ 'form-loading': isLoading }">
      <InputGroup>
        <InputWrapper>
          <v-select
            v-model="industry"
            :options="getIndustries"
            :reduce="(item) => item.id"
            label="name"
            placeholder="Indústria"
          />
        </InputWrapper>
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
            v-mask="'##/##/####'"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Data de Validade"
            class="flexible-input"
            v-model="expirationDate"
            v-mask="'##/##/####'"
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
            v-mask="'R$ ###.###.###,##'"
          />
        </InputWrapper>
        <InputWrapper></InputWrapper>
      </InputGroup>
      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">
          Salvar
        </button>
      </div>
    </div>
    <div v-if="isLoading">
      <loader-spinner />
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
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification'
import { mapGetters, mapActions } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import LoaderSpinner from '@/components/loaderSpinner'
import Modal from '@/components/modal'
import RadioContent from '@/components/radioContent'
import Title from '@/components/title'

export default {
  name: 'RegistrationClinicalCasesData',
  components: {
    FontAwesomeIcon,
    LoaderSpinner,
    RadioContent,
    InputWrapper,
    InputGroup,
    vSelect,
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
      toggleIcon: faCirclePlus,
      name: null,
      quantity: null,
      specialtyName: null,
      iconColor: '$green-500',
      specialtyId: null,
      diseaseName: null,
      diseaseId: null,
      industry: null,
      startDate: null,
      expirationDate: null,
      fees: null,
      specialtyModalVisible: false,
      diseaseModalVisible: false
    }
  },
  computed: {
    ...mapGetters('registrationClinicalCases', ['getLoading']),
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    isLoading() {
      return (
        this.getLoading ||
        this.getLoadingSpecialtys ||
        this.getLoadingDiseases ||
        this.getLoadingIndustry
      )
    },

    isSaveDisabled() {
      return (
        !this.name ||
        !this.quantity ||
        !this.specialtyName ||
        !this.specialtyId ||
        !this.diseaseName ||
        !this.diseaseId ||
        !this.industry ||
        !this.startDate ||
        !this.expirationDate ||
        !this.fees
      )
    }
  },
  mounted() {
    this.fetchSpecialties()
    this.fetchIndustries()
    this.fetchDiseases()
  },
  methods: {
    ...mapActions('registrationClinicalCases', ['createUser']),
    ...mapActions('specialty', ['fetchSpecialties']),
    ...mapActions('industry', ['fetchIndustries']),
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
        name: this.name,
        quantity: this.quantity,
        specialty: this.specialtyId,
        disease: this.diseaseId,
        industry: this.industry?.id,
        startDate: this.startDate,
        expirateDate: this.expirationDate,
        fees: this.fees
      }

      try {
        await this.createUser(userData)
        this.toast.success('Cadastro efetuado criado com sucesso', {
          timeout: 5000
        })
      } catch (error) {
        this.toast.warning('Não foi possível realizar o cadastro', {
          timeout: 5000
        })
      }
      this.clearForm()
    },
    clearForm() {
      this.name = null
      this.quantity = null
      this.specialtyName = null
      this.specialtyId = null
      this.diseaseName = null
      this.diseaseId = null
      this.industry
      this.startDate = null
      this.expirationDate = null
      this.fees = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
