<template>
  <div id="representative-registration">
    <representative-registration-form />
  </div>
</template>

<script>
import RepresentativeRegistrationForm from './components/RepresentativeRegistrationForm.vue'

export default {
  name: 'RepresentativeRegistration',
  components: {
    RepresentativeRegistrationForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
