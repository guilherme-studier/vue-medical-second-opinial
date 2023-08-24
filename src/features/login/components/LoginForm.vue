<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <!-- Exibe o campo de e-mail e senha quando forgotPassword for falso -->
      <div v-if="!forgotPassword">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            placeholder="Usuário"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
          />
        </div>
      </div>
      <div v-else>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail cadastrado"
          />
        </div>
      </div>
      <div class="form-group last-form-group">
        <a @click="handlePassword" href="#">
          {{ forgotPassword ? 'Retornar Login' : 'Esqueci minha senha' }}
        </a>
        <button @click="handleButtonClick" type="submit">
          {{ forgotPassword ? 'Enviar' : 'Entrar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      forgotPassword: false,
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    ...mapActions(['loginUser', 'resetPassword']),

    handlePassword() {
      this.forgotPassword = !this.forgotPassword
      if (this.forgotPassword) {
        this.username = ''
        this.password = ''
      } else {
        this.email = ''
      }
    },

    async handleButtonClick() {
      if (this.forgotPassword) {
        this.resetPassword({ email: this.email })
      } else {
        try {
          await this.loginUser({
            username: this.username,
            password: this.password
          })
        } catch (error) {
          alert('Erro na chamada à API (vindo do Vuex):', error.message)
        }
      }
    },

    handleSubmit() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
