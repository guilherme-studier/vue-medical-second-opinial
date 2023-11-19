<template>
  <div class="industry-representant-man-form">
    <div class="title">
      <img :src="iconDoctor" />
      <h1>Listagem</h1>
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
      <el-table-column
        prop="email"
        label="E-mail"
        align="center"
      ></el-table-column>
      <el-table-column label="Ação" width="150" align="center">
        <template v-slot="scope">
          <div class="actions">
            <font-awesome-icon :icon="iconEdit" @click="edit(scope.row)" />
            <font-awesome-icon :icon="iconCancel" @click="cancel(scope.row)" />
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
// eslint-disable-next-line import/order
import { faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/** Vuex */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters, mapActions } from 'vuex'

// eslint-disable-next-line import/order
import iconVoucher from '@/assets/icons/icon-voucher.svg'

export default {
  name: 'IndustryRepresentantManForm',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      iconDoctor: iconVoucher,
      iconEdit: faPenToSquare,
      iconCancel: faBan,
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },

  mounted() {
    this.fetchIndustryRepresentants()
  },

  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),
    ...mapGetters('industryRepresentantMan', [
      'getIndustryRepresentant',
      'getIndustryRepresentants',
      'getLoadingRepresentantIndustry',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),

    isLoading() {
      return this.getLoadingRepresentantIndustry || this.getLoadingIndustry
    }
  },
  watch: {
    getPage: 'fetchIndustryRepresentants',
    getIndustryRepresentants: {
      handler(industrys) {
        this.tableData = industrys?.map((industry) => ({
          name: industry?.name,
          email: industry?.email,
          id: industry?.id
        }))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('industryRepresentantMan', [
      'fetchIndustryRepresentant',
      'fetchIndustryRepresentants',
      'cancelIndustryRepresentant',
      'updatePage'
    ]),
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    edit(row) {
      this.fetchIndustryRepresentant(row.id)
      this.scrollToTop()
    },
    cancel(row) {
      this.cancelIndustryRepresentant(row.id)
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
