<template>
  <div id="login" :class="backgroundClass">
    <div v-if="!userSelected">
      <login-user
        logo-alt="Logo MeSo"
        :logo-src="loginMeSo"
        :options="getLoginOptions"
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

//stores
import { mapGetters } from 'vuex'

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
      userSelected: null,
      isTransitioning: false
    }
  },
  computed: {
    ...mapGetters(['getLoginOptions']),

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
@import './styles/index.scss';

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

.background-sponsor {
  background-image: url('../../assets/background-sponsor.png');
}
</style>
