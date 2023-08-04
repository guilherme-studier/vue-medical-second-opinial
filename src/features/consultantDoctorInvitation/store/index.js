export default {
  namespaced: true,
  state: () => ({
    cpf: '',
    name: '',
    email: ''
  }),
  mutations: {
    SET_CPF(state, cpf) {
      state.cpf = cpf
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_EMAIL(state, email) {
      state.email = email
    },
    CLEAR_DATA(state) {
      state.cpf = ''
      state.name = ''
      state.email = ''
    }
  },
  actions: {
    imprimirValores({ state }) {
      console.log('CPF:', state.cpf)
      console.log('Nome:', state.name)
      console.log('E-mail:', state.email)

      this.commit('CLEAR_DATA')
    }
  },
  getters: {
    getCpf: (state) => state.cpf,
    getName: (state) => state.name,
    getEmail: (state) => state.email
  }
}
