<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <!-- Exibe o campo de e-mail e senha quando forgotPassword for falso -->
      <div class="form-input" v-if="!forgotPassword">
        <div class="form-group">
          <el-input
            v-model="username"
            type="email"
            id="username"
            name="username"
            placeholder="Usuário"
            :prefix-icon="iconUser"
          />
        </div>
        <div class="form-group">
          <el-input
            v-model="password"
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            ref="passwordInput"
            @keyup.enter="handleLogin"
            :prefix-icon="iconLock"
            show-password
          />
        </div>
      </div>
      <div class="password-field" v-else>
        <div class="form-group">
          <el-input
            v-model="email"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail cadastrado"
            :prefix-icon="iconMail"
          />
        </div>
      </div>
      <div class="form-group last-form-group">
        <a @click="handlePassword" href="#">
          {{ forgotPassword ? 'Retornar Login' : 'Esqueci minha senha' }}
        </a>
        <el-button type="primary" @click="handleLogin">{{
          forgotPassword ? 'Enviar' : 'Entrar'
        }}</el-button>
      </div>
    </form>
  </div>
</template>

<script>
import { UserFilled, Lock, Message } from '@element-plus/icons-vue'
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      forgotPassword: false,
      username: null,
      password: null,
      email: null,
      iconUser: UserFilled,
      iconLock: Lock,
      iconMail: Message
    }
  },
  methods: {
    ...mapActions(['loginUser', 'resetPassword']),

    handlePassword() {
      this.forgotPassword = !this.forgotPassword
      if (this.forgotPassword) {
        this.username = null
        this.password = null
      } else this.email = null
    },

    async handleLogin() {
      if (this.forgotPassword) return this.resetPassword({ email: this.email })
      else
        this.loginUser({
          username: this.username,
          password: this.password
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.input--login {
  padding-left: 3.5em;
  background: url('../../../assets/icons/icon-user.svg') 1em center / 1em 1em
      no-repeat,
    linear-gradient(
      to right,
      $green-500 3em,
      hsl(0, 0%, 70%) 2.5em,
      hsl(0, 0%, 70%) calc(2.5em + 1px),
      transparent calc(2.5em + 1px)
    );
}

.input--password {
  padding-left: 3.5em;
  background: url('../../../assets/icons/icon-password.svg') 1em center / 1em
      1em no-repeat,
    linear-gradient(
      to right,
      $green-500 3em,
      hsl(0, 0%, 70%) 2.5em,
      hsl(0, 0%, 70%) calc(2.5em + 1px),
      transparent calc(2.5em + 1px)
    );
}

.input--reset-password {
  padding-left: 3.5em;
  background: url('../../../assets/icons/icon-email.svg') 1em center / 1em 1em
      no-repeat,
    linear-gradient(
      to right,
      $green-500 3em,
      hsl(0, 0%, 70%) 2.5em,
      hsl(0, 0%, 70%) calc(2.5em + 1px),
      transparent calc(2.5em + 1px)
    );
}
</style>
