<template>
  <div class="industry-representant-man-form">
    <div class="title">
      <img :src="iconDoctor" />
      <h1>Listagem</h1>
    </div>

    <!-- TABELA -->
    <custom-table
      :tableHeader="tableHeader"
      :tableData="filteredTableData"
      :loading="isLoading"
    >
      <template v-slot:action="{ item }">
        <font-awesome-icon
          :icon="icon"
          @click="cancelIndustryRepresentant(item.id)"
        />
      </template>
    </custom-table>
  </div>
</template>

<script>
/** Ícones */
import { faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/** Vuex */
import { mapGetters, mapActions } from 'vuex'

// eslint-disable-next-line import/order
import iconVoucher from '@/assets/icons/icon-voucher.svg'

/** Componentes */
import CustomTable from '@/components/customTable'

export default {
  name: 'IndustryRepresentantManForm',

  components: {
    CustomTable,
    FontAwesomeIcon
  },

  data() {
    return {
      tableHeader: ['Nome do Representante da Indústria', 'Email', 'Ações'],
      searchTerm: '',
      specialtyId: null,
      specialtyName: null,
      iconDoctor: iconVoucher
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
      'getLoadingRepresentantIndustry'
    ]),

    isLoading() {
      return this.getLoadingRepresentantIndustry || this.getLoadingIndustry
    },

    tableData() {
      return this.getIndustryRepresentants.map((item) => {
        return {
          name: item.name,
          email: item.email,
          action: [
            {
              icon: faPenToSquare,
              handler: () => this.fetchIndustryRepresentant(item.id)
            },
            {
              icon: faBan,
              handler: () => this.cancelIndustryRepresentant(item.id)
            }
          ]
        }
      })
    },

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
    ...mapActions('industryRepresentantMan', [
      'fetchIndustryRepresentant',
      'fetchIndustryRepresentants',
      'cancelIndustryRepresentant'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
