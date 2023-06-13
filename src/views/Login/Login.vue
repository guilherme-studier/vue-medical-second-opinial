<template>
  <div id="login" :class="backgroundClass">
    <div v-if="!userSelected">
      <div class="container">
        <img class="logo" :src="loginMeSo" alt="Logo MeSo" />
        <InputGroup>
          <InputWrapper v-for="option in loginOptions" :key="option.id">
            <button @click="selectUser(option.id)">{{ option.name }}</button>
          </InputWrapper>
        </InputGroup>
      </div>
    </div>
    <div v-else>
      <div class="login-form">
        <h1>Login</h1>
        <!-- Adicione aqui o formulário de login -->
      </div>
    </div>
    <img class="logo-ceos" :src="logoCeos" alt="Logo Ceos" />
  </div>
</template>

<script>
import InputGroup from '@/components/inputGroup/InputGroup'
import InputWrapper from '@/components/inputWrapper/InputWrapper'
import logoMeSo from '../../assets/login-logo.png'
import logoCeos from '../../assets/logo-ceos.png'

export default {
  name: 'Login',
  components: {
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      loginMeSo: logoMeSo,
      logoCeos: logoCeos,
      loginOptions: [
        { id: 1, name: 'Instituto Ceos' },
        { id: 2, name: 'Médico Consultor' },
        { id: 3, name: 'Médico Cliente' },
        { id: 4, name: 'Pharma' }
      ],
      userSelected: null
    }
  },
  computed: {
    backgroundClass() {
      if (this.userSelected === 1) {
        return 'background-ceos'
      } else {
        return 'background-default'
      }
    }
  },
  methods: {
    selectUser(userId) {
      this.userSelected = userId
    }
  }
}
</script>

<style lang="scss" scoped>
.background-default {
  background-image: url('../../assets/background-login.png');
}

.background-ceos {
  background-image: url('../../assets/background-ceos.png');
}
#login {
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  align-items: center;
  max-height: 100vh;
  max-width: 100%;
  display: flex;
  height: 100%;
  width: 100%;

  .logo {
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    height: auto;
    width: 33%;
    padding-bottom: 40px;
  }

  .logo-ceos {
    position: absolute;
    bottom: 15px;
    right: 15px;
    max-width: 200px;
    width: 100%;
    max-height: 100px;
    height: 100%;
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
  }
}
</style>
