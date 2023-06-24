<template>
  <div class="container">
    <img class="logo" :src="logoSrc" :alt="logoAlt" />
    <InputGroup>
      <InputWrapper v-for="option in options" :key="option.id">
        <button @click="selectUser(option)">{{ option.name }}</button>
      </InputWrapper>
    </InputGroup>
  </div>
</template>

<script>
import InputGroup from '@/components/inputGroup/InputGroup'
import InputWrapper from '@/components/inputWrapper/InputWrapper'

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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  height: auto;
  width: 33%;
  padding-bottom: 40px;
}
</style>
