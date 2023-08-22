<template>
  <div id="registration">
    <registration-data />
  </div>
</template>

<script>
// components
import RegistrationData from '../registration/components/RegistrationData'

export default {
  name: 'Registration',
  components: {
    RegistrationData
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
