import store from '@/store'

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    doctor: 'Dr. Guilherme Studier',
    vouchers: 4,
    tableHeader: ['Casos clínicos', 'Doença', 'Data', 'Status', 'Ação'],
    tableData: [
      {
        name: 'Tratamento Doença XYZ',
        illness: 'Doença 1',
        date: '02/01/2023',
        status: 'Aguardando Ativação',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handlePageActiveVoucher',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Doença ABC',
        illness: 'Doença 3',
        date: '02/05/2023',
        status: 'Em avaliação',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade DBC',
        illness: 'Doença 3',
        date: '04/10/2023',
        status: 'Ativado',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade XYZ',
        illness: 'Doença 4',
        date: '13/11/2023',
        status: 'Ativado',
        action: [
          {
            icon: require('@/assets/icons/icon-filed.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: require('@/assets/icons/icon-message.svg'),
            handler: () => {
              store.dispatch(
                'clinicalCasesEvaluation/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      }
    ],
    isModalSeem: false,
    isModalMessage: false,
    isActiveVoucher: false,
    modalSeemContent: {
      voucher: '30082023',
      seem:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas reiciendis mollitia harum dicta natus hic ut temporibus exercitationem, animi odio recusandae. Nulla animi eligendi inventore nesciunt dolorem eius, delectus reprehenderit.'
    },
    modalMessageContent: {
      voucher: '30082023',
      messages: [
        {
          id: '52',
          name: 'Dra. Cristina Flores',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
          id: '53',
          name: 'Médico Cliente',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          id: '52',
          name: 'Dra. Cristina Flores',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
        // Outras mensagens aqui
      ]
    },
    clinicalCaseContent: {
      voucher: '30082023'
    },
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
    toggleIsModalMessage(state) {
      state.isModalMessage = !state.isModalMessage
    },
    toggleIsActiveVoucher(state) {
      state.isActiveVoucher = !state.isActiveVoucher
    }
  },
  getters: {
    getIcon: (state) => state.icon,
    getVouchers: (state) => state.vouchers,
    getIsModalSeem: (state) => state.isModalSeem,
    getIsModalMessage: (state) => state.isModalMessage,
    getIsActiveVoucher: (state) => state.isActiveVoucher,
    getModalSeemContent: (state) => state.modalSeemContent,
    getModalMessageContent: (state) => state.modalMessageContent,
    getActiveClinicalCase: (state) => state.isActiveVoucher,
    getClinicalCaseContent: (state) => state.clinicalCaseContent,
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
    handleModalMessage(context, voucher) {
      context.commit('toggleIsModalMessage', voucher)
    },
    handleSeem(context, text) {
      alert(text)
    },
    handleMessage(content, text) {
      alert(text)
    },
    handlePageActiveVoucher(context, voucher) {
      context.commit('toggleIsActiveVoucher', voucher)
    }
  }
}
