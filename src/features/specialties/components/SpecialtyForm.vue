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
  name: 'Especilidades',

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
    ...mapGetters('specialty', ['getSpecialties']),

    /** Dados de especialidades */
    tableData() {
      return this.getSpecialties.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: iconEdit,
              handler: () => this.selectSpecialty(item.id, item.name)
            },
            {
              icon: iconTrash,
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
