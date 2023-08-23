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
        <button class="outline" @click="clearForm">
          Cancelar
        </button>

        <button @click="illnessId ? editIllness() : newIllness()">
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
import iconVoucher from '../../assets/icons/icon-voucher.svg'
import iconSearch from '../../assets/icons/icon-search.svg'
import iconEdit from '../../assets/icons/icon-edit.svg'
import iconTrash from '../../assets/icons/icon-trash-active.svg'

/** Componentes */
import CustomTable from '@/components/customTable'
import InputGroup from '@/components/inputGroup'

/** Vuex */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Illnesses',

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
    ...mapGetters('disease', ['getDiseases']),

    /** Dados de doenças */
    tableData() {
      return this.getDiseases.map((item) => {
        return {
          name: item.name,
          action: [
            {
              icon: iconEdit,
              handler: () => this.selectIllness(item.id, item.name)
            },
            {
              icon: iconTrash,
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
.illnesses {
  width: 100%;

  .title {
    display: flex;
    place-items: flex-end;
    text-align: left;
    color: $green-500;
    width: 100%;
    margin-bottom: 20px;

    h1 {
      margin-left: 10px;

      span {
        color: $gray-600;
        font-weight: 400;
      }
    }
  }

  &--form {
    margin-bottom: 20px;
  }

  &--row {
    display: flex;
    flex-wrap: nowrap;
    place-items: flex-end;
    text-align: left;
    color: $green-500;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px;

    .search {
      position: relative;
      max-width: 280px;
      width: 100%;

      input {
        background-color: $gray;
        padding-right: 30px;
        outline: none;
        border: none;
        margin: 0;
      }

      input::placeholder {
        font-weight: 500;
      }

      .search-icon {
        transform: translateY(-50%);
        position: absolute;
        filter: hue-rotate(180deg);
        right: 10px;
        top: 50%;
      }
    }
  }
  .input-group {
    height: fit-content;
  }
}

.custom-th {
  text-transform: uppercase;
  border: 1px solid $white;
  background: $green-500;
  padding: 20px;
  text-align: center;
  color: white;

  &.custom-th-top-left {
    border-top-left-radius: 10px;
  }

  &.custom-th-top-right {
    border-top-right-radius: 10px;
  }
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tbody td {
    border: 1px solid $gray-400;
    text-align: center;
    color: $gray-600;
    padding: 20px;
  }
}
</style>
