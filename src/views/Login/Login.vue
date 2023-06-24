<template>
  <div id="login" :class="backgroundClass">
    <div v-if="!userSelected">
      <login-user
        logo-alt="Logo MeSo"
        :logo-src="loginMeSo"
        :options="loginOptions"
        @user-selected="selectUser"
      />
    </div>
    <div v-else>
      <img class="login-form-logo" :src="logoCeos" alt="Logo Ceos" />
      <login-form />
    </div>

    <!-- Base-loader -->
    <div v-if="isTransitioning" class="base-loader">
      <login-base-loader />
    </div>

    <img v-if="!userSelected" class="logo-ceos" :src="logoCeos" />
    <button v-else @click="reset" class="btn-back">
      {{ userSelected.name }}
    </button>
  </div>
</template>

<script>
// components
import LoginUser from '@/views/login/components/LoginUser'
import LoginForm from '@/views/login/components/LoginForm'
import LoginBaseLoader from '@/views/login/components/LoginBaseLoader'

//img
import logoMeSo from '../../assets/login-logo.png'
import logoCeos from '../../assets/logo-ceos.png'

export default {
  name: 'Login',
  components: {
    LoginUser,
    LoginForm,
    LoginBaseLoader
  },
  data() {
    return {
      loginMeSo: logoMeSo,
      logoCeos: logoCeos,
      loginOptions: [
        {
          id: 1,
          name: 'Instituto Ceos',
          background: 'background-ceos'
        },
        {
          id: 2,
          name: 'Médico Consultor',
          background: 'background-doctor'
        },
        {
          id: 3,
          name: 'Médico Cliente',
          background: 'background-doctor-client'
        },
        {
          id: 4,
          name: 'Pharma',
          background: 'background-pharma'
        }
      ],
      userSelected: null,
      isTransitioning: false
    }
  },
  computed: {
    backgroundClass() {
      if (!this.userSelected) return 'background-default'
      else return this.userSelected?.background
    }
  },
  methods: {
    selectUser(typeUser) {
      this.isTransitioning = true
      setTimeout(() => {
        this.userSelected = typeUser
        this.isTransitioning = false
      }, 500)
    },
    reset() {
      this.isTransitioning = true
      setTimeout(() => {
        this.userSelected = null
        this.isTransitioning = false
      }, 500)
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

.background-doctor {
  background-image: url('../../assets/background-doctor.png');
}

.background-doctor-client {
  background-image: url('../../assets/background-doctor-client.png');
}

.background-pharma {
  background-image: url('../../assets/background-pharma.png');
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
    padding-bottom: 40px;
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    height: auto;
    width: 33%;
  }

  .btn-back {
    position: absolute;
    max-height: 100px;
    max-width: 200px;
    bottom: 15px;
    width: 100%;
    left: 15px;
  }

  .logo-ceos {
    position: absolute;
    max-height: 100px;
    max-width: 200px;
    height: 100%;
    bottom: 15px;
    right: 15px;
    width: 100%;
  }

  .login-form-logo {
    padding-bottom: 20px;
    max-width: 200px;
    margin: 0 auto;
    display: flex;
  }

  .base-loader {
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    z-index: 9999;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
}
</style>
