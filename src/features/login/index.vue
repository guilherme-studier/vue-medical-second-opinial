<template>
  <div id="login" :class="backgroundClass" v-loading="isTransitioning">
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

    <img v-if="!userSelected" class="logo-ceos" :src="logoCeos" />
    <el-button
      v-else
      type="primary"
      class="btn-back"
      @click="reset"
      :disabled="isSaveDisabled"
      >{{ userSelected.name }}</el-button
    >
  </div>
</template>

<script>
// components
import { mapGetters } from 'vuex'

import logoMeSo from '../../assets/login-logo.png'
import logoCeos from '../../assets/logo-ceos.png'

import LoginForm from '@/features/login/components/LoginForm'
import LoginUser from '@/features/login/components/LoginUser'

//img

//stores

export default {
  name: 'Login',
  components: {
    LoginUser,
    LoginForm
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
