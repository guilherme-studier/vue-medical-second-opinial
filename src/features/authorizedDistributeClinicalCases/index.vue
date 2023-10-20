<template>
  <div id="authorized-distribute-clinical-case" class="container">
    <div class="form" :class="{ 'form-loading': isLoading }">
      <InputGroup>
        <InputWrapper>
          <v-select
            v-model="industry"
            :options="getIndustries"
            :reduce="(item) => item.id"
            placeholder="Indústria"
            label="name"
          />
        </InputWrapper>
      </InputGroup>
      <div class="title-cpf">
        <img class="icon-voucher" :src="iconDoctor" />
        <h1>{{ titleCpf }}</h1>
      </div>
      <InputGroup v-for="(form, index) in additionalForms" :key="index">
        <InputWrapper>
          <input
            type="text"
            placeholder="CPF do médico"
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
      <div class="icon-plus-container">
        <!-- Ícone "iconPlus" para adicionar novos formulários -->
        <font-awesome-icon
          :icon="toggleIcon"
          style="color: #008B8F;"
          @click="addNewForm"
        />
      </div>
      <!-- Botão "Salvar" para o primeiro formulário -->
      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">
          Salvar
        </button>
      </div>
    </div>
    <div v-if="isLoading">
      <loader-spinner />
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
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'AuthorizedDistributeClinicalCases',
  components: {
    LoaderSpinner,
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
      additionalForms: [
        // Adicione um formulário inicial vazio
        { cpf: null, name: null, email: null }
      ]
    }
  },
  computed: {
    ...mapGetters('industry', ['getIndustries', 'getLoadingIndustry']),

    isLoading() {
      return this.getLoadingIndustry
    },

    isSaveDisabled() {
      for (const form of this.additionalForms) {
        if (!form.cpf || !form.name || !form.email) {
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
    this.fetchIndustries()
  },
  methods: {
    ...mapActions('industry', ['fetchIndustries']),

    addNewForm() {
      this.additionalForms.push({ cpf: null, name: null, email: null })
    },
    removeForm(index) {
      this.additionalForms.splice(index, 1)
    },
    handleSave() {
      // Implemente a lógica para salvar os formulários conforme necessário
    }
  }
}
</script>

<style lang="scss">
#authorized-distribute-clinical-case {
  .title-cpf {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    place-items: self-end;
    margin: 20px 0;

    h1 {
      padding-left: 15px;
      color: $green-500;
    }
  }

  .icon-plus-container {
    display: flex;
    justify-content: start;
    margin: 10px 0;
    cursor: pointer;

    .fa-circle-plus {
      font-size: 27px;
    }
  }

  .remove-form {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 13px;
    right: -15px;
  }

  .save {
    display: flex;
    place-content: end;
    margin: 20px 0;

    button {
      max-width: 150px;
    }
  }
}
</style>
