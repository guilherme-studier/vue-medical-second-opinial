<template>
  <div id="data-payments">
    <Title :title="titleComponent" />
    <input-group>
      <input-wrapper>
        <input
          type="number"
          placeholder="CNPJ"
          class="flexible-input"
          v-model="cnpj"
        />
      </input-wrapper>
      <input-wrapper>
        <input
          type="text"
          placeholder="Razão Social"
          class="flexible-input"
          v-model="corporateName"
        />
      </input-wrapper>
    </input-group>
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper'
import InputGroup from '@/components/inputGroup'
import Title from '@/components/title'

export default {
  name: 'DataPayments',
  components: {
    InputWrapper,
    InputGroup,
    Title
  },
  data() {
    return {
      titleComponent: 'Dados para pagamentos de honorários',
      corporateName: '',
      cnpj: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
