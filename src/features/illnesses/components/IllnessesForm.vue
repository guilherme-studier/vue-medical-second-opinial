<template>
  <div ref="illnesses" class="illnesses">
    <!-- CADASTRO DE DOENÇAS -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="illnesses--form">
      <InputGroup>
        <el-input
          v-model="illnessName"
          type="text"
          placeholder="Nome da Doença"
          class="flexible-input"
        />
      </InputGroup>

      <div class="illnesses--row">
        <el-button type="info" @click="clearForm" :disabled="!illnessName"
          >Cancelar</el-button
        >

        <el-button
          type="primary"
          @click="illnessId ? editIllness() : newIllness()"
          :disabled="!illnessName"
          >{{ illnessId ? 'Editar Doença' : 'Criar Doença' }}</el-button
        >
      </div>
    </div>

    <div class="illnesses--row">
      <!-- TÍTULO -->
      <div class="title">
        <img :src="icon" />
        <h1>Listagem</h1>
      </div>
    </div>

    <!-- TABELA -->
    <el-table
      :data="tableData"
      :height="450"
      style="width: 100%"
      empty-text="Não há dados para serem listados"
      border
      v-loading="isLoading"
    >
      <el-table-column
        prop="name"
        label="Nome"
        align="center"
      ></el-table-column>
      <el-table-column label="Ação" width="150" align="center">
        <template v-slot="scope">
          <div class="actions">
            <font-awesome-icon
              :icon="iconEdit"
              @click="selectIllness(scope.row.id, scope.row.name)"
            />
            <font-awesome-icon
              :icon="iconTrash"
              @click="cancelIllness(scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="getTotalContent"
        :current-page="getPage"
        @current-change="handlePageChange"
      />
    </div>
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
import InputGroup from '@/components/inputGroup'

export default {
  name: 'Doenças',

  components: {
    InputGroup,
    FontAwesomeIcon
  },

  data() {
    return {
      /** Ícones */
      icon: iconVoucher,
      iconSearch: iconSearch,
      iconEdit: faPenToSquare,
      iconTrash: faTrash,

      searchTerm: '',

      /** Dados das doenças */
      illnessId: null,
      illnessName: null,

      tableData: [],

      currentPage: 1,
      pageSize: 10
    }
  },

  mounted() {
    /** Buscar as doenças */
    this.fetchDiseases()
  },

  computed: {
    ...mapGetters('disease', [
      'getDiseases',
      'getLoadingDiseases',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),

    isLoading() {
      return this.getLoadingDiseases
    }
  },
  watch: {
    getPage: 'fetchDiseases',
    getDiseases: {
      handler(diseases) {
        this.tableData = diseases?.map((disease) => ({
          name: disease?.name,
          id: disease?.id
        }))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('disease', [
      'deleteDiseaseById',
      'createNewDisease',
      'updateDiseaseById',
      'fetchDiseases',
      'updatePage'
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

      this.scrollToTop()
    },

    cancelIllness(id) {
      this.deleteDiseaseById(id)
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.illnessId = null
      this.illnessName = ''
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Para um comportamento de rolagem suave
      })
    },
    handlePageChange(newPage) {
      this.updatePage(newPage)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 19px;
  margin: 2px;

  svg:hover {
    cursor: pointer;
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
