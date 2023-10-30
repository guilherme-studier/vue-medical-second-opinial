<template>
  <div ref="specialties" class="specialties">
    <!-- CADASTRO DE ESPECIALIDADES -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="specialties--form">
      <InputGroup>
        <input
          v-model="specialtyName"
          type="text"
          placeholder="Nome da Especialidade"
          class="flexible-input"
        />
      </InputGroup>

      <div class="specialties--row">
        <button class="outline" @click="clearForm" :disabled="!specialtyName">
          Cancelar
        </button>

        <button
          @click="specialtyId ? editSpecialty() : newSpecialty()"
          :disabled="!specialtyName"
        >
          {{ specialtyId ? 'Editar Especialidade' : 'Criar Especialidade' }}
        </button>
      </div>
    </div>

    <div class="specialties--row">
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

/** Vuex */

export default {
  name: 'Especilidades',

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

      /** Dados das especialidades */
      specialtyId: null,
      specialtyName: null
    }
  },

  mounted() {
    /** Buscar as especialidades */
    this.fetchSpecialties()
  },

  computed: {
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),

    isLoading() {
      return this.getLoadingSpecialtys
    },

    /** Dados de especialidades */
    tableData() {
      return this.getSpecialties.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: faPenToSquare,
              handler: () => this.selectSpecialty(item.id, item.name)
            },
            {
              icon: faTrash,
              handler: () => this.deleteSpecialtyById(item.id)
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
    ...mapActions('specialty', [
      'deleteSpecialtyById',
      'createNewSpecialty',
      'updateSpecialtyById',
      'fetchSpecialties'
    ]),

    /** Criar especialidade */
    newSpecialty() {
      /** Validar a especialidade */
      if (this.specialtyName.trim() !== '') {
        /** Criar dados */
        this.createNewSpecialty(this.specialtyName)

        /** Limpar campo */
        this.clearForm()
      }
    },

    /** Atualizar especialidade */
    async editSpecialty() {
      /** Validar a especialidade */
      if (this.specialtyName.trim() !== '') {
        /** Editar dados */
        await this.updateSpecialtyById({
          id: this.specialtyId,
          name: this.specialtyName
        })

        /** Limpar campo */
        this.clearForm()
      }
    },

    /**
     * Selecionar especialidade
     * @param {String|Number} id: Id da especialidade
     * @param {String} name: Nome da especialidade
     */
    selectSpecialty(id, name) {
      this.specialtyId = id
      this.specialtyName = name

      /** Scrollar para a cima */
      this.$refs.specialties.scrollIntoView({ behavior: 'smooth' })
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.specialtyId = null
      this.specialtyName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
