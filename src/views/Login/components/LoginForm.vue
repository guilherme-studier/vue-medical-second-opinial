<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          v-model="email"
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
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      forgotPassword: false,
      email: '',
      password: ''
    }
  },
  methods: {
    handlePassword() {
      this.forgotPassword = !this.forgotPassword
    },

    async handleLogin() {
      try {
        // Monta o payload com os dados de email e senha
        const payload = {
          email: this.email,
          password: this.password
        }

        // Faz a chamada POST para a API
        const response = await axios.post(
          'https://meso.poatech.com.br:450/user/api/1.0/auth',
          payload
        )

        // Verifica a resposta da API e trata os dados retornados
        if (response && response.data) {
          // Faça algo com os dados da resposta, se necessário
          console.log('Dados da resposta:', response.data)

          // Exemplo de redirecionamento para outra página após a autenticação
          // this.$router.push('/dashboard'); // Ou qualquer outra rota desejada
        } else {
          throw new Error('Resposta inválida da API.')
        }
      } catch (error) {
        // Trate o erro, caso ocorra
        console.error('Erro na chamada à API:', error.message)
      }
    },

    handleSubmit() {
      // Chama a função loginUser com o email e a senha informados no formulário
      this.$emit('login', this.email, this.password)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
