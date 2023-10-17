<template>
  <div ref="industries" class="industries">
    <!-- CADASTRO DE INDÚSTRIAS -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="industries--form">
      <InputGroup>
        <input
          v-model="industryName"
          type="text"
          placeholder="Nome da Indústria"
          class="flexible-input"
        />
      </InputGroup>

      <div class="industries--row">
        <button class="outline" @click="clearForm" :disabled="!industryName">
          Cancelar
        </button>

        <button
          @click="industryId ? editIndustry() : newIndustry()"
          :disabled="!industryName"
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
    <custom-table :tableHeader="tableHeader" :tableData="filteredTableData">
      <template v-slot:action="{ item }">
        <img
          :src="value.icon"
          alt="Ícone de Ação"
          @click="value.action(item)"
        />
      </template>
    </custom-table>
  </div>
</template>

<script>
/** Ícones */
import { mapActions, mapGetters } from 'vuex'

import iconEdit from '@/assets/icons/icon-edit.svg'
import iconSearch from '@/assets/icons/icon-search.svg'
import iconTrash from '@/assets/icons/icon-trash-active.svg'
// eslint-disable-next-line import/order
import iconVoucher from '@/assets/icons/icon-voucher.svg'

/** Componentes */
import CustomTable from '@/components/customTable'
import InputGroup from '@/components/inputGroup'

/** Vuex */

export default {
  name: 'Indústrias',

  components: {
    CustomTable,
    InputGroup
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
      industryName: null
    }
  },

  mounted() {
    /** Buscar as indústrias */
    this.fetchIndustries()
  },

  computed: {
    ...mapGetters('industry', ['getIndustries']),

    /** Dados de indústrias */
    tableData() {
      return this.getIndustries.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: iconEdit,
              handler: () => this.selectIndustry(item.id, item.name)
            },
            {
              icon: iconTrash,
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

  methods: {
    ...mapActions('industry', [
      'deleteIndustryById',
      'createNewIndustry',
      'updateIndustryById',
      'fetchIndustries'
    ]),

    /** Criar indústria */
    newIndustry() {
      /** Validar a indústria */
      if (this.industryName.trim() !== '') {
        /** Criar dados */
        this.createNewIndustry(this.industryName)

        /** Limpar campo */
        this.clearForm()
      }
    },

    /** Atualizar indústria */
    async editIndustry() {
      /** Validar a indústria */
      if (this.industryName.trim() !== '') {
        /** Editar dados */
        await this.updateIndustryById({
          id: this.industryId,
          name: this.industryName
        })

        /** Limpar campo */
        this.clearForm()
      }
    },

    /**
     * Selecionar indústria
     * @param {String|Number} id: Id da indústria
     * @param {String} name: Nome da indústria
     */
    selectIndustry(id, name) {
      this.industryId = id
      this.industryName = name

      /** Scrollar para a cima */
      this.$refs.industries.scrollIntoView({ behavior: 'smooth' })
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.industryId = null
      this.industryName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
