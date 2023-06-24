<template>
  <div class="login-form">
    <form>
      <div class="form-group">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Usuário"
        />
      </div>
      <div class="form-group">
        <input
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
        <button type="submit">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      forgotPassword: false
    }
  },
  methods: {
    handlePassword() {
      this.forgotPassword = !this.forgotPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 50px;
  background: $white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 425px;
  margin: 0 auto;
  max-height: 100vh;
  padding: 20px;

  form {
    width: 100%;
    height: fit-content;

    .form-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;

      a:hover {
        text-decoration: underline;
      }

      button {
        max-width: 100px;
      }
    }

    .last-form-group {
      margin-block: 0;
    }
  }
}
</style>
