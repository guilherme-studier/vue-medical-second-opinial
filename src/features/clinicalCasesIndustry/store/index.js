export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    vouchers: 4,
    tableHeader: [
      'Nome do Médico',
      'CPF',
      'Quantidade de Casos Clínicos',
      'Status'
    ],
    tableData: [
      {
        doctor: 'Dr. Olavo Pereira',
        cpf: '005.385.963-21',
        vouchers: '3',
        status: 'Ativado'
      },
      {
        doctor: 'Dra. Emilia Souza',
        cpf: '868.456.753-64',
        vouchers: '1',
        status: 'Ativado'
      },
      {
        doctor: 'Dr. Eduardo Pereira',
        cpf: '852.456.751-79',
        vouchers: '1',
        status: 'Em avaliação'
      },
      {
        doctor: 'Dr. Fernando Moura',
        cpf: '987.456.857-88',
        vouchers: '7',
        status: 'Ativado'
      }
    ],
    isActiveClinicalCase: false,
    searchTerm: '',
    loading: false,
    error: false
  }),
  mutations: {
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    toggleIsModalSeem(state) {
      state.isModalSeem = !state.isModalSeem
    },
    toggleIsActiveClinicalCase(state) {
      state.isActiveClinicalCase = !state.isActiveClinicalCase
    }
  },
  getters: {
    getIcon: (state) => state.icon,
    getVouchers: (state) => state.vouchers,
    getIsModalSeem: (state) => state.isModalSeem,
    getModalSeemContent: (state) => state.modalSeemContent,
    getActiveClinicalCase: (state) => state.getActiveClinicalCase,
    getIconSearch: (state) => state.iconSearch,
    getTableHeader: (state) => state.tableHeader,
    getTableData: (state) => state.tableData,
    getSearchTerm: (state) => state.searchTerm,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getFilteredTableData: (state) => {
      if (!state.searchTerm) {
        return state.tableData
      }

      const searchTerm = state.searchTerm.toLowerCase()
      return state.tableData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
    }
  },
  actions: {
    handleModalSeem(context, voucher) {
      context.commit('toggleIsModalSeem', voucher)
    },
    handleActiveVoucher(context, voucher) {
      context.commit('toggleIsActiveClinicalCase', voucher)
    }
  }
}
