/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getUserById, getUsers } from '../../../services/user/index'

import router from '@/router'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    userData: {
      id: null,
      hashid: null,
      type: null,
      username: null,
      email: null,
      name: null,
      password: null,
      term: null,
      cpf: null,
      phone: null,
      crm: null,
      // eslint-disable-next-line camelcase
      uf_crm: null,
      cep: null,
      street: null,
      number: null,
      complement: null,
      city: null,
      state: null,
      cnpj: null,
      // eslint-disable-next-line camelcase
      corporate_name: null,
      category: null,
      specialty: null,
      industryId: null
    },
    loading: false
  }),
  mutations: {
    setUserData(state, data) {
      state.userData = data
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async getUser({ commit, state }, userId) {
      if (!userId) return
      commit('setLoading', true)

      return getUserById({ userId })
        .then((response) => {
          commit('setUserData', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))

          // if (!state.userData.term) {
          //   router.push('/medical-registration')
          // }

          return response.data
        })
        .catch((error) => {
          toast.warning('Não foi possível carregar as informações do usuário', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchUsers({ commit }) {
      commit('setLoading', true)

      return getUsers()
        .then((response) => {
          commit('setUserData', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
          return response.data
        })
        .catch((error) => {
          toast.warning(
            'Não foi possível carregar as informações dos usuários',
            {
              timeout: 5000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getUserData: (state) => state.userData,
    getId: (state) => state.userData.id,
    getHashId: (state) => state.userData.hashid,
    getType: (state) => state.userData.type,
    getUsername: (state) => state.userData.username,
    getEmail: (state) => state.userData.email,
    getName: (state) => state.userData.name,
    getPassword: (state) => state.userData.password,
    getTerm: (state) => state.userData.term,
    getCpf: (state) => state.userData.cpf,
    getPhone: (state) => state.userData.phone,
    getCrm: (state) => state.userData.crm,
    getUfCrm: (state) => state.userData.uf_crm,
    getCep: (state) => state.userData.cep,
    getStreet: (state) => state.userData.street,
    getNumber: (state) => state.userData.number,
    getComplement: (state) => state.userData.complement,
    getCity: (state) => state.userData.city,
    getState: (state) => state.userData.state,
    getCnpj: (state) => state.userData.cnpj,
    getCorporateName: (state) => state.userData.corporate_name,
    getCategory: (state) => state.userData.category,
    getSpecialty: (state) => state.userData.specialty,
    getLoadingUser: (state) => state.loading,
    getIndustry: (state) => state.userData.industryId,
    isRegistred: (state) => {
      const requiredProperties = ['email', 'name', 'phone', 'cpf']

      // Check if all required properties exist and are truthy
      return requiredProperties.every((prop) => state.userData[prop])
    }
  }
}
