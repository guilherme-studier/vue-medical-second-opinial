<template>
  <div id="login-client-doctor-container">
    <div class="banner-container">
      <img
        :src="banner"
        alt="Login Client Doctor Banner"
        class="banner-image"
      />
    </div>
    <div class="text-container">
      <div class="text">
        <h1>MeSO - Medical Second Opinion</h1>
        <p>
          Seja muito bem-vindo(a) à plataforma Medical Second Opinion - MeSO.
        </p>
        <p>
          Por meio da plataforma MeSO, você terá a oportunidade de discutir um
          caso clínico de um de seus pacientes junto a um de nossos médicos
          especialistas, podendo auxiliá-lo(la) tanto no diagnóstico, quanto no
          manejo do referido paciente.
        </p>
        <p>
          Todo o processo será realizado via plataforma MeSO, com total sigilo e
          segurança dos dados trocados durante o processo, resguardando a
          privacidade dos pacientes envolvidos, e de com a legislação vigente.
        </p>
        <p>
          Por favor, digite nos campos abaixo o endereço de e-mail pelo qual
          você acessou este link e a senha provisória recebida para acessar o(s)
          caso(s) clínico(s) disponível(is) para sua utilização.
        </p>
        <p>
          Após o Login na plataforma MeSO, selecione a opção "Cadastro Médico
          Cliente" para informar seus dados pessoais e registrar uma nova senha.
        </p>
        <p>
          Obrigado!
        </p>
        <div class="form-input">
          <div class="form-group">
            <el-input
              v-model="email"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            >
              <template #prepend>
                <el-button :icon="iconUser" />
              </template>
            </el-input>
          </div>
          <div class="form-group">
            <el-input
              v-model="password"
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              show-password
            >
              <template #prepend>
                <el-button :icon="iconLock" />
              </template>
            </el-input>
          </div>
          <el-button
            type="primary"
            :disabled="!isLoginEnabled"
            @click="handleButtonClick"
            class="login-button"
            >{{ 'Entrar' }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { mapActions } from 'vuex'

import loginClientDoctorBanner from '@/assets/background-login-client-doctor.png'

export default {
  name: 'ClientDoctorLoginForm',
  data() {
    return {
      banner: loginClientDoctorBanner,
      iconUser: UserFilled,
      iconLock: Lock,
      email: null,
      password: null,
      activetoken: null
    }
  },
  computed: {
    isLoginEnabled() {
      return this.email?.trim() !== '' && this.password?.trim() !== ''
    }
  },
  watch: {
    '$route.query.activetoken'(newValue) {
      this.activetoken = newValue
    }
  },
  methods: {
    ...mapActions('clientDoctor', ['activeClientDoctor']),

    async handleButtonClick() {
      this.activeClientDoctor({
        activeToken: this.activetoken,
        email: this.email,
        password: this.password
      })
    }
  },
  created() {
    // Inicializar a propriedade activetoken com o valor atual da URL
    this.activetoken = this.$route.query.activetoken
  }
}
</script>

<style lang="scss" scoped>
#login-client-doctor-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.banner-container {
  flex: 60%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-container {
  flex: 40%;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  padding: 10px 30px;

  .text {
    padding: 0 100px;
    h1 {
      font-size: 22px;
      color: $green-500;
      margin-bottom: 20px;
    }

    p {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;
    }
  }

  .form-input {
    padding: 10px;
    background: $gray;
    border-radius: 10px;

    .form-group {
      margin-bottom: 5px;
    }
  }
  .login-button {
    width: 150px;
    align-self: flex-end;
    margin-top: 10px;
  }
}
</style>
