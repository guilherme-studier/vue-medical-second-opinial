vue```

<template>
  <div class="login">
    <LoginLayout>
      <template #content>
          <form @submit="login"></form>
        </div>
      </template>
    </LoginLayout>
  </div>
</template>

<script>
import { setCurrentUserAccess } from '@/helpers/auth'
import LoginLayout from '@/layouts/LoginLayout'

export default {
  name: 'Login',
  components: {
    LoginLayout
  },
  data() {
    return {
      email: null /** E-mail */,
      password: null /** Senha */,
    }
  },
  methods: {
    /** Login
     * @param {Event} e: Capturar evento do formulário de login
     */
    login(e) {
      /** Carregando loading */
      this.loading = true
      e.preventDefault()

      this.$auth
        .login({ email: this.email, password: this.password })
        .then((response) => {
          this.setAuthenticate(response.headers.authorization)
        })
        .catch(() => {
          this.$toast.warning('A senha inserida está incorreta.')
        })
    },
    /** Autenticar usuário e redirecionar para a Tela inicial
     * @param {String} token - Token do usuário
     */
    setAuthenticate(token) {
      /** Guardar token de acesso */
      setCurrentUserAccess(token)
      /** Redirecionar */
      window.location = '/admin'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

```