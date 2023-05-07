export default ($axios) => ({
  /** Login */
  login: (params) => $axios.post('/auth/signin', params),

  /** Pgar os dados do usuário */
  getUserData: () => $axios.get('/user')
})
