<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
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
      <div class="form-group last-form-group">
        <a @click="handlePassword" href="#">
          {{ forgotPassword ? 'Retornar Login' : 'Esqueci minha senha' }}
        </a>
        <button @click="handleLogin" type="submit">Entrar</button>
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
      password: ''
    }
  },
  methods: {
    ...mapActions('login', ['loginUser']),

    handlePassword() {
      this.forgotPassword = !this.forgotPassword
    },

    async handleLogin() {
      try {
        await this.loginUser({
          username: this.username,
          password: this.password
        })
      } catch (error) {
        console.error('Erro na chamada à API (vindo do Vuex):', error.message)
      }
    },

    handleSubmit() {
      this.$emit('login', this.username, this.password)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
