import store from '@/store'

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    doctor: 'Dr. Guilherme Studier',
    vouchers: 4,
    tableHeader: ['Casos clínicos', 'id', 'Doença', 'Médico', 'Ação'],
    tableData: [
      {
        name: 'Tratamento Doença XYZ',
        id: '002',
        illness: 'Doença 1',
        doctor: 'Olavo Pereira',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleActiveVoucher',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Doença ABC',
        id: '003',
        illness: 'Doença 3',
        doctor: 'Emilia Souza',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => alert('Função do item 1')
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade DBC',
        id: '005',
        illness: 'Doença 3',
        doctor: 'Eduardo Pereira',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => alert('Função do item 1')
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade XYZ',
        id: '001',
        illness: 'Doença 4',
        doctor: 'Fernando Moura',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => alert('Função do item 1')
          }
        ]
      }
    ],
    isModalSeem: false,
    modalSeemContent: {
      voucher: '30082023',
      seem: null
    },
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
    getDoctor: (state) => state.doctor,
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
    },
    handleSeem(context, text) {
      // adicionar lógica para envio do parecer
      alert(text)
    }
  }
}
