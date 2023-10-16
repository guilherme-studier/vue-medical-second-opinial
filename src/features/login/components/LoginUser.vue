<template>
  <div class="container">
    <img class="logo" :src="logoSrc" :alt="logoAlt" />
    <InputGroup>
      <InputWrapper v-for="option in options" :key="option.id">
        <button @click="selectUser(option)">
          <h3>{{ option.name }}</h3>
        </button>
      </InputWrapper>
    </InputGroup>
  </div>
</template>

<script>
import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'

export default {
  name: 'LoginUser',
  components: {
    InputGroup,
    InputWrapper
  },
  props: {
    logoSrc: {
      type: String,
      required: true
    },
    logoAlt: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectUser(option) {
      this.$emit('user-selected', option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
