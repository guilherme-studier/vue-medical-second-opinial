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
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

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
@import '../styles/index.scss';
</style>
