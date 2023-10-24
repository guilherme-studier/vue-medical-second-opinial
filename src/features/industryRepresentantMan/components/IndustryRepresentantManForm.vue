<template>
  <div class="industry-representant-man-form">
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
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/** Vuex */
import { mapGetters, mapActions } from 'vuex'

/** Componentes */
import CustomTable from '@/components/customTable'

export default {
  name: 'Especilidades',

  components: {
    CustomTable,
    FontAwesomeIcon
  },

  data() {
    return {
      /** Dados da tabela */
      tableHeader: [
        'Nome do Representante da Indústria',
        'Email',
        'Cancelamento de Acesso'
      ],
      searchTerm: '',

      /** Dados das especialidades */
      specialtyId: null,
      specialtyName: null
    }
  },

  mounted() {
    /** Buscar as especialidades */
    this.fetchIndustryRepresentants()
  },

  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),
    ...mapGetters('industryRepresentantMan', [
      'getIndustryRepresentants',
      'getLoadingRepresentantIndustry'
    ]),

    isLoading() {
      return this.getLoadingRepresentantIndustry || this.getLoadingIndustry
    },

    /** Dados de especialidades */
    tableData() {
      return this.getIndustryRepresentants.map((item) => {
        return {
          name: item.name,
          email: item.email,
          action: [
            {
              icon: faBan,
              handler: () => this.cancelIndustryRepresentant(item.id)
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
    ...mapActions('industryRepresentantMan', [
      'fetchIndustryRepresentants',
      'cancelIndustryRepresentant'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
