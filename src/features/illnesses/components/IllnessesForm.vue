<template>
  <div ref="illnesses" class="illnesses">
    <!-- CADASTRO DE DOENÇAS -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="illnesses--form">
      <InputGroup>
        <input
          v-model="illnessName"
          type="text"
          placeholder="Nome da Doença"
          class="flexible-input"
        />
      </InputGroup>

      <div class="illnesses--row">
        <button class="outline" @click="clearForm" :disabled="!illnessName">
          Cancelar
        </button>

        <button
          @click="illnessId ? editIllness() : newIllness()"
          :disabled="!illnessName"
        >
          {{ illnessId ? 'Editar Doença' : 'Criar Doença' }}
        </button>
      </div>
    </div>

    <div class="illnesses--row">
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

export default {
  name: 'Doenças',

  components: {
    CustomTable,
    InputGroup,
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

      /** Dados das doenças */
      illnessId: null,
      illnessName: null
    }
  },

  mounted() {
    /** Buscar as doenças */
    this.fetchDiseases()
  },

  computed: {
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    isLoading() {
      return this.getLoadingDiseases
    },

    /** Dados de doenças */
    tableData() {
      return this.getDiseases.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: faPenToSquare,
              handler: () => this.selectIllness(item.id, item.name)
            },
            {
              icon: faTrash,
              handler: () => this.deleteDiseaseById(item.id)
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
    ...mapActions('disease', [
      'deleteDiseaseById',
      'createNewDisease',
      'updateDiseaseById',
      'fetchDiseases'
    ]),

    /** Criar doença */
    async newIllness() {
      /** Validar a doença */
      if (this.illnessName.trim() !== '') {
        /** Criar dados */
        await this.createNewDisease(this.illnessName)

        /** Limpar campo */
        this.clearForm()
      }
    },

    /** Atualizar doença */
    async editIllness() {
      /** Validar a doença */
      if (this.illnessName.trim() !== '') {
        /** Editar dados */
        await this.updateDiseaseById({
          id: this.illnessId,
          name: this.illnessName
        })

        /** Limpar campo */
        this.clearForm()
      }
    },

    /**
     * Selecionar doença
     * @param {String|Number} id: Id da doença
     * @param {String} name: Nome da doença
     */
    selectIllness(id, name) {
      this.illnessId = id
      this.illnessName = name

      /** Scrollar para a cima */
      this.$refs.illnesses.scrollIntoView({ behavior: 'smooth' })
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.illnessId = null
      this.illnessName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
