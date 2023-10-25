<template>
  <div class="container">
    <div class="form">
      <section>
        <InputGroup>
          <InputWrapper>
            <v-select
              v-model="industry"
              :options="getIndustries"
              :reduce="(item) => item.id"
              placeholder="Indústria"
              label="name"
              :track-by="(industry) => industry?.id"
            />
          </InputWrapper>
        </InputGroup>
        <div class="title-cpf">
          <img class="icon-voucher" :src="iconDoctor" />
          <h1>{{ titleCpf }}</h1>
        </div>
        <InputGroup v-for="(form, index) in additionalForms" :key="index">
          <InputWrapper v-if="!isCPFInputDisabled">
            <input
              type="text"
              placeholder="CPF do representante da indústria"
              class="flexible-input"
              v-model="form.cpf"
              v-mask="'###.###.###-##'"
            />
          </InputWrapper>
          <InputWrapper>
            <input
              type="text"
              placeholder="Nome"
              class="flexible-input"
              v-model="form.name"
            />
          </InputWrapper>
          <InputWrapper>
            <input
              type="text"
              placeholder="E-mail"
              class="flexible-input"
              v-model="form.email"
            />
          </InputWrapper>
          <div class="remove-form" v-if="index > 0">
            <h2 @click="removeForm(index)">X</h2>
          </div>
        </InputGroup>
        <div v-if="!isEditing" class="icon-plus-container">
          <font-awesome-icon
            :icon="toggleIcon"
            style="color: #008B8F;"
            @click="addNewForm"
          />
        </div>
      </section>
      <div class="save">
        <button v-if="isEditing" @click="cancelEdit">
          {{ 'Cancelar' }}
        </button>
        <button
          @click="handleSave"
          :disabled="isEditing ? isEditDisabled : isCreateDisabled"
        >
          {{ isEditing ? 'Editar' : 'Salvar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  name: 'AuthorizedDistributeClinicalCases',
  components: {
    InputWrapper,
    InputGroup,
    vSelect,
    FontAwesomeIcon
  },
  data() {
    return {
      titleCpf: 'CPFs autorizados',
      iconDoctor: require('@/assets/icons/icon-voucher.svg'),
      iconPlus: require('@/assets/icons/icon-plus.svg'),
      toggleIcon: faCirclePlus,
      iconColor: '$green-500',
      industry: null,
      additionalForms: [{ cpf: null, name: null, email: null }],
      isEditing: false
    }
  },
  computed: {
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),
    ...mapGetters('industryRepresentantMan', [
      'getIndustryRepresentant',
      'getIndustryRepresentants',
      'getLoadingRepresentantIndustry'
    ]),

    isCPFInputDisabled() {
      return this.isEditing
    },

    isCreateDisabled() {
      for (const form of this.additionalForms) {
        if (!form.cpf || !form.name || !form.email) {
          return true
        }
      }

      if (!this.industry) {
        return true
      }
      return false
    },

    isEditDisabled() {
      for (const form of this.additionalForms) {
        if (!form.name || !form.email) {
          return true
        }
      }

      if (!this.industry) {
        return true
      }
      return false
    }
  },
  mounted() {
    this.clearIndustryRepresentant()
    this.fetchIndustries()
  },
  watch: {
    getIndustryRepresentant: 'checkEditing'
  },
  methods: {
    ...mapActions('industry', ['fetchIndustries']),
    ...mapActions('industryRepresentantMan', [
      'createIndustryRepresentant',
      'editIndustryRepresentant',
      'clearIndustryRepresentant'
    ]),

    addNewForm() {
      this.additionalForms.push({ cpf: null, name: null, email: null })
    },
    removeForm(index) {
      this.additionalForms.splice(index, 1)
    },
    async handleSave() {
      const representantData = this.additionalForms.map((form) => {
        return {
          name: form.name,
          email: form.email,
          industryId: this.industry
        }
      })

      if (this.isEditing) {
        const userData = {
          name: representantData[0].name,
          industryId: representantData[0].industryId,
          email: representantData[0].email
        }
        await this.editIndustryRepresentant(userData)
      } else await this.createIndustryRepresentant(representantData)

      this.clearForm()
    },
    clearForm() {
      this.additionalForms = [{ cpf: null, name: null, email: null }]
      this.industry = null
      this.isEditing = false
    },
    checkEditing() {
      if (this.getIndustryRepresentant?.id) {
        this.isEditing = true
        this.industry = this.getIndustryRepresentant.industryId
        const existingRepresentant = this.getIndustryRepresentant
        this.additionalForms[0].cpf = existingRepresentant.cpf
        this.additionalForms[0].name = existingRepresentant.name
        this.additionalForms[0].email = existingRepresentant.email
      }
    },
    cancelEdit() {
      this.clearIndustryRepresentant()
      this.clearForm()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
