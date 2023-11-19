<template>
  <div ref="specialties" class="specialties">
    <!-- CADASTRO DE ESPECIALIDADES -->
    <div class="title">
      <img :src="icon" />
      <h1>Formulário</h1>
    </div>

    <div class="specialties--form">
      <InputGroup>
        <el-input
          v-model="specialtyName"
          type="text"
          placeholder="Nome da Especialidade"
          class="flexible-input"
        />
      </InputGroup>

      <div class="specialties--row">
        <el-button type="info" @click="clearForm" :disabled="!specialtyName"
          >Cancelar</el-button
        >

        <el-button
          type="primary"
          @click="specialtyId ? editSpecialty() : newSpecialty()"
          :disabled="!specialtyName"
          >{{
            specialtyId ? 'Editar Especialidade' : 'Criar Especialidade'
          }}</el-button
        >
      </div>
    </div>

    <div class="specialties--row">
      <div class="title">
        <img :src="icon" />
        <h1>Listagem</h1>
      </div>
    </div>

    <el-table
      :data="tableData"
      :height="450"
      style="width: 100%"
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
              @click="selectSpecialty(scope.row.id, scope.row.name)"
            />
            <font-awesome-icon
              :icon="iconTrash"
              @click="cancelSpecialty(scope.row.id)"
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
  name: 'Especialidades',

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
      searchTerm: null,

      /** Dados das especialidades */
      specialtyId: null,
      specialtyName: null,

      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },

  mounted() {
    /** Buscar as especialidades */
    this.fetchSpecialties()
  },

  computed: {
    ...mapGetters('specialty', [
      'getSpecialties',
      'getLoadingSpecialtys',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),

    isLoading() {
      return this.getLoadingSpecialtys
    }
  },
  watch: {
    getSpecialties: {
      handler(specialties) {
        this.tableData = specialties?.map((specialty) => ({
          name: specialty?.name,
          id: specialty?.id
        }))
      },
      deep: true
    },
    getPage() {
      this.fetchSpecialties()
    }
  },
  methods: {
    ...mapActions('specialty', [
      'deleteSpecialtyById',
      'createNewSpecialty',
      'updateSpecialtyById',
      'fetchSpecialties',
      'updatePage'
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

      this.scrollToTop()
    },

    cancelSpecialty(id) {
      this.deleteSpecialtyById(id)
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.specialtyId = null
      this.specialtyName = ''
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
