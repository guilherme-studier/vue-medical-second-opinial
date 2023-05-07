export default {
  namespaced: true,
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    profiles: null
  }),
  mutations: {
    updateUserData(state, data) {
      for (const value in data) {
        state[value] = data[value]
      }
    }
  },
  actions: {
    requestUserData({ commit }) {
      this._vm.$auth.getUserData().then((response) => {
        commit('updateUserData', response.data)
      })
    }
  },
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.firstName,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName,
    getEmail: (state) => state.email,
    getRole: (state) => state.profiles
  }
}
