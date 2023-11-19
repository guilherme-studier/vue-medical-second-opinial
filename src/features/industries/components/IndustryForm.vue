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
          <el-input
            v-model="name"
            type="text"
            placeholder="Nome da Indústria"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
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
          <el-input
            v-model="email"
            type="email"
            placeholder="E-mail"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
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
          <el-input
            v-model="contact"
            type="text"
            placeholder="Contato"
            class="flexible-input"
          />
        </InputWrapper>
        <InputWrapper>
          <el-input
            v-model="observation"
            type="text"
            placeholder="Observação"
            class="flexible-input"
          />
        </InputWrapper>
      </InputGroup>

      <div class="industries--row">
        <el-button type="info" @click="clearForm" :disabled="!isValidForm"
          >Cancelar</el-button
        >

        <el-button
          type="primary"
          @click="industryId ? editIndustry() : newIndustry()"
          :disabled="!isValidForm"
          >{{ industryId ? 'Editar Indústria' : 'Criar Indústria' }}</el-button
        >
      </div>
    </div>

    <div class="industries--row">
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
              @click="selectIndustry(scope.row)"
            />
            <font-awesome-icon
              :icon="iconTrash"
              @click="cancelIndustry(scope.row.id)"
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
import InputWrapper from '@/components/inputWrapper'

/** Vuex */

export default {
  name: 'Indústrias',

  components: {
    InputGroup,
    InputWrapper,
    FontAwesomeIcon
  },

  data() {
    return {
      /** Ícones */
      icon: iconVoucher,
      iconSearch: iconSearch,
      iconEdit: faPenToSquare,
      iconTrash: faTrash,

      /** Dados das indústrias */
      industryId: null,
      name: null,
      cnpj: null,
      email: null,
      phone: null,
      contact: null,
      observation: null,
      tableData: [],
      currentPage: 1,
      pageSize: 10
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
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),

    isLoading() {
      return this.getLoadingIndustry
    },

    isValidForm() {
      return this.name && this.cnpj
    }
  },
  watch: {
    getIndustries: {
      handler(industries) {
        if (Array.isArray(industries)) {
          this.tableData = industries.map((industry) => ({
            name: industry?.name,
            id: industry?.id,
            cnpj: industry?.cnpj,
            email: industry?.email,
            contact: industry?.contact,
            phone: industry?.phone,
            observation: industry?.observation
          }))
        }
      },
      deep: true
    },
    getPage() {
      this.fetchIndustries()
    }
  },
  methods: {
    ...mapActions('industry', [
      'deleteIndustryById',
      'createIndustry',
      'updateIndustryById',
      'fetchIndustries',
      'updatePage'
    ]),

    newIndustry() {
      if (this.isValidForm) {
        const userData = {
          name: this.name,
          cnpj: this.cnpj,
          email: this.email,
          phone: this.phone,
          contact: this.contact,
          observation: this.observation
        }
        this.createIndustry(userData)
        this.clearForm()
      }
    },

    async editIndustry() {
      if (this.isValidForm) {
        const userData = {
          name: this.name,
          observation: this.observation,
          id: this.industryId,
          contact: this.contact,
          email: this.email,
          phone: this.phone
        }
        this.updateIndustryById(userData)
        this.clearForm()
      }
    },

    /**
     * Selecionar indústria
     * @param {String|Number} id: Id da indústria
     * @param {String} name: Nome da indústria
     */
    selectIndustry(row) {
      this.industryId = row?.id
      this.name = row?.name
      this.cnpj = row?.cnpj
      this.email = row?.email
      this.phone = row?.phone
      this.contact = row?.contact
      this.observation = row?.observation
      this.scrollToTop()
    },

    cancelIndustry(id) {
      this.deleteIndustryById(id)
    },

    /** Cancelar criação/edição */
    clearForm() {
      this.industryId = null
      this.name = null
      this.cnpj = null
      this.email = null
      this.phone = null
      this.contact = null
      this.observation = null
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
