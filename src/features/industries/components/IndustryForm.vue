<template>
  <div ref="industries" class="industries">
    <!-- CADASTRO DE INDÚSTRIAS -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="industries--form">
      <InputGroup>
        <InputWrapper>
          <input
            v-model="industryName"
            type="text"
            placeholder="Nome da Indústria"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            v-model="cnpj"
            type="text"
            placeholder="CNPJ"
            class="flexible-input"
            v-mask="'##.###.###/####-##'"
            :disabled="industryId !== null"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            v-model="email"
            type="text"
            placeholder="E-mail"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            v-model="phone"
            type="text"
            placeholder="Telefone"
            class="flexible-input"
            v-mask="['(##) ####-####', '(##) # ####-####']"
          />
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <InputWrapper>
          <input
            v-model="contact"
            type="text"
            placeholder="Contato"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            v-model="observation"
            type="text"
            placeholder="Observação"
            class="flexible-input"
          />
        </InputWrapper>
      </InputGroup>

      <div class="industries--row">
        <button class="outline" @click="clearForm" :disabled="!isValidForm">
          Cancelar
        </button>

        <button
          @click="industryId ? editIndustry() : newIndustry()"
          :disabled="!isValidForm"
        >
          {{ industryId ? 'Editar Indústria' : 'Criar Indústria' }}
        </button>
      </div>
    </div>

    <div class="industries--row">
      <!-- TÍTULO -->
      <div class="title">
        <img :src="icon" />
        <h1>Listagem</h1>
      </div>

      <!-- CAMPO DE BUSCA -->
      <div class="search">
        <input type="text" v-model="searchTerm" placeholder="Buscar" />
        <img class="search-icon" :src="iconSearch" alt="" />
      </div>
    </div>

    <!-- TABELA -->
    <custom-table
      :tableHeader="tableHeader"
      :tableData="filteredTableData"
      :loading="isLoading"
      :currentPage="getCurrentPage"
      :totalPages="getTotalPages"
      @page-change="updatePageData"
    >
      <template v-slot:action="{ item }">
        <font-awesome-icon :icon="icon" @click="value.handler(item)" />
      </template>
    </custom-table>
  </div>
</template>

<script>
/** Ícones */
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex'

import iconSearch from '@/assets/icons/icon-search.svg'
// eslint-disable-next-line import/order
import iconVoucher from '@/assets/icons/icon-voucher.svg'

/** Componentes */
import CustomTable from '@/components/customTable'
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

/** Vuex */

export default {
  name: 'Indústrias',

  components: {
    CustomTable,
    InputGroup,
    InputWrapper,
    FontAwesomeIcon
  },

  data() {
    return {
      /** Ícones */
      icon: iconVoucher,
      iconSearch: iconSearch,

      /** Dados da tabela */
      tableHeader: ['Nome', 'Ação'],
      searchTerm: '',

      /** Dados das indústrias */
      industryId: null,
      industryName: null,
      cnpj: null,
      email: null,
      phone: null,
      contact: null,
      observation: null
    }
  },

  mounted() {
    /** Buscar as indústrias */
    this.fetchIndustries()
  },

  computed: {
    ...mapGetters('industry', [
      'getIndustries',
      'getLoadingIndustry',
      'getCurrentPage',
      'getTotalPages'
    ]),

    isLoading() {
      return this.getLoadingIndustry
    },

    isValidForm() {
      return this.industryName && this.cnpj
    },

    /** Dados de indústrias */
    tableData() {
      return this.getIndustries.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: faPenToSquare,
              handler: () =>
                this.selectIndustry(
                  item.id,
                  item.name,
                  item.cnpj,
                  item.email,
                  item.phone,
                  item.contact,
                  item.observation
                )
            },
            {
              icon: faTrash,
              handler: () => this.deleteIndustryById(item.id)
            }
          ]
        }
      })
    },

    /** Filtrar os dados da tabela */
    filteredTableData() {
      if (!this.searchTerm) {
        return this.tableData
      }

      const searchTerm = this.searchTerm.toLowerCase()
      return this.tableData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
    }
  },
  watch: {
    getCurrentPage: 'fetchIndustries'
  },
  methods: {
    ...mapActions('industry', [
      'deleteIndustryById',
      'createIndustry',
      'updateIndustryById',
      'fetchIndustries',
      'setPage'
    ]),

    newIndustry() {
      if (this.isValidForm) {
        this.createIndustry(
          this.industryName,
          this.cnpj,
          this.email,
          this.phone,
          this.contact,
          this.observation
        )
        this.clearForm()
      }
    },

    async editIndustry() {
      if (this.isValidForm) {
        await this.updateIndustryById({
          id: this.industryId,
          name: this.industryName,
          cnpj: this.cnpj,
          email: this.email,
          phone: this.phone,
          contact: this.contact,
          observation: this.observation
        })
        this.clearForm()
      }
    },

    /**
     * Selecionar indústria
     * @param {String|Number} id: Id da indústria
     * @param {String} name: Nome da indústria
     */
    selectIndustry(id, name, cnpj, email, phone, contact, observation) {
      this.industryId = id
      this.industryName = name
      this.cnpj = cnpj
      this.email = email
      this.phone = phone
      this.contact = contact
      this.observation = observation
      this.scrollToTop()
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.industryId = null
      this.industryName = ''
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Para um comportamento de rolagem suave
      })
    },
    updatePageData({ currentPage }) {
      this.setPage(currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
