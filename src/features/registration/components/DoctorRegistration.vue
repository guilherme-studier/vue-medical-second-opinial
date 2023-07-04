<template>
  <div id="doctor-registration">
    <div class="form">
      <input-group>
        <input-wrapper>
          <input
            type="number"
            placeholder="CPF"
            class="flexible-input"
            v-model="cpf"
          />
        </input-wrapper>
        <input-wrapper>
          <input
            type="password"
            placeholder="Senha inicial"
            class="flexible-input"
            v-model="password"
          />
        </input-wrapper>
      </input-group>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/inputGroup/InputGroup'
import InputWrapper from '@/components/inputWrapper/InputWrapper'

export default {
  name: 'Doctor Registration',
  components: {
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      cpf: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
#doctor-registration {
  .form {
    flex-direction: column;
    margin-top: 20px;
    display: flex;
    width: 100%;
  }
}
</style>
